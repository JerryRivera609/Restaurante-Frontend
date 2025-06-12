import React, { useState, useEffect } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { PiThermometerColdFill } from "react-icons/pi";
import { FaCircle } from "react-icons/fa";
import { IoCheckmarkDoneSharp } from "react-icons/io5";

/* ---------- helpers para localStorage ---------- */
const claveHora = (id) => `pedido_${id}`;
const guardarHoraSiNoExiste = (id) => {
    if (!localStorage.getItem(claveHora(id))) {
        localStorage.setItem(claveHora(id), Date.now().toString());
    }
};
const obtenerMilisInicio = (id) => Number(localStorage.getItem(claveHora(id)) || Date.now());


const Cold = () => {
    const [pedidos, setPedidos] = useState([]);
    const [tick, setTick] = useState(0);  
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const id = setInterval(() => setTick((t) => t + 1), 1000);
        return () => clearInterval(id);
    }, []);

    useEffect(() => {
        fetch("http://localhost:8080/api/detallepedido/estado/Pendiente")
            .then((res) => res.json())
            .then((data) => {
                const frios = data.filter((d) => d.tipo === "Frios");
                frios.forEach((p) => guardarHoraSiNoExiste(p.id));
                setPedidos(frios);
                setLoading(false);
            })
            .catch(console.error);
    }, []);


    useEffect(() => {
        const client = new Client({
            webSocketFactory: () => new SockJS("http://localhost:8080/ws"),
            onConnect: () => {
                console.log("✅ Conectado a WebSocket");
    
                client.subscribe("/topic/hot", (msg) => {
                    const detalle = JSON.parse(msg.body);
                    console.log("📦 Mensaje recibido por WS", detalle);
    
                    // Actualiza el estado agregando sólo si no existe el id
                    setPedidos(prev =>
                        prev.some(p => p.id === detalle.id) ? prev : [...prev, detalle]
                    );
                });
            },
        });
    
        client.activate();
        return () => client.deactivate();
    }, []);


    const marcarComoListo = async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/api/detallepedido/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ estado: "Listo" }),
            });

            if (response.ok) {
                setPedidos((prevPedidos) =>
                    prevPedidos.filter((pedido) => pedido.id !== id),
                    alert("Pedido marcado como listo")   
                );
            } else {
                console.error("Error al cambiar el estado");
            }
        } catch (err) {
            console.error("Error de red", err);
        }
    };

    const tiempoTranscurrido = (id) => {
        const diff = Date.now() - obtenerMilisInicio(id);
        const min = Math.floor(diff / 60000);
        const seg = Math.floor((diff % 60000) / 1000)
            .toString()
            .padStart(2, "0");
        return `${min}:${seg}`;
    };

    const obtenerColorPorTiempo = (id) => {
        const diff = Date.now() - obtenerMilisInicio(id);
        const minutos = Math.floor(diff / 60000);
    
        if (minutos < 1) return "bg-green-500";       // 0-1 min
        if (minutos < 5) return "bg-yellow-400";      // 1-4 min
        if (minutos < 10) return "bg-orange-500";     // 5-9 min
        return "bg-red-600";                          // 10+ min
    };
    
    const obtenerColorTextoPorTiempo = (id) => {
        const diff = Date.now() - obtenerMilisInicio(id);
        const minutos = Math.floor(diff / 60000);

        if (minutos < 1) return "text-green-500";       // 0-1 min
        if (minutos < 5) return "text-yellow-400";      // 1-4 min
        if (minutos < 10) return "text-orange-500";     // 5-9 min
        return "text-red-600";                          // 10+ min
    };

    if (loading) return <div className="text-gray-500">Cargando...</div>;
    
    return (
        <section className="bg-[#1f1f1f] h-[calc(100vh-5rem)] overflow-hidden flex gap-2 flex-col">
            <div className="flex items-center justify-between w-full h-16 px-20 py-5 shadow-md">
                <div className="flex items-center gap-4 text-white">
                    <PiThermometerColdFill className="h-7 w-7" />
                    <h2 className="text-3xl">Cold</h2>
                </div>
                <div className="flex text-white gap-7">
                    <button className="hover:bg-[#383838] text-[#ababab] text-md p-2 rounded-[10px] transition-all duration-700 ">In Progress</button>
                    <button className="hover:bg-[#383838] text-[#ababab] text-md p-2 rounded-[10px] transition-all duration-700">Completed</button>

                </div>
            </div>
            
            <div className="flex justify-around w-full p-2 overflow-auto">
                {pedidos.map((pedido) => (
                    <div
                        key={pedido.id}
                        className="bg-[#1a1a1a] text-[#eaeaea] w-[450px] p-4 m-2 rounded-md"
                    >
                        <div className="flex justify-between">
                            <div className="flex gap-4 mb-4">
                                <img
                                    src={pedido.img}
                                    alt=""
                                    width="100"
                                    height="100"
                                    className="rounded-md"
                                />
                                <div>
                                    <h3 className="text-xl">{pedido.nombre}</h3>
                                    <p>ID: #{pedido.id}</p>
                                    <p className="text-md text-[#ababab]">
                                        N° de platos: x{pedido.cantidad}
                                    </p>
                                    <p>Estado: {pedido.estado}</p>
                                </div>
                            </div>

                            <div>
                                <div className={`flex items-center gap-2 ${obtenerColorTextoPorTiempo(pedido.id)}`}>
                                    <FaCircle className={`${obtenerColorTextoPorTiempo(pedido.id)}`} />
                                    <p>Minutes:</p>
                                </div>
                                <div className={`flex justify-center gap-6 py-5 mt-3 rounded-xl ${obtenerColorPorTiempo(pedido.id)}`}>
                                    <p className="text-3xl font-bold">{tiempoTranscurrido(pedido.id)}</p>
                                </div>
                            </div>
                        </div>

                        <hr className="h-1 my-3" />

                        <button
                        onClick={() => marcarComoListo(pedido.id)}
                        className={`flex items-center justify-center w-full gap-1 p-2 font-bold text-white rounded-xl ${obtenerColorPorTiempo(pedido.id)}`}>
                            <IoCheckmarkDoneSharp /> Ready?
                        </button>
                    </div>
                ))}

            </div>
        </section>
    );
}

export default Cold;