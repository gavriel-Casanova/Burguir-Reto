import { Plato } from "./clases/plato.js";
import { Comanda } from "./clases/comanda.js";

const comidas = ["agua", "ensalada", "hamburguesa", "helado", "patatas", "tarta", "nachos", "refresco"];
var totalComandas= 0;

function crearComanda() {

    if(totalComandas >= 6){
        /*detener el tiempo + volver a inicio*/
        return;
    }

    var totalPlatos = generarNumeroAleatorio(5);
    var comanda = new Comanda();

    for (let i = 0; i < totalPlatos; i++) {
        var plato = crearPlato();
        añadirPlatoAComanda(comanda, plato);
    }
    añadirComandaEnLaPagina(comanda); 
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


function añadirPlatoAComanda(comanda, plato) {

    var existe = false;

    for (let i = 0; i < comanda.platos.length; i++) {

        if (comanda.platos[i].getComida() == plato.getComida()) {
            existe = true;
        }
    }

    if (existe == false) {
        comanda.platos.push(plato);
        console.log("Plato añadido " + plato.getCantidad() + " " + plato.getComida());
    }
}

function añadirComandaEnLaPagina(comanda) {

    var lista = document.getElementById("lista_comanda");

    for (let i = 0; i < comanda.platos.length; i++) {

        var parrafo = document.createElement("p");
        parrafo.id = "plato" + (i + 1);

        parrafo.textContent = comanda.platos[i].getCantidad() + " " + comanda.platos[i].getComida();
        lista.appendChild(parrafo);

    }
}

crearComanda();


