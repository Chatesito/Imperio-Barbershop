import { useState, useEffect } from "react";
import { Scissors, SprayCan, Sparkles, ChevronRight, Clock, Star, MapPin, MousePointerClick } from "lucide-react";

export default function Services() {
    const Object = globalThis.Object; // Prevent local shadowing errors
    const [openCategory, setOpenCategory] = useState(null);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    const toggleCategory = (index) => {
        setOpenCategory(openCategory === index ? null : index);
    };

    useEffect(() => {
        const fetchServices = async () => {
          try {
            const { default: api } = await import("../services/api.js");
            const { data } = await api.get("/services");
            
            // Group flat data back into categories for accordion
            const grouped = data.reduce((acc, current) => {
              const { category, ...rest } = current;
              if (!acc[category]) {
                acc[category] = [];
              }
              acc[category].push(rest);
              return acc;
            }, {});

            const categoriesArray = Object.keys(grouped).map((key) => ({
              title: key,
              services: grouped[key]
            }));

            setCategories(categoriesArray);
            if (categoriesArray.length > 0) setOpenCategory(0); // Open first by default
          } catch (error) {
            console.error("Error loading services:", error);
          } finally {
            setLoading(false);
          }
        };

        fetchServices();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-gold"></div>
            </div>
        );
    }

    return (
        <main className="bg-neutral-950 text-white selection:bg-brand-gold selection:text-neutral-900">
            
            {/* HERO SECTION */}
            <section
                className="relative h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden"
                style={{
                    backgroundImage: "url('/images/services-hero.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-black/20" />
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
                
                <div className="relative z-10 text-center px-6 animate-fade-in-up">
                    <span className="inline-block py-1 px-4 rounded-full bg-brand-gold/10 border border-brand-gold/20 text-brand-gold text-xs font-bold tracking-[0.3em] uppercase mb-6">
                        Menú de Experiencias
                    </span>
                    <h1 className="text-6xl md:text-8xl font-karantina font-extrabold text-white uppercase leading-[0.8] tracking-tighter drop-shadow-2xl">
                        NUESTROS <br />
                        <span className="text-brand-gold">SERVICIOS</span>
                    </h1>
                    <p className="mt-6 text-neutral-400 max-w-xl mx-auto font-light text-lg">
                        Forjamos leyendas a través de la precisión. Descubre el ritual que mejor se adapta a tu carácter.
                    </p>
                    <div className="mt-10 animate-bounce">
                        <a href="#services-list" className="p-4 rounded-full border border-white/10 bg-white/5 inline-block text-brand-gold">
                            <MousePointerClick className="size-6" />
                        </a>
                    </div>
                </div>
            </section>

            {/* SECCIÓN DE EXPERIENCIA (HOME SERVICE) */}
            <section className="py-24 px-6 md:px-12 bg-neutral-950 relative">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-gold/20 to-transparent" />
                
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
                    <div className="relative group order-2 lg:order-1">
                        <div className="absolute -inset-4 bg-brand-gold/5 rounded-3xl blur-3xl opacity-0 group-hover:opacity-100 transition duration-1000" />
                        <div className="relative rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl">
                            <img
                                src="/images/barber-working.png"
                                alt="Personal barber service"
                                className="w-full aspect-[4/5] object-cover filter grayscale hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-60" />
                        </div>
                        <div className="absolute -bottom-6 -right-6 bg-brand-gold p-8 rounded-2xl shadow-2xl hidden md:block animate-float">
                            <MapPin className="size-10 text-neutral-950" />
                        </div>
                    </div>

                    <div className="order-1 lg:order-2 space-y-8">
                        <h2 className="text-sm font-bold text-brand-gold uppercase tracking-[0.4em]">Exclusividad sin Límites</h2>
                        <h3 className="text-5xl md:text-6xl font-karantina font-extrabold text-white uppercase leading-tight">
                            ¿TIEMPO <span className="text-brand-gold italic">LIMITADO?</span> <br />
                            EL IMPERIO VA A TI
                        </h3>
                        <p className="text-neutral-400 text-lg leading-relaxed">
                            Llevamos la maestría de Imperio Barbershop directamente a tu residencia u oficina en Neiva. 
                            Mantenemos los mismos estándares de higiene y herramientas premium en la comodidad de tu espacio personal.
                        </p>

                        <div className="grid grid-cols-2 gap-6 pb-4">
                            <div className="p-6 bg-white/5 border border-white/10 rounded-2xl group hover:border-brand-gold/30 transition-colors">
                                <p className="text-4xl font-karantina font-bold text-brand-gold">500+</p>
                                <p className="text-xs text-neutral-500 uppercase tracking-widest mt-2">Clientes Satisfechos</p>
                            </div>
                            <div className="p-6 bg-white/5 border border-white/10 rounded-2xl group hover:border-brand-gold/30 transition-colors">
                                <p className="text-4xl font-karantina font-bold text-brand-gold">15+</p>
                                <p className="text-xs text-neutral-500 uppercase tracking-widest mt-2">Servicios Únicos</p>
                            </div>
                        </div>

                        <a
                            href="/reservations"
                            className="group relative inline-flex items-center gap-3 bg-brand-gold text-neutral-950 px-8 py-4 rounded-xl font-bold transition-all hover:scale-105 active:scale-95 overflow-hidden"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                RESERVAR AHORA <ChevronRight className="size-5 transition-transform group-hover:translate-x-1" />
                            </span>
                        </a>
                    </div>
                </div>
            </section>

            {/* PASOS PARA RESERVAR */}
            <section className="bg-neutral-900/30 py-24 px-6 relative overflow-hidden">
                <div className="max-w-7xl mx-auto text-center relative z-10">
                    <h3 className="text-4xl md:text-5xl font-karantina font-extrabold text-white uppercase tracking-wider mb-16">
                        EL CAMINO AL <span className="text-brand-gold">DOMINIO</span>
                    </h3>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { icon: Scissors, title: "1. ELIGE AL MAESTRO", desc: "Selecciona el profesional que mejor entienda tu visión." },
                            { icon: SprayCan, title: "2. DEFINE EL RITUAL", desc: "Desde cortes clásicos hasta limpiezas faciales profundas." },
                            { icon: Sparkles, title: "3. TOMA EL TRONO", desc: "Relájate mientras forjamos tu mejor versión." }
                        ].map((item, idx) => (
                            <div key={idx} className="group p-10 bg-neutral-950 border border-neutral-800 rounded-[2rem] hover:border-brand-gold/40 transition-all duration-500 hover:-translate-y-2 shadow-xl">
                                <div className="flex justify-center mb-6">
                                    <div className="size-16 rounded-2xl bg-brand-gold/10 flex items-center justify-center text-brand-gold group-hover:bg-brand-gold group-hover:text-neutral-950 transition-all duration-500">
                                        <item.icon className="size-8" />
                                    </div>
                                </div>
                                <h4 className="text-xl font-bold text-white mb-4 group-hover:text-brand-gold transition-colors">{item.title}</h4>
                                <p className="text-neutral-500 leading-relaxed text-sm">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* LISTA DE SERVICIOS - EL MENÚ DE CABALLERO */}
            <section id="services-list" className="py-24 px-6 bg-neutral-950 relative">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-sm font-bold text-brand-gold uppercase tracking-[0.5em] mb-4">Tarifas y Selecciones</h2>
                        <h3 className="text-5xl md:text-7xl font-karantina font-extrabold text-white uppercase">MENÚ DE <span className="text-brand-gold">GALA</span></h3>
                        <div className="w-24 h-1 bg-brand-gold mx-auto mt-4 rounded-full opacity-50" />
                    </div>

                    <div className="space-y-6">
                        {categories.map((cat, index) => (
                            <div
                                key={index}
                                className="group bg-neutral-900/50 border border-neutral-800 rounded-3xl overflow-hidden transition-all duration-500 hover:border-brand-gold/20"
                            >
                                <button
                                    onClick={() => toggleCategory(index)}
                                    className="w-full flex justify-between items-center px-8 py-6 text-left outline-none"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`size-3 rounded-full transition-all duration-500 ${openCategory === index ? 'bg-brand-gold scale-125 shadow-[0_0_10px_#c8a256]' : 'bg-neutral-700 rotate-45'}`} />
                                        <span className="font-karantina text-3xl md:text-4xl text-white uppercase tracking-wider group-hover:text-brand-gold transition-colors">{cat.title}</span>
                                    </div>
                                    <div className={`p-2 rounded-lg border border-neutral-700 transition-all duration-500 ${openCategory === index ? 'rotate-180 bg-brand-gold text-neutral-950 border-brand-gold' : 'text-neutral-500'}`}>
                                        <ChevronRight className="size-5" />
                                    </div>
                                </button>
                                
                                <div className={`transition-all duration-500 ease-in-out overflow-hidden ${openCategory === index ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                    <div className="px-8 pb-8 pt-2 space-y-6">
                                        {cat.services.map((srv, i) => (
                                            <div
                                                key={i}
                                                className="group/item flex justify-between items-end gap-4 relative"
                                            >
                                                <div className="flex-1">
                                                    <div className="flex items-baseline gap-2">
                                                        <h5 className="text-white font-bold group-hover/item:text-brand-gold transition-colors">{srv.name}</h5>
                                                        <div className="flex-1 border-b border-dotted border-white/20 mx-2 -translate-y-1" />
                                                        <span className="text-brand-gold font-bold text-xl font-karantina tracking-wider transition-transform group-hover/item:scale-110">
                                                            ${srv.price.toLocaleString()}
                                                        </span>
                                                    </div>
                                                    {srv.description && (
                                                        <p className="text-neutral-500 text-xs mt-1 italic max-w-md">{srv.description}</p>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-20 text-center">
                        <div className="inline-flex flex-col items-center gap-4 p-10 rounded-[2.5rem] bg-neutral-900/50 border border-neutral-800 border-dashed">
                             <h4 className="text-white font-bold text-xl">¿Listo para mejorar tu presencia?</h4>
                             <p className="text-neutral-500 text-sm max-w-xs mb-4">Garantizamos una experiencia de lujo y precisión técnica en cada servicio.</p>
                             <a href="/reservations" className="bg-brand-gold px-12 py-4 rounded-xl text-neutral-950 font-bold hover:scale-105 active:scale-95 transition-all shadow-xl">
                                AGENDAR MI VISITA
                             </a>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
