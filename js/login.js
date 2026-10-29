import { Usuario }  from './clases/Usuario.js'
const formulario = document.getElementById("formulario");

// elementos de prueba 
let test = new Usuario("test","test","test","test","","");
let test2 = new Usuario("test2","test2","test2","test2","","");
let arrTest = new Array();
arrTest.push(test);
arrTest.push(test2);
localStorage.setItem('usuarios',JSON.stringify(arrTest));
console.log(arrTest);
// fin elementos de prueba

formulario.addEventListener("submit", function(event) {
    event.preventDefault(); 
    var usuarios = localStorage.getItem('usuarios');
    usuarios = JSON.parse(usuarios).map(item => Object.assign(new Usuario(), item));
    let txtUsuario = document.getElementById("txtUsuario").value;
    let pass = document.getElementById("pswContraseña").value;
    var usuarioEncontrado = usuarios.find(usuario => usuario.usuario === txtUsuario);
    if((usuarioEncontrado.contraseña === pass)){
        sessionStorage.setItem('usuario', usuarioEncontrado);
        window.location.href = "../html/inicio.html";
    } else {
        console.log("uss o pass incorrecto");
    }
});