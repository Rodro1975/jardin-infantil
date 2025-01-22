"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import supabase from "@/utils/supabaseClient";
import Link from "next/link";

const WorkBar = () => {
    const [isMounted, setIsMounted] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleLogout = async () => {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) {
                console.error("Error al cerrar sesión:", error.message);
            } else {
                router.push("/login");
            }
        } catch (err) {
            console.error("Unexpected error:", err);
        }
    };

    if (!isMounted) return null; // Evita renderizar antes de que se monte el componente

    return (
        <div className="bg-[#FFFACD] p-4 shadow-md flex justify-between items-center">
            <h1 className="text-xl font-bold text-blue-500">Jardin Infantil</h1>
            <button 
                className="sm:hidden text-blue-500 focus:outline-none" 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
                {isMenuOpen ? "✖" : "☰"}
            </button>
            <nav
                className={`${
                    isMenuOpen ? "block" : "hidden"
                } sm:flex sm:space-x-4 absolute sm:static bg-[#FFFACD] top-16 left-0 w-full sm:w-auto sm:bg-transparent z-10`}
            >
                <Link href="/dashboard">
                    <span className="block sm:inline text-pink-500 hover:text-blue-600 transition duration-300 cursor-pointer px-4 py-2 sm:p-0">Volver al Dashboard</span>
                </Link>
                <Link href="/agregarEstudiantes">
                    <span className="block sm:inline text-pink-500 hover:text-blue-600 transition duration-300 cursor-pointer px-4 py-2 sm:p-0">Agregar Estudiante</span>
                </Link>
                <Link href="/mostrarEstudiantes">
                    <span className="block sm:inline text-pink-500 hover:text-blue-600 transition duration-300 cursor-pointer px-4 py-2 sm:p-0">Mostrar Estudiantes</span>
                </Link>
                <Link href="/generarReportes">
                    <span className="block sm:inline text-pink-500 hover:text-blue-600 transition duration-300 cursor-pointer px-4 py-2 sm:p-0">Generar Reportes</span>
                </Link>
                <button 
                    onClick={handleLogout} 
                    className="block sm:inline bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300 mx-auto sm:m-0"
                >
                    Cerrar Sesión
                </button>
            </nav>
        </div>
    );
};

export default WorkBar;


