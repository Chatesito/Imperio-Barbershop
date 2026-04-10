import { Link } from "react-router-dom";
import { Crown, Scissors, Gem, ChevronRight, History, Award, Star } from "lucide-react";

export default function About() {
    return (
        <main className="bg-neutral-950 text-white selection:bg-brand-gold selection:text-neutral-900">
            
            {/* HERO SECTION / INTRODUCCIÓN */}
            <section className="relative min-h-[70vh] flex items-center pt-24 pb-16 overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-gold/5 blur-[120px] -z-10 animate-pulse" />
                
                <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
                    
                    {/* Contenido izquierdo */}
                    <div className="space-y-8 animate-fade-in-up">
                        <span className="inline-block py-1 px-4 rounded-full bg-brand-gold/10 border border-brand-gold/20 text-brand-gold text-xs font-bold tracking-[0.3em] uppercase">
                            Nuestra Identidad
                        </span>
                        <h1 className="text-6xl md:text-8xl font-karantina font-extrabold text-white uppercase leading-[0.85] tracking-tighter">
                            MÁS QUE UNA <br />
                            <span className="text-brand-gold">BARBERÍA</span>, <br />
                            UN LEGADO
                        </h1>

                        <p className="text-neutral-400 text-lg md:text-xl leading-relaxed max-w-lg font-light">
                            En <strong className="text-white">Imperio Barbershop</strong> nos especializamos en la arquitectura del estilo masculino. Combinamos la precisión quirúrgica con el arte de la hospitalidad tradicional.
                        </p>

                        <div className="flex flex-wrap items-center gap-6">
                            <Link to="/Reservations" className="group h-14 inline-flex items-center gap-3 bg-brand-gold text-neutral-950 px-8 rounded-xl font-bold transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(200,162,86,0.2)]">
                                RESERVAR MI LUGAR
                                <ChevronRight className="size-5 transition-transform group-hover:translate-x-1" />
                            </Link>
                            <div className="flex items-center gap-2 text-neutral-500">
                                <Award className="size-5 text-brand-gold" />
                                <span className="text-xs font-bold uppercase tracking-widest">Maestría Certificada</span>
                            </div>
                        </div>
                    </div>

                    {/* Imagen derecha con decoración */}
                    <div className="relative group animate-fade-in">
                        <div className="absolute -inset-10 bg-brand-gold/5 rounded-full blur-3xl opacity-50 group-hover:opacity-100 transition duration-1000" />
                        <div className="relative rounded-3xl overflow-hidden border border-neutral-800 shadow-2xl">
                            <img
                                src="/images/about-us.png"
                                alt="Barbero trabajando con maestría"
                                className="w-full h-auto object-cover transform scale-105 group-hover:scale-100 transition duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent" />
                        </div>
                        <div className="absolute -bottom-8 -left-8 bg-neutral-900 border border-neutral-800 p-6 rounded-2xl shadow-2xl hidden md:flex items-center gap-4 animate-float">
                            <div className="size-12 rounded-xl bg-brand-gold flex items-center justify-center text-neutral-950">
                                <Star className="size-6 fill-neutral-950" />
                            </div>
                            <div>
                                <p className="text-white font-bold text-xl leading-none italic">#1</p>
                                <p className="text-neutral-500 text-[10px] uppercase tracking-widest mt-1">Elegidos en Neiva</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECCIÓN - NUESTRA HISTORIA (DARK CONTENT) */}
            <section className="relative py-24 bg-neutral-900/40">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-gold/20 to-transparent" />
                <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-16 items-center">
                    
                    {/* Imagen izquierda */}
                    <div className="lg:col-span-5 relative order-2 lg:order-1">
                        <div className="relative rounded-[3rem] overflow-hidden border border-neutral-800 shadow-2xl skew-y-2 group">
                             <img
                                src="/images/about-us-NuestraHistoria.png"
                                alt="Los inicios de Imperio"
                                className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                            />
                            <div className="absolute inset-0 bg-brand-gold/10 mix-blend-overlay" />
                        </div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-32 border border-brand-gold/30 rounded-full flex items-center justify-center animate-spin-slow">
                            <History className="size-10 text-brand-gold/50" />
                        </div>
                    </div>
                    
                    {/* Contenido derecha */}
                    <div className="lg:col-span-7 space-y-8 order-1 lg:order-2">
                        <h2 className="text-sm font-bold text-brand-gold uppercase tracking-[0.5em]">El Origen</h2>
                        <h3 className="text-5xl md:text-7xl font-karantina font-extrabold text-white uppercase leading-none">
                            FUNDADA EN <br />
                            <span className="text-brand-gold">2025</span>
                        </h3>

                        <div className="space-y-6 text-neutral-400 text-lg font-light leading-relaxed">
                            <p>
                                <strong className="text-white font-bold">Imperio Barbershop</strong> no nació como un negocio, sino como una declaración de guerra contra la mediocridad urbana. 
                            </p>
                            <p>
                                Iniciamos con el propósito de devolverle a la barbería su esencia sagrada: un lugar de reunión, de respeto y, sobre todo, de impecabilidad técnica. Cada sillón de nuestro establecimiento cuenta la historia de un hombre que busca ser su mejor versión.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECCIÓN - NUESTRA FILOSOFÍA (VALORES) */}
            <section className="py-32 bg-neutral-950 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-24 max-w-2xl mx-auto">
                        <h2 className="text-brand-gold text-sm font-bold uppercase tracking-[0.6em] mb-4">Los Pilares</h2>
                        <h3 className="text-5xl md:text-7xl font-karantina font-extrabold text-white uppercase leading-none">
                            NUESTRA <span className="text-brand-gold">FILOSOFÍA</span>
                        </h3>
                        <p className="mt-8 text-neutral-500 text-lg font-light">
                            En el Imperio, creemos que el carácter se forja en los detalles que nadie más nota.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Pilar 1 */}
                        <div className="group relative p-12 bg-neutral-900/50 border border-neutral-800 rounded-[2.5rem] transition-all duration-500 hover:border-brand-gold/30 hover:-translate-y-3">
                            <div className="absolute top-0 right-0 p-8 text-white/5 group-hover:text-brand-gold/5 transition-colors">
                                <Crown className="size-32" />
                            </div>
                            <h4 className="text-brand-gold font-karantina text-4xl uppercase tracking-widest mb-4">01. EXCELENCIA</h4>
                            <h5 className="text-white font-bold text-xl mb-4">Sin Concesiones</h5>
                            <p className="text-neutral-500 leading-relaxed text-sm font-light">
                                Cada corte es una obra de arte. No nos conformamos con lo aceptable; perseguimos la perfección en cada trazo de navaja.
                            </p>
                        </div>

                        {/* Pilar 2 */}
                        <div className="group relative p-12 bg-neutral-900/50 border border-neutral-800 rounded-[2.5rem] transition-all duration-500 hover:border-brand-gold/30 hover:-translate-y-3">
                            <div className="absolute top-0 right-0 p-8 text-white/5 group-hover:text-brand-gold/5 transition-colors">
                                <Scissors className="size-32" />
                            </div>
                            <h4 className="text-brand-gold font-karantina text-4xl uppercase tracking-widest mb-4">02. TRADICIÓN</h4>
                            <h5 className="text-white font-bold text-xl mb-4">Arte y Precisión</h5>
                            <p className="text-neutral-500 leading-relaxed text-sm font-light">
                                Honramos los rituales clásicos de la barbería, fusionándolos con la vanguardia del estilo masculino contemporáneo.
                            </p>
                        </div>

                        {/* Pilar 3 */}
                        <div className="group relative p-12 bg-neutral-900/50 border border-neutral-800 rounded-[2.5rem] transition-all duration-500 hover:border-brand-gold/30 hover:-translate-y-3">
                            <div className="absolute top-0 right-0 p-8 text-white/5 group-hover:text-brand-gold/5 transition-colors">
                                <Gem className="size-32" />
                            </div>
                            <h4 className="text-brand-gold font-karantina text-4xl uppercase tracking-widest mb-4">03. LEALTAD</h4>
                            <h5 className="text-white font-bold text-xl mb-4">Experiencia de Lujo</h5>
                            <p className="text-neutral-500 leading-relaxed text-sm font-light">
                                Tu tiempo es tu activo más valioso. En el Imperio, cada minuto está diseñado para elevar tu confianza y bienestar.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}