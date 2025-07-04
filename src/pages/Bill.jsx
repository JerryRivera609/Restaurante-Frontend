import React, { useEffect, useState } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

/*ICONONOS*/
import { AiOutlineContainer } from "react-icons/ai";
import { MdOutlineRestaurantMenu } from "react-icons/md";
import { FaCircle } from "react-icons/fa";
import { PiCurrencyCircleDollarDuotone } from "react-icons/pi";
import { FaRegCreditCard } from "react-icons/fa";

const Bill = () => {
    const [facturas, setFacturas] = useState([]);
    const [estadoFiltro, setEstadoFiltro] = useState("PENDIENTE");

    useEffect(() => {
        fetch("http://localhost:8080/api/factura/detalleFactura")
            .then(res => res.json())
            .then(data => {
                const pendientes = data.filter(f => f.estado === estadoFiltro);
                setFacturas(pendientes);
            })
            .catch(err => console.error("Error:", err));
    }, [estadoFiltro]);

    /* Conexión WebSocket */
    useEffect(() => {
        const client = new Client({
            webSocketFactory: () => new SockJS("http://localhost:8080/ws"),
            onConnect: () => {
                console.log("✅ WS conectado");
                client.subscribe("/topic/bar", (msg) => {
                    const factura = JSON.parse(msg.body);
                    console.log("📦 WS recibido", factura);
                });
            },
        });
        client.activate();
        return () => client.deactivate();
    }, []);

    const ActualizarFactura = async (idFactura, medio) => {
        try{
            await fetch(`http://localhost:8080/api/factura/${idFactura}`, {
                method: "PUT",
                headers:{
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ 
                    estado: "PAGADO", 
                    medioDePago: medio
                })
        });
        const res = await fetch("http://localhost:8080/api/factura/detalleFactura");
        const data = await res.json();
        setFacturas(data.filter (f => f.estado === "PENDIENTE"));
    } catch (error) {
        console.error("Error al actualizar la factura:", error);
    }
};

    return (
        <section className="bg-[#1f1f1f]  h-[calc(100vh-9rem)] overflow-y-auto flex flex-col gap-4 p-6">
            <header className="flex items-center justify-between w-full px-4 text-white">
                <div className="flex items-center gap-3">
                    <AiOutlineContainer className="w-8 h-8" />
                    <h2 className="text-3xl font-bold">Boletas Pendientes</h2>
                </div>
            </header>

            {facturas.length === 0 ? (
                <p className="mt-10 text-center text-white">No hay boletas pendientes 💤</p>
            ) : (
                <div className="flex flex-wrap justify-center gap-6">
                    {facturas.map((factura) => (
                        <div key={factura.id} className="bg-white text-black rounded-md p-5 w-[400px] shadow-lg">
                            <div className="flex items-center justify-center gap-2 mb-4 text-2xl font-bold">
                                <MdOutlineRestaurantMenu className="text-black" />
                                <h2>Brutal</h2>
                            </div>

                            <div className="flex justify-between mb-4 text-sm">
                                <div>
                                    <p><strong>Factura ID:</strong> #{factura.id}</p>
                                    <p><strong>Mesa:</strong> {factura.pedidoInfo?.numeroMesa ?? "No asignada"}</p>
                                    <p><strong>Fecha:</strong> {new Date(factura.fecha).toLocaleString()}</p>
                                </div>
                                <div className="text-end">
                                    <p><strong>Estado:</strong></p>
                                    <div className="flex items-center gap-1 px-2 py-1 text-xs font-semibold text-white bg-yellow-500 rounded-md">
                                        <FaCircle className="w-2 h-2" />
                                        <span>{factura.estado}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-3 py-1 mb-2 text-sm font-semibold text-center bg-gray-200">
                                <div>Producto</div>
                                <div>Cant.</div>
                                <div>Precio</div>
                            </div>

                            {factura.pedidoInfo.detalles.map((d, i) => (
                                <div key={i} className="grid grid-cols-3 mb-1 text-sm text-center">
                                    <div>{d.nombreCompleto}</div>
                                    <div>{d.cantidad}</div>
                                    <div>S/. {d.precio.toFixed(2)}</div>
                                </div>
                            ))}

                            <hr className="my-3 border-gray-400" />

                            <div className="flex justify-between text-lg font-bold">
                                <span>Total:</span>
                                <span>S/. {factura.precioTotal.toFixed(2)}</span>
                            </div>

                            <div className="flex justify-around mt-4 text-white">
                                <button
                                onClick={() => ActualizarFactura(factura.id, "BILLETERA")}
                                className="px-3 py-1 bg-purple-600 rounded-md">
                                    Yape
                                </button>
                                <button
                                onClick={() => ActualizarFactura(factura.id, "EFECTIVO")}
                                className="flex items-center gap-1 px-3 py-1 bg-orange-500 rounded-md">
                                    <PiCurrencyCircleDollarDuotone className="w-5 h-5" /> Efectivo
                                </button>
                                <button
                                onClick={() => ActualizarFactura(factura.id, "TARJETA")}
                                className="flex items-center gap-1 px-3 py-1 bg-blue-600 rounded-md">
                                    <FaRegCreditCard className="w-5 h-5" /> Tarjeta
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
};

export default Bill;
