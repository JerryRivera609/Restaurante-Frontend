import React from "react";
import { AiOutlineContainer } from "react-icons/ai";
import { MdOutlineRestaurantMenu } from "react-icons/md";
import { FaCircle } from "react-icons/fa";
import { PiCurrencyCircleDollarDuotone } from "react-icons/pi";
import { FaRegCreditCard } from "react-icons/fa";

const Bill = () => {
    return (
        <section className="bg-[#1f1f1f] h-[calc(100vh-5rem)] overflow-hidden flex flex-col gap-2">
            <div className="flex items-center justify-between w-full h-16 px-20 py-5 shadow-md">
                <div className="flex items-center gap-4 text-white">
                <AiOutlineContainer className="w-8 h-7" />
                    <h2 className="text-3xl">Bill</h2>
                </div>
                <div className="flex text-white gap-7">
                    <button className="hover:bg-[#383838] text-[#ababab] text-md p-2 rounded-[10px] transition-all duration-700 ">In Progress</button>
                    <button className="hover:bg-[#383838] text-[#ababab] text-md p-2 rounded-[10px] transition-all duration-700">Completed</button>
                </div>
            </div>

            {/* Facturas */}
            <div className="flex justify-around w-full p-2 overflow-auto">
                <div className="bg-[#cccccc] text-black p-3 rounded-md w-[400px]">
                    <div className="flex items-center justify-center gap-2 m-4 text-3xl text-center">
                        <MdOutlineRestaurantMenu className='text-black h-7 w-7' />
                        <h2>Brutal</h2>
                    </div>
                    <div className="flex justify-between w-full px-4">
                        <div className="flex flex-col mb-6 text-sm text-start">
                            <p>Ticket id: #01</p>
                            <p>Table Number: 04</p>
                            <p>Date: May 08, 2025 12:15 PM</p>
                        </div>
                        <div className="justify-end text-end">
                            <p>Status:</p>
                            <div className="flex items-center p-1 bg-green-500 rounded-md">
                                <FaCircle className="h-3 text-white" />
                                <p className="text-white text-md rounded-xl">Pending</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex mb-2">
                        <div className="flex-[6] bg-red-500 text-start pl-2">Description</div>
                        <div className="flex-[2] bg-green-500 text-center">Cant.</div>
                        <div className="flex-[2] bg-blue-600 text-center">Price</div>
                    </div>
                    <div className="flex mb-2 text-sm">
                        <div className="flex-[6] pl-2 flex flex-col  gap-2">
                            <p>Lomo Saltado</p>
                            <p>Ceviche Clasico</p>
                            <p>Sopa Criolla</p>
                            <p>Ensala César</p>
                            <p>Pisco Sour</p>
                            <p>Mojito</p>
                        </div>
                        <div className="flex-[2] text-center flex flex-col  gap-2">
                            <p>01</p>
                            <p>01</p>
                            <p>01</p>
                            <p>01</p>
                            <p>01</p>
                            <p>01</p>
                        </div>
                        <div className="flex-[2] text-center flex flex-col  gap-2">
                            <p>S/. 25</p>
                            <p>S/. 22</p>
                            <p>S/. 18</p>
                            <p>S/. 16</p>
                            <p>S/. 14</p>
                            <p>S/. 13</p>
                        </div>
                    </div>

                    <hr className="border-black"/>

                    {/* Total */}
                    <div>
                        {/*<div className="flex justify-between w-full px-1">
                            <p>IGV 18%</p>
                            <p>S/. 19.44</p>
                        </div>

                        <hr className="border-black"/>

                        <div className="flex justify-between w-full px-1">
                            <p>Sub Total</p>
                            <p>S/. 108</p>
                        </div>
                        */}
                        <hr className="border-black"/>

                        <div className="flex justify-between w-full px-1">
                            <p>Total</p>
                            <p>S/. 108.00</p>	
                        </div>
                    </div>

                    {/* Botones de Accion */}
                    <div className="flex justify-around py-4">
                        <button className="p-2 text-white rounded-md bg-gradient-to-r from-purple-600 to-green-400">Yape / Plin</button>
                        <button className="flex items-center gap-1 p-2 text-white bg-orange-400 rounded-md"> <PiCurrencyCircleDollarDuotone className="w-6 h-6" /> Efectivo</button>
                        <button className="flex gap-1 p-2 text-white bg-blue-600 rounded-md"><FaRegCreditCard className="w-6 h-6" /> Tarjeta</button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Bill;