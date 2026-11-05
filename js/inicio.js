import { Usuario } from "./clases/usuario.js";

var usuario = sessionStorage.getItem("usuario");
usuario = JSON.parse(usuario);

//var usuario = new Usuario("Prueba","Prueba","Prueba","02/02/2005", "prueba@gmail.com","/media/img/personajes/personaje4.png");/*PRUEBA*/


//usuario.setPersonaje("/media/img/personajes/personaje4.png");
//usuario.setUsuario("Prueba");
inicializarPantallaInicio();

/* Mostrar atributos del obj en su correspondiente elemento y  añadir enlaces*/
function inicializarPantallaInicio() {
  mostrarBotonCerrarSesion();

  document.getElementById("ranking").addEventListener("click", function () {
    window.location.href =
      "ranking.html"; /*la ventana actual cambio en enlace por ...*/
  });

  document.getElementById("cerrar_sesion").addEventListener("click", function () {
     //Eliminamos el usuario guardado en sessionStorage
    sessionStorage.removeItem("usuarioActual");
     //Volvemos a la página de login
      window.location.href = "login.html";
    });

  document.getElementById("iniciar").addEventListener("click", function () {
    window.location.href = "juego.html";
  });

  document.getElementById("usuario").addEventListener("click", function () {
    window.location.href = "perfil.html";
  });

    document.getElementById("usuario").addEventListener("click", function() {
        window.location.href = "perfil.html?modo=edicion";
    });

    document.getElementById("usuario").textContent = usuario.usuario;

    document.getElementById("avatar").src = usuario.personaje;

}

function mostrarBotonCerrarSesion() {
  var cajaPersonaje = document.getElementById("contenedor_usuario");
  var botonCerrarSesion = document.getElementById("cerrar_sesion");

  cajaPersonaje.addEventListener("mouseenter", function () {
    botonCerrarSesion.style.display = "block";
  });

  cajaPersonaje.addEventListener("mouseleave", function () {
    botonCerrarSesion.style.display = "none";
  });
}

