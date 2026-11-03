🍔 Documentación Técnica: Proyecto Burguir
Esta es la documentación técnica y de arquitectura del proyecto Burguir. Este documento desglosa la estructura del código, el flujo de datos, la gestión del estado y la manipulación del DOM, sirviendo como guía de referencia y estudio.
📑 Índice
Arquitectura del Proyecto
Gestión de Datos: WebStorage y JSON
Documentación por Archivos
Glosario Técnico
1. Arquitectura del Proyecto
El proyecto está construido bajo una arquitectura modular de Vanilla JavaScript (sin frameworks), separando las responsabilidades de la vista (HTML/CSS) de la lógica de negocio (JS).
```text
📦 burguir-project
 ┣ 📂 css
 ┃ ┗ 📜 styles.css         # Estilos globales y layouts (Grid/Flexbox)
 ┣ 📂 js
 ┃ ┣ 📜 index.js           # Lógica de inicio de sesión y redirección
 ┃ ┣ 📜 perfil.js          # CRUD de usuarios (Crear/Modificar)
 ┃ ┣ 📜 juego.js           # Lógica principal del minijuego
 ┃ ┗ 📜 ranking.js         # Algoritmo de ordenación e inyección del DOM
 ┣ 📂 assets               # Imágenes, iconos y recursos multimedia
 ┣ 📜 index.html           # Vista: Home / Login
 ┣ 📜 perfil.html          # Vista: Registro / Edición
 ┣ 📜 juego.html           # Vista: Tablero del minijuego
 ┗ 📜 ranking.html         # Vista: Tabla del Top 10
```
2. Gestión de Datos: WebStorage y JSON
Dado que este proyecto se ejecuta íntegramente en el lado del cliente (frontend) y carece de un backend con base de datos (como MySQL o MongoDB), la persistencia de los datos recae completamente en el navegador del usuario. Para lograr esto, utilizamos dos tecnologías que trabajan de la mano: WebStorage API y JSON.
💾 ¿Qué es y cómo funciona la WebStorage API?
La WebStorage API es una herramienta nativa de los navegadores modernos que permite a las páginas web almacenar datos directamente en el ordenador del usuario de forma segura y estructurada. Funciona mediante un sistema de clave-valor (como un diccionario: le das un nombre al dato, y luego guardas el dato en sí).
WebStorage se divide en dos mecanismos principales según el tiempo que queremos que vivan los datos:
`localStorage` (Almacenamiento Persistente):
Duración: Los datos guardados aquí no tienen fecha de caducidad. Sobreviven aunque el usuario cierre la pestaña, cierre el navegador o reinicie el ordenador. Solo se borran si el código JS los elimina explícitamente o si el usuario borra la caché del navegador.
Uso en el proyecto: Guardar la lista global de usuarios registrados y el registro histórico del Ranking de puntuaciones.
Métodos principales:
`localStorage.setItem('clave', 'valor')` -> Guarda o actualiza un dato.
`localStorage.getItem('clave')` -> Recupera el valor asociado a esa clave.
`localStorage.removeItem('clave')` -> Borra ese dato específico.
`sessionStorage` (Almacenamiento Volátil):
Duración: Los datos solo duran mientras la "sesión" de la página esté activa. En cuanto el usuario cierra la pestaña o el navegador, los datos desaparecen para siempre.
Uso en el proyecto: Guardar quién es el usuario que ha iniciado sesión actualmente y llevar el contador de intentos de juego de la sesión actual.
🔄 ¿Qué es JSON y por qué lo necesitamos?
JSON significa JavaScript Object Notation (Notación de Objetos de JavaScript). Es un formato de texto estándar y muy ligero que sirve para estructurar datos y transmitirlos.
El problema: WebStorage es fantástico, pero tiene una limitación enorme: solo permite guardar cadenas de texto (Strings). No puedes guardar un Array ni un Objeto complejo directamente.
Si intentas guardar un objeto de JS directamente (`localStorage.setItem('usuario', {nombre: "Pepe"})`), el navegador lo transformará forzosamente a texto y guardará literalmente la frase inútil `"[object Object]"`.
La solución (JSON): JSON actúa como un traductor. Convierte nuestras estructuras de datos complejas (como la lista de usuarios o el ranking) en una larga y perfecta cadena de texto para poder guardarla, y luego hace el proceso inverso para recuperarla.
Para ello, usamos dos funciones integradas en JavaScript:
`JSON.stringify()` (Convertir a Texto): Toma un Objeto o Array de JS y lo convierte en un String con formato JSON.
```javascript
  // Tenemos un objeto JS
  const jugador = { nombre: "Alex", puntos: 1500 };
  
  // Lo convertimos a texto JSON
  const jugadorTexto = JSON.stringify(jugador); 
  // Resultado: '{"nombre":"Alex","puntos":1500}'
  
  // Ahora SÍ podemos guardarlo en el Storage
  localStorage.setItem('ultimoJugador', jugadorTexto);
  ```
`JSON.parse()` (Convertir a JavaScript): Hace exactamente lo contrario. Coge un texto en formato JSON (que hemos sacado del Storage) y lo vuelve a "desempaquetar" convirtiéndolo en un Objeto o Array funcional de JS.
```javascript
  // Recuperamos el texto del Storage
  const textoRecuperado = localStorage.getItem('ultimoJugador');
  
  // Lo volveamos a convertir en un objeto real de JS
  const jugadorObjeto = JSON.parse(textoRecuperado);
  
  // Ahora podemos acceder a sus propiedades
  console.log(jugadorObjeto.nombre); // Imprime: "Alex"
  ```
---
3. Documentación por Archivos
Módulo de Perfil (`perfil.js`)
Objetivo: Gestionar la creación de la instancia `Usuario` y su persistencia usando las herramientas vistas anteriormente.
```javascript
// Definición de la clase Usuario
class Usuario {
    constructor(nombre, password, imagen = 'default.png') {
        this.nombre = nombre;
        this.password = password;
        this.imagen = imagen;
    }

    // Método para guardar el usuario en LocalStorage
    guardar() {
        // 1. Recuperar usuarios. Si no hay nada (null), inicializamos un array vacío []
        let usuariosDb = JSON.parse(localStorage.getItem('usuarios')) || [];
        
        // 2. Añadir el objeto actual al array
        usuariosDb.push(this);
        
        // 3. Volver a guardar el array completo, transformándolo a texto
        localStorage.setItem('usuarios', JSON.stringify(usuariosDb));
    }
}
```
Motor del Minijuego (`juego.js`)
Objetivo: Controlar el bucle del juego, los eventos de usuario y el contador de intentos mediante el almacenamiento de sesión.
```javascript
// Manejo del contador de intentos de la sesión actual
function incrementarIntento() {
    // sessionStorage maneja el dato como texto, usamos parseInt para convertirlo a número
    let intentos = parseInt(sessionStorage.getItem('intentosSesion')) || 0;
    intentos++;
    sessionStorage.setItem('intentosSesion', intentos); // Se guarda como "1", "2", etc.
    
    // Inyección dinámica en el DOM
    document.getElementById('contadorIntentos').textContent = `Intentos: ${intentos}`;
}

// Finalización de partida y registro
function finalizarPartida(puntuacionFinal) {
    const usuarioActivo = sessionStorage.getItem('usuarioLogueado');
    const fechaActual = new Date(); 

    const nuevaPartida = {
        jugador: usuarioActivo,
        puntos: puntuacionFinal,
        fecha: fechaActual.toLocaleString() 
    };

    guardarEnRanking(nuevaPartida);
}
```
Gestor del Ranking (`ranking.js`)
Objetivo: Extraer el histórico de puntuaciones, aplicar algoritmos de ordenación y generar nodos HTML dinámicamente.
```javascript
function renderizarTop10() {
    const tablaBod = document.getElementById('tablaRankingCuerpo');
    tablaBod.innerHTML = ''; // Limpiar tabla antes de renderizar
    
    // Extraer de texto JSON a Array real
    let ranking = JSON.parse(localStorage.getItem('ranking')) || [];

    // Algoritmo de ordenación: De mayor a menor puntuación
    ranking.sort((a, b) => b.puntos - a.puntos);

    // Seleccionar solo los 10 primeros
    const top10 = ranking.slice(0, 10);

    // Bucle repetitivo para modificar el DOM dinámicamente
    top10.forEach((partida, index) => {
        const fila = document.createElement('tr');
        
        // Uso de Template Literals para inyectar variables en HTML
        fila.innerHTML = `
            <td>${index + 1}</td>
            <td><img src="assets/${partida.imagen}" alt="Avatar"> ${partida.jugador}</td>
            <td><strong>${partida.puntos}</strong></td>
            <td>${partida.fecha}</td>
        `;
        
        tablaBod.appendChild(fila);
    });
}
```
4. Glosario Técnico
DOM (Document Object Model): Es la representación en memoria de tu archivo HTML. JavaScript utiliza el DOM para leer, cambiar o borrar elementos de la página web en tiempo real (ej: `document.getElementById`).
WebStorage API: Interfaz del navegador web que permite guardar datos en pares clave-valor de forma local (explicado en la Sección 2).
JSON (JavaScript Object Notation): Formato de texto ligero para el intercambio de datos (explicado en la Sección 2).
Callback: Una función que se pasa a otra función como si fuera un argumento, para que esta última la ejecute después. Es muy común en los Eventos y en los métodos de Arrays (ej: la función flecha dentro de `.forEach()` o `.sort()`).
Template Literals: Sintaxis de JS introducida en ES6 (usando las comillas invertidas ```) que permite interpolar variables y texto directamente usando `${variable}`. Evita los engorrosos símbolos `+` para concatenar.
CRUD: Acrónimo de Create, Read, Update, Delete. Son las 4 operaciones básicas que debe poder hacer cualquier sistema de gestión de datos, como el sistema de perfiles de esta app.
Event Listener: Un "escuchador" que se adhiere a un elemento HTML a la espera de que ocurra una acción específica (un click, pulsar una tecla, etc). Cuando ocurre, dispara una función JS.
