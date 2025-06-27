
function Productos() {
    return (
        <div className="p-5">
            <section className="flex justify-between mb-8">
                <div>
                    <h2 className="mb-1 text-4xl font-semibold text-white font-apple">EMPLEADOS</h2>
                    <p className="text-sm text-gray-100">Información de los Empleados</p>
                </div>
                <div className='flex '>
                    <button>
                        Todos
                    </button>
                    <button>
                        Hot
                    </button>
                    <button>
                        Cold
                    </button>
                    <button>
                        Bar
                    </button>
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
                    
                </table>
            </div>
        </div>
    );
}
export default Productos;