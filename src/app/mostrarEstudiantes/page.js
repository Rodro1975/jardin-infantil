"use client";

import { useEffect, useState } from "react";
import supabase from "@/utils/supabaseClient";
import ActualizarEstudiante from "@/components/ActualizarEstudiante";
import WorkBar from "@/components/WorkBar";
import { FaSearch } from "react-icons/fa";

export default function MostrarEstudiantes() {
    const [estudiantes, setEstudiantes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [currentEstudiante, setCurrentEstudiante] = useState(null);
    const [searchTerm, setSearchTerm] = useState(""); 

    // Función para obtener los datos de la tabla
    const fetchEstudiantes = async () => {
        setLoading(true);
        const { data, error } = await supabase.from("estudiantes").select("*");

        if (error) {
            setError(error.message);
        } else {
            setEstudiantes(data);
        }
        setLoading(false);
    };

    // Función para eliminar un registro
    const handleDelete = async (id) => {
        if (confirm("¿Estás seguro de que deseas eliminar este estudiante?")) {
            const { error } = await supabase.from("estudiantes").delete().eq("id", id);

            if (error) {
                console.error("Error al eliminar:", error.message);
            } else {
                fetchEstudiantes(); // Refrescar la lista después de eliminar
            }
        }
    };

    // Efecto para cargar los datos al montar el componente
    useEffect(() => {
        fetchEstudiantes();
    }, []);

    // Filtrar estudiantes por nombre
    const filteredEstudiantes = estudiantes.filter((estudiante) =>
        estudiante.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!loading && estudiantes.length === 0) return <p>No se encontraron estudiantes.</p>;

    return (
        <div>
            {/* WorkBar en la parte superior */}
            <WorkBar />

            {/* Contenedor principal con fondo */}
            <div
                className="flex flex-col items-center bg-blue-50 py-8 min-h-screen"
                style={{ backgroundImage: "url('/kinder2.jpg')", backgroundSize: "cover" }}
            >
                {/* Barra de búsqueda sobre la imagen */}
                <div className="relative z-10 mb-6 w-full max-w-md">
                    <div className="flex justify-center items-center mb-6">
                        <input
                            type="text"
                            placeholder="Buscar por nombre..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)} // Actualiza el estado al escribir
                            className="w-full px-4 py-2 border rounded-l-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-blue"
                        />
                        <button className="bg-soft-pink text-white px-4 py-2 rounded-r-lg hover:bg-pink-600 transition duration-300">
                            <FaSearch className="icon" />
                        </button>
                    </div>
                </div>

                <h1 className="text-3xl font-bold text-blue-700 mb-6">Lista de Estudiantes</h1>
                
                {/* Tabla de estudiantes */}
                <div className="overflow-auto w-full max-w-screen-lg shadow-lg rounded-lg bg-white bg-opacity-90">
                    <table className="min-w-full text-left text-sm">
                        <thead className="bg-blue-200 text-blue-800">
                            <tr>
                                <th className="border px-4 py-2">Id</th>
                                <th className="border px-4 py-2">Última modificación</th>
                                <th className="border px-4 py-2">Nombre</th>
                                <th className="border px-4 py-2">Salón</th>
                                <th className="border px-4 py-2">Acudiente</th>
                                <th className="border px-4 py-2">Edad</th>
                                <th className="border px-4 py-2">Género</th>
                                <th className="border px-4 py-2">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredEstudiantes.map((estudiante) => (
                                <tr key={estudiante.id} className="even:bg-blue-50 hover:bg-blue-100 transition duration-200">
                                    <td className="border px-4 py-2">{estudiante.id}</td>
                                    <td className="border px-4 py-2">{estudiante.modified_at}</td>
                                    <td className="border px-4 py-2">{estudiante.nombre}</td>
                                    <td className="border px-4 py-2">{estudiante.salon}</td>
                                    <td className="border px-4 py-2">{estudiante.acudiente}</td>
                                    <td className="border px-4 py-2">{estudiante.edad}</td>
                                    <td className="border px-4 py-2">{estudiante.genero}</td>
                                    <td className="border px-4 py-2 space-x-2">
                                        <button onClick={() => handleDelete(estudiante.id)} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">
                                            Eliminar
                                        </button>
                                        <button onClick={() => {
                                            setCurrentEstudiante(estudiante);
                                            setIsEditing(true);
                                        }} className="bg-yellow-400 text-white px-4 py-2 rounded hover:bg-yellow-500 transition">
                                            Modificar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal para actualizar estudiante */}
            {isEditing && currentEstudiante && (
                <ActualizarEstudiante
                    estudiante={currentEstudiante}
                    onClose={() => setIsEditing(false)}
                    onUpdate={fetchEstudiantes}
                />
            )}
        </div>
    );
}







