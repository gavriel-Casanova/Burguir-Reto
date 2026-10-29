export class Usuario{
    
   constructor(nombre, usuario, contraseña, fecNacimiento, correo, avatar){
        this.nombre =nombre;
        this.usuario = usuario;
        this.contraseña = contraseña;
        this.fechaNacimiento =fecNacimiento;
        this.correo = correo;
        this.personaje= avatar;
    }
	
	getNombre(){
		return this.nombre;
	}

	setNombre(nombre){
		this.nombre = nombre;
	}

	getUsuario(){
		return this.usuario;
	}

	setUsuario(usuario){
		this.usuario = usuario;
	}

	getContraseña(){
		return this.contraseña;
	}

	setContraseña(contraseña){
		this.contraseña = contraseña;
	}

	getFechaNacimiento(){
		return this.fechaNacimiento;
	}

	setFechaNacimiento(fechaNacimiento){
		this.fechaNacimiento = fechaNacimiento;
	}

	getCorreo(){
		return this.correo;
	}

	setCorreo(correo){
		this.correo = correo;
	}

	getPersonaje(){
		return this.personaje;
	}

	setPersonaje(personaje){
		this.personaje = personaje;
	}

    
}

