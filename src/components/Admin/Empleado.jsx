import React from 'react';
import { useState, useEffect } from "react";
import stompClient from "../../config/websocket";

import { FaUserPlus } from "react-icons/fa6";

function Empleado() {

    const [empleados, setEmpleados] = useState([]);
    const [loanding, setLoanding] = useState(true);
    const [empleadoEditando, setEmpleadoEditando] = useState(null);

    useEffect(() => {
        fetch("http://localhost:8080/api/empleado")
            .then(res => res.json())
            .then(data => {
                setEmpleados(data);
                setLoanding(false);
            });

        if (!stompClient.active) {
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

    const handleActualizarEmpleado = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:8080/api/empleado/actualizar", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(empleadoEditando)
            });

            if (!response.ok) throw new Error("Error al actualizar");

            const actualizado = await response.json();

            // Opcional: actualizar localmente (aunque ya lo haces con websocket)
            setEmpleados(prev =>
                prev.map(emp => emp.id === actualizado.id ? actualizado : emp)
            );

            setEmpleadoEditando(null);
            alert("Empleado actualizado correctamente");
        } catch (error) {
            console.error(error);
            alert("Hubo un error al actualizar");
        }
    };


    return (
        <div className="p-6">
            <section className="flex justify-between mb-8">
                <div>
                    <h2 className="mb-1 text-4xl font-semibold text-white font-apple">EMPLEADOS</h2>
                    <p className="text-sm text-gray-100">Información de los Empleados</p>
                </div>
                <div>
                    
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
                {empleadoEditando && (
                    <div className="max-w-md p-4 mx-auto mt-8 text-black bg-white shadow rounded-xl">
                        <h3 className="mb-4 text-xl font-semibold">Editar Empleado</h3>
                        <form onSubmit={handleActualizarEmpleado}>
                            <div className="mb-4">
                                <label className="block mb-1">Nombre:</label>
                                <input
                                    type="text"
                                    value={empleadoEditando.nombre}
                                    onChange={(e) =>
                                        setEmpleadoEditando({ ...empleadoEditando, nombre: e.target.value })
                                    }
                                    className="w-full px-2 py-1 border rounded"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-1">Correo:</label>
                                <input
                                    type="email"
                                    value={empleadoEditando.email}
                                    onChange={(e) =>
                                        setEmpleadoEditando({ ...empleadoEditando, email: e.target.value })
                                    }
                                    className="w-full px-2 py-1 border rounded"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-1">Contraseña:</label>
                                <input
                                    type="password"
                                    value={empleadoEditando.contrasenia}
                                    onChange={(e) =>
                                        setEmpleadoEditando({ ...empleadoEditando, contrasenia: e.target.value })
                                    }
                                    className="w-full px-2 py-1 border rounded"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-1">Rol:</label>
                                <select
                                    value={empleadoEditando.rol}
                                    onChange={(e) =>
                                        setEmpleadoEditando({ ...empleadoEditando, rol: e.target.value })
                                    }
                                    className="w-full px-2 py-1 border rounded"
                                >
                                    <option value="ADMIN">ADMIN</option>
                                    <option value="CAJERO">CAJERO</option>
                                    <option value="MESERO">MESERO</option>
                                </select>
                            </div>
                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => setEmpleadoEditando(null)}
                                    className="px-4 py-2 text-white bg-gray-400 rounded"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700"
                                >
                                    Actualizar
                                </button>
                            </div>
                        </form>
                    </div>
                )}

            </div>
        </div>
    );
}

export default Empleado;