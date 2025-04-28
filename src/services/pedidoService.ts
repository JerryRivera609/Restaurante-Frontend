import axios from 'axios';
import { url } from "../Constants/Constants";
import { Pedido } from "../types/Pedido";


const URL_API = `${url}/pedido`;

export const crearPedido = async (pedido: Pedido) => {
    return axios.post<Pedido>(URL_API, pedido)
};

export const obtenerPedidos = async () => {
    return axios.get<Pedido[]>(URL_API);
};