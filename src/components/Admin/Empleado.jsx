import React from 'react';
import { useState } from "react";

function Empleado() {
    const [empleados, setEmpleados] = useState([
        {
            id: 1,
            nombre: "Jerry Marino Dominguez Rivera",
            correo: "jerry@gmail.com",
            rol: "Administrador",
            contrasena: "123456",
        },
        {
            id: 2,
            nombre: "María Pérez",
            correo: "maria@gmail.com",
            rol: "Mesero",
            contrasena: "654321",
        },
    ]);

    const [empleadoEditando, setEmpleadoEditando] = useState(null);

    const rolesDisponibles = ["Administrador", "Mesero", "Bartender", "Chef caliente", "Chef frío"];

    const handleChange = (e) => {
        setEmpleadoEditando({
            ...empleadoEditando,
            [e.target.name]: e.target.value,
        });
    };

    const handleGuardar = () => {
        setEmpleados((prev) =>
            prev.map((emp) => (emp.id === empleadoEditando.id ? empleadoEditando : emp))
        );
        setEmpleadoEditando(null);
    };
    return (
        <div className="p-6">
            <section className="flex justify-start mb-8">
                <div>
                    <h2 className="mb-1 text-4xl font-semibold text-white font-apple">EMPLEADOS</h2>
                    <p className="text-sm text-gray-100">Información de los Empleados</p>
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
                                <td className="px-4 py-2 border border-white">{emp.correo}</td>
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

                {/* Modal */}
                {empleadoEditando && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-gray-800 p-6 rounded-lg w-[400px] text-white">
                            <h2 className="mb-4 text-xl">Editar Empleado</h2>

                            <label className="block mb-2">
                                Nombre:
                                <input
                                    name="nombre"
                                    value={empleadoEditando.nombre}
                                    onChange={handleChange}
                                    className="w-full p-2 mt-1 text-black rounded"
                                />
                            </label>

                            <label className="block mb-2">
                                Correo:
                                <input
                                    name="correo"
                                    value={empleadoEditando.correo}
                                    onChange={handleChange}
                                    className="w-full p-2 mt-1 text-black rounded"
                                />
                            </label>

                            <label className="block mb-2">
                                Contraseña:
                                <input
                                    name="contrasena"
                                    value={empleadoEditando.contrasena}
                                    onChange={handleChange}
                                    type="password"
                                    className="w-full p-2 mt-1 text-black rounded"
                                />
                            </label>

                            <label className="block mb-2">
                                Rol:
                                <select
                                    name="rol"
                                    value={empleadoEditando.rol}
                                    onChange={handleChange}
                                    className="w-full p-2 mt-1 text-black rounded"
                                >
                                    {rolesDisponibles.map((rol) => (
                                        <option key={rol} value={rol}>
                                            {rol}
                                        </option>
                                    ))}
                                </select>
                            </label>

                            <div className="flex justify-end gap-2 mt-4">
                                <button
                                    onClick={() => setEmpleadoEditando(null)}
                                    className="px-4 py-2 bg-gray-600 rounded"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={handleGuardar}
                                    className="px-4 py-2 bg-green-600 rounded hover:bg-green-700"
                                >
                                    Guardar
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Empleado;