document.addEventListener('DOMContentLoaded',function(){

    const btnPersonaje = document.getElementById('personaje');
    const popUp = document.getElementById('popup-personajes');
    const btnCancelar = document.getElementById('cancelar');
    const btnAceptar = document.getElementById('aceptar');

    if(btnPersonaje && popUp){
        btnPersonaje.addEventListener('click', function(){
            popUp.style.display='flex';
        });
    }

    if(btnCancelar && popUp){
        btnCancelar.addEventListener('click',function(){
            popUp.style.display='none';
        });
    }

    if(btnAceptar && popUp){
        btnAceptar.addEventListener('click',function(){
            popUp.style.display='none';
        });
    }

    //Eleccion de personaje
    let personajeSeleccionado = "";

    const inputPersonaje = document.getElementById('rutaPersonaje');

    for (let i = 1; i < 6; i++) {
        let img = document.getElementById(i);
        
        img.addEventListener('click', function(){
            personajeSeleccionado = this.getAttribute("src");
            inputPersonaje.setAttribute('value',personajeSeleccionado );
            console.log("Has seleccionado la imagen " + i + "Ruta: " + inputPersonaje.value);

        });
    }
});