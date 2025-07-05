import { useEffect, useState } from "react";
import stompClient from "../../config/websocket";
import { HiWallet } from "react-icons/hi2";
import { FaHotjar } from "react-icons/fa";
import { PiThermometerColdFill } from "react-icons/pi";
import { BiSolidDrink } from "react-icons/bi";

function Productos() {
    const [platos, setPlatos] = useState([]);
    const [platoEditando, setPlatoEditando] = useState(null);
    const [nuevoPlato, setNuevoPlato] = useState(null);

    useEffect(() => {
        fetch("http://localhost:8080/api/productos")
            .then(res => res.json())
            .then(data => setPlatos(data));

        if (!stompClient.active) {
            stompClient.activate();
        }

        stompClient.onConnect = () => {
            stompClient.subscribe("/topic/factura", message => {
                const platoActualizado = JSON.parse(message.body);
                setPlatos(prev =>
                    prev.map(p => (p.id === platoActualizado.id ? platoActualizado : p))
                );
            });
        };

        return () => {
            stompClient.deactivate();
        };
    }, []);

    const handleEditarPlato = (plato) => {
        setPlatoEditando(plato);
    };

    const handleGuardarEdicion = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:8080/api/productos/${platoEditando.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(platoEditando),
        });
        if (!response.ok) return alert("Error al actualizar plato");
        const actualizado = await response.json();
        setPlatos(prev =>
            prev.map(p => (p.id === actualizado.id ? actualizado : p))
        );
        setPlatoEditando(null);
    };

    const handleGuardarNuevo = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:8080/api/productos/guardar", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(nuevoPlato),
        });
        if (!response.ok) return alert("Error al guardar plato");
        const creado = await response.json();
        setPlatos(prev => [...prev, creado]);
        setNuevoPlato(null);
    };

    return (
        <div className="p-5">
            <section className="flex justify-between mb-8">
                <div>
                    <h2 className="mb-1 text-4xl font-semibold text-white font-apple">PRODUCTOS</h2>
                    <p className="text-sm text-gray-100">Lista de platos</p>
                </div>
                <div className="flex gap-2">
                    <button className="px-4 py-2 text-white bg-green-600 rounded-xl" onClick={() => setNuevoPlato({ nombre: "", tipo: "COCINA", precio: 0, resumen: "", img: "" })}>Añadir</button>
                </div>
            </section>

            <table className="min-w-full text-white border border-white">
                <thead className="bg-gray-800">
                    <tr>
                        <th className="px-2 py-2 border border-white">Plato</th>
                        <th className="px-2 py-2 border border-white">Tipo</th>
                        <th className="px-2 py-2 border border-white">Precio</th>
                        <th className="px-2 py-2 border border-white">Imagen</th>
                        <th className="px-2 py-2 border border-white">Resumen</th>
                        <th className="px-2 py-2 border border-white">Acciones</th>
                    </tr>
                </thead>
                <tbody className="text-center">
                    {platos.map(plato => (
                        <tr key={plato.id} className="hover:bg-gray-700">
                            <td className="px-2 border">{plato.nombre}</td>
                            <td className="px-2 border">{plato.tipo}</td>
                            <td className="px-2 border">S/. {plato.precio.toFixed(2)}</td>
                            <td className="px-2 border">
                                <img src={plato.img} alt="" width={100} height={100} />
                            </td>
                            <td className="px-2 border">{plato.resumen}</td>
                            <td className="px-2 border">
                                <button onClick={() => handleEditarPlato(plato)} className="px-2 py-1 bg-blue-500 rounded">Editar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* FORMULARIO NUEVO */}
            {nuevoPlato && (
                <form onSubmit={handleGuardarNuevo} className="max-w-xl p-4 mx-auto mt-6 text-black bg-white rounded">
                    <h3 className="mb-2 text-xl font-semibold">Nuevo Plato</h3>
                    <input placeholder="Nombre" className="w-full p-1 mb-2 border" value={nuevoPlato.nombre} onChange={(e) => setNuevoPlato({ ...nuevoPlato, nombre: e.target.value })} />
                    <select className="w-full p-1 mb-2 border" value={nuevoPlato.tipo} onChange={(e) => setNuevoPlato({ ...nuevoPlato, tipo: e.target.value })}>
                        <option value="COCINA">COCINA</option>
                        <option value="FRIOS">FRIOS</option>
                        <option value="BAR">BAR</option>
                    </select>
                    <input type="number" step="0.1" className="w-full p-1 mb-2 border" value={nuevoPlato.precio ?? ""} onChange={(e) => setNuevoPlato({ ...nuevoPlato, precio: parseFloat(e.target.value) || 0 })} />
                    <input placeholder="Imagen URL" className="w-full p-1 mb-2 border" value={nuevoPlato.img} onChange={(e) => setNuevoPlato({ ...nuevoPlato, img: e.target.value })} />
                    <textarea placeholder="Resumen" className="w-full p-1 mb-2 border" value={nuevoPlato.resumen} onChange={(e) => setNuevoPlato({ ...nuevoPlato, resumen: e.target.value })} />
                    <div className="flex justify-end gap-2">
                        <button type="button" className="px-3 py-1 bg-gray-400 rounded" onClick={() => setNuevoPlato(null)}>Cancelar</button>
                        <button type="submit" className="px-3 py-1 text-white bg-green-600 rounded">Guardar</button>
                    </div>
                </form>
            )}

            {/* FORMULARIO EDITAR */}
            {platoEditando && (
                <form onSubmit={handleGuardarEdicion} className="max-w-xl p-4 mx-auto mt-6 text-black bg-white rounded">
                    <h3 className="mb-2 text-xl font-semibold">Editar Plato</h3>
                    <input className="w-full p-1 mb-2 border" value={platoEditando.nombre} onChange={(e) => setPlatoEditando({ ...platoEditando, nombre: e.target.value })} />
                    <select className="w-full p-1 mb-2 border" value={platoEditando.tipo} onChange={(e) => setPlatoEditando({ ...platoEditando, tipo: e.target.value })}>
                        <option value="COCINA">COCINA</option>
                        <option value="FRIOS">FRIOS</option>
                        <option value="BAR">BAR</option>
                    </select>
                    <input type="number" step="0.1" className="w-full p-1 mb-2 border" value={platoEditando.precio ?? ""} onChange={(e) => setPlatoEditando({ ...platoEditando, precio: parseFloat(e.target.value) || 0 })} />
                    <input className="w-full p-1 mb-2 border" value={platoEditando.img} onChange={(e) => setPlatoEditando({ ...platoEditando, img: e.target.value })} />
                    <textarea className="w-full p-1 mb-2 border" value={platoEditando.resumen} onChange={(e) => setPlatoEditando({ ...platoEditando, resumen: e.target.value })} />
                    <div className="flex justify-end gap-2">
                        <button type="button" className="px-3 py-1 bg-gray-400 rounded" onClick={() => setPlatoEditando(null)}>Cancelar</button>
                        <button type="submit" className="px-3 py-1 text-white bg-blue-600 rounded">Actualizar</button>
                    </div>
                </form>
            )}
        </div>
    );
}

export default Productos;
