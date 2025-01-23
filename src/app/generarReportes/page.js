"use client";

import { useState, useEffect } from "react";
import WorkBar from "@/components/WorkBar";
import supabase from "@/utils/supabaseClient";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";

export default function GenerarReportes() {
    const [salon, setSalon] = useState("");
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

    useEffect(() => {
        fetchEstudiantes();
    }, []);

    const handleSearch = () => {
        // Filtrar estudiantes por salón
        return estudiantes.filter(estudiante => estudiante.salon === salon);
    };

    const generateExcel = () => {
        const filteredEstudiantes = handleSearch();
        const worksheet = XLSX.utils.json_to_sheet(filteredEstudiantes);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Estudiantes");
        
        // Genera el archivo Excel y PDF
        XLSX.writeFile(workbook, "Estudiantes.xlsx");
    };

    const generatePDF = () => {
        const filteredEstudiantes = handleSearch();
        const doc = new jsPDF();

        doc.setFontSize(12);
        doc.text("Reporte de Estudiantes", 14, 10);
        
        let yOffset = 20;
        filteredEstudiantes.forEach(estudiante => {
            doc.text(`Nombre: ${estudiante.nombre}, Salón: ${estudiante.salon}, Acudiente: ${estudiante.acudiente}, Edad: ${estudiante.edad}, Género: ${estudiante.genero}`, 14, yOffset);
            yOffset += 10;
        });

        doc.save("Estudiantes.pdf");
    };

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <WorkBar />
            <h1 className="text-2xl font-bold text-center mt-4">Generar Reportes</h1>
            <div className="flex justify-center mt-4">
                <input 
                    type="text" 
                    placeholder="Buscar por salón..." 
                    value={salon} 
                    onChange={(e) => setSalon(e.target.value)} 
                    className="border border-gray-300 rounded-md p-2"
                />
                <button 
                    onClick={generateExcel} 
                    className="ml-2 bg-soft-pink text-white rounded-md px-4 py-2 hover:bg-pink-600 transition duration-300"
                >
                    Descargar Excel
                </button>
                <button 
                    onClick={generatePDF} 
                    className="ml-2 bg-soft-pink text-white rounded-md px-4 py-2 hover:bg-pink-600 transition duration-300"
                >
                    Descargar PDF
                </button>
            </div>
            <h2 className="mt-6 text-xl text-center">Total de Estudiantes en el Salón {salon}: {handleSearch().length}</h2>
        </div>
    );
}
