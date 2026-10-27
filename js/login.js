const formulario = document.getElementById("formularioLogin");

formulario.addEventListener('submit', () => {
    var usuarios = localStorage.getItem('usuarios');
    
    let txtUsuario = document.getElementById("txtUsuario").value;
    let pass = document.getElementById("pswContraseña").value;

    var UsuarioEncontrado = usuarios.find(Usuario => usuario.user === txtUsuario);
    if((UsuarioEncontrado.user == txtUsuario) && ()){

    }
});