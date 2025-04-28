import { Pedido } from "./Pedido";
import { Producto } from "./producto";

export interface DetallePedido {
    id: number;
    pedido: Pedido;
    producto: Producto;
    cantidad: number;
    precio: number;
    
}