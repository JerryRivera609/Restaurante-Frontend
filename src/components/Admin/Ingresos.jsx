import React, { useState } from 'react';
import { Wallet } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function Ingresos() {
    const [fecha, setFecha] = useState(new Date());
    const [efectivo, setEfectivo] = useState(0);
    const [tarjeta, setTarjeta] = useState(0);
    const [yape, setYape] = useState(0);
    const [total, setTotal] = useState(0);

    const formatearFecha = (fecha) => {
        const dia = String(fecha.getDate()).padStart(2, '0');
        const mes = String(fecha.getMonth() + 1).padStart(2, '0');
        const anio = fecha.getFullYear();
        return `${dia}/${mes}/${anio}`;
    };

    const handleBuscar = () => {
        const fechaFormateada = formatearFecha(fecha);

        fetch(`http://localhost:8080/api/factura/fecha?fecha=${encodeURIComponent(fechaFormateada)}`)
            .then(res => res.json())
            .then(data => {
                let sumaEfectivo = 0;
                let sumaTarjeta = 0;
                let sumaYape = 0;

                data.forEach(factura => {
                    switch (factura.medioDePago) {
                        case 'EFECTIVO':
                            sumaEfectivo += factura.total;
                            break;
                        case 'TARJETA':
                            sumaTarjeta += factura.total;
                            break;
                        case 'YAPE':
                            sumaYape += factura.total;
                            break;
                        default:
                            break;
                    }
                });

                setEfectivo(sumaEfectivo);
                setTarjeta(sumaTarjeta);
                setYape(sumaYape);
                setTotal(sumaEfectivo + sumaTarjeta + sumaYape);
            })
            .catch(err => console.error("Error al buscar ingresos:", err));
    };

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

    return (
        <div className="relative p-6">
            <section className="flex justify-between mb-8">
                <div>
                    <h2 className="mb-1 text-4xl font-semibold text-white font-apple">INGRESOS</h2>
                    <p className="text-sm text-gray-100">Resumen financiero general</p>
                </div>
                <div className='flex items-center justify-center gap-4 pr-10'>
                    <button
                        onClick={handleBuscar}
                        className="relative backdrop-blur-xl text-white font-semibold p-3 rounded-2xl flex items-center bg-white/20 justify-center transition-all duration-700 hover:bg-opacity-0 hover:shadow-[inset_10px_10px_10px_rgba(0,0,0,0.05),15px_25px_10px_rgba(0,0,0,0.05),15px_20px_20px_rgba(0,0,0,0.05),inset_0px_-4px_5px_rgba(255,255,255,0.9)]"
                    >
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
            </section>

            <div className="grid grid-cols-1 gap-6 pb-4 sm:grid-cols-2 lg:grid-cols-3">
                <div className="p-6 text-zinc-200 transition-all duration-700 bg-yellow-400 bg-opacity-50 shadow-md backdrop-blur-md rounded-2xl hover:bg-opacity-10 hover:text-white hover:shadow-[inset_10px_10px_10px_rgba(0,0,0,0.05),15px_25px_10px_rgba(0,0,0,0.05),15px_20px_20px_rgba(0,0,0,0.05),inset_0px_-4px_5px_rgba(255,200,0,0.9)]">
                    <h2 className="mb-1 text-lg font-semibold">EFECTIVO</h2>
                    <p className="text-3xl font-bold">S/ {efectivo.toFixed(2)}</p>
                </div>

                <div className="p-6 bg-blue-500 bg-opacity-50 shadow-md backdrop-blur-md rounded-2xl hover:bg-opacity-10 transition-all duration-700 hover:text-white hover:shadow-[inset_10px_10px_10px_rgba(0,0,0,0.05),15px_25px_10px_rgba(0,0,0,0.05),15px_20px_20px_rgba(0,0,0,0.05),inset_0px_-4px_5px_rgba(0,100,255,0.9)]">
                    <h2 className="mb-1 text-lg font-semibold text-zinc-100">TARJETA</h2>
                    <p className="text-3xl font-bold text-zinc-100">S/ {tarjeta.toFixed(2)}</p>
                </div>

                <div className="p-6 bg-purple-500 bg-opacity-50 shadow-md backdrop-blur-md rounded-2xl hover:bg-opacity-10 transition-all duration-700 hover:text-white hover:shadow-[inset_10px_10px_10px_rgba(0,0,0,0.05),15px_25px_10px_rgba(0,0,0,0.05),15px_20px_20px_rgba(0,0,0,0.05),inset_0px_-4px_5px_rgba(128,0,150,0.9)]">
                    <h2 className="mb-1 text-lg font-semibold text-zinc-100">YAPE</h2>
                    <p className="text-3xl font-bold text-zinc-100">S/ {yape.toFixed(2)}</p>
                </div>
            </div>

            <div className="p-6 shadow-md bg-zinc-100 bg-opacity-45 backdrop-blur-md rounded-2xl transition-all duration-1000 hover:bg-opacity-10 hover:text-white hover:shadow-[inset_10px_10px_10px_rgba(0,0,0,0.05),15px_25px_10px_rgba(0,0,0,0.05),15px_20px_20px_rgba(0,0,0,0.05),inset_0px_-4px_5px_rgba(255,255,255,0.9)]">
                <h2 className="flex items-center gap-2 text-lg font-semibold text-white">
                    <Wallet className="w-5 h-5" />
                    SALDO TOTAL
                </h2>
                <h3 className="mt-3 text-4xl font-bold text-white">S/ {total.toFixed(2)}</h3>
            </div>
        </div>
    );
}

export default Ingresos;
