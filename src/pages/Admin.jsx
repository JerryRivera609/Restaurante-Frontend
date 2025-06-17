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
        <section className="bg-[#1f1f1f] h-[calc(100vh-8.5rem)] text-white flex">
            <div className="flex p-4 flex-2/8">
                <nav className='flex flex-col w-full gap-3 text-gray-400 justify-evenly'>
                    <NavLink
                        to="/admin/ingresos"
                        className={({ isActive }) =>
                            `flex items-center justify-start gap-3 px-8 py-2 text-2xl transition-all ease-out duration-700 border-l-4 
                            ${isActive ? 'border-yellow-500 text-yellow-500 bg-[#444444]' : 'border-transparent text-gray-400 hover:bg-yellow-500 hover:text-white'}`
                        }>
                        <FaMoneyBillTrendUp />
                        Ingresos
                    </NavLink>
                    <NavLink to="/admin/empleado"
                        className={({ isActive }) =>
                            `flex items-center justify-start gap-3 px-8 py-2 text-2xl transition-all ease-out duration-300 border-l-4 
                            ${isActive ? 'border-yellow-500 text-yellow-500 bg-[#444444]' : 'border-transparent text-gray-400 hover:bg-yellow-500 hover:text-white'}`
                        }>
                        <FaUsers />Empleado
                    </NavLink>
                    <NavLink to="/admin/factura"
                        className={({ isActive }) =>
                            `flex items-center justify-start gap-3 px-8 py-2 text-2xl transition-all ease-out duration-300 border-l-4 
                            ${isActive ? 'border-yellow-500 text-yellow-500 bg-[#444444]' : 'border-transparent text-gray-400 hover:bg-yellow-500 hover:text-white'}`
                        }>
                        <RiBillFill />Facturas
                    </NavLink>
                    <NavLink to="/admin/productos"
                        className={({ isActive }) =>
                            `flex items-center justify-start gap-3 px-8 py-2 text-2xl transition-all ease-out duration-300 border-l-4 
                            ${isActive ? 'border-yellow-500 text-yellow-500 bg-[#444444]' : 'border-transparent text-gray-400 hover:bg-yellow-500 hover:text-white'}`
                        }>
                        <AiFillProduct />Productos
                    </NavLink>
                </nav>
            </div>

            <div className="w-full flex-6/8 bg-[url('/fondo.jpg')] bg-cover bg-center">
                {/* Sub rutas dentro de /admin */}
                <Routes>
                    <Route path="empleado" element={<Empleado />} />
                    <Route path="factura" element={<Facturas />} />
                    <Route path="ingresos" element={<Ingresos />} />
                    <Route path="productos" element={<Productos />} />
                </Routes>
            </div>
        </section>
    );
}

export default Admin;
