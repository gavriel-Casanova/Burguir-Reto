import { usuario } from './clases/usuario.js'
const formulario = document.getElementById("formulario");
let test = new usuario();
test.setUsuario("test");
test.setContraseña("test");
let arrTest = new Array();
aarTest.push(test);
sessionStorage.setItem('usuario', arrTest);

formulario.addEventListener("submit", function(event) {
    event.preventDefault(); 
    var usuarios = localStorage.getItem('usuarios');
    
    let txtUsuario = document.getElementById("txtUsuario").value;
    let pass = document.getElementById("pswContraseña").value;

    var usuarioEncontrado = usuarios.find(Usuario => usuario.user === txtUsuario);
    if((usuarioEncontrado.getUsuario == txtUsuario) && (usuarioEncontrado.getContraseña === pass)){
        sessionStorage.setItem('usuario', usuarioEncontrado);
    } else {
        console.log("Error");
    }
});