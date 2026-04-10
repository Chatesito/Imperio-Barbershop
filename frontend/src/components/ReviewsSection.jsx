import { useState, useEffect } from "react";
import { Star } from "lucide-react";

export default function ReviewsSection() {
    const [reviews, setReviews] = useState([]);
    const [index, setIndex] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(3);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const { default: api } = await import("../services/api.js");
                const { data } = await api.get("/reviews");
                setReviews(data);
            } catch (error) {
                console.error("Error loading reviews:", error);
            }
        };
        fetchReviews();
    }, []);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 640) setItemsPerPage(1);
            else if (window.innerWidth < 1024) setItemsPerPage(2);
            else setItemsPerPage(3);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const maxIndex = Math.max(0, reviews.length - itemsPerPage);

    const next = () => setIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
    const prev = () => setIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));

    // scroll automático
    useEffect(() => {
        if (reviews.length === 0) return;
        const interval = setInterval(next, 5000);
        return () => clearInterval(interval);
    }, [reviews.length, maxIndex]);

    return (
        <section className="bg-neutral-950 text-white overflow-hidden py-24 px-6 border-t border-white/5 relative">
            <div className="absolute top-0 left-0 w-1/3 h-full bg-brand-gold/5 blur-[120px] -z-10" />
            
            <div className="max-w-7xl mx-auto">
                {/* -------- ENCABEZADO -------- */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-20 animate-fade-in-up">
                    <div className="space-y-4">
                        <span className="text-brand-gold text-xs font-bold tracking-[0.4em] uppercase">Testimonios</span>
                        <h2 className="text-6xl md:text-8xl font-extrabold font-karantina uppercase leading-[0.8] tracking-tighter">
                            A LA ALTURA DEL <br />
                            <span className="text-brand-gold">IMPERIO</span>
                        </h2>
                        <p className="max-w-md text-neutral-500 font-light text-lg">
                            Lo que dicen nuestros clientes nos motiva a mantener la excelencia en cada corte.
                        </p>
                    </div>

                    <div className="bg-neutral-900 border border-neutral-800 rounded-[2rem] px-10 py-8 shadow-2xl flex flex-col items-center gap-2 group hover:border-brand-gold/20 transition-all duration-500">
                        <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Calificación Real</p>
                        <div className="flex items-center gap-4">
                            <span className="text-6xl font-karantina font-extrabold text-white">4.9</span>
                            <div className="flex flex-col">
                                <Star className="text-brand-gold fill-brand-gold size-6" />
                                <span className="text-[10px] font-bold text-brand-gold uppercase tracking-widest mt-1">Verified</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* -------- SLIDER -------- */}
                <div className="relative group">
                    <div className="overflow-hidden">
                        <div
                            className="flex items-stretch transition-transform duration-700 cubic-bezier(0.4, 0, 0.2, 1)"
                            style={{ transform: `translateX(-${index * (100 / itemsPerPage)}%)` }}
                        >
                            {reviews.map((review, i) => (
                                <div
                                    key={i}
                                    style={{ width: `${100 / itemsPerPage}%` }}
                                    className="px-4 shrink-0 flex items-stretch"
                                >
                                    <article className="bg-neutral-900/50 backdrop-blur-md border border-neutral-800 rounded-[2.5rem] p-8 md:p-10 flex flex-col transition-all duration-500 hover:border-brand-gold/20 hover:bg-neutral-900/80 group/card w-full shadow-lg">
                                        <div className="flex-1">
                                            {/* estrellas */}
                                            <div className="flex gap-1 mb-8">
                                                {Array.from({ length: 5 }).map((_, j) => (
                                                    <Star
                                                        key={j}
                                                        className={`size-4 ${j < (review.rating || 5) ? 'text-brand-gold fill-brand-gold' : 'text-neutral-700'}`}
                                                    />
                                                ))}
                                            </div>

                                            {/* comentario */}
                                            <p className="text-neutral-300 text-lg md:text-xl font-light leading-relaxed italic mb-10 line-clamp-6">
                                                "{review.comment}"
                                            </p>
                                        </div>

                                        {/* perfil */}
                                        <div className="flex items-center gap-5 pt-8 border-t border-white/5 mt-auto">
                                            <div className="size-14 rounded-2xl overflow-hidden border border-brand-gold/10 group-hover/card:border-brand-gold/30 transition-colors">
                                                <img
                                                    src={review.img || "https://ui-avatars.com/api/?name=" + review.name}
                                                    alt={review.name}
                                                    className="w-full h-full object-cover grayscale group-hover/card:grayscale-0 transition-all duration-500"
                                                />
                                            </div>
                                            <div>
                                                <p className="font-bold text-white text-base tracking-wide uppercase">{review.name}</p>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-[10px] font-bold text-brand-gold uppercase tracking-[0.2em]">{review.date || 'Cliente Fiel'}</span>
                                                    <span className="size-1 rounded-full bg-neutral-700" />
                                                    <span className="text-[9px] text-neutral-500 font-bold uppercase tracking-widest">Verified</span>
                                                </div>
                                            </div>
                                        </div>
                                    </article>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* botones navegacion */}
                    <div className="hidden md:block">
                        <button
                            onClick={prev}
                            className="absolute -left-6 top-1/2 -translate-y-1/2 size-14 bg-neutral-900 border border-neutral-800 rounded-2xl flex items-center justify-center text-white hover:bg-brand-gold hover:text-neutral-950 hover:border-brand-gold transition-all duration-500 shadow-2xl opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0"
                        >
                            <span className="text-2xl">←</span>
                        </button>
                        <button
                            onClick={next}
                            className="absolute -right-6 top-1/2 -translate-y-1/2 size-14 bg-neutral-900 border border-neutral-800 rounded-2xl flex items-center justify-center text-white hover:bg-brand-gold hover:text-neutral-950 hover:border-brand-gold transition-all duration-500 shadow-2xl opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0"
                        >
                            <span className="text-2xl">→</span>
                        </button>
                    </div>
                </div>

                {/* -------- BULLETS -------- */}
                <div className="flex justify-center mt-16 gap-3">
                    {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setIndex(i)}
                            className={`h-1.5 transition-all duration-500 rounded-full ${
                                i === index
                                    ? "w-12 bg-brand-gold"
                                    : "w-4 bg-neutral-800 hover:bg-neutral-700"
                            }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
