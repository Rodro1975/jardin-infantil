import Image from "next/image";

export default function Home() {
  return (
    <div className="relative flex items-center justify-start min-h-screen p-8 pb-20 gap-16 sm:p-20 bg-gradient-to-r from-blue-200 to-yellow-100">
      <div className="max-w-lg z-10">
        <h1 className="text-5xl font-bold text-blue-800 mb-4">
          Bienvenido al Jardín de Niños
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          Fomentamos el aprendizaje y la creatividad en un ambiente seguro y divertido.
        </p>
        <button className="px-6 py-3 bg-pink-500 text-white rounded-lg shadow-md hover:bg-pink-600 transition duration-300">
          Inicia Sesión Ahora!
        </button>
      </div>
      <div className="hidden md:block absolute right-0 top-0 h-full w-full">
        <Image
          src="/kinder.jpg" // Cambia esto por la ruta a tu imagen
          alt="Imagen representativa del jardín de niños"
          layout="fill"
          objectFit="cover"
          priority
        />
      </div>
    </div>
  );
}