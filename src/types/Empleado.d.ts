export interface Producto{
    id: number;
    nombre: string;
    descripcion: string;
    img: string;
    precio: number;
    tipo: 'cocina' | 'frios' | 'bar';
}