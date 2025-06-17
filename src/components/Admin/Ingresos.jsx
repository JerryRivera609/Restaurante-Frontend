
function Ingresos() {
    return (
        <div className="p-5">
            <section className="flex flex-col justify-center text-center items-centerll item">
                <h2 className="text-3xl font-apple">INGRESOS</h2>
            </section>
            <div className="grid grid-cols-2">
                <div >
                    <h2>SALDO TOTAL</h2>
                </div>
                <div>
                    <h2>EFECTIVO</h2>
                </div>
                <div>
                    <h2>TARJETA</h2>
                </div>
                <div>
                    <h2>YAPE</h2>
                </div>
            </div>
        </div>
    );
}

export default Ingresos;