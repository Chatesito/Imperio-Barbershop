import { useState, useEffect } from "react";
import { Star } from "lucide-react";

export default function ReviewsSection() {
    const reviews = [
        {
            name: "Daniel Herrera",
            rating: 5,
            date: "Hace 3 semanas",
            img: "/images/reviews/review1.png",
            comment:
                "Excelente servicio, barberos muy profesionales. El ambiente es agradable y salí con el mejor corte que me he hecho.",
        },
        {
            name: "Camilo Vargas",
            rating: 4,
            date: "Hace 1 mes",
            img: "/images/reviews/review2.png",
            comment:
                "Muy buena atención y cortes de calidad. Un poco lleno a veces, pero vale la pena totalmente.",
        },
        {
            name: "Andrés Rojas",
            rating: 5,
            date: "Hace 2 semanas",
            img: "/images/reviews/review3.png",
            comment:
                "Barbería impecable, herramientas limpias y un ambiente muy cómodo. Lo recomiendo al cien por ciento.",
        },
        {
            name: "Carlos Muñoz",
            rating: 5,
            date: "Hace 5 días",
            img: "/images/reviews/review4.png",
            comment:
                "La mejor barbería de Neiva. Grande el equipo, siempre me dejan mejor de lo que imagino.",
        },
        {
            name: "Sebastián Liz",
            rating: 4,
            date: "Hace 2 meses",
            img: "/images/reviews/review5.png",
            comment:
                "Servicio rápido y de calidad. Los barberos saben lo que hacen y escuchan lo que uno quiere.",
        },
        {
            name: "Felipe Trujillo",
            rating: 5,
            date: "Hace 1 semana",
            img: "/images/reviews/review6.png",
            comment:
                "Excelente atención, ambiente muy agradable. El corte quedó perfecto. Volveré sin duda.",
        },
    ];

    const [index, setIndex] = useState(0);

    const maxIndex = reviews.length - 3;

    const next = () => setIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
    const prev = () => setIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));

    // scroll automático
    useEffect(() => {
        const interval = setInterval(next, 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="bg-neutral-100 text-neutral-800 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 py-14 md:py-20">

                {/* -------- ENCABEZADO -------- */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-brand-gold tracking-wide">
                            Opiniones de nuestros clientes
                        </h2>
                        <p className="mt-3 max-w-md text-neutral-600">
                            Lo que dicen nuestros clientes nos motiva a seguir mejorando cada día.
                        </p>
                    </div>

                    <div className="bg-white border border-neutral-300 rounded-2xl px-6 py-4 shadow text-center">
                        <p className="text-sm text-neutral-600 mb-1">Calificación general</p>
                        <div className="flex items-center justify-center gap-2">
                            <span className="text-4xl font-extrabold text-neutral-900">4.7</span>
                            <Star className="text-yellow-400 fill-yellow-400" />
                        </div>
                        <p className="text-xs text-neutral-500 mt-1">Basado en reseñas verificadas</p>
                    </div>
                </div>

                {/* -------- SLIDER -------- */}
                <div className="relative overflow-hidden">

                    <div
                        className="flex transition-transform duration-500"
                        style={{ transform: `translateX(-${index * (100 / 3)}%)` }}
                    >
                        {reviews.map((review, i) => (
                            <div
                                key={i}
                                className="w-full sm:w-1/2 lg:w-1/3 px-4 shrink-0 flex"
                            >
                                <article className="bg-white border border-neutral-300 rounded-2xl p-6 shadow-sm w-full flex flex-col">
                                    
                                    {/* perfil */}
                                    <div className="flex items-center gap-4">
                                        <img
                                            src={review.img}
                                            alt={review.name}
                                            className="w-14 h-14 rounded-full object-cover border shadow-sm"
                                        />
                                        <div className="flex flex-col">
                                            <p className="font-bold text-neutral-900">{review.name}</p>
                                            <p className="text-sm text-neutral-500">{review.date}</p>
                                            <div className="flex mt-1">
                                                {Array.from({ length: review.rating }).map((_, j) => (
                                                    <Star
                                                        key={j}
                                                        className="size-4 text-yellow-400 fill-yellow-400"
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* comentario */}
                                    <p className="mt-4 text-neutral-700 text-sm leading-relaxed line-clamp-4">
                                        {review.comment}
                                    </p>
                                </article>
                            </div>
                        ))}
                    </div>

                    {/* botones */}
                    <button
                        onClick={prev}
                        className="absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow border hover:bg-neutral-50"
                    >
                        ‹
                    </button>
                    <button
                        onClick={next}
                        className="absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow border hover:bg-neutral-50"
                    >
                        ›
                    </button>
                </div>

                {/* -------- BULLETS -------- */}
                <div className="flex justify-center mt-6 gap-2">
                    {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setIndex(i)}
                            className={`w-3 h-3 rounded-full transition-all ${
                                i === index
                                    ? "bg-brand-gold scale-110"
                                    : "bg-neutral-400"
                            }`}
                        />
                    ))}
                </div>

            </div>
        </section>
    );
}
