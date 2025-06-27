import { useEffect, useState } from "react";
import stompClient from "../../config/websocket";

import { HiWallet } from "react-icons/hi2";
import { FaHotjar } from "react-icons/fa";
import { PiThermometerColdFill } from "react-icons/pi";
import { BiSolidDrink } from "react-icons/bi";

function Productos() {
    const [platos, setPLatos] = useState([]);
    useEffect(() => {
        fetch("http://localhost:8080/api/productos")
        .then(res => res.json())
        .then(data => {
            setPLatos(data);
        });
        if(!stompClient.active){
            stompClient.activate();
        }
        stompClient.onConnect = () => {
            console.log("Conectado al websocket");
            stompClient.subscribe("/topic/factura", message => {
                const platoActualizado = JSON.parse(message.body);
                setPlatos(prevPlato =>
                    prevPlato.map(plato =>
                        plato.id === platoActualizado.id ? platoActualizado : plato
                    )
                );
            });
        };
        return () => {
            stompClient.deactivate();
        };
    })
    
    return (
        <div className="p-5">
            <section className="flex justify-between mb-8">
                <div>
                    <h2 className="mb-1 text-4xl font-semibold text-white font-apple">EMPLEADOS</h2>
                    <p className="text-sm text-gray-100">Información de los Empleados</p>
                </div>
                <div className='flex gap-2'>
                    <button className="flex items-center justify-center gap-1 p-3 text-xl font-semibold bg-yellow-500 w-28 rounded-xl">
                    <HiWallet/>
                        Todos
                    </button>
                    <button className="flex items-center justify-center gap-1 p-3 text-xl font-semibold bg-red-500 w-28 rounded-xl">
                    <FaHotjar/>
                        Hot
                    </button>
                    <button className="flex items-center justify-center gap-1 p-3 text-xl font-semibold bg-sky-500 w-28 rounded-xl">
                    <PiThermometerColdFill/>
                        Cold
                    </button>
                    <button className="flex items-center justify-center gap-1 p-3 text-xl font-semibold bg-emerald-500 w-28 rounded-xl">
                    <BiSolidDrink/>
                        Bar
                    </button>
                </div>
            </section>
            <div className='w-full'>
                <table className="min-w-full text-white border border-white">
                    <thead className="bg-gray-800">
                        <tr>
                            <th className="px-2 py-2 border border-white">Plato</th>
                            <th className="px-2 py-2 border border-white">Tipo</th>
                            <th className="px-2 py-2 border border-white">Precio</th>
                            <th className="px-4 py-2 border border-white">Imagen</th>
                            <th className="px-4 py-2 border border-white">Resumen</th>
                            <th className="px-2 py-2 border border-white">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {platos.map(plato => (
                            <tr key={plato.id} className="hover:bg-gray-700">
                                <td className="px-2 py-2 border border-white max-w-[100px]">{plato.nombre}</td>
                                <td className="px-2 py-2 border border-white">{plato.tipo}</td>
                                <td className="px-2 py-2 border border-white">S/. {plato.precio}</td>
                                <td className="px-2 py-2 border border-white max-w-[150px] break-words">
                                    <img src={plato.img} width={200} height={200} alt="" />
                                </td>
                                <td className="px-2 py-2 border border-white max-w-[200px] break-words">{plato.resumen}</td>
                                <td className="gap-2 px-2 py-2 border border-white ">
                                    <button
                                        onClick={() => setEmpleadoEditando(emp)}
                                        className="px-3 py-1 mr-1 text-sm bg-blue-600 rounded hover:bg-blue-700"
                                    >
                                        Editar
                                    </button>
                                    <button className="px-3 py-1 ml-1 text-sm bg-red-600 rounded hover:bg-red-700">
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
export default Productos;