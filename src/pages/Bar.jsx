import React, { useState, useEffect } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { BiSolidDrink } from "react-icons/bi";
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

/* ---------- componente ---------- */
const Bar = () => {
    const [pedidos, setPedidos] = useState([]);
    const [tick, setTick] = useState(0);
    const [loading, setLoading] = useState(true);

    /* ⏰ intervalo que actualiza cada segundo */
    useEffect(() => {
        const id = setInterval(() => setTick((t) => t + 1), 1000);
        return () => clearInterval(id);
    }, []);

    /* 1️⃣ Carga inicial via REST */
    useEffect(() => {
        fetch("http://localhost:8080/api/detallepedido/estado/Pendiente")
            .then((res) => res.json())
            .then((data) => {
                const bar = data.filter((d) => d.tipo === "Bartender");
                bar.forEach((p) => guardarHoraSiNoExiste(p.id));
                setPedidos(bar);
                setLoading(false);
            })
            .catch(console.error);
    }, []);

    /* 2️⃣ Conexión WebSocket */
    useEffect(() => {
        const client = new Client({
            webSocketFactory: () => new SockJS("http://localhost:8080/ws"),
            onConnect: () => {
                console.log("✅ WS conectado");
                client.subscribe("/topic/bar", (msg) => {
                    const detalle = JSON.parse(msg.body);
                    console.log("📦 WS recibido", detalle);

                    // solo Bartender, evitar duplicados
                    if (detalle.tipo === "Bartender") {
                        guardarHoraSiNoExiste(detalle.id);
                        setPedidos((prev) =>
                            prev.some((p) => p.id === detalle.id) ? prev : [...prev, detalle]
                        );
                    }
                });
            },
        });
        client.activate();
        return () => client.deactivate();
    }, []);

    /* calcula minutos:segundos desde inicio */
    const tiempoTranscurrido = (id) => {
        const diff = Date.now() - obtenerMilisInicio(id);      // milisegundos
        const min = Math.floor(diff / 60000);
        const seg = Math.floor((diff % 60000) / 1000)
            .toString()
            .padStart(2, "0");
        return `${min}:${seg}`;
    };

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
        <section className="bg-[#1f1f1f] h-[calc(100vh-5rem)] overflow-hidden flex flex-col gap-2">
            {/* Cabecera */}
            <div className="flex items-center h-16 gap-4 px-20 py-5 text-white shadow-md">
                <BiSolidDrink className="w-7 h-7" />
                <h2 className="text-3xl">Bar</h2>
            </div>

            {/* Tarjetas */}
            <div className="flex flex-wrap justify-around p-2 overflow-auto">
                {pedidos.map((pedido) => (
                    <div key={pedido.id} className="bg-[#1a1a1a] text-[#eaeaea] w-[450px] p-4 m-2 rounded-md">
                        <div className="flex justify-between">
                            {/* Info producto */}
                            <div className="flex gap-4 mb-4">
                                <img src={pedido.img} alt="" width="100" height="100" className="rounded-md" />
                                <div>
                                    <h3 className="text-xl">{pedido.nombre}</h3>
                                    <p>ID: #{pedido.id}</p>
                                    <p className="text-[#ababab]">Drinks: x{pedido.cantidad}</p>
                                    <p>Estado: {pedido.estado}</p>
                                </div>
                            </div>

                            {/* Contador */}
                            <div>
                                <div className={`flex items-center gap-2 ${obtenerColorTextoPorTiempo(pedido.id)}`}>
                                    <FaCircle className={`${obtenerColorTextoPorTiempo(pedido.id)}`}/>
                                    <p>Tiempo</p>
                                </div>
                                <div className={`flex justify-center gap-6 py-5 mt-3 rounded-xl ${obtenerColorPorTiempo(pedido.id)}`}>
                                    <p className="text-3xl font-bold">{tiempoTranscurrido(pedido.id)}</p>
                                </div>
                            </div>
                        </div>

                        <hr className="h-1 my-3" />
                        <button
                        onClick={() => marcarComoListo(pedido.id)}
                        className={`flex items-center justify-center w-full ${obtenerColorPorTiempo(pedido.id)} hover:${obtenerColorPorTiempo(pedido.id)} transition-all duration-1000 gap-1 p-2 font-bold text-white rounded-xl `}>
                            <IoCheckmarkDoneSharp /> Ready?
                        </button>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Bar;
