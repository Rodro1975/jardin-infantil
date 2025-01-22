import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative flex flex-col sm:flex-row items-center justify-start min-h-screen p-8 pb-20 gap-16 sm:p-20 bg-gradient-to-r from-blue-200 to-yellow-100">
      <div className="max-w-lg z-10">
        <h1 className="text-5xl font-bold text-blue-800 mb-4">
          Bienvenido al Jardín de Niños
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          Fomentamos el aprendizaje y la creatividad en un ambiente seguro y divertido.
        </p>
        <Link href="/login">
          <button className="px-6 py-3 bg-pink-500 text-white rounded-lg shadow-md hover:bg-pink-600 transition duration-300">
            Inicia Sesión Ahora!
          </button>
        </Link>
      </div>
      <div className="absolute inset-0 z-0 h-full w-full">
        <Image
          src="/kinder.jpg"
          alt="Imagen representativa del jardín de niños"
          fill
          className="object-cover"
          priority
        />
      </div>
    </div>
  );
}



