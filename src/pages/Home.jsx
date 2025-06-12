import React from "react";
import { FaRegUserCircle } from "react-icons/fa";
import BottomNav from "../components/shared/BottonNav"; 

const Home = () => {
    return (
        <section className="bg-[#1f1f1f] justify-center items-center h-[calc(100vh-8.5rem)] overflow-hidden flex gap-2">
            <div className="flex justify-around gap-5 p-4 transition-all duration-1000 hover:scale-110 hover:gap-8">
                <div className="flex p-4 flex-col items-center justify-center gap-2 flex1/2 bg-[#51515173] rounded-xl text-white w-[300px] shadow-2xl drop-shadow-sm shadow-black transition-all duration-1000 hover:shadow-xl hover:shadow-[#141414]">
                    <h2 className="text-3xl font-bold text-">Brutal</h2>
                    <FaRegUserCircle className="w-40 h-40" />
                    <h2 className="text-2xl text-center"></h2>
                    <h3 className="text-xl font-semibold text-center">Jerry Marino Dominguez Rivera</h3>
                    <p className="font-semibold text-center text-md">Email: jerry@gmail.com</p>
                    <p className="font-semibold text-center text-md">Rol: Administrador</p>
                </div>
                <div className="flex p-4 flex-col items-center justify-center gap-2 flex1/2 bg-[#51515173] rounded-xl text-white w-[300px] shadow-2xl drop-shadow-sm shadow-black transition-all duration-1000 hover:shadow-xl hover:shadow-[#141414]">
                    <h2 className="text-3xl font-bold text-">Estadisticas</h2>
                    <p className="text-xl font-semibold text-white">Mesas Atendidas</p>
                    <p className="p-5 text-2xl font-bold text-white bg-green-500 rounded-xl">15</p>
                    <p className="text-xl font-semibold text-white">Pedidos Realizados</p>
                    <p className="p-5 text-2xl font-bold text-white bg-yellow-400 rounded-xl">36</p>
                </div>
            </div>
            <BottomNav />
        </section>
    );
}
export default Home;