import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <section className="relative min-h-screen flex items-center justify-start bg-gradient-to-r from-blue-200 to-yellow-100">
      {/* Imagen de fondo ajustable */}
      <div className="absolute inset-0 z-0 h-full w-full">
        <Image
          src="/kinder.jpg"
          alt="Imagen representativa del jardín de niños"
          fill
          style={{ objectFit: "cover" }}
          priority
        />
      </div>

      {/* Contenido */}
      <div className="z-10 max-w-lg px-8 sm:px-20 text-left text-white">
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
    </section>
  );
}





