import { Empleado } from "./Empleado";
import { Mesas } from "./Mesas";

export interface Pedido{
    id: number;
    empleado: Empleado;
    mesa: Mesas;
    fechaHora: string;
    estado: string;
}