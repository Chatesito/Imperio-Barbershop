import { useEffect, useState } from "react";
import { Facebook, Instagram, Twitter, Award, Star, Scissors, Users } from "lucide-react";

function TeamCard({ img, name, role, bio }) {
    return (
        <article className="relative rounded-[2.5rem] overflow-hidden group border border-neutral-800 transition-all duration-700 hover:border-brand-gold/40 shadow-2xl">
            {/* Imagen con zoom y filtro */}
            <div className="absolute inset-0 overflow-hidden">
                <img
                    src={img}
                    alt={name}
                    className="w-full h-full object-cover transform scale-105 group-hover:scale-100 transition duration-700 grayscale group-hover:grayscale-0 opacity-60 group-hover:opacity-100"
                    loading="lazy"
                    decoding="async"
                />
            </div>
            
            {/* Overlay gradiente */}
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
            
            {/* Contenido */}
            <div className="relative z-10 p-8 pt-64 min-h-[460px] flex flex-col justify-end">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <span className="text-brand-gold font-bold text-xs uppercase tracking-[0.3em] mb-2 block">{role}</span>
                    <h3 className="text-white font-karantina font-extrabold text-4xl leading-none uppercase mb-4">{name}</h3>
                    <p className="text-neutral-400 text-sm leading-relaxed mb-6 font-light overflow-hidden line-clamp-2 group-hover:line-clamp-none transition-all duration-500">
                        {bio}
                    </p>

                    <div className="flex items-center gap-4 text-neutral-500 group-hover:text-brand-gold transition-colors duration-500">
                        <a href="#" aria-label="Facebook" className="hover:scale-110 transition-transform">
                            <Facebook className="size-5" />
                        </a>
                        <a href="#" aria-label="Twitter" className="hover:scale-110 transition-transform">
                            <Twitter className="size-5" />
                        </a>
                        <a href="#" aria-label="Instagram" className="hover:scale-110 transition-transform">
                            <Instagram className="size-5" />
                        </a>
                    </div>
                </div>
            </div>
        </article>
    );
}

function SkeletonCard() {
    return (
        <article className="relative rounded-[2.5rem] overflow-hidden bg-neutral-900/50 border border-neutral-800 animate-pulse">
            <div className="p-8 pt-64 min-h-[460px] flex flex-col justify-end gap-4">
                <div className="h-4 w-1/4 bg-neutral-800 rounded-full" />
                <div className="h-10 w-3/4 bg-neutral-800 rounded-xl" />
                <div className="h-20 w-full bg-neutral-800 rounded-xl" />
                <div className="flex gap-4">
                    <div className="size-6 bg-neutral-800 rounded-full" />
                    <div className="size-6 bg-neutral-800 rounded-full" />
                </div>
            </div>
        </article>
    );
}

export default function OurTeam() {
    const [characters, setCharacters] = useState([]);
    const [gallery, setGallery] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError("");
                const { default: api } = await import("../services/api.js");
                const [staffRes, galleryRes] = await Promise.all([
                    api.get("/staff"),
                    api.get("/gallery")
                ]);
                setCharacters(staffRes.data);
                setGallery(galleryRes.data);
            } catch (e) {
                console.error(e);
                setError("Ocurrió un error cargando los datos del Imperio.");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const mergedTeam = characters.map((c) => ({
        name: c.name,
        img: c.imageUrl,
        role: c.role,
        bio: c.bio,
    }));

    return (
        <main className="bg-neutral-950 text-white selection:bg-brand-gold selection:text-neutral-950">
            {/* Título SECCION */}
            <section className="relative py-24 px-6 overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-gold/5 blur-[120px] -z-10" />
                <div className="max-w-7xl mx-auto text-center space-y-4 animate-fade-in-up">
                    <span className="text-brand-gold text-xs font-bold tracking-[0.4em] uppercase">Los Maestros</span>
                    <h1 className="text-6xl md:text-8xl font-extrabold font-karantina uppercase leading-[0.8] tracking-tighter">
                        NUESTRO <br />
                        <span className="text-brand-gold">EQUIPO</span>
                    </h1>
                    <p className="max-w-xl mx-auto text-neutral-500 font-light text-lg">
                        Artistas del corte y guardianes de la tradición. Conoce a los profesionales que forjan cada estilo con precisión imperial.
                    </p>

                    {/* Grid de tarjetas */}
                    <div className="mt-20 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
                        {loading &&
                            Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={`sk-${i}`} />)}

                        {!loading && !error &&
                        mergedTeam.map((p, idx) => (
                            <TeamCard key={p.name + idx} {...p} />
                        ))}

                        {!loading && error && (
                            <div className="sm:col-span-2 lg:col-span-3 text-center p-20 border border-red-500/20 rounded-3xl bg-red-500/5">
                                <p className="text-red-500 font-bold">{error}</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Métricas / Stats */}
            <section className="py-24 bg-neutral-900/50 border-y border-white/5 relative">
                <div className="max-w-7xl mx-auto px-6 grid gap-12 md:grid-cols-3 text-center">
                    {[
                        { icon: Scissors, value: "4500+", label: "Cortes Maestros" },
                        { icon: Star, value: "2500+", label: "Afeitados de Lujo" },
                        { icon: Users, value: "4", label: "Sedes Reales" }
                    ].map((stat, i) => (
                        <div key={i} className="space-y-4 group">
                            <div className="flex justify-center">
                                <div className="size-16 rounded-2xl bg-brand-gold/10 flex items-center justify-center text-brand-gold group-hover:bg-brand-gold group-hover:text-neutral-950 transition-all duration-500 transform group-hover:rotate-12">
                                    <stat.icon className="size-8" />
                                </div>
                            </div>
                            <div className="text-5xl md:text-7xl font-karantina font-extrabold text-white tracking-tight">{stat.value}</div>
                            <div className="text-xs font-bold text-brand-gold uppercase tracking-[0.4em]">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Galería Premium */}
            <section className="py-32 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20 space-y-4">
                        <h2 className="text-brand-gold text-sm font-bold uppercase tracking-[0.5em]">El Arte en Detalle</h2>
                        <h3 className="text-4xl md:text-6xl font-karantina font-extrabold text-white uppercase leading-none">GALERÍA DEL <span className="text-brand-gold">TRONO</span></h3>
                    </div>

                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {gallery.map((item, i) => (
                            <div key={item.url || i} className="group overflow-hidden rounded-[2.5rem] border border-neutral-800 aspect-square shadow-2xl">
                                <img
                                    src={item.url}
                                    alt={`Momentos Imperio ${i + 1}`}
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700 grayscale hover:grayscale-0"
                                    loading="lazy"
                                    decoding="async"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}