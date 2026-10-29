import { Usuario }  from './clases/Usuario.js';
export class RankingJugador {
    constructor (usuario, puntos, fecha){
        this.usuario = usuario;
        this.puntos = puntos;
        this.fecha = fecha;
    }

    getUsuario() {
        return this.usuario;
    }

    getPuntos() {
        return this.puntos;
    }

    getFecha() {
        return this.fecha;
    }

    setUsuario(nuevoUsuario) {
        this.usuario = nuevoUsuario;
    }

    setPuntos(nuevosPuntos) {
        this.puntos = nuevosPuntos;
    }

    setFecha(nuevaFecha) {
        this.fecha = nuevaFecha;
    }
}