import React from "react";
import { TiShoppingCart } from "react-icons/ti";

const Productos = ({ productos, counts, setCounts, agregarAlPedido}) => {
    if (!productos.length) {
        return <div className="text-gray-500">No hay productos</div>;
    }

    return (
        <>
            {productos.map(producto => (
                <div key={producto.id} className="p-4 shadow-md bg-[#181818] rounded-xl text-white">
                    <div className='flex justify-between'>
                        <img
                            src={producto.img}
                            alt={producto.nombre}
                            className="object-cover w-20 h-20 rounded-lg"
                        />
                        <div className='text-end'>
                            <h2 className="mt-2 text-xl font-bold">{producto.nombre}</h2>
                            <p className="text-gray-500">S/. {producto.precio}</p>
                        </div>
                    </div>
                    <div>
                        <p className="mt-1 text-sm">{producto.descripcion}</p>
                    </div>
                    <div>
                        <div className="flex justify-between">
                            <button className="p-1 mt-2 text-lg font-semibold text-green-500 rounded-md bg-green-800/50"
                            onClick={() => agregarAlPedido(producto)}
                            >
                                <TiShoppingCart className="w-7 h-7" />
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

export default Productos;
