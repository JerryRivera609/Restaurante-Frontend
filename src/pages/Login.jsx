import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext"; // Asegúrate que la ruta esté bien

const Login = () => {
    const [email, setEmail] = useState("");
    const [contrasenia, setContrasenia] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { setUsuario } = useUser();

    const handleLogin = (e) => {
        e.preventDefault();

        // Simular login exitoso
        const usuarioTemporal = {
            email: email || "admin@brutal.com",
            rol: "COCINA", //AQUI USO LOS ROLES QUE YA NADA MÁS FALTA ESO PARA CULMINAAAAAAAR
                            // PROFESORA ANITA 20 POL FAVOOOOOOL 😭😭😭😭😭
        };

        localStorage.setItem("token", "fake-token-desarrollo");
        setUsuario(usuarioTemporal);
        console.log("Login forzado con:", usuarioTemporal);

        navigate("/home");
    };

    useEffect(() => {
        if (error) setError("");
    }, [email, contrasenia]);

    return (
        <div className="relative flex items-center justify-center min-h-screen overflow-hidden text-black bg-black/90">
            <div className="relative z-10 w-full max-w-sm p-10 text-black shadow-lg bg-white/50 backdrop-blur-md rounded-2xl">
                <h2 className="mb-4 text-6xl font-bold text-center">Brutal</h2>
                <h3 className="mb-6 text-xl font-semibold text-center">Iniciar sesión</h3>

                <form onSubmit={handleLogin} className="flex flex-col gap-4">
                    <input
                        type="email"
                        placeholder="Correo"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="px-4 py-2 text-black placeholder-black rounded-lg bg-white/20 focus:outline-none"
                    />
                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={contrasenia}
                        onChange={(e) => setContrasenia(e.target.value)}
                        required
                        className="px-4 py-2 text-black placeholder-black rounded-lg bg-white/20 focus:outline-none"
                    />
                    <button
                        type="submit"
                        className="py-2 mt-2 font-bold text-white transition bg-green-500 rounded-lg hover:bg-green-600"
                    >
                        Entrar
                    </button>
                </form>

                {error && (
                    <p className="mt-4 text-sm text-center text-red-400">{error}</p>
                )}
            </div>
        </div>
    );
};

export default Login;
