import { Usuario } from "./clases/usuario.js";
import { Plato } from "./clases/plato.js";
import { Comanda } from "./clases/comanda.js";
import { RankingJugador } from "./clases/rankingJugador.js";

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
    parrafo.textContent =
      comandaActual.platos[i].getCantidad() +
      " " +
      comandaActual.platos[i].getComida();
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
    return; //sonido/vibracion
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
    var parrafo = document.getElementById(
      "plato" + (posicionPlatoEncontrado + 1),
    ); //buscamos el id de ese parrafo para modificarlo
    parrafo.textContent =
      platoEncontrado.getCantidad() + " " + platoEncontrado.getComida();
    if (platoEncontrado.getCantidad() == 0) {
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
      var usuario = sessionStorage.getItem("usuario");
      usuario = JSON.parse(usuario);
      var puntos = tiempoTotalSegundos;
      alert(puntos);
      guardarRanking(usuario, puntos);
      console.log(JSON.parse(localStorage.getItem("ranking")));

      window.location.href = "inicio.html";
      return;
    }

    crearComanda();
  }
}

function tacharPlato(parrafo) {
  parrafo.style.textDecoration = "line-through";
}

function guardarRanking(usuario, puntos) {
  //creamos el obj
  const fecha = new Date();

  const dia = String(fecha.getDate()).padStart(2, "0");
  const mes = String(fecha.getMonth() + 1).padStart(2, "0"); // Los meses van de 0 a 11
  const anio = fecha.getFullYear();
  var rankigJugador = new RankingJugador(usuario, puntos, `${dia}-${mes}-${anio}`);

  //Buscamos si existe un ranking guardado; convertimos el texto guardado en a un array usando JSON.parse.
  //Sino existe creamos array vacio
  var ranking = localStorage.getItem("ranking");
  ranking = JSON.parse(ranking).map((item) =>
    Object.assign(new RankingJugador(), item),
  );
  //Añadimos el nuevo jugador al array
  ranking.push(rankigJugador);
  //Guardamos el array actualizado convirtiendo el array a texto al usar JSON.stringify
  localStorage.setItem("ranking", JSON.stringify(ranking));
}

// temporazador y puntos
let tiempoTotalSegundos = 100;
let idTemporizador = null;

const spanMinutos = document.getElementById("minutos");
const spanSegundos = document.getElementById("segundos");
const tiempo = document.getElementById("tiempo");

document.addEventListener("load", iniciarTemporizador());

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
      alert("-- Tiempo terminado -- \n Intente nuevamente");
      window.location.href = "inicio.html";

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

iniciarJuego();
