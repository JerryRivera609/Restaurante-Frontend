import { Wallet, CalendarDays, Plus } from 'lucide-react';

function Ingresos() {
    return (
        <div className="min-h-screen p-6 ">
            <section className="mb-8">
                <h2 className="mb-1 text-4xl font-semibold text-gray-800 font-apple">INGRESOS</h2>
                <p className="text-sm text-gray-500">Resumen financiero general</p>
            </section>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <div className="p-6 shadow-md bg-white/50 backdrop-blur-md rounded-2xl">
                    <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-700">
                        <Wallet className="w-5 h-5" />
                        SALDO TOTAL
                    </h2>
                    <h3 className="mt-3 text-4xl font-bold text-white">S/ 1299.00</h3>
                    <p className="mt-2 text-sm text-green-500">+S/ 120.00 hoy</p>
                    <p className="text-xs text-gray-100">Actualizado: 17 jun 2025</p>
                </div>

                <div className="p-6 shadow-md bg-white/50 backdrop-blur-md rounded-2xl">
                    <h2 className="mb-1 text-lg font-semibold text-gray-700">EFECTIVO</h2>
                    <p className="text-3xl font-bold text-gray-800">S/ 540.00</p>
                </div>

                <div className="p-6 shadow-md bg-white/50 backdrop-blur-md rounded-2xl">
                    <h2 className="mb-1 text-lg font-semibold text-gray-700">TARJETA</h2>
                    <p className="text-3xl font-bold text-gray-800">S/ 500.00</p>
                </div>

                <div className="p-6 shadow-md bg-white/50 backdrop-blur-md rounded-2xl">
                    <h2 className="mb-1 text-lg font-semibold text-gray-700">YAPE</h2>
                    <p className="text-3xl font-bold text-gray-800">S/ 259.00</p>
                </div>
            </div>

            <section className="mt-10">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="flex items-center gap-2 text-xl font-semibold text-gray-800">
                        <CalendarDays className="w-5 h-5" /> Ingresos por Fecha
                    </h3>
                    <button className="flex items-center gap-2 px-4 py-2 text-sm text-white transition bg-blue-600 rounded-lg hover:bg-blue-700">
                        <Plus className="w-4 h-4" /> Registrar ingreso
                    </button>
                </div>
                <div className="overflow-hidden bg-white divide-y divide-gray-100 shadow-sm rounded-xl">
                    <div className="flex items-center justify-between p-4">
                        <span className="text-gray-700">17 junio 2025</span>
                        <span className="font-medium text-green-600">S/ 250.00</span>
                    </div>
                    <div className="flex items-center justify-between p-4">
                        <span className="text-gray-700">16 junio 2025</span>
                        <span className="font-medium text-green-600">S/ 120.00</span>
                    </div>
                    <div className="flex items-center justify-between p-4">
                        <span className="text-gray-700">15 junio 2025</span>
                        <span className="font-medium text-green-600">S/ 90.00</span>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Ingresos;
