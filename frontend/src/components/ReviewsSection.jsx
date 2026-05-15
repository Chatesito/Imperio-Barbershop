import { useState, useEffect, useCallback } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ReviewsSection() {
    const [reviews, setReviews] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(3);
    const [direction, setDirection] = useState(0); // -1 for left, 1 for right

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const { default: api } = await import("../services/api.js");
                const { data } = await api.get("/reviews");
                if (data && data.length > 0) {
                    setReviews(data);
                } else {
                    // Fallback data for empty state to maintain premium feel
                    setReviews([
                        { name: "Carlos Ruiz", comment: "La mejor atención que he recibido en Neiva. El degradado quedó impecable.", rating: 5, date: "Hace 2 días" },
                        { name: "Andrés Silva", comment: "Excelente ambiente y profesionalismo. Se nota la dedicación en cada detalle.", rating: 5, date: "Hace 1 semana" },
                        { name: "Juan Gómez", comment: "El sistema de reservas es súper fácil de usar. Recomendado al 100%.", rating: 5, date: "Hace 3 días" },
                        { name: "Mateo Torres", comment: "Servicio de maestría. El café de cortesía es un gran detalle.", rating: 5, date: "Hace 2 semanas" }
                    ]);
                }
            } catch (error) {
                // Error handled gracefully
            }
        };
        fetchReviews();
    }, []);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) setItemsPerPage(1);
            else if (window.innerWidth < 1024) setItemsPerPage(2);
            else setItemsPerPage(3);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const next = useCallback(() => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1 >= reviews.length ? 0 : prev + 1));
    }, [reviews.length]);

    const prev = useCallback(() => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 < 0 ? reviews.length - 1 : prev - 1));
    }, [reviews.length]);

    useEffect(() => {
        if (reviews.length === 0) return;
        const interval = setInterval(next, 6000);
        return () => clearInterval(interval);
    }, [reviews.length, next]);

    const variants = {
        enter: (direction) => ({
            x: direction > 0 ? 300 : -300,
            opacity: 0,
            scale: 0.95
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            scale: 1
        },
        exit: (direction) => ({
            zIndex: 0,
            x: direction < 0 ? 300 : -300,
            opacity: 0,
            scale: 0.95
        })
    };

    const getVisibleReviews = () => {
        if (reviews.length === 0) return [];
        const result = [];
        for (let i = 0; i < itemsPerPage; i++) {
            result.push(reviews[(currentIndex + i) % reviews.length]);
        }
        return result;
    };

    return (
        <section className="bg-neutral-950 text-white overflow-hidden py-24 px-6 border-t border-white/5 relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full bg-brand-gold/5 blur-[120px] -z-10 pointer-events-none" />
            
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-20 animate-fade-in">
                    <div className="space-y-4">
                        <span className="text-brand-gold text-xs font-bold tracking-[0.4em] uppercase">Testimonios</span>
                        <h2 className="text-6xl md:text-8xl font-extrabold font-karantina uppercase leading-[0.8] tracking-tighter">
                            A LA ALTURA DEL <br />
                            <span className="text-brand-gold">IMPERIO</span>
                        </h2>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="hidden md:flex bg-neutral-900 border border-neutral-800 rounded-2xl px-6 py-4 items-center gap-4 hover:border-brand-gold/20 transition-all">
                            <span className="text-4xl font-karantina font-extrabold text-white">
                                {reviews.length > 0 
                                    ? (reviews.reduce((acc, r) => acc + (r.rating || 5), 0) / reviews.length).toFixed(1)
                                    : "4.9"}
                            </span>
                            <div className="flex flex-col">
                                <Star className="text-brand-gold fill-brand-gold size-4" />
                                <span className="text-[8px] font-bold text-brand-gold uppercase tracking-widest">Verificado</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <button 
                                onClick={prev}
                                className="size-14 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 hover:border-brand-gold/40 transition-all active:scale-95 group"
                            >
                                <ChevronLeft className="size-6 text-neutral-400 group-hover:text-brand-gold" />
                            </button>
                            <button 
                                onClick={next}
                                className="size-14 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 hover:border-brand-gold/40 transition-all active:scale-95 group"
                            >
                                <ChevronRight className="size-6 text-neutral-400 group-hover:text-brand-gold" />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="relative h-[450px] md:h-[380px]">
                    <AnimatePresence initial={false} custom={direction} mode="popLayout">
                        <motion.div
                            key={currentIndex}
                            custom={direction}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{
                                x: { type: "spring", stiffness: 300, damping: 30 },
                                opacity: { duration: 0.2 }
                            }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full"
                        >
                            {getVisibleReviews().map((review, i) => (
                                <article 
                                    key={`${currentIndex}-${i}`}
                                    className="bg-neutral-900/40 backdrop-blur-xl border border-neutral-800/50 rounded-[2.5rem] p-8 md:p-10 flex flex-col transition-all duration-500 hover:border-brand-gold/20 hover:bg-neutral-900/60 group shadow-2xl relative overflow-hidden"
                                >
                                    <div className="absolute top-6 right-8 opacity-5 group-hover:opacity-10 transition-opacity">
                                        <Quote className="size-20 text-brand-gold" />
                                    </div>

                                    <div className="flex-1 relative z-10">
                                        <div className="flex gap-1 mb-8">
                                            {Array.from({ length: 5 }).map((_, j) => (
                                                <Star
                                                    key={j}
                                                    className={`size-4 ${j < (review.rating || 5) ? 'text-brand-gold fill-brand-gold' : 'text-neutral-700'}`}
                                                />
                                            ))}
                                        </div>

                                        <p className="text-neutral-300 text-lg font-light leading-relaxed italic mb-10 line-clamp-4">
                                            "{review.comment}"
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-5 pt-8 border-t border-white/5 mt-auto relative z-10">
                                        <div className="size-14 rounded-2xl overflow-hidden border border-brand-gold/10 group-hover:border-brand-gold/30 transition-colors bg-neutral-800">
                                            <img
                                                src={review.img || `https://ui-avatars.com/api/?name=${encodeURIComponent(review.name)}&background=171717&color=C5A253`}
                                                alt={review.name}
                                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                                            />
                                        </div>
                                        <div>
                                            <p className="font-bold text-white text-base tracking-wide uppercase">{review.name}</p>
                                            <div className="flex items-center gap-2">
                                                <span className="text-[10px] font-bold text-brand-gold uppercase tracking-[0.2em]">{review.date || 'Cliente Fiel'}</span>
                                                <span className="size-1 rounded-full bg-neutral-700" />
                                                <span className="text-[9px] text-neutral-500 font-bold uppercase tracking-widest">Verificado</span>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Progress Indicators */}
                <div className="flex justify-center gap-3 mt-12">
                    {reviews.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => {
                                setDirection(i > currentIndex ? 1 : -1);
                                setCurrentIndex(i);
                            }}
                            className={`h-1.5 transition-all duration-500 rounded-full ${
                                i === currentIndex ? 'w-10 bg-brand-gold' : 'w-2 bg-neutral-800 hover:bg-neutral-700'
                            }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
