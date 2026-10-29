import { Usuario }  from './clases/Usuario.js';
import { RankingJugador } from './clases/rankingJugador.js';

let test = new Usuario("test","test","test","test","","");
let userRank = new RankingJugador(test, 20, "10-10-2026");
let arrRanking = new Array();
arrRanking.push(userRank);
localStorage.setItem('ranking',JSON.stringify(arrRanking));
console.log(arrRanking);

const tabla = document.getElementById("tablaPosicion");
window.addEventListener('load', (event) =>{
    var ranking = localStorage.getItem('ranking');
    ranking = JSON.parse(ranking).map(item => Object.assign(new RankingJugador(), item));
    console.log(ranking);
    ranking.forEach((player, index)=>{
        let user = player.getUsuario();
        let filaNueva = document.createElement("tr");
        filaNueva.setAttribute("class", "fila");
        let celdaUsuario = document.createElement("td");
        celdaUsuario.textContent = user.usuario;
        let celdaPuntos = document.createElement("td");
        celdaPuntos.textContent = player.puntos;
        let celdaFecha = document.createElement("td");
        celdaFecha.textContent = player.fecha;


        filaNueva.appendChild(celdaUsuario);
        filaNueva.appendChild(celdaPuntos);
        filaNueva.appendChild(celdaFecha);
        tabla.appendChild(filaNueva);

    });
});