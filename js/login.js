import { Usuario } from "./clases/Usuario.js";
const formulario = document.getElementById("formulario");

// elementos de prueba
var ini = localStorage.getItem("usuarios");
if (!ini) {
  let test2 = new Usuario(
    "andrea",
    "andree",
    "test2",
    "10-10-2000",
    "andrea@gmail.com",
    "../media/img/personajes/personaje2.png",
  );
  let test = new Usuario(
    "paco",
    "paquito",
    "test",
    "10-10-2000",
    "paco@gmail.com",
    "../media/img/personajes/personaje1.png",
  );
  let arrTest = new Array();
  arrTest.push(test);
  arrTest.push(test2);
  localStorage.setItem("usuarios", JSON.stringify(arrTest));
}


// fin elementos de prueba

formulario.addEventListener("submit", function (event) {
  event.preventDefault();
  var usuarios = localStorage.getItem("usuarios");
  usuarios = JSON.parse(usuarios).map((item) =>
    Object.assign(new Usuario(), item),
  );
  let txtUsuario = document.getElementById("txtUsuario").value;
  let pass = document.getElementById("pswContraseña").value;
  var usuarioEncontrado = usuarios.find(
    (usuario) => usuario.usuario === txtUsuario,
  );
  if (usuarioEncontrado.contraseña === pass) {
    sessionStorage.setItem("usuario", JSON.stringify(usuarioEncontrado));
    window.location.href = "../html/inicio.html";
  } else {
    console.log("uss o pass incorrecto");
  }
});
