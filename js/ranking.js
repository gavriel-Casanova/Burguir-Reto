import { Usuario } from "./clases/Usuario.js";
import { RankingJugador } from "./clases/rankingJugador.js";

//objetos de prueba
let test = new Usuario(
  "test",
  "test",
  "test",
  "test",
  "",
  "../media/img/personajes/personaje1.jpg",
);
let userRank = new RankingJugador(test, 20, "10-10-2026");
let test2 = new Usuario(
  "test2",
  "test2",
  "test2",
  "test2",
  "",
  "../media/img/personajes/personaje2.jpg",
);
let userRank2 = new RankingJugador(test2, 30, "10-10-2026");

let arrRanking = new Array();
arrRanking.push(userRank);
arrRanking.push(userRank2);

localStorage.setItem("ranking", JSON.stringify(arrRanking));
console.log(arrRanking);
//fin objetos de prueba

const tabla = document.getElementById("tablaPosicion");
const reset = document.getElementById("btnReset");
window.addEventListener("load", () => cargarTabla());

reset.addEventListener("click", () => {
  const filasEliminar = document.querySelectorAll(".fila");
  filasEliminar.forEach((e) => e.remove());

  cargarTabla();
});

function cargarTabla() {
  var ranking = localStorage.getItem("ranking");
  ranking = JSON.parse(ranking).map((item) =>
    Object.assign(new RankingJugador(), item),
  );
  ranking.sort((a, b) => b.puntos - a.puntos);
  ranking.forEach((player, index) => {
    let user = player.getUsuario();
    let filaNueva = document.createElement("tr");
    filaNueva.setAttribute("class", "fila");

    let celdaAvatar = document.createElement("td");
    celdaAvatar.setAttribute("class", "Avatar");
    let imagen = document.createElement("img");
    imagen.setAttribute("src", user.personaje);
    celdaAvatar.appendChild(imagen);

    let celdaUsuario = document.createElement("td");
    celdaUsuario.setAttribute("class", "Usuario");
    celdaUsuario.textContent = user.usuario;
    let celdaPuntos = document.createElement("td");
    celdaPuntos.setAttribute("class", "puntos");
    celdaPuntos.textContent = player.puntos;
    let celdaFecha = document.createElement("td");
    celdaFecha.setAttribute("class", "fecha");
    celdaFecha.textContent = player.fecha;

    filaNueva.appendChild(celdaAvatar);
    filaNueva.appendChild(celdaUsuario);
    filaNueva.appendChild(celdaPuntos);
    filaNueva.appendChild(celdaFecha);
    tabla.appendChild(filaNueva);
  });
}
