export class Cliente {
    constructor(
        public idCliente: number,
        public apellido: string,
        public direccion: string,
        public email: string,
        public fechaNacimiento: Date,
        public nombre: string,
        public telefono: string,
    ) { }
}