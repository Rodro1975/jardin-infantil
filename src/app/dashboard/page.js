"use client";

import { useState, useEffect } from "react";
import supabase from "@/utils/supabaseClient";
import PanelAdmin from "@/components/PanelAdmin";

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
        <main className="flex flex-col min-h-screen bg-gradient-to-r from-blue-200 to-yellow-100">
            <header 
                className="bg-cover bg-center h-48 flex flex-col items-center justify-center" 
                style={{ backgroundImage: "url('/kinder1.jpg')" }}
            >
                <h1 className="text-4xl font-bold text-sky-blue">
                    Jardín Infantil
                </h1>
                {userEmail && (
                    <h2 className="text-2xl text-soft-pink mt-2">
                        Bienvenido, {userEmail}
                    </h2>
                )}
                <p className="text-lg bg-white bg-opacity-80 p-2 rounded mt-2 text-[#171717]">
                    ¡Gracias por iniciar sesión! Aquí puedes gestionar tu información.
                </p>
            </header>
            <section className="flex-grow flex items-center justify-center">
                {/* Aquí puedes agregar el contenido del panel de trabajo */}
                <PanelAdmin />
            </section>
        </main>
    );
}





