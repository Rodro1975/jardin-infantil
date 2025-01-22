"use client";

import { useEffect, useState } from "react";
import supabase from "@/utils/supabaseClient";

export default function MostrarEstudiantes() {
  const [estudiantes, setEstudiantes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex flex-col items-center bg-blue-50 py-8 min-h-screen" style={{ backgroundImage: "url('/kinder2.jpg')", backgroundSize: 'cover' }}>
      <h1 className="text-3xl font-bold text-blue-700 mb-6">Lista de Estudiantes</h1>
      <div className="overflow-auto w-full max-w-screen-lg shadow-lg rounded-lg bg-white bg-opacity-90">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-blue-200 text-blue-800">
            <tr>
              <th className="border px-4 py-2">Id</th>
              <th className="border px-4 py-2">Nombre</th>
              <th className="border px-4 py-2">Salón</th>
              <th className="border px-4 py-2">Acudiente</th>
              <th className="border px-4 py-2">Edad</th>
              <th className="border px-4 py-2">Género</th>
              <th className="border px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {estudiantes.map((estudiante) => (
              <tr key={estudiante.id} className="even:bg-blue-50 hover:bg-blue-100 transition duration-200">
                <td className="border px-4 py-2">{estudiante.id}</td>
                <td className="border px-4 py-2">{estudiante.nombre}</td>
                <td className="border px-4 py-2">{estudiante.salon}</td>
                <td className="border px-4 py-2">{estudiante.acudiente}</td>
                <td className="border px-4 py-2">{estudiante.edad}</td>
                <td className="border px-4 py-2">{estudiante.genero}</td>
                <td className="border px-4 py-2 space-x-2">
                  <button
                    onClick={() => handleDelete(estudiante.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                  >
                    Eliminar
                  </button>
                  <button
                    className="bg-yellow-400 text-white px-4 py-2 rounded hover:bg-yellow-500 transition"
                  >
                    Modificar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

