"use client";

import React from "react";
import { FaUserAlt, FaUserPlus, FaFileAlt, FaSearch, FaSignOutAlt } from "react-icons/fa";

const PanelAdmin = () => {
    return (
        <div className="p-6">
            {/* Barra de búsqueda */}
            <div className="flex justify-center items-center mb-6">
                <input
                    type="text"
                    placeholder="Buscar por nombre..."
                    className="w-full max-w-md px-4 py-2 border rounded-l-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-blue"
                />
                <button className="bg-soft-pink text-white px-4 py-2 rounded-r-lg hover:bg-pink-600 transition duration-300">
                    <FaSearch className="icon" />
                </button>
            </div>

            {/* Panel de administración */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg shadow-md p-4 text-center transition-transform transform hover:scale-105">
                    <FaUserPlus className="icon mb-3 mx-auto" />
                    <h3 className="text-xl font-bold text-sky-blue mb-2">Agregar Usuario</h3>
                    <p className="text-gray-600">Añade un nuevo usuario al sistema.</p>
                    <button className="mt-4 px-4 py-2 bg-soft-pink text-white rounded-lg hover:bg-pink-600 transition duration-300">
                        Agregar
                    </button>
                </div>

                <div className="bg-white rounded-lg shadow-md p-4 text-center transition-transform transform hover:scale-105">
                    <FaFileAlt className="icon mb-3 mx-auto" />
                    <h3 className="text-xl font-bold text-sky-blue mb-2">Generar Reporte</h3>
                    <p className="text-gray-600">Crea un reporte de usuarios o actividades.</p>
                    <button className="mt-4 px-4 py-2 bg-soft-pink text-white rounded-lg hover:bg-pink-600 transition duration-300">
                        Generar
                    </button>
                </div>

                <div className="bg-white rounded-lg shadow-md p-4 text-center transition-transform transform hover:scale-105">
                    <FaUserAlt className="icon mb-3 mx-auto" />
                    <h3 className="text-xl font-bold text-sky-blue mb-2">Mostrar Usuarios</h3>
                    <p className="text-gray-600">Visualiza la lista de usuarios registrados.</p>
                    <button className="mt-4 px-4 py-2 bg-soft-pink text-white rounded-lg hover:bg-pink-600 transition duration-300">
                        Mostrar
                    </button>
                </div>

                <div className="bg-white rounded-lg shadow-md p-4 text-center transition-transform transform hover:scale-105">
                    <FaSignOutAlt className="icon mb-3 mx-auto" />
                    <h3 className="text-xl font-bold text-sky-blue mb-2">Cerrar Sesión</h3>
                    <p className="text-gray-600">Finaliza tu sesión actual.</p>
                    <button className="mt-4 px-4 py-2 bg-soft-pink text-white rounded-lg hover:bg-pink-600 transition duration-300">
                        Salir
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PanelAdmin;




