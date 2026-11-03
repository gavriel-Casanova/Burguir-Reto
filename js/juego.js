import { Usuario } from "./clases/usuario.js";
import { Plato } from "./clases/plato.js";
import { Comanda } from "./clases/comanda.js";
import { RankingJugador } from "./clases/rankingJugador.js";

//LUCIA Y GAVRIEL: COMPROBAR COMO ESTÁN GUARDANDO LOS DATOS DEL USUARIO EN EL LOCALSTORAGE 
//sessionStorage.setItem("usuarioActual", JSON.stringify(usuario));

//Recuperamos el usuarioActual del sessionStorage y lo convertimos a obj. Usuario
var usuario = JSON.parse(sessionStorage.getItem("usuarioActual"));
const comidas = ["agua", "ensalada", "hamburguesa", "helado", "patatas", "tarta", "nachos", "refresco"];
var comandaActual;
var contadorComanda = 0;

function iniciarJuego() {
    crearComanda();
    recogerClicksSobreBotonera();
}

function crearComanda() {

    var totalPlatos = generarNumeroAleatorio(5);
    comandaActual = new Comanda();

    for (let i = 0; i < totalPlatos; i++) {
        var plato = crearPlato();
        añadirPlatoAComanda(comandaActual, plato);
    }
    //Limpiar la comanda anterior
    document.getElementById("lista_comanda").innerHTML = "";
    añadirComandaEnLaPagina(comandaActual);
}

//Devuelve un número aleatorio entre 1 y el parámetro recibido (max)
//El +1 es para que el número máximo sea incluido en el rango y no devuelva 0 yaque Math.floor redondea por lo bajo
function generarNumeroAleatorio(max) {
    return Math.floor(Math.random() * max) + 1;
}


//Creamos un plato con cantidad aleatoria (máximo 3) y comida aleatoria (alguno de los elementos del array comidas)
function crearPlato() {
    var plato = new Plato();
    plato.setCantidad(generarNumeroAleatorio(3));
    var posicionComida = generarNumeroAleatorio(comidas.length) - 1;
    plato.setComida(comidas[posicionComida]);
    //console.log(plato.getCantidad() + " "+ plato.getComida() );
    return plato;

}

//Añadimos un plato a la comandaActual si no existe ya un plato con el mismo nombre
function añadirPlatoAComanda(comandaActual, plato) {

    var existe = false;
    //recorremos la comandaActual y comprobamos si ya existe un plato con el mismo nombre que el obj. plato  recibido como parámetro
    for (let i = 0; i < comandaActual.platos.length; i++) {

        if (comandaActual.platos[i].getComida() == plato.getComida()) {
            existe = true;
        }
    }
    //añadimos el palto a la comandaActual(al final del array)
    if (existe == false) {
        comandaActual.platos.push(plato);
        //console.log("Plato añadido " + plato.getCantidad() + " " + plato.getComida());
    }
}

//Añadimos la comandaActual en el html, creando un parrafo por cada plato con su cantidad y nombre
function añadirComandaEnLaPagina(comandaActual) {

    var lista = document.getElementById("lista_comanda");

    for (let i = 0; i < comandaActual.platos.length; i++) {

        var parrafo = document.createElement("p");
        parrafo.id = "plato" + (i + 1);
        //añadimos el texto al parrafo con la cantidad y el nombre del plato
        parrafo.textContent = comandaActual.platos[i].getCantidad() + " " + comandaActual.platos[i].getComida();
        lista.appendChild(parrafo);

    }
}

//************************** CAMBIOS TRAS CLICK ******************************************/

//En una misma función ponemos eventos de click sobre todas las imagenes de la botonera
// ya que la imagen se corresponde con cada uno de los elementos del array comidas
function recogerClicksSobreBotonera() {
    for (let i = 0; i < comidas.length; i++) {
        let comida = comidas[i]; //EXPLICAR ESTO 
        document.getElementById(comida).addEventListener("click", function () {
            // console.log(comida);
            recogerClickComida(comida);
        });

    }
}

//Recibe el nombre de la comida  y busca si está en la comanda
function recogerClickComida(comida) {
    var posicionPlatoEncontrado = buscarPlatoEnComanda(comida);
    if (posicionPlatoEncontrado == -1) {
        return;
    }
    restarCantidadPlato(posicionPlatoEncontrado);

}

//Buscamos en la comandaActual que uno de sus platos coincida con el parametro recibido(comida/plato elegida tras click)
//Devolvemos la posicion donde encuentra dicho plato o -1 si no lo encuentra
function buscarPlatoEnComanda(comida) {
    for (let i = 0; i < comandaActual.platos.length; i++) {
        if (comandaActual.platos[i].getComida() == comida) {
            return i;
        }
    }
    return -1;
}

//Modificamos el plato encontrado (-1 a getCantidad) dentro de la comandaActual
//Representamos el cambio en el html
function restarCantidadPlato(posicionPlatoEncontrado) {
    var platoEncontrado = comandaActual.platos[posicionPlatoEncontrado];
    if (platoEncontrado.getCantidad() > 0) {
        // console.log(platoEncontrado.getCantidad());
        platoEncontrado.restarCantidad();
        // console.log(platoEncontrado.getCantidad());
        var parrafo = document.getElementById("plato" + (posicionPlatoEncontrado + 1));//buscamos el id de ese parrafo para modificarlo
        parrafo.textContent = platoEncontrado.getCantidad() + " " + platoEncontrado.getComida();
        if(platoEncontrado.getCantidad() == 0){
            tacharPlato(parrafo);
        }
        comprobarComandaCompletada();
    }
}

function comprobarComandaCompletada() {
    var todosLosPlatosCompletados = true;

    for (let i = 0; i < comandaActual.platos.length; i++) {
        if (comandaActual.platos[i].getCantidad() > 0) {
            todosLosPlatosCompletados = false;
            break;
        }
    }

    if (todosLosPlatosCompletados) {
        contadorComanda++;

        if (contadorComanda >= 6) {
          
            guardarRanking(usuario, puntos);
            
            window.location.href = "inicio.html";
            return;
        }

        crearComanda();
    }
}

//Tachamos el plato en la comanda cuando su cantidad llega a 0
function tacharPlato(parrafo){
    parrafo.style.textDecoration = "line-through";
}

function calcularPuntuacion() {

}

//Guardamos en el localStorage un obj. RankingJugador con los datos del usuario y los puntos obtenidos
function guardarRanking(usuario, puntos){
    //creamos el obj. RankingJugador con los datos recibidos como parámetros y la fecha actual
    var rankingJugador = new RankingJugador(usuario, puntos, new Date());
    //Convertimos el obj. rankingJugador a JSON (texto porque localStorage solo almacena texto) 
    // y lo guardamos en localStorage con la clave "rankingJugador"
    localStorage.setItem("rankingJugador", JSON.stringify(rankingJugador));
   
}

iniciarJuego();
