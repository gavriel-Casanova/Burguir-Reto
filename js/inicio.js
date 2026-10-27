import {Usuario} from "./clases/usuario.js";


var usuario = new Usuario();/*PRUEBA*/

usuario.setPersonaje("/media/img/personajes/personaje4.png");   
usuario.setUsuario("Usuario de prueba");
inicializarPantallaInicio();

/* Mostrar atributos del obj en su correspondiente elemento y  añadir enlaces*/
function inicializarPantallaInicio(){
    mostrarBotonCerrarSesion();

    document.getElementById("ranking").addEventListener("click", function() {
        window.location.href = "ranking.html"; /*la ventana actual cambio en enlace por ...*/
    });

    document.getElementById("cerrar_sesion").addEventListener("click", function() {
        window.location.href = "index.html";
    });

    document.getElementById("iniciar").addEventListener("click", function() {
        window.location.href = "juego.html";
    });

    document.getElementById("usuario").addEventListener("click", function() {
        window.location.href = "perfil.html";
    });

    document.getElementById("usuario").textContent = usuario.getUsuario();

    document.getElementById("avatar").src = usuario.getPersonaje();

}

function mostrarBotonCerrarSesion() {

    var cajaPersonaje = document.getElementById("imagen_personaje");
    var botonCerrarSesion = document.getElementById("cerrar_sesion");

    cajaPersonaje.addEventListener("mouseenter", function() {
        botonCerrarSesion.style.display = "block";
    });

    cajaPersonaje.addEventListener("mouseleave", function() {
        botonCerrarSesion.style.display = "none";
    });
}