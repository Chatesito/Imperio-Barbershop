import { Facebook, Instagram, Scissors, Star, Clock, Trophy, ShieldCheck, MapPin, ChevronRight } from "lucide-react";
import ReviewsSection from "../components/ReviewsSection";

export default function Home() {
    return (
        <div className="flex flex-col bg-neutral-950">

            {/* HERO SECTION */}
            <section
                className="relative min-h-screen flex items-center overflow-hidden"
                style={{ backgroundImage: 'url(/images/hero.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
                {/* Overlay dinámico */}
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-black/40 to-transparent" />
                <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px]" />
                
                <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-20 lg:py-32">
                    <div className="max-w-2xl animate-fade-in-up">
                        <span className="inline-block py-1 px-4 rounded-full bg-brand-gold/10 border border-brand-gold/20 text-brand-gold text-xs font-bold tracking-widest uppercase mb-4 animate-float">
                            Establecido en 2025
                        </span>
                        <h1 className="text-6xl md:text-8xl font-karantina font-extrabold uppercase leading-[0.9] tracking-tighter text-white drop-shadow-2xl">
                            DOMINA <br />
                            TU <span className="text-brand-gold">ESTILO</span>
                        </h1>
                        <p className="mt-6 text-lg md:text-xl text-neutral-300 max-w-lg font-light leading-relaxed">
                            Más que un simple corte, forjamos el carácter. <br className="hidden md:block" />
                            Experimenta el arte de la barbería tradicional en el corazón de Neiva.
                        </p>

                        <div className="mt-10 flex flex-wrap items-center gap-5">
                            <a href="/reservations" className="group relative inline-flex items-center justify-center px-8 py-4 rounded-xl bg-brand-gold text-neutral-950 font-bold overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(200,162,86,0.3)]">
                                <span className="relative z-10 flex items-center gap-2">
                                    RESERVAR AHORA <ChevronRight className="size-5 transition-transform group-hover:translate-x-1" />
                                </span>
                            </a>
                            <a href="/services" className="px-8 py-4 rounded-xl border border-white/20 text-white font-medium backdrop-blur-md hover:bg-white/5 transition-all">
                                Explorar Menú
                            </a>
                        </div>
                    </div>
                </div>

                {/* Decoración lateral en desktop */}
                <div className="hidden lg:block absolute right-20 bottom-20 z-10 animate-fade-in">
                    <div className="flex flex-col gap-8 text-white/40">
                         <a href="#" className="hover:text-brand-gold transform hover:scale-125 transition-all"><Facebook className="size-6" /></a>
                         <a href="#" className="hover:text-brand-gold transform hover:scale-125 transition-all"><Instagram className="size-6" /></a>
                    </div>
                </div>
            </section>

            {/* QUIÉNES SOMOS / EXPERIENCIA */}
            <section className="relative py-24 bg-neutral-950 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent" />
                <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
                    <div className="relative group">
                        <div className="absolute -inset-4 bg-brand-gold/10 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition duration-1000" />
                        <div className="relative overflow-hidden rounded-2xl border border-neutral-800 shadow-2xl">
                             <img src="/images/barber-working.png" alt="Nuestra Misión" className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700" />
                        </div>
                        <div className="absolute bottom-8 right-8 bg-brand-gold p-6 rounded-xl shadow-2xl hidden md:block animate-float">
                             <Trophy className="size-8 text-neutral-950" />
                        </div>
                    </div>

                    <div>
                        <h2 className="text-sm font-bold text-brand-gold uppercase tracking-[0.3em] mb-4">Nuestra Esencia</h2>
                        <h3 className="text-4xl md:text-5xl font-karantina font-extrabold text-white uppercase leading-tight mb-6">
                            Tradición y <span className="italic text-brand-gold">Precisión</span> en cada Trazo
                        </h3>
                        <p className="text-neutral-400 text-lg leading-relaxed mb-8">
                            En <strong>Imperio Barbershop</strong>, no solo cortamos cabello; esculpimos identidades. Cada visita es un ritual diseñado para el hombre moderno que no sacrifica la calidad por la rapidez.
                        </p>
                        
                        <div className="grid grid-cols-2 gap-8 py-8 border-y border-neutral-800">
                            <div>
                                <h4 className="text-white font-bold mb-2 flex items-center gap-2">
                                    <Star className="size-4 text-brand-gold fill-brand-gold" /> Excelencia
                                </h4>
                                <p className="text-neutral-500 text-sm">Protocolos de higiene y técnica superior en cada servicio.</p>
                            </div>
                            <div>
                                <h4 className="text-white font-bold mb-2 flex items-center gap-2">
                                    <ShieldCheck className="size-4 text-brand-gold fill-brand-gold" /> Confianza
                                </h4>
                                <p className="text-neutral-500 text-sm">Más de 500 caballeros nos eligen mensualmente en Neiva.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* HORARIO Y VALORES (GLASSMORPISM) */}
            <section
                className="relative py-24 md:py-32"
                style={{ backgroundImage: 'url(/images/interior.jpg)', backgroundSize: 'cover', backgroundAttachment: 'fixed' }}
            >
                <div className="absolute inset-0 bg-neutral-950/80 backdrop-blur-sm" />
                <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-12 items-center">
                    
                    <div className="lg:col-span-7">
                        <h2 className="text-5xl md:text-6xl font-karantina font-extrabold text-white uppercase mb-8">
                            Por qué ser parte del <span className="text-brand-gold">Imperio?</span>
                        </h2>
                        <div className="space-y-6">
                            {[
                                { title: "Ambiente Exclusivo", desc: "Música, café premium y el mejor ambiente masculino." },
                                { title: "Calidad de Maestría", desc: "Solo usamos herramientas desinfectadas y productos top." },
                                { title: "Respeto a Tu Tiempo", desc: "Priorizamos tu agenda con nuestro sistema de reservas online." }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-4 p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-brand-gold/40 transition-colors group">
                                    <div className="size-12 rounded-xl bg-brand-gold/20 flex items-center justify-center text-brand-gold group-hover:bg-brand-gold group-hover:text-neutral-950 transition-all">
                                        <Scissors className="size-6" />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold text-lg">{item.title}</h4>
                                        <p className="text-neutral-400 text-sm">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="lg:col-span-5">
                        <div className="p-10 rounded-[2.5rem] bg-neutral-900 border border-neutral-800 shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <Clock className="size-40 text-brand-gold" />
                            </div>
                            <h3 className="text-3xl font-karantina font-extrabold text-white uppercase tracking-wider mb-8 flex items-center gap-3">
                                <Clock className="text-brand-gold" /> Horario Real
                            </h3>
                            <ul className="space-y-4 text-sm md:text-base border-b border-neutral-800 pb-8 mb-8">
                                {[
                                    { day: "Lun - Vie", time: "08:00 AM – 06:00 PM" },
                                    { day: "Sábado", time: "10:00 AM – 05:00 PM" },
                                    { day: "Domingo", time: "10:00 AM – 05:00 PM", highlight: true }
                                ].map((h, idx) => (
                                    <li key={idx} className={`flex justify-between items-center ${h.highlight ? 'text-brand-gold font-bold' : 'text-neutral-400'}`}>
                                        <span>{h.day}</span>
                                        <span className="h-px flex-1 border-t border-dotted border-white/10 mx-4" />
                                        <span>{h.time}</span>
                                    </li>
                                ))}
                            </ul>
                            <a href="/reservations" className="flex items-center justify-center py-4 bg-brand-gold text-neutral-950 font-bold rounded-xl hover:scale-[1.02] transition-transform">
                                AGENDAR CITA AHORA
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* HIGHLIGHTS / GALERIA SUTIL */}
            <section className="py-24 bg-neutral-950">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-sm font-bold text-brand-gold uppercase tracking-[0.4em] mb-4">Portafolio</h2>
                        <h3 className="text-5xl md:text-6xl font-karantina font-extrabold text-white uppercase">El Trabajo que <span className="text-brand-gold">Habla</span></h3>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {["gallery-01.jpg", "gallery-02.jpg", "gallery-05.jpg", "about-us-NuestraHistoria.png"].map((img, idx) => (
                            <div key={idx} className="group relative aspect-square overflow-hidden rounded-2xl border border-neutral-800">
                                 <img src={`/images/${img}`} alt="Corte" className="w-full h-full object-cover transition duration-500 group-hover:scale-125" />
                                 <div className="absolute inset-0 bg-brand-gold/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                      <div className="size-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white scale-50 group-hover:scale-100 transition-transform">
                                           <Scissors className="size-6" />
                                      </div>
                                 </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* TESTIMONIOS */}
            <div className="bg-neutral-900/50">
                <ReviewsSection />
            </div>

            {/* UBICACIÓN FINAL */}
            <section className="py-24 bg-neutral-950 relative">
                <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
                    <div>
                         <h2 className="text-4xl md:text-5xl font-karantina font-extrabold text-white uppercase mb-6">
                            Ven a <span className="text-brand-gold">Dominar</span> tu estilo
                         </h2>
                         <p className="text-neutral-400 mb-10 leading-relaxed max-w-lg">
                            Visítanos en el corazón de Neiva. Un espacio climatizado, moderno y diseñado pensando en tu confort absoluto.
                         </p>
                         <div className="space-y-6">
                             <div className="flex items-start gap-4">
                                <div className="p-3 rounded-lg bg-neutral-900 border border-neutral-800 text-brand-gold">
                                    <MapPin className="size-6" />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold">Nuestra Sede</h4>
                                    <p className="text-neutral-500 text-sm">Cll 14A #34-20, Barrio Las Catleyas, Neiva.</p>
                                </div>
                             </div>
                             <div className="flex items-start gap-4">
                                <div className="p-3 rounded-lg bg-neutral-900 border border-neutral-800 text-brand-gold">
                                    <Clock className="size-6" />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold">Atención</h4>
                                    <p className="text-neutral-500 text-sm">Abierto todos los días de la semana.</p>
                                </div>
                             </div>
                         </div>
                    </div>
                    <div className="h-[450px] rounded-3xl overflow-hidden border border-neutral-800 shadow-2xl">
                         <iframe
                            title="Mapa Imperio"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3984.5774530734902!2d-75.265569!3d2.9370423!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3b7415e24bef73%3A0x77c1c66f24bab228!2sCl.%2014a%20%23%2034-20%2C%20Neiva%2C%20Huila!5e0!3m2!1ses-419!2sco!4v1763579753457!5m2!1ses-419!2sco"
                            className="w-full h-full grayscale invert opacity-80 hover:grayscale-0 hover:invert-0 hover:opacity-100 transition-all duration-700"
                            loading="lazy"
                        />
                    </div>
                </div>
            </section>

        </div>
    );
}
