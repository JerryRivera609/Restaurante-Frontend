import React from "react";
import { Link, NavLink } from 'react-router-dom';
import { TiHome } from "react-icons/ti";
import { FaHotjar } from "react-icons/fa";
import { PiThermometerColdFill } from "react-icons/pi";
import { BiSolidDrink } from "react-icons/bi";
import { FaConciergeBell } from "react-icons/fa";
import { AiOutlineContainer } from "react-icons/ai";
import { useUser } from "../../context/UserContext.jsx";
import { MdAdminPanelSettings } from "react-icons/md";

const BottomNav = () => {
    const { usuario } = useUser(); // usuario.rol debe estar definido

    const rol = usuario?.rol;

    const isAdmin = rol === 'ADMINISTRADOR';
    const isCocina = rol === 'COCINA';
    const isMesero = rol === 'MESERO';
    const isFrios = rol === 'FRIOS';
    const isBar = rol === 'BAR';
    const isCajero = rol === 'CAJERO';

    return (
        <nav className="bg-[#1a1a1a] fixed bottom-0 left-0 right-0 flex justify-around h-16 py-2 flex-wrap">


            {isAdmin && (
                <NavLink
                    to="/admin"
                    className={({ isActive }) =>
                        `flex items-center w-[150px] justify-center p-3 gap-1 rounded-2xl transition-all ease-out duration-700
                        ${isActive ? ' text-white bg-opacity-0 shadow-[inset_10px_10px_10px_rgba(0,0,0,0.05),15px_25px_10px_rgba(0,0,0,0.05),15px_20px_20px_rgba(0,0,0,0.05),inset_0px_-5px_7px_rgba(255,255,255,0.9)]' : 'border-transparent text-gray-400 hover:bg-black/50 hover:scale-110 hover:text-white'}`
                    }
                >
                    <MdAdminPanelSettings className="w-5 h-5" />
                    Admin
                </NavLink>
            )}
            {(isAdmin || isCocina || isFrios || isBar || isCajero) && (
                <NavLink to="/home" 
                className={({ isActive }) =>
                    `flex items-center w-[150px] justify-center p-3 gap-1 rounded-2xl transition-all ease-out duration-700
                    ${isActive ? ' text-white bg-opacity-0 shadow-[inset_10px_10px_10px_rgba(0,0,0,0.05),15px_25px_10px_rgba(0,0,0,0.05),15px_20px_20px_rgba(0,0,0,0.05),inset_0px_-5px_7px_rgba(255,255,255,0.9)]' : 'border-transparent text-gray-400 hover:bg-black/50 hover:scale-110 hover:text-white'}`
                }
            >
                    <TiHome /> Home
                </NavLink>
            )}
            {(isAdmin || isCocina) && (
                <NavLink to="/hot" 
                className={({ isActive }) =>
                    `flex items-center w-[150px] justify-center p-3 gap-1 rounded-2xl transition-all ease-out duration-700
                    ${isActive ? ' text-white bg-opacity-0 shadow-[inset_10px_10px_10px_rgba(0,0,0,0.05),15px_25px_10px_rgba(0,0,0,0.05),15px_20px_20px_rgba(0,0,0,0.05),inset_0px_-5px_7px_rgba(255,255,255,0.9)]' : 'border-transparent text-gray-400 hover:bg-black/50 hover:scale-110 hover:text-white'}`
                }
            >
                    <FaHotjar className="w-5 h-5" /> Hot
                </NavLink>
            )}

            {(isAdmin || isFrios) && (
                <NavLink to="/cold"
                className={({ isActive }) =>
                    `flex items-center w-[150px] justify-center p-3 gap-1 rounded-2xl transition-all ease-out duration-700
                    ${isActive ? ' text-white bg-opacity-0 shadow-[inset_10px_10px_10px_rgba(0,0,0,0.05),15px_25px_10px_rgba(0,0,0,0.05),15px_20px_20px_rgba(0,0,0,0.05),inset_0px_-5px_7px_rgba(255,255,255,0.9)]' : 'border-transparent text-gray-400 hover:bg-black/50 hover:scale-110 hover:text-white'}`
                }
            >
                    <PiThermometerColdFill className="w-5 h-5" /> Cold
                </NavLink>
            )}

            {(isAdmin || isBar) && (
                <NavLink to="/bar"
                className={({ isActive }) =>
                    `flex items-center w-[150px] justify-center p-3 gap-1 rounded-2xl transition-all ease-out duration-700
                    ${isActive ? ' text-white bg-opacity-0 shadow-[inset_10px_10px_10px_rgba(0,0,0,0.05),15px_25px_10px_rgba(0,0,0,0.05),15px_20px_20px_rgba(0,0,0,0.05),inset_0px_-5px_7px_rgba(255,255,255,0.9)]' : 'border-transparent text-gray-400 hover:bg-black/50 hover:scale-110 hover:text-white'}`
                }>
                    <BiSolidDrink className="w-5 h-5" /> Bar
                </NavLink>
            )}
            {(isAdmin || isMesero) && (
                <NavLink to="/orders"
                className={({ isActive }) =>
                    `flex items-center w-[150px] justify-center p-3 gap-1 rounded-2xl transition-all ease-out duration-700
                    ${isActive ? ' text-white bg-opacity-0 shadow-[inset_10px_10px_10px_rgba(0,0,0,0.05),15px_25px_10px_rgba(0,0,0,0.05),15px_20px_20px_rgba(0,0,0,0.05),inset_0px_-5px_7px_rgba(255,255,255,0.9)]' : 'border-transparent text-gray-400 hover:bg-black/50 hover:scale-110 hover:text-white'}`
                }
            >
                    <FaConciergeBell className="w-5 h-5" /> Orders
                </NavLink>
            )}
            {(isAdmin || isCajero) && (
                <NavLink to="/bill"
                className={({ isActive }) =>
                    `flex items-center w-[150px] justify-center p-3 gap-1 rounded-2xl transition-all ease-out duration-700
                    ${isActive ? ' text-white bg-opacity-0 shadow-[inset_10px_10px_10px_rgba(0,0,0,0.05),15px_25px_10px_rgba(0,0,0,0.05),15px_20px_20px_rgba(0,0,0,0.05),inset_0px_-5px_7px_rgba(255,255,255,0.9)]' : 'border-transparent text-gray-400 hover:bg-black/50 hover:scale-110 hover:text-white'}`
                }
            >
                    <AiOutlineContainer className="w-5 h-5" /> Bill
                </NavLink>
            )}
        </nav>
    );
}

export default BottomNav;
