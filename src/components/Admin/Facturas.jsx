import React, { useEffect, useState } from 'react';
import { Wallet, CalendarDays, Plus } from 'lucide-react';
import DatePicker from 'react-datepicker';
import stompClient from "../../config/websocket";

import { PiMicrosoftExcelLogoFill } from "react-icons/pi";

function Facturas() {
    const [fecha, setFecha] = useState(new Date());
    const [facturas, setFacturas] = useState([]);
    const ReadOnlyInput = React.forwardRef(({ value, onClick }, ref) => (
        <input
            className="p-3 text-xl text-center bg-black border-2 w-36 border-zinc-400 bg-opacity-10 backdrop-blur-sm rounded-xl form-control transition-all duration-700 hover:bg-opacity-0 hover:border-0 hover:shadow-[inset_10px_10px_10px_rgba(0,0,0,0.05),15px_25px_10px_rgba(0,0,0,0.05),15px_20px_20px_rgba(0,0,0,0.05),inset_0px_-5px_10px_rgba(255,255,255,0.9)]"
            onClick={onClick}
            value={value}
            ref={ref}
            readOnly
            style={{ cursor: 'pointer' }}
        />
    ));

    useEffect(() => {
        fetch("http://localhost:8080/api/factura")
        .then(res => res.json())
        .then(data =>{
            setFacturas(data);
        });
        if (!stompClient.active){
            stompClient.activate();
        }

        stompClient.onConnect = () => {
            console.log("Conectado al websocket");
            stompClient.subscribe("/topic/factura", message => {
                const facturaActualizada = JSON.parse(message.body);
                setFacturas(prevFacturas =>
                    prevFacturas.map(fac =>
                        fac.id === facturaActualizada.id ? facturaActualizada : fac
                    )
                );
            });
        };
        return () => {
            stompClient.deactivate();
        };
    },[]);

    const FormatearFecha = (fecha) =>{
        const dia = String(fecha.getDate()).padStart(2, '0');
        const mes = String(fecha.getMonth() + 1).padStart(2, '0');
        const anio = fecha.getFullYear();
        return `${dia}/${mes}/${anio}`;
    };
    const formatearFechaDesdeISO = (isoString) => {
        const fecha = new Date(isoString);
        const dia = String(fecha.getDate()).padStart(2, '0');
        const mes = String(fecha.getMonth() + 1).padStart(2, '0');
        const anio = fecha.getFullYear();
        return `${dia}/${mes}/${anio}`;
    };
    

    const handleBuscar = () => {
        const fechaFormateada = FormatearFecha(fecha);
    
        fetch(`http://localhost:8080/api/factura/fecha?fecha=${encodeURIComponent(fechaFormateada)}`)
            .then(res => res.json())
            .then(data => {
                setFacturas(data);
            })
            .catch(err => {
                console.error("Error al buscar facturas por fecha:", err);
            });
    };
    

    return (
        <div className="p-5">
            <section className="flex justify-between mb-8">
                <div>
                    <h2 className="mb-1 text-4xl font-semibold text-white font-apple">EMPLEADOS</h2>
                    <p className="text-sm text-gray-100">Información de los Empleados</p>
                </div>
                <div className='flex '>
                    
                    <div className='flex items-center justify-center gap-4 pr-10'>
                        <button 
                        onClick={handleBuscar}
                        className="relative backdrop-blur-xl text-white font-semibold p-3 rounded-2xl flex items-center bg-white/20 justify-center transition-all duration-700 hover:bg-opacity-0 hover:shadow-[inset_10px_10px_10px_rgba(0,0,0,0.05),15px_25px_10px_rgba(0,0,0,0.05),15px_20px_20px_rgba(0,0,0,0.05),inset_0px_-4px_5px_rgba(255,255,255,0.9)]">
                            Buscar
                        </button>
                        <DatePicker
                            selected={fecha}
                            onChange={(date) => setFecha(date)}
                            dateFormat="dd-MM-yyyy"
                            maxDate={new Date()}
                            showPopperArrow={false}
                            customInput={<ReadOnlyInput />}
                        />
                    </div>

                    <div>
                        <button 
                        className='relative flex items-center justify-center gap-2 p-4 text-xl font-bold text-green-700 transition-all duration-700 hover:bg-green-700 bg-white/80 backdrop-blur-xl rounded-2xl hover:text-white hover:scale-105'>
                            <PiMicrosoftExcelLogoFill />
                            Exportar
                        </button>
                    </div>
                </div>
            </section>
            <div className='w-full'>
                <table className="min-w-full text-white border border-white">
                    <thead className="bg-gray-800">
                        <tr>
                            <th className="px-4 py-2 border border-white">Fecha</th>
                            <th className="px-2 py-2 border border-white">N° de Factura</th>
                            <th className="px-4 py-2 border border-white">Total</th>
                            <th className="px-4 py-2 border border-white">Estado</th>
                            <th className="px-2 py-2 border border-white">Medio de Pago</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {facturas.map(fac => (
                            <tr key={fac.id} className="hover:bg-gray-700">
                                <td className="px-4 py-2 border border-white">{formatearFechaDesdeISO(fac.fechaHora)}</td>
                                <td className="px-4 py-2 border border-white">{fac.id}</td>
                                <td className="px-4 py-2 border border-white">{fac.total}</td>
                                <td className="px-4 py-2 border border-white">{fac.estado}</td>
                                <td className="px-4 py-2 border border-white">{fac.medioDePago}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Facturas;