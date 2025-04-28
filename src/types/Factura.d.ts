import { Pedido } from "./Pedido";

export interface Factura {
    id: number;
    pedido: Pedido;
    total: number;
    fecha: string;
}