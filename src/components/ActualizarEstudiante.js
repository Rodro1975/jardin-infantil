"use client";

import { useEffect } from "react";
import supabase from "@/utils/supabaseClient";
import { useForm } from "react-hook-form";

const ActualizarEstudiante = ({ estudiante, onClose, onUpdate }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: estudiante,
  });

  // Reinicia el formulario cuando cambian los datos del estudiante
  useEffect(() => {
    reset(estudiante);
  }, [estudiante, reset]);

  const handleSubmitForm = async (data) => {
    try {
      const { error } = await supabase
        .from("estudiantes")
        .update(data)
        .eq("id", estudiante.id);

      if (error) {
        console.error("Error updating:", error.message);
      } else {
        onUpdate(); // Actualiza la lista de estudiantes
        onClose(); // Cierra el modal
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl">
        <h2 className="text-xl font-bold mb-4 text-blue-500">Modificar Estudiante</h2>
        <form onSubmit={handleSubmit(handleSubmitForm)}>
          <div className="mb-4">
            <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">Nombre</label>
            <input
              type="text"
              id="nombre"
              {...register("nombre", { required: "El nombre es requerido" })}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            />
            {errors.nombre && (
              <p className="text-red-500">{errors.nombre.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="salon" className="block text-sm font-medium text-gray-700">Salón</label>
            <input
              type="text"
              id="salon"
              {...register("salon", { required: "El salón es requerido" })}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            />
            {errors.salon && (
              <p className="text-red-500">{errors.salon.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="acudiente" className="block text-sm font-medium text-gray-700">Acudiente</label>
            <input
              type="text"
              id="acudiente"
              {...register("acudiente", { required: "El acudiente es requerido" })}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            />
            {errors.acudiente && (
              <p className="text-red-500">{errors.acudiente.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="edad" className="block text-sm font-medium text-gray-700">Edad</label>
            <input
              type="number"
              id="edad"
              {...register("edad", {
                required: "La edad es requerida",
                valueAsNumber: true,
                min: { value: 1, message: "La edad debe ser positiva" },
              })}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            />
            {errors.edad && <p className="text-red-500">{errors.edad.message}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="genero" className="block text-sm font-medium text-gray-700">Género</label>
            <select
              id="genero"
              {...register("genero", { required: "Selecciona un género" })}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            >
              <option value="">Selecciona el Género</option>
              <option value="FEMENINO">Femenino</option>
              <option value="MASCULINO">Masculino</option>
            </select>
            {errors.genero && (
              <p className="text-red-500">{errors.genero.message}</p>
            )}
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 transition duration-300"
            >
              Guardar Cambios
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-blue-500 text-white px-4 py-2 rounded ml-2 hover:bg-blue-600 transition duration-300"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ActualizarEstudiante;

