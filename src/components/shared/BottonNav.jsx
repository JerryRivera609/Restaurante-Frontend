import React from "react";
import { Link } from 'react-router-dom';
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
        <nav className="bg-[#1a1a1a] fixed bottom-0 left-0 right-0 flex justify-around h-14 py-2 flex-wrap">
            
            {(isAdmin) && (
                <Link to="/admin" className="text-white flex gap-1 w-[100px] justify-center items-center p-1 rounded-md">
                    <MdAdminPanelSettings className="w-5 h-5" /> Admin
                </Link>
            )}
            {(isAdmin || isCocina || isFrios || isBar || isCajero) && (
                <Link to="/home" className="text-white flex gap-1 w-[100px] justify-center items-center p-1 rounded-md">
                    <TiHome /> Home
                </Link>
            )}
            {(isAdmin || isCocina) && (
                <Link to="/hot" className="text-white flex gap-1 w-[100px] justify-center items-center p-1 rounded-md">
                    <FaHotjar className="w-5 h-5" /> Hot
                </Link>
            )}
            
            {(isAdmin || isFrios) && (
                <Link to="/cold" className="text-white flex gap-1 w-[100px] justify-center items-center p-1 rounded-md">
                    <PiThermometerColdFill className="w-5 h-5" /> Cold
                </Link>
            )}
            
            {(isAdmin || isBar) && (
                <Link to="/bar" className="text-white flex gap-1 w-[100px] justify-center items-center p-1 rounded-md">
                    <BiSolidDrink className="w-5 h-5" /> Bar
                </Link>
            )}
            {(isAdmin || isMesero) && (
                <Link to="/orders" className="text-white flex gap-1 w-[100px] justify-center items-center p-1 rounded-md">
                    <FaConciergeBell className="w-5 h-5" /> Orders
                </Link>
            )}
            {(isAdmin || isCajero) && (
                <Link to="/bill" className="text-white flex gap-1 w-[100px] justify-center items-center p-1 rounded-md">
                    <AiOutlineContainer className="w-5 h-5" /> Bill
                </Link>
            )}
        </nav>
    );
}

export default BottomNav;
