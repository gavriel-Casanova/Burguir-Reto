import { Plato } from "./clases/plato.js";
import { Comanda } from "./clases/comanda.js";

const comidas = ["agua", "ensalada", "hamburguesa", "helado", "patatas", "tarta", "nachos", "refresco"];
var comandaActual;
var totalComandas = 0;

function crearComanda() {

    if (totalComandas >= 6) {
        /*detener el tiempo + volver a inicio*/
        return;
    }

    var totalPlatos = generarNumeroAleatorio(5);
    comandaActual = new Comanda();

    for (let i = 0; i < totalPlatos; i++) {
        var plato = crearPlato();
        añadirPlatoAComanda(comandaActual, plato);
    }
    //Limpiar la comanda anterior
    document.getElementById("lista_comanda").innerHTML = "";
    añadirComandaEnLaPagina(comandaActual);
    totalComandas++;
}


function generarNumeroAleatorio(max) {
    return Math.floor(Math.random() * max) + 1;
}



function crearPlato() {
    var plato = new Plato();
    plato.setCantidad(generarNumeroAleatorio(3));
    var posicionComida = generarNumeroAleatorio(comidas.length) - 1;
    plato.setComida(comidas[posicionComida]);
    //console.log(plato.getCantidad() + " "+ plato.getComida() );
    return plato;

}


function añadirPlatoAComanda(comandaActual, plato) {

    var existe = false;

    for (let i = 0; i < comandaActual.platos.length; i++) {

        if (comandaActual.platos[i].getComida() == plato.getComida()) {
            existe = true;
        }
    }

    if (existe == false) {
        comandaActual.platos.push(plato);
        console.log("Plato añadido " + plato.getCantidad() + " " + plato.getComida());
    }
}

function añadirComandaEnLaPagina(comandaActual) {

    var lista = document.getElementById("lista_comanda");

    for (let i = 0; i < comandaActual.platos.length; i++) {

        var parrafo = document.createElement("p");
        parrafo.id = "plato" + (i + 1);

        parrafo.textContent = comandaActual.platos[i].getCantidad() + " " + comandaActual.platos[i].getComida();
        lista.appendChild(parrafo);

    }
}






//en una misma función pongo eventos de click sobre todas las imagenes de la botonera
// ya que la imagen se corresponde con cada uno de los elementos del array comidas
function recogerClicksSobreBotonera() {
    for (let i = 0; i < comidas.length; i++) {
        let comida = comidas[i]; //EXPLICAR ESTO 
        document.getElementById(comida).addEventListener("click", function () {
            console.log(comida);
            recogerClickComida(comida);
        });

    }
}

//Recibe el nombre de la comida  y busca si está en la comanda
function recogerClickComida(comida) {
    var posicionPlatoEncontrado = buscarPlatoEnComanda(comida);
    if (posicionPlatoEncontrado == -1) {
        return;//sonido/vibracion
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
        console.log(platoEncontrado.getCantidad());
        platoEncontrado.restarCantidad();
        console.log(platoEncontrado.getCantidad());
        var parrafo = document.getElementById("plato" + (posicionPlatoEncontrado + 1));//buscamos el id de ese parrafo para modificarlo
        parrafo.textContent = platoEncontrado.getCantidad() + " " + platoEncontrado.getComida();
        if(platoEncontrado.getCantidad() == 0){
            tacharPlato(parrafo);
        }
    }
}


function tacharPlato(parrafo){
    parrafo.style.textDecoration = "line-through";
}



crearComanda();
recogerClicksSobreBotonera();



