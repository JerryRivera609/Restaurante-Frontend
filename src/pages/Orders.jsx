import React, { useState, useEffect } from "react";

// Icons
import { PiThermometerColdFill } from "react-icons/pi";
import { FaHotjar } from "react-icons/fa";
import { BiSolidDrink } from "react-icons/bi";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { RiShoppingBasket2Line } from "react-icons/ri";

// Tarjetas
import Productos from "../components/targets/Productos";
import Mesas from "../components/targets/Mesas";

const Orders = () => {
    const [filtro, setFiltro] = useState('');
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [counts, setCounts] = useState({});

    //Aqui se almanecan los peddos
    const [pedido, setPedido] = useState([]);
    //Aqui se almacena la mesa selecionada
    const [mesaSeleccionada, setMesaSeleccionada] = useState(null);

    //Funcion de pedidos
    const agregarAlPedido = (producto) => {
        setPedido(prevPedido => {
            const existente = prevPedido.find(p => p.id === producto.id);
            if (existente) {
                return prevPedido.map(p =>
                    p.id === producto.id
                        ? { ...p, cantidad: p.cantidad + 1 }
                        : p
                );
            } else {
                return [...prevPedido, { ...producto, cantidad: 1 }];
            }
        });
    };

    // Fetch productos
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/productos");
                const data = await response.json();
                setProductos(data);

                // Inicializar los counts por producto
                const initialCounts = {};
                data.forEach(producto => {
                    initialCounts[producto.id] = 0;
                });
                setCounts(initialCounts);

            } catch (error) {
                console.error("Error al cargar productos:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Filtrar productos
    const productosFiltrados = filtro
        ? productos.filter(p => p.tipo.toLowerCase() === filtro.toLowerCase())
        : productos;

    // Realizar Pedido (POST)

    const handlePlaceOrder = async () => {
        if (!mesaSeleccionada || pedido.length === 0) {
            alert("Selecciona una mesa y agrega productos al pedido.");
            return;
        }

        try {
            // Paso 1: Crear el pedido
            const responsePedido = await fetch("http://localhost:8080/api/pedidos/crear", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    idEmpleado: 3, // Cambia esto por el ID real del mesero logueado
                    idMesa: mesaSeleccionada.id,
                }),
            });

            const pedidoCreado = await responsePedido.json();

            // Paso 2: Crear los detalles del pedido
            //const detalles = pedido.map((item) => ({
            //    idProducto: item.id,
            //    cantidad: item.cantidad,
            //    precio: item.precio,
            //}));

            await fetch("http://localhost:8080/api/detallepedido/guardar", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    idPedido: pedidoCreado.id,
                    items: pedido.map(item => ({
                        idProducto: item.id,
                        cantidad: item.cantidad,
                        precio: item.precio,
                    }))
                }),
            });

            alert("Pedido registrado correctamente ✅");
            setPedido([]);
            setMesaSeleccionada(null);
        } catch (error) {
            console.error("Error al registrar el pedido:", error);
            alert("Error al registrar el pedido ❌");
        }
    };


    return (
        <section className="bg-[#1f1f1f] h-[calc(100vh-8.5rem)] overflow-hidden flex gap-2 p-4">
            <div className="flex-[4] px-5">

                {/* Mesas */}
                <h2 className="mb-2 text-2xl text-white">Mesas</h2>
                <div className="grid grid-cols-3 gap-4 p-2 overflow-x-auto max-h-[130px]">
                    <Mesas setMesaSeleccionada={setMesaSeleccionada} mesaSeleccionada={mesaSeleccionada} />
                </div>

                {/* Botones de filtro */}
                <h2 className="py-1 mt-4 mb-2 text-2xl text-white">Platos</h2>
                <div className="grid grid-cols-3 gap-4 overflow-x-auto max-h-[130px]">
                    <button className="text-white bg-red-500 w-[250px] flex items-center justify-center gap-1 p-2 rounded-md text-xl font-bold"
                        onClick={() => setFiltro('Cocina')}>
                        <FaHotjar className="w-5 h-5" />
                        Hot
                    </button>
                    <button className="text-white bg-sky-400 w-[250px] flex items-center justify-center gap-1 p-2 rounded-md text-xl font-bold"
                        onClick={() => setFiltro('Frios')}>
                        <PiThermometerColdFill className="w-5 h-5" />
                        Cold
                    </button>
                    <button className="text-white bg-emerald-500 w-[250px] flex items-center justify-center gap-1 p-2 rounded-md text-xl font-bold"
                        onClick={() => setFiltro('Bartender')}>
                        <BiSolidDrink className="w-5 h-5" />
                        Bar
                    </button>
                </div>

                {/* Lista de productos */}
                <div className="grid gap-4 p-4 grid-cols-3 overflow-x-auto max-h-[50%] mt-4">
                    {loading
                        ? <p className="text-white">Cargando...</p>
                        : <Productos productos={productosFiltrados} counts={counts} setCounts={setCounts} agregarAlPedido={agregarAlPedido} />}
                </div>
            </div>

            {/* Barra lateral de resumen */}
            <div className="flex-[2] flex flex-col max-h-full">
                <div className="flex flex-col text-white bg-[#0c0c0c] gap-2 rounded-lg">
                    <div className="flex items-center justify-between w-full p-3">
                        <div className="w-full text-start">
                            <h2 className="text-2xl">Order</h2>
                        </div>
                        <div>
                            <div className="p-2 text-center bg-green-600 rounded-xl">
                                <p className="text-xl">Table:</p>
                                <p className="text-2xl">{mesaSeleccionada ? mesaSeleccionada.numero : "-"}</p>
                            </div>
                        </div>
                    </div>



                    <hr className="w-full border-[2px] border-[#1f1f1f]" />
                    <div className="flex flex-col gap-2 p-3 ">
                        <h3>Order Details</h3>
                        <div className="flex flex-col gap-2 h-[calc(250px)] overflow-x-auto">
                            {pedido.length === 0 ? (
                                <p className="text-gray-400">No hay productos en el pedido.</p>
                            ) : (
                                pedido.map(item => (
                                    <div key={item.id} className="flex flex-col w-full bg-[#181818] py-3 px-5 rounded-xl gap-2">
                                        <div className="flex justify-between text-[#c8c8c8]">
                                            <p>{item.nombre}</p>
                                            <p>x{item.cantidad}</p>
                                        </div>
                                        <div className="flex justify-between">
                                            <button
                                                className="bg-[#535353] p-1 rounded-md"
                                                onClick={() => {
                                                    setPedido(prev =>
                                                        prev
                                                            .map(p => p.id === item.id
                                                                ? { ...p, cantidad: p.cantidad - 1 }
                                                                : p)
                                                            .filter(p => p.cantidad > 0)
                                                    );
                                                }}
                                            >
                                                <RiDeleteBin2Fill className="w-5 h-5" />
                                            </button>
                                            <p className="font-bold">S/. {(item.precio * item.cantidad).toFixed(2)}</p>
                                        </div>
                                    </div>
                                ))
                            )}


                        </div>
                    </div>

                    <hr className="w-full border-[2px] border-[#1f1f1f]" />

                    <div className="flex justify-between w-full p-3">
                        <p>Total:</p>
                        <p>
                            S/.{" "}
                            {pedido.reduce((acc, item) => acc + item.precio * item.cantidad, 0).toFixed(2)}
                        </p>
                    </div>

                    <div className="flex w-full p-3 ">
                        <button
                            onClick={handlePlaceOrder}
                            className="flex items-center justify-center w-full gap-1 p-2 text-center bg-green-600 rounded-md ">
                            <RiShoppingBasket2Line className="w-5 h-5 text-white" />
                            Place Order
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Orders;
