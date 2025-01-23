"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import supabase from "@/utils/supabaseClient"; 
import { useState } from "react";

// Esquema de validación con Zod
const RegisterUserSchema = z.object({
    nombre: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres." }),
    salon: z.string().min(1, { message: "El salón es requerido." }),
    acudiente: z.string().min(1, { message: "El acudiente es requerido." }),    
    edad: z.preprocess(
        (val) => {
            const parsed = parseFloat(val);
            return isNaN(parsed) ? undefined : parsed;
        },
        z.number().optional().refine((val) => val === undefined || val > 0, {
            message: "La edad debe ser un número positivo.",
        })
    ),
    genero: z.string().min(1, { message: "El género es requerido." }),  
});

const FormEstudiantes = () => {
    const [successMessage, setSuccessMessage] = useState(""); 
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(RegisterUserSchema),
    });

    const onSubmit = async (data) => {
        console.log("Datos antes de enviar:", data);

        // Sanitizar datos antes de enviar a Supabase
        const sanitizedData = {
            ...data,
            edad: data.edad === "" ? null : data.edad,
        };

        console.log("Sanitized data before sending:", sanitizedData);

        // Enviar los datos a Supabase
        const { data: insertData, error } = await supabase
            .from("estudiantes") 
            .insert([sanitizedData]);

        if (error) {
            console.error("Error al insertar datos:", error);
            setSuccessMessage(""); 
        } else {
            console.log("Datos insertados:", insertData);
            setSuccessMessage("Datos registrados correctamente."); 
            reset(); 
        }
    };

    return (
        <section className="min-h-screen p-8 bg-gradient-to-r from-blue-200 to-yellow-100">
        <div className="flex items-center justify-center h-screen ">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
                <h2 className="text-2xl font-bold text-center mb-4 text-blue-500">
                    Registrar un Estudiante
                </h2>
                <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="mb-4">
                        <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">Nombre</label>
                        <input
                            id="nombre"
                            type="text"
                            {...register("nombre")}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                            placeholder="Ingresa el nombre del Estudiante"
                        />
                        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="salon" className="block text-sm font-medium text-gray-700">Salón</label>
                        <input
                            id="salon"
                            type="text"
                            {...register("salon")}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                            placeholder="Ingresa el salón"
                        />
                        {errors.salon && <p className="text-red-500">{errors.salon.message}</p>}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="acudiente" className="block text-sm font-medium text-gray-700">Acudiente</label>
                        <input
                            id="acudiente"
                            type="text"
                            {...register("acudiente")}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                            placeholder="Ingresa el nombre del acudiente"
                        />
                        {errors.acudiente && <p className="text-red-500">{errors.acudiente.message}</p>}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="edad" className="block text-sm font-medium text-gray-700">Edad</label>
                        <input
                            id="edad"
                            type="number"
                            {...register("edad")}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                            placeholder="Ingresa la edad del estudiante"
                        />
                        {errors.edad && <p className="text-red-500">{errors.edad.message}</p>}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="genero" className="block text-sm font-medium text-gray-700">Género</label>
                        <select
                            id="genero"
                            {...register("genero")}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                        >
                            <option value="">Selecciona el Género</option>
                            <option value="femenino">Femenino</option>
                            <option value="masculino">Masculino</option>              
                        </select>
                        {errors.genero && <p className="text-red-500">{errors.genero.message}</p>}
                    </div>             

                    <button
                        type="submit"
                        className="w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 transition duration-300"
                    >
                        Registrar Estudiante
                    </button>
                </form>

                {successMessage && (
                    <p className="mt-4 text-green-600 text-center">{successMessage}</p>
                )}
            </div>
        </div>
        </section>
    );
};

export default FormEstudiantes;


  