import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { Empleado, Facturas, Ingresos, Productos } from '../components/Admin';

{/*ICONOS*/ }
import { FaUsers } from "react-icons/fa";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { RiBillFill } from "react-icons/ri";
import { AiFillProduct } from "react-icons/ai";

function Admin() {
    return (
        <section className="bg-[url('/fondo.jpg')] bg-cover bg-center h-[calc(100vh-8.5rem)] text-white flex">
            <div className='flex w-full p-6 bg-white bg-opacity-0'>

                <div className='flex w-full overflow-hidden bg-black border-2 border-zinc-800 bg-opacity-5 rounded-xl'>
                    <div className="flex flex-2/8 backdrop-blur-md">
                        <nav className='flex flex-col w-full gap-3 text-gray-400 justify-evenly'>
                            <NavLink
                                to="/admin/ingresos"
                                className={({ isActive }) =>
                                    `flex items-center justify-start gap-3 px-8 py-2 text-2xl transition-all ease-out duration-700 border-l-4 
                            ${isActive ? 'border-white text-white bg-opacity-0 shadow-[inset_10px_10px_10px_rgba(0,0,0,0.05),15px_25px_10px_rgba(0,0,0,0.05),15px_20px_20px_rgba(0,0,0,0.05),inset_-5px_0px_8px_rgba(255,255,255,0.9)] ' : 'border-transparent text-gray-400 hover:bg-black/30 hover:text-white'}`
                                }>
                                <FaMoneyBillTrendUp />
                                Ingresos
                            </NavLink>
                            <NavLink to="/admin/empleado"
                                className={({ isActive }) =>
                                    `flex items-center justify-start gap-3 px-8 py-2 text-2xl transition-all ease-out duration-300 border-l-4 
                            ${isActive ? 'border-white text-white bg-opacity-0 shadow-[inset_10px_10px_10px_rgba(0,0,0,0.05),15px_25px_10px_rgba(0,0,0,0.05),15px_20px_20px_rgba(0,0,0,0.05),inset_-5px_0px_8px_rgba(255,255,255,0.9)] ' : 'border-transparent text-gray-400 hover:bg-black/30 hover:text-white'}`
                                }>
                                <FaUsers />Empleado
                            </NavLink>
                            <NavLink to="/admin/factura"
                                className={({ isActive }) =>
                                    `flex items-center justify-start gap-3 px-8 py-2 text-2xl transition-all ease-out duration-300 border-l-4 
                            ${isActive ? 'border-white text-white bg-opacity-0 shadow-[inset_10px_10px_10px_rgba(0,0,0,0.05),15px_25px_10px_rgba(0,0,0,0.05),15px_20px_20px_rgba(0,0,0,0.05),inset_-5px_0px_8px_rgba(255,255,255,0.9)] ' : 'border-transparent text-gray-400 hover:bg-black/30 hover:text-white'}`
                                }>
                                <RiBillFill />Facturas
                            </NavLink>
                            <NavLink to="/admin/productos"
                                className={({ isActive }) =>
                                    `flex items-center justify-start gap-3 px-8 py-2 text-2xl transition-all ease-out duration-300 border-l-4 
                            ${isActive ? 'border-white text-white bg-opacity-0 shadow-[inset_10px_10px_10px_rgba(0,0,0,0.05),15px_25px_10px_rgba(0,0,0,0.05),15px_20px_20px_rgba(0,0,0,0.05),inset_-5px_0px_8px_rgba(255,255,255,0.9)] ' : 'border-transparent text-gray-400 hover:bg-black/30 hover:text-white'}`
                                }>
                                <AiFillProduct />Productos
                            </NavLink>
                        </nav>
                    </div>

                    <div className="w-full overflow-x-auto flex-6/8 backdrop-blur-sm">
                        
                        <Routes>
                            <Route path="empleado" element={<Empleado />} />
                            <Route path="factura" element={<Facturas />} />
                            <Route path="ingresos" element={<Ingresos />} />
                            <Route path="productos" element={<Productos />} />
                        </Routes>
                    </div>
                </div>
                <section className='flex items-center justify-center flex-1 w-16'>
                    <h2 className='text-6xl rotate-90 writing-vertical-rl'>Administration</h2>
                </section>
            </div>
            
        </section>

    );
}

export default Admin;
