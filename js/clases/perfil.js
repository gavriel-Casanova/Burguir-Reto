import {Usuario} from "./clases/usuario.js";
document.addEventListener('DOMContentLoaded',function(){
    
    const btnAtras = document.getElementById('atras');
    const btnRegistrarse = document.getElementById('registrarse');
    const btnNvUsuario = document.getElementById('usuario');

    const formulario = document.getElementById('formulario');
    const inputNombre = document.getElementById('nomb');
    const inputUsuario = document.getElementById('user');
    const inputContraseña = document.getElementById('passwd');
    const inputConfContraseña = document.getElementById('confpasswd');
    const inputCorreo = document.getElementById('correo');
    const inputFecha = document.getElementById('fecha');


    if(formulario){
        formulario.addEventListener('submit',function(event){

            let formularioValido = true;
            let mensajeError = "";

            //Validacion nombre
            const valorNombre = inputNombre.value.trim();
            const esNombreValido = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(valorNombre);

            if(valorNombre===""){
                formularioValido = false;
                mensajeError += "El campo nombre no puede estar vacio.\n";
            }

            if(valorNombre!==""){
                if(valorNombre.length > 20){
                    formularioValido = false;
                    mensajeError += "El nombre no puede superar los 20 caracteres.\n";
                }
                if(!esNombreValido){
                    formularioValido = false;
                    mensajeError += "El nombre no puede contener numeros ni simbolos.\n";
                }
            }
            
            //Validacion usuario
            const valorUsuario = inputUsuario.value.trim();
            const esUsuarioValido = /^[a-z0-9]+$/.test(valorUsuario);
            const contieneLetras = /[a-z]/.test(valorUsuario);

            if(valorUsuario===""){
                formularioValido = false;
                mensajeError += "El campo usuario no puede estar vacio.\n";
            }

            if(valorUsuario!==""){
                if(valorUsuario.length > 10){
                    formularioValido = false;
                    mensajeError += "El usuario no puede superar los 10 caracteres.\n";
                }
                if(valorUsuario.length < 4){
                    formularioValido = false;
                    mensajeError += "El usuario debe de tener un minimo de 4 caracteres.\n";
                }
                if(!esUsuarioValido){
                    formularioValido = false;
                    mensajeError += "El usuario no puede contener mayusculas ni simbolos.\n";
                }
                if(!contieneLetras){
                    formularioValido = false;
                    mensajeError += "El usuario debe de contener letras.\n";
                }
            }

            //FALTA COMPROBAR QUE EL USUARIO NO EXISTA

            //Validacion contraseña
            const valorContraseña = inputContraseña.value.trim();
            const confContraseña = inputConfContraseña.value.trim();
            const tieneMayuscula = /[A-Z]/.test(valorContraseña);
            const tieneMinuscula = /[a-z]/.test(valorContraseña);
            const tieneNumero = /[0-9]/.test(valorContraseña);
            const tieneSimbolo = /[^a-zA-Z0-9]/.test(valorContraseña);

            if(valorContraseña === ""){
                formularioValido = false;
                mensajeError += "El campo contraseña no puede estar vacio.\n";
            }

            if(valorContraseña !== ""){
                if(!tieneMayuscula){
                    formularioValido = false;
                    mensajeError += "La contraseña debe contener mayusculas.\n";
                }
                if(!tieneMinuscula){
                    formularioValido = false;
                    mensajeError += "La contraseña debe contener minusculas.\n";
                }
                if(!tieneNumero){
                    formularioValido = false;
                    mensajeError += "La contraseña debe contener numeros.\n";
                }
                if(!tieneSimbolo){
                    formularioValido = false;
                    mensajeError += "La contraseña debe contener simbolos especiales.\n";
                }
                if(valorContraseña.length < 8){
                    formularioValido = false;
                    mensajeError += "La contraseña debe de tener un minimo de 8 caracteres.\n";
                }
                if(valorContraseña.length > 20){
                    formularioValido = false;
                    mensajeError += "La contraseña no puede superar los 20 caracteres.\n";
                }
                if(confContraseña != valorContraseña){
                    formularioValido = false;
                    mensajeError += "Las contraseñas deben de coincidir.\n";
                }
            }
            
            //Validacion fecha
            if(inputFecha.value === ""){
                formularioValido = false;
                mensajeError += "El campo fecha no puede estar vacio.\n";
            }

            //Validacion correo
            const valorCorreo = inputCorreo.value.trim();
            const correoValido = /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(valorCorreo);
            
            if(valorCorreo === ""){
                formularioValido = false;
                mensajeError += "El campo correo no puede estar vacio.\n";
            }

            if(valorCorreo !== ""){
                if(!correoValido){
                    formularioValido = false;
                    mensajeError += "El correo no es valido.\n";
                }
            }


            if(formularioValido){
                const nuevoUsuario = new Usuario(valorNombre, valorUsuario, valorContraseña, inputFecha.value, valorCorreo);

            }else{
                event.preventDefault();
                alert("Por favor corrige los siguientes errores:\n" + mensajeError);
            }
        });
    }

    if(btnAtras){
        btnAtras.addEventListener('click', function(){
            window.history.back; /*Te manda a la ventana anterior */
        });
    }

});
