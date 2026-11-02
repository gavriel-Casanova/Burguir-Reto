import { Plato } from "./clases/plato.js";
import { Comanda } from "./clases/comanda.js";

const comidas = [
  "agua",
  "ensalada",
  "hamburguesa",
  "helado",
  "patatas",
  "tarta",
  "nachos",
  "refresco",
];

function crearComanda() {
  var totalPlatos = generarNumeroAleatorio(5);
  var comanda = new Comanda();

  for (let i = 0; i < totalPlatos; i++) {
    var plato = crearPlato();
    añadirPlatoAComanda(comanda, plato);
  }
  añadirComandaEnLaPagina(comanda);
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
    console.log(
      "Plato añadido " + plato.getCantidad() + " " + plato.getComida(),
    );
  }
}

function añadirComandaEnLaPagina(comanda) {
  var lista = document.getElementById("lista_comanda");

  for (let i = 0; i < comanda.platos.length; i++) {
    var parrafo = document.createElement("p");
    parrafo.id = "plato" + (i + 1);

    parrafo.textContent =
      comanda.platos[i].getCantidad() + " " + comanda.platos[i].getComida();
    lista.appendChild(parrafo);
  }
}

crearComanda();

// temporazador y puntos
let tiempoTotalSegundos = 120;
let idTemporizador = null;

const spanMinutos = document.getElementById("minutos");
const spanSegundos = document.getElementById("segundos");
const tiempo = document.getElementById("tiempo");

document.addEventListener('load', iniciarTemporizador());

function iniciarTemporizador() {
  if (idTemporizador !== null) return;

  if (tiempoTotalSegundos <= 0) {
    const mins = parseInt(inputMinutos.value) || 0;
    const segs = parseInt(inputSegundos.value) || 0;
    tiempoTotalSegundos = mins * 60 + segs;
  }

  if (tiempoTotalSegundos <= 0) return;


  idTemporizador = setInterval(() => {
    tiempoTotalSegundos--;
    actualizarPantalla(tiempoTotalSegundos);

    if (tiempoTotalSegundos <= 0) {
      clearInterval(idTemporizador);
      idTemporizador = null;

      // Comportamiento cuando termina el tiempo
      spanMinutos.textContent = "00";
      spanSegundos.textContent = "00";

      
    }
  }, 1000);
}

function actualizarPantalla(totalSegundos) {
  const mins = Math.floor(totalSegundos / 60);
  const segs = totalSegundos % 60;

  // Formateamos y asignamos a cada span independiente
  spanMinutos.textContent = String(mins).padStart(2, "0");
  spanSegundos.textContent = String(segs).padStart(2, "0");
}
