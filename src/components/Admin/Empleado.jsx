import React, { useState, useEffect } from "react";
import stompClient from "../../config/websocket";
import { FaUserPlus } from "react-icons/fa6";

function Empleado() {
    const [empleados, setEmpleados] = useState([]);
    const [loanding, setLoanding] = useState(true);
    const [empleadoEditando, setEmpleadoEditando] = useState(null);
    const [nuevoEmpleado, setNuevoEmpleado] = useState(null);

    useEffect(() => {
        fetch("http://localhost:8080/api/empleado")
            .then(res => res.json())
            .then(data => {
                const activos = data.filter(emp => emp.activo);
                setEmpleados(activos);
                setLoanding(false);
            });

        if (!stompClient.active) stompClient.activate();

        stompClient.onConnect = () => {
            stompClient.subscribe("/topic/empleados", message => {
                const actualizado = JSON.parse(message.body);
                setEmpleados(prev =>
                    prev.map(emp => emp.id === actualizado.id ? actualizado : emp)
                        .filter(emp => emp.activo)
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
            const response = await fetch(`http://localhost:8080/api/empleado/${empleadoEditando.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(empleadoEditando)
            });
            if (!response.ok) throw new Error();
            const actualizado = await response.json();
            setEmpleados(prev => prev.map(emp => emp.id === actualizado.id ? actualizado : emp));
            setEmpleadoEditando(null);
            alert("Empleado actualizado");
        } catch {
            alert("Error al actualizar");
        }
    };

    const handleDesactivarEmpleado = async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/api/empleado/desactivar/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" }
            });
            if (!response.ok) throw new Error();
            alert("Empleado desactivado");
            setEmpleados(prev => prev.filter(emp => emp.id !== id));
        } catch {
            alert("Error al desactivar");
        }
    };

    const handleAgregarEmpleado = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:8080/api/empleado", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...nuevoEmpleado, activo: true })
            });
            if (!response.ok) throw new Error();
            const creado = await response.json();
            setEmpleados(prev => [...prev, creado]);
            setNuevoEmpleado(null);
            alert("Empleado agregado");
        } catch {
            alert("Error al agregar");
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
                    <button
                        onClick={() => setNuevoEmpleado({ nombre: "", email: "", contrasenia: "", rol: "MOZO" })}
                        className='relative backdrop-blur-xl text-white font-semibold p-4 gap-2 rounded-2xl flex items-center bg-white/20 justify-center transition-all duration-700 hover:bg-opacity-0 hover:shadow-[inset_10px_10px_10px_rgba(0,0,0,0.05),15px_25px_10px_rgba(0,0,0,0.05),15px_20px_20px_rgba(0,0,0,0.05),inset_0px_-4px_5px_rgba(255,255,255,0.9)]'>
                        <FaUserPlus />
                        Añadir
                    </button>
                </div>
            </section>

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
                                    <button
                                        onClick={() => handleDesactivarEmpleado(emp.id)}
                                        className="px-3 py-1 text-sm bg-red-600 rounded hover:bg-red-700"
                                    >
                                        Desactivar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {(empleadoEditando || nuevoEmpleado) && (
                    <div className="max-w-md p-4 mx-auto mt-8 text-black bg-white shadow rounded-xl">
                        <h3 className="mb-4 text-xl font-semibold">
                            {empleadoEditando ? "Editar Empleado" : "Nuevo Empleado"}
                        </h3>
                        <form onSubmit={empleadoEditando ? handleActualizarEmpleado : handleAgregarEmpleado}>
                            <div className="mb-4">
                                <label className="block mb-1">Nombre:</label>
                                <input
                                    type="text"
                                    value={(empleadoEditando || nuevoEmpleado).nombre}
                                    onChange={(e) =>
                                        empleadoEditando
                                            ? setEmpleadoEditando({ ...empleadoEditando, nombre: e.target.value })
                                            : setNuevoEmpleado({ ...nuevoEmpleado, nombre: e.target.value })
                                    }
                                    className="w-full px-2 py-1 border rounded"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-1">Correo:</label>
                                <input
                                    type="email"
                                    value={(empleadoEditando || nuevoEmpleado).email}
                                    onChange={(e) =>
                                        empleadoEditando
                                            ? setEmpleadoEditando({ ...empleadoEditando, email: e.target.value })
                                            : setNuevoEmpleado({ ...nuevoEmpleado, email: e.target.value })
                                    }
                                    className="w-full px-2 py-1 border rounded"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-1">Contraseña:</label>
                                <input
                                    type="password"
                                    value={(empleadoEditando || nuevoEmpleado).contrasenia}
                                    onChange={(e) =>
                                        empleadoEditando
                                            ? setEmpleadoEditando({ ...empleadoEditando, contrasenia: e.target.value })
                                            : setNuevoEmpleado({ ...nuevoEmpleado, contrasenia: e.target.value })
                                    }
                                    className="w-full px-2 py-1 border rounded"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-1">Rol:</label>
                                <select
                                    value={(empleadoEditando || nuevoEmpleado).rol}
                                    onChange={(e) =>
                                        empleadoEditando
                                            ? setEmpleadoEditando({ ...empleadoEditando, rol: e.target.value })
                                            : setNuevoEmpleado({ ...nuevoEmpleado, rol: e.target.value })
                                    }
                                    className="w-full px-2 py-1 border rounded"
                                >
                                    <option value="ADMINISTRADOR">ADMINISTRADOR</option>
                                    <option value="CAJERO">CAJERO</option>
                                    <option value="MOZO">MOZO</option>
                                    <option value="BAR">BAR</option>
                                    <option value="COCINA">COCINA</option>
                                    <option value="FRIOS">FRIOS</option>
                                </select>
                            </div>
                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setEmpleadoEditando(null);
                                        setNuevoEmpleado(null);
                                    }}
                                    className="px-4 py-2 text-white bg-gray-400 rounded"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700"
                                >
                                    {empleadoEditando ? "Actualizar" : "Agregar"}
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
