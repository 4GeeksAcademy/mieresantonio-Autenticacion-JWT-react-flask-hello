import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const Private = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        const validateToken = async () => {
            const token = sessionStorage.getItem("token");

            if (!token) {
                navigate("/login");
                return;
            }

            try {
                const resp = await fetch(`${BACKEND_URL}/api/private`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (!resp.ok) {
                    // Token inválido o expirado
                    sessionStorage.removeItem("token");
                    navigate("/login");
                    return;
                }

                const data = await resp.json();
                setUser(data.user);
            } catch (error) {
                console.error(error);
                navigate("/login");
            } finally {
                setIsChecking(false);
            }
        };

        validateToken();
    }, []);

    if (isChecking) {
        return <p className="text-center mt-5">Verificando sesión...</p>;
    }

    return (
        <div className="container mt-5 text-center">
            <h2>Área privada</h2>
            <p>Bienvenido, {user?.email} 🎉</p>
            <p className="text-muted">Solo los usuarios autenticados que inician sesión pueden ver esta página.</p>
        </div>
    );
};