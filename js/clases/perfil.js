import { Usuario } from './usuario.js';

const btnAtras = document.getElementById('atras');
const btnRegistrarse = document.getElementById('registrarse');
const btnNvUsuario = document.getElementById('nuevoUsuario');
const btnActualizar = document.getElementById('actualizar');

const formulario = document.getElementById('formulario');
const inputNombre = document.getElementById('nomb');
const inputUsuario = document.getElementById('user');
const inputContraseña = document.getElementById('passwd');
const inputConfContraseña = document.getElementById('confpasswd');
const inputCorreo = document.getElementById('correo');
const inputFecha = document.getElementById('fecha');
const inputHidden = document.getElementById('rutaPersonaje');

// CONTROL DE ESTADO GLOBAL
let accionActual = 'registro'; // Puede ser registro, actualizar, nuevoUsuario
let usuarioOriginalParaEditar = null; // Para recordar el nombre original si se edita

document.addEventListener('DOMContentLoaded', function () {

    // DETECTAR DE DONDE VIENE
    const urlParams = new URLSearchParams(window.location.search);
    const modoEdicion = urlParams.get('modo') === 'edicion';

    if (modoEdicion) {
        accionActual = 'actualizar';
        btnNvUsuario.classList.remove('oculto');
        btnActualizar.classList.remove('oculto');

        // Recuperar el usuario guardado para rellenar los campos
        const usuarioGuardado = JSON.parse(localStorage.getItem('usuarioRegistrado'));
        if (usuarioGuardado) {
            inputNombre.value = usuarioGuardado.nombre || "";
            inputUsuario.value = usuarioGuardado.usuario || "";
            inputContraseña.value = usuarioGuardado.contraseña || "";
            inputConfContraseña.value = usuarioGuardado.contraseña || "";
            inputCorreo.value = usuarioGuardado.correo || "";
            inputFecha.value = usuarioGuardado.fecNacimiento || "";
            inputHidden.value = usuarioGuardado.avatar || "";

            // Guardamos el nombre de usuario original para saber cuál buscar en la lista al actualizar
            usuarioOriginalParaEditar = usuarioGuardado.usuario;
        }
    }
    
    if (btnAtras) {
        btnAtras.addEventListener('click', function () {
            window.history.back();
        });
    }
});

// FUNCION DE VALIDACION COMPARTIDA
function validarFormulario() {
    let formularioValido = true;
    let mensajeError = "";

    // Obtener lista de usuarios existentes para validaciones de duplicados
    const usuariosExistentes = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Validacion nombre
    const valorNombre = inputNombre.value.trim();
    const esNombreValido = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(valorNombre);

    if (valorNombre === "") {
        formularioValido = false;
        mensajeError += "El campo nombre no puede estar vacio.\n";
    } else {
        if (valorNombre.length > 20) {
            formularioValido = false;
            mensajeError += "El nombre no puede superar los 20 caracteres.\n";
        }
        if (!esNombreValido) {
            formularioValido = false;
            mensajeError += "El nombre no puede contener numeros ni simbolos.\n";
        }
    }

    // Validacion usuario
    const valorUsuario = inputUsuario.value.trim();
    const esUsuarioValido = /^[a-z0-9]+$/.test(valorUsuario);
    const contieneLetras = /[a-z]/.test(valorUsuario);

    if (valorUsuario === "") {
        formularioValido = false;
        mensajeError += "El campo usuario no puede estar vacio.\n";
    } else {
        if (valorUsuario.length > 10) {
            formularioValido = false;
            mensajeError += "El usuario no puede superar los 10 caracteres.\n";
        }
        if (valorUsuario.length < 4) {
            formularioValido = false;
            mensajeError += "El usuario debe de tener un minimo de 4 caracteres.\n";
        }
        if (!esUsuarioValido) {
            formularioValido = false;
            mensajeError += "El usuario no puede contener mayusculas ni simbolos.\n";
        }
        if (!contieneLetras) {
            formularioValido = false;
            mensajeError += "El usuario debe de contener letras.\n";
        }
        
        // COMPROBAR QUE EL USUARIO NO EXISTA (Solo si no es el suyo propio en modo edición)
        if (accionActual !== 'actualizar' || valorUsuario !== usuarioOriginalParaEditar) {
            const existeUsuario = usuariosExistentes.some(u => u.usuario === valorUsuario);
            if (existeUsuario) {
                formularioValido = false;
                mensajeError += "El nombre de usuario ya está registrado por otra persona.\n";
            }
        }
    }

    // Validacion contraseña
    const valorContraseña = inputContraseña.value.trim();
    const confContraseña = inputConfContraseña.value.trim();
    const tieneMayuscula = /[A-Z]/.test(valorContraseña);
    const tieneMinuscula = /[a-z]/.test(valorContraseña);
    const tieneNumero = /[0-9]/.test(valorContraseña);
    const tieneSimbolo = /[^a-zA-Z0-9]/.test(valorContraseña);

    if (valorContraseña === "") {
        formularioValido = false;
        mensajeError += "El campo contraseña no puede estar vacio.\n";
    } else {
        if (!tieneMayuscula) {
            formularioValido = false;
            mensajeError += "La contraseña debe contener mayusculas.\n";
        }
        if (!tieneMinuscula) {
            formularioValido = false;
            mensajeError += "La contraseña debe contener minusculas.\n";
        }
        if (!tieneNumero) {
            formularioValido = false;
            mensajeError += "La contraseña debe contener numeros.\n";
        }
        if (!tieneSimbolo) {
            formularioValido = false;
            mensajeError += "La contraseña debe contener simbolos especiales.\n";
        }
        if (valorContraseña.length < 8) {
            formularioValido = false;
            mensajeError += "La contraseña debe de tener un minimo de 8 caracteres.\n";
        }
        if (valorContraseña.length > 20) {
            formularioValido = false;
            mensajeError += "La contraseña no puede superar los 20 caracteres.\n";
        }
        if (confContraseña !== valorContraseña) {
            formularioValido = false;
            mensajeError += "Las contraseñas deben de coincidir.\n";
        }
    }

    // Validacion fecha
    if (inputFecha.value === "") {
        formularioValido = false;
        mensajeError += "El campo fecha no puede estar vacio.\n";
    }

    // Validacion correo
    const valorCorreo = inputCorreo.value.trim();
    const correoValido = /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(valorCorreo);

    if (valorCorreo === "") {
        formularioValido = false;
        mensajeError += "El campo correo no puede estar vacio.\n";
    } else {
        if (!correoValido) {
            formularioValido = false;
            mensajeError += "El correo no es valido.\n";
        }
    }

    // Ruta personaje seleccionado
    let rutaPersonajeVal = inputHidden.value;
    if (!rutaPersonajeVal) {
        formularioValido = false;
        mensajeError += "Por favor entra en personaje y elige uno antes de continuar.\n";
    }

    // Empaquetamos los valores recolectados para evitar problemas de alcance (scope)
    const datosRecopilados = {
        nombre: valorNombre,
        usuario: valorUsuario,
        contraseña: valorContraseña,
        correo: valorCorreo,
        fecha: inputFecha.value,
        avatar: rutaPersonajeVal
    };

    return { valido: formularioValido, error: mensajeError, datos: datosRecopilados };
}

// FUNCIÓN AUXILIAR PARA MAPEAR EL OBJETO CLASS USUARIO
function mapearUsuario(datos) {
    const u = new Usuario();
    u.setNombre(datos.nombre);
    u.setUsuario(datos.usuario);
    u.setContraseña(datos.contraseña);
    u.setFechaNacimiento(datos.fecha);
    u.setCorreo(datos.correo);
    u.setPersonaje(datos.avatar);
    return u;
}

// PROCESADOR CENTRAL DEL FORMULARIO
function procesarFormulario() {
    const resultado = validarFormulario();

    if (!resultado.valido) {
        alert("Por favor corrige los siguientes errores:\n" + resultado.error);
        return;
    }

    const nuevoUsuario = mapearUsuario(resultado.datos);
    let usuariosRegistrados = JSON.parse(localStorage.getItem('usuarios')) || [];

    if (accionActual === 'actualizar') {
        // 1. Cambiar usuario activo en sessionStorage
        sessionStorage.setItem('usuario', JSON.stringify(nuevoUsuario));

        // 2. Buscar en la lista general de localStorage y reemplazarlo
        const index = usuariosRegistrados.findIndex(u => u.usuario === usuarioOriginalParaEditar);
        if (index !== -1) {
            usuariosRegistrados[index] = nuevoUsuario;
        } else {
            usuariosRegistrados.push(nuevoUsuario);
        }
        
        localStorage.setItem('usuarios', JSON.stringify(usuariosRegistrados));
        localStorage.setItem('usuarioRegistrado', JSON.stringify(nuevoUsuario)); // Clave individual por compatibilidad

        alert("Usuario actualizado correctamente.");
        window.history.back();

    } else if (accionActual === 'nuevoUsuario') {
        // Sesión iniciada: crea un usuario secundario en la lista local sin desloguear al actual
        usuariosRegistrados.push(nuevoUsuario);
        localStorage.setItem('usuarios', JSON.stringify(usuariosRegistrados));
        
        alert("Nuevo usuario creado con éxito.");
        window.location.href = "login.html";

    } else if (accionActual === 'registro') {
        // Sin sesión iniciada: registro inicial básico de la app
        usuariosRegistrados.push(nuevoUsuario);
        localStorage.setItem('usuarios', JSON.stringify(usuariosRegistrados));
        localStorage.setItem('usuarioRegistrado', JSON.stringify(nuevoUsuario));

        alert("Registro completado con éxito.");
        window.location.href = "login.html";
    }
}

// LISTENERS DE LOS BOTONES Y ACCIONES
    if (btnActualizar) {
        btnActualizar.addEventListener('click', function () {
        accionActual = 'actualizar';
        procesarFormulario();
        });
    }
    if (btnNvUsuario) {
        btnNvUsuario.addEventListener('click', function () {
        formulario.reset();
        inputHidden.value = ""; // El reset nativo no limpia los inputs hidden
        btnNvUsuario.classList.add('oculto');
        btnActualizar.classList.add('oculto');
        // Limpiamos los parámetros URL para salir de modo edición
        window.history.replaceState({}, document.title, window.location.pathname);
        // Cambiamos el estado para que el siguiente clic sea la creación de un nuevo usuario
        accionActual = 'nuevoUsuario';
        });
    }
    if (formulario) {
        formulario.addEventListener('submit', function (event) {
        event.preventDefault();
        // Si se hace submit directo mediante Enter o el botón registrarse,
        // solo procesa si no estamos en medio de una edición de 'actualizar'
        if (accionActual !== 'actualizar') {
            procesarFormulario();
        }
        });
    }