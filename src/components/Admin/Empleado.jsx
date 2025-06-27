import React from 'react';
import { useState, useEffect } from "react";
import stompClient from "../../config/websocket";

import { FaUserPlus } from "react-icons/fa6";

function Empleado() {

    const [empleados, setEmpleados] = useState([]);
    const [loanding, setLoanding] = useState(true);

    useEffect(() => {
        fetch("http://localhost:8080/api/empleado")
            .then(res => res.json())
            .then(data => {
                setEmpleados(data);
                setLoanding(false);
            });
        
        if (!stompClient.active){
            stompClient.activate();
        }

        stompClient.onConnect = () => {
            console.log("Conectado al websocket");
            stompClient.subscribe("/topic/empleados", message => {
                const empleadoActualizado = JSON.parse(message.body);
                setEmpleados(prevEmpleados =>
                    prevEmpleados.map(emp =>
                        emp.id === empleadoActualizado.id ? empleadoActualizado : emp
                    )
                );
            });
        };
        return () => {
            stompClient.deactivate();
        };
    }, []);
    
    return (
        <div className="p-6">
            <section className="flex justify-between mb-8">
                <div>
                    <h2 className="mb-1 text-4xl font-semibold text-white font-apple">EMPLEADOS</h2>
                    <p className="text-sm text-gray-100">Información de los Empleados</p>
                </div>
                <div>
                    <button className='relative backdrop-blur-xl text-white font-semibold p-4 gap-2 rounded-2xl flex items-center bg-white/20 justify-center transition-all duration-700 hover:bg-opacity-0 hover:shadow-[inset_10px_10px_10px_rgba(0,0,0,0.05),15px_25px_10px_rgba(0,0,0,0.05),15px_20px_20px_rgba(0,0,0,0.05),inset_0px_-4px_5px_rgba(255,255,255,0.9)]'>
                        <FaUserPlus />
                        Añadir
                    </button>
                </div>
            </section>
            
            {/* SECCI´´ÓN DE EMPLEADOS*/}
            <div className="w-full">
                <table className="min-w-full text-white border border-white">
                    <thead className="bg-gray-800">
                        <tr>
                            <th className="px-4 py-2 border border-white">Nombre</th>
                            <th className="px-4 py-2 border border-white">Correo</th>
                            <th className="px-4 py-2 border border-white">Cargo</th>
                            <th className="px-4 py-2 border border-white">Contraseña</th>
                            <th className="px-4 py-2 border border-white">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {empleados.map((emp) => (
                            <tr key={emp.id} className="hover:bg-gray-700">
                                <td className="px-4 py-2 border border-white">{emp.nombre}</td>
                                <td className="px-4 py-2 border border-white">{emp.email}</td>
                                <td className="px-4 py-2 border border-white">{emp.rol}</td>
                                <td className="px-4 py-2 border border-white">••••••</td>
                                <td className="flex justify-center gap-2 px-4 py-2 border border-white">
                                    <button
                                        onClick={() => setEmpleadoEditando(emp)}
                                        className="px-3 py-1 text-sm bg-blue-600 rounded hover:bg-blue-700"
                                    >
                                        Editar
                                    </button>
                                    <button className="px-3 py-1 text-sm bg-red-600 rounded hover:bg-red-700">
                                        Borrar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Empleado;