"use client";

import { useState, useEffect } from "react";
import supabase from "@/utils/supabaseClient";

export default function DashboardPage() {
    const [userEmail, setUserEmail] = useState("");
    const [error, setError] = useState(null);

    useEffect(() => {
        const getUser = async () => {
            try {
                const { data, error } = await supabase.auth.getUser();
                if (error) {
                    throw new Error(error.message); // Lanza el error si ocurre
                }
                if (data?.user) {
                    setUserEmail(data.user.email);
                } else {
                    setUserEmail("Usuario no autenticado");
                }
            } catch (err) {
                console.error("Error al obtener el usuario:", err.message);
                setError(err.message); // Guarda el mensaje de error para mostrarlo en la UI
            }
        };

        getUser();
    }, []);

    return (
        <main className="flex flex-col items-center justify-center min-h-screen p-8 bg-gradient-to-r from-blue-200 to-yellow-100">
            <header className="text-center">
                <h1 className="text-4xl text-sky-blue font-bold text-shadow-md">
                    Jardín Infantil
                </h1>
                {userEmail && (
                    <h2 className="text-2xl text-soft-pink mt-4">
                        Bienvenido, {userEmail}
                    </h2>
                )}
            </header>
            <p className="mt-8 text-lg text-center">
                {!error
                    ? "¡Gracias por iniciar sesión! Aquí puedes gestionar tu información."
                    : `Error: ${error}`}
            </p>
        </main>
    );
}


