import { useState } from "react";
import { Scissors, SprayCan, Sparkles } from "lucide-react";

export default function Services() {
    const [openCategory, setOpenCategory] = useState(null);

    const toggleCategory = (index) => {
        setOpenCategory(openCategory === index ? null : index);
    };

    const categories = [
        {
        title: "Corte de Cabello",
        services: [
            { name: "Corte clásico", price: "$25.000" },
            { name: "Fade / Degradado", price: "$30.000" },
            { name: "Corte con diseño", price: "$35.000" },
        ],
        },
        {
        title: "Cuidado de Barba",
        services: [
            { name: "Afeitado clásico", price: "$20.000" },
            { name: "Perfilado con navaja", price: "$25.000" },
            { name: "Tratamiento hidratante", price: "$28.000" },
        ],
        },
        {
        title: "Mascarillas Faciales",
        services: [
            { name: "Mascarilla revitalizante", price: "$18.000" },
            { name: "Limpieza facial profunda", price: "$25.000" },
        ],
        },
        {
        title: "Tintes para el Cabello",
        services: [
            { name: "Tinte completo", price: "$40.000" },
            { name: "Reflejos o mechas", price: "$50.000" },
        ],
        },
        {
        title: "Paquetes Especiales",
        services: [
            { name: "Corte + Barba", price: "$45.000" },
            { name: "Corte + Cejas + Barba", price: "$55.000" },
        ],
        },
    ];

    return (
        <main className="bg-neutral-900 text-white">
        {/* Hero */}
        <section
            className="relative h-[70vh] flex items-center justify-center text-center"
            style={{
            backgroundImage: "url('/images/services-hero.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            }}
        >
            <div className="absolute inset-0 bg-black/60"></div>
            <div className="relative z-10 space-y-4">
            <h1 className="text-4xl md:text-6xl font-extrabold text-brand-gold tracking-wide">
                Nuestros Servicios
            </h1>
            <p className="text-neutral-300 max-w-xl mx-auto">
                Descubre lo mejor del estilo masculino. En Imperio Barbershop cuidamos
                cada detalle para que salgas con tu mejor versión.
            </p>
            <a
                href="#services-list"
                className="inline-block bg-brand-gold text-neutral-900 px-6 py-3 font-semibold rounded-xl hover:bg-yellow-500 transition"
            >
                Ver Servicios
            </a>
            </div>
        </section>

         {/* Sección de presentación */}
        <section className="bg-white py-20 px-8">
            <div className="max-w-7xl mx-auto grid md:grid-cols-2 items-center gap-12">
                <div className="rounded-2xl overflow-hidden shadow-xl">
                    <img
                        src="/images/barber-working.png"
                        alt="Personal barber service"
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="text-left">
                    <h2 className="text-4xl font-extrabold text-gray-900 mb-6 leading-tight">
                        Podemos ofrecerte servicio de peluquería personal en tu casa
                    </h2>
                    <p className="text-gray-600 mb-8 text-lg">
                        Llevamos la experiencia de Imperio Barbershop directamente a tu hogar. 
                        Disfruta de cortes de precisión, afeitados de lujo y cuidado personal 
                        sin salir de casa, con la atención y el estilo que nos caracteriza.
                    </p>

                    <div className="grid grid-cols-3 gap-6 text-center">
                        <div className="p-6 bg-neutral-100 rounded-2xl shadow-inner hover:shadow-md transition">
                            <p className="text-4xl font-bold text-brand-gold">1+</p>
                            <p className="text-sm text-neutral-700 mt-1">Años de experiencia</p>
                        </div>
                        <div className="p-6 bg-neutral-100 rounded-2xl shadow-inner hover:shadow-md transition">
                            <p className="text-4xl font-bold text-brand-gold">500+</p>
                            <p className="text-sm text-neutral-700 mt-1">Clientes felices</p>
                        </div>
                        <div className="p-6 bg-neutral-100 rounded-2xl shadow-inner hover:shadow-md transition">
                            <p className="text-4xl font-bold text-brand-gold">10+</p>
                            <p className="text-sm text-neutral-700 mt-1">Servicios exclusivos</p>
                        </div>
                    </div>

                    <a
                    href="/reservations"
                    className="inline-block mt-6 bg-brand-gold text-neutral-900 px-6 py-3 rounded-xl font-semibold hover:bg-yellow-500 transition"
                    >
                    Reserva tu cita
                    </a>
                </div>
            </div>
        </section>

      {/* Pasos para reservar */}
        <section className="bg-neutral-950 text-white py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto text-center">
            <h3 className="text-3xl md:text-4xl font-bold mb-12">
            Pasos para <span className="text-brand-gold">Reservar</span>
            </h3>

            <div className="grid md:grid-cols-3 gap-8">
            {/* Paso 1 */}
            <div className="p-10 bg-neutral-900 border border-neutral-800 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex justify-center mb-5">
                <Scissors className="text-brand-gold w-10 h-10" />
                </div>
                <h4 className="text-xl font-semibold mb-3">1. Escoge a tu barbero</h4>
                <p className="text-gray-400">
                Elige tu barbero de confianza o conoce a nuestro equipo de profesionales.
                </p>
            </div>

            {/* Paso 2 */}
            <div className="p-10 bg-neutral-900 border border-neutral-800 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex justify-center mb-5">
                <SprayCan className="text-brand-gold w-10 h-10" />
                </div>
                <h4 className="text-xl font-semibold mb-3">2. Escoge tu servicio</h4>
                <p className="text-gray-400">
                Selecciona entre cortes, afeitados, mascarillas, limpieza facial y más.
                </p>
            </div>

            {/* Paso 3 */}
            <div className="p-10 bg-neutral-900 border border-neutral-800 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex justify-center mb-5">
                <Sparkles className="text-brand-gold w-10 h-10" />
                </div>
                <h4 className="text-xl font-semibold mb-3">3. Relájate y disfruta</h4>
                <p className="text-gray-400">
                Disfruta la experiencia Imperio mientras nosotros nos encargamos del resto.
                </p>
            </div>
            </div>
        </div>
        </section>


      {/* Lista de servicios */}
        <section id="services-list" className="bg-white text-neutral-900">
            <div className="max-w-4xl mx-auto px-4 py-20">
            <h2 className="text-3xl font-bold text-center text-brand-gold mb-10">
                Lista de Servicios
            </h2>

            {categories.map((cat, index) => (
                <div
                key={index}
                className="mb-6 border border-neutral-300 rounded-xl overflow-hidden shadow-sm"
                >
                <button
                    onClick={() => toggleCategory(index)}
                    className="w-full flex justify-between items-center px-6 py-4 bg-neutral-100 hover:bg-neutral-200 transition text-left"
                >
                    <span className="font-semibold text-lg">{cat.title}</span>
                    <span className="text-brand-gold">
                    {openCategory === index ? "–" : "+"}
                    </span>
                </button>
                {openCategory === index && (
                    <div className="bg-white px-6 py-4 space-y-2">
                    {cat.services.map((srv, i) => (
                        <div
                        key={i}
                        className="flex justify-between text-neutral-700 border-b border-neutral-200 pb-2"
                        >
                        <span>{srv.name}</span>
                        <span className="text-brand-gold font-medium">
                            {srv.price}
                        </span>
                        </div>
                    ))}
                    </div>
                )}
                </div>
            ))}
            </div>
        </section>
        </main>
    );
}
