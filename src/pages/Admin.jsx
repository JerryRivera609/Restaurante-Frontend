import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import { Empleado, Facturas, Ingresos, Productos} from '../components/Admin';

function Admin() {
    return (
        <div className="container">
            <h1>Admin Page</h1>
            <p>This is the admin page. Only accessible to users with the 'admin' role.</p>
            <nav>
                <Link to="/admin/empleado">Empleado</Link>
                <Link to="/admin/factura">Facturas</Link>
                <Link to="/admin/ingresos">Ingresos</Link>
                <Link to="/admin/productos">Productos</Link>
            </nav>

            {/* Subrutas dentro de /admin */}
            <Routes>
                <Route path="empleado" element={<Empleado />} />
                <Route path="factura" element={<Facturas />} />
                <Route path="ingresos" element={<Ingresos />} />
                <Route path="productos" element={<Productos />} />
            </Routes>
        </div>
    );
}

export default Admin;
