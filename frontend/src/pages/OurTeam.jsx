import { useEffect, useState } from "react";
import { Facebook, Instagram, Twitter } from "lucide-react";

function TeamCard({ img, name, role, bio }) {
    return (
        <article className="relative rounded-3xl overflow-hidden shadow-lg ring-1 ring-black/5">
        {/* Imagen */}
        <img
            src={img}
            alt={name}
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
            decoding="async"
        />
        {/* Overlay oscuro */}
        <div className="absolute inset-0 bg-black/40" />
        {/* Contenido inferior con gradiente */}
        <div className="relative z-10 p-5 md:p-6 mt-auto min-h-[400px] flex flex-col justify-end bg-gradient-to-t from-black/70 via-black/30 to-transparent">
            <h3 className="text-white font-extrabold text-lg md:text-xl tracking-wide uppercase">{name}</h3>
            <p className="text-brand-gold font-semibold text-sm mt-1">{role}</p>
            <p className="text-neutral-200 text-sm mt-3 leading-relaxed">{bio}</p>

            <div className="mt-4 flex items-center gap-4 text-neutral-200">
                <a href="#" aria-label="Facebook" className="hover:text-white">
                    <Facebook className="size-5" />
                </a>
                <a href="#" aria-label="Twitter" className="hover:text-white">
                    <Twitter className="size-5" />
                </a>
                <a href="#" aria-label="Instagram" className="hover:text-white">
                    <Instagram className="size-5" />
                </a>
            </div>
        </div>
    </article>
    );
}

function SkeletonCard() {
    return (
        <article className="relative rounded-3xl overflow-hidden shadow-lg ring-1 ring-black/5">
            <div className="absolute inset-0 bg-neutral-200 animate-pulse" />
            <div className="relative z-10 p-5 md:p-6 mt-auto min-h-[260px] flex flex-col justify-end bg-gradient-to-t from-black/40 via-black/10 to-transparent">
                <div className="h-6 w-2/3 bg-neutral-300 rounded animate-pulse" />
                <div className="h-4 w-1/3 bg-neutral-300 rounded mt-2 animate-pulse" />
                <div className="h-16 w-full bg-neutral-300 rounded mt-3 animate-pulse" />
                <div className="mt-4 flex items-center gap-4">
                    <div className="h-5 w-5 bg-neutral-300 rounded-full animate-pulse" />
                    <div className="h-5 w-5 bg-neutral-300 rounded-full animate-pulse" />
                    <div className="h-5 w-5 bg-neutral-300 rounded-full animate-pulse" />
                </div>
            </div>
        </article>
    );
}

export default function OurTeam() {
    const staticTeam = [
        {
            role: "Gerencia",
            bio: "Dirección y visión integral del servicio, asegurando calidad consistente.",
        },
        {
            role: "Estilista",
            bio: "Creatividad en estilismo y adaptación a tendencias actuales de grooming.",
        },
        {
            role: "Estilista",
            bio: "Atención minuciosa a simetría, transición y armonía del estilo completo.",
        },
        {
            role: "Especialista en Barbería",
            bio: "Optimización de textura y forma para looks versátiles y fáciles de mantener.",
        },
        {
            role: "Especialista en Barbería",
            bio: "Enfoque en cortes clásicos y afeitado preciso con técnicas modernas.",
        },
        {
            role: "Especialista en Barbería",
            bio: "Especialización en fades y detalles limpios orientados a acabado profesional.",
        },
    ];

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
                setError("Ocurrió un error cargando los datos.");
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
        <div className="flex flex-col">
            {/* Título */}
            <section className="bg-white">
                    <div className="max-w-7xl mx-auto px-4 py-10 md:py-12">
                    <h1 className="text-center text-4xl md:text-5xl font-extrabold tracking-wide text-neutral-900" style={{ fontFamily: "inherit" }}>
                        Nuestro Equipo
                    </h1>

                    {/* Grid de tarjetas */}
                    <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {loading &&
                            Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={`sk-${i}`} />)}

                            {!loading && !error &&
                            mergedTeam.map((p, idx) => (
                                <TeamCard key={p.name + idx} {...p} />
                            ))}

                            {!loading && error && (
                            <div className="sm:col-span-2 lg:col-span-3 text-center text-red-600 font-semibold">
                                {error}
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Métricas */}
            <section className="bg-neutral-900 text-white">
                <div className="max-w-7xl mx-auto px-4 py-12 md:py-16 grid gap-8 md:grid-cols-3 text-center">
                    <div>
                        <div className="text-5xl md:text-6xl font-extrabold text-brand-gold">2500</div>
                        <div className="mt-2 tracking-widest text-sm md:text-base">AFEITADAS</div>
                    </div>
                    <div>
                        <div className="text-5xl md:text-6xl font-extrabold text-brand-gold">4500</div>
                        <div className="mt-2 tracking-widest text-sm md:text-base">CORTES DE PELO</div>
                    </div>
                    <div>
                        <div className="text-5xl md:text-6xl font-extrabold text-brand-gold">4</div>
                        <div className="mt-2 tracking-widest text-sm md:text-base">BARBERIAS ABIERTAS</div>
                    </div>
                </div>
            </section>

            {/* Galería */}
            <section className="bg-white">
                <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
                    <h2 className="text-center text-3xl md:text-4xl font-extrabold text-neutral-900 tracking-wide">
                        Experimenta los mejores servicios y estilos en cortes de cabello
                    </h2>

                    <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {gallery.map((item, i) => (
                            <div key={item.url || i} className="rounded-3xl overflow-hidden">
                                <img
                                    src={item.url}
                                    alt={`Gallery ${i + 1}`}
                                    className="w-full h-64 object-cover"
                                    loading="lazy"
                                    decoding="async"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}