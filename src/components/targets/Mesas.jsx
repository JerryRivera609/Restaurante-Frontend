import React, { useState, useEffect } from "react";
import { PiPicnicTableFill } from "react-icons/pi";
import { FaCircle } from "react-icons/fa";

import stompClient from "../../config/websocket";

const Mesas = ({ setMesaSeleccionada, mesaSeleccionada } ) => {
    const [mesas, setMesas] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        fetch("http://localhost:8080/api/mesas")
            .then(res => res.json())
            .then(data => {
                setMesas(data);
                setLoading(false);
            });

        if (!stompClient.active) {
            stompClient.activate();
        }

        stompClient.onConnect = () => {
            console.log("Conectado al websocket");
            stompClient.subscribe("/topic/mesas", message => {
                const mesaActualizada = JSON.parse(message.body);
                setMesas(prevMesas =>
                    prevMesas.map(m =>
                        m.id === mesaActualizada.id ? mesaActualizada : m
                    )
                );
            });
        };

        return () => {
            stompClient.deactivate();
        };
    }, []);

    if (loading) {
        return <div className="text-gray-500">Cargando...</div>;
    }

    return (
        <>
            {mesas.map(mesa => (
                <button key={mesa.id} 
                        onClick={() => {
                            if (mesa.estado === 'Ocupado') {
                                alert('Mesa ocupada');
                            } else {
                                setMesaSeleccionada(mesa);
                            }
                        }}
                        className={`text-white w-[250px] flex items-center justify-between gap-2 p-2 rounded-xl trnsition-all duration-500 ease-in-out
                            ${mesa.estado === 'Ocupado' ? 'bg-yellow-500' : 'bg-green-500'}
                            ${mesaSeleccionada?.id === mesa.id ? ' focus:bg-green-700/50'  : ''}
                        `}
                        >
                    <div className="flex gap-2">
                        <PiPicnicTableFill className="w-6 h-6" />
                        <p className="text-xl">Mesa {mesa.numero}</p>
                    </div>
                    <div className="flex items-center gap-2 bg-[#00000048] p-2 rounded-lg">
                        <FaCircle className="w-2 h-2" />
                        <p className="text-sm">{mesa.estado}</p>
                    </div>
                </button>
            ))}
        </>
    );
};

export default Mesas;
