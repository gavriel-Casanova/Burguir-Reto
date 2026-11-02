export class Plato{
    
   constructor(){
        this.cantidad = 0;
        this.comida = "";
    }
	
	getCantidad(){
		return this.cantidad;
	}

	setCantidad(cantidad){
		this.cantidad = cantidad;
	}

	getComida(){
		return this.comida;
	}

	setComida(comida){
		this.comida = comida;
	}

	restarCantidad(){
		this.cantidad--;

	}

}