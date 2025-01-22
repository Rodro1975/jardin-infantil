"use client";

import React, { useState } from "react";
import supabase from "@/utils/supabaseClient";
import getBaseUrl from "@/utils/getBaseUrl"; // Importa la función

export default function LoginPage() {
    const [email, setEmail] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const redirectUrl = `${getBaseUrl()}dashboard`; // Genera la URL dinámica
        const { error } = await supabase.auth.signInWithOtp({
            email,
            options: {
                emailRedirectTo: redirectUrl, // Usa la URL dinámica
            },
        });

        if (error) {
            console.error("Error al enviar el enlace mágico:", error.message);
        } else {
            alert("Se ha enviado un enlace mágico a tu correo."); // Mensaje al usuario
            setEmail(""); // Limpia el formulario después de enviar
        }
    };

    return (
        <section className="flex items-center justify-center min-h-screen p-8 bg-gradient-to-r from-blue-200 to-yellow-100">
            <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
                <h1 className="text-2xl font-bold text-center mb-6">Jardín Infantil</h1>
                <h2 className="text-xl font-semibold text-center mb-4">Inicia sesión en tu cuenta</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Tu correo electrónico
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 transition duration-300"
                    >
                        Enviar Enlace Mágico
                    </button>
                </form>
                <p className="mt-4 text-center text-sm">
                    Al solicitar el enlace mágico, recibirás una invitación en tu correo electrónico.
                </p>
            </div>
        </section>
    );
}





