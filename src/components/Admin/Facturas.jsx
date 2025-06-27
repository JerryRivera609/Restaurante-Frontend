import React from 'react';

import { PiMicrosoftExcelLogoFill } from "react-icons/pi";

function Facturas() {
    return (
        <div className="p-5">
            <section className="flex justify-between mb-8">
                <div>
                    <h2 className="mb-1 text-4xl font-semibold text-white font-apple">EMPLEADOS</h2>
                    <p className="text-sm text-gray-100">Información de los Empleados</p>
                </div>
                <div>
                    <button className='relative flex items-center justify-center gap-2 p-4 text-xl font-bold text-green-700 transition-all duration-700 hover:bg-green-700 bg-white/80 backdrop-blur-xl rounded-2xl hover:text-white hover:scale-105'>
                        <PiMicrosoftExcelLogoFill />
                        Añadir
                    </button>
                </div>
            </section>
        </div>
    );
}

export default Facturas;