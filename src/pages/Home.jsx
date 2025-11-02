import { Facebook, Instagram } from "lucide-react";

export default function Home() {
    return (
        <div className="flex flex-col">

            {/* HERO */}
            <section
                className="relative min-h-[78vh] md:min-h-[86vh] grid place-items-center"
                style={{ backgroundImage: 'url(/images/hero.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/55 to-transparent" />
                <div className="relative z-10 w-full max-w-7xl mx-auto px-4 py-12">
                    <div className="max-w-xl">
                        <h1 className="text-5xl md:text-6xl font-extrabold uppercase tracking-wide text-white">
                            Imperio Barbershop
                        </h1>
                        <p className="mt-4 text-lg md:text-xl text-white/80 uppercase tracking-wide">
                            Servicios expertos de cortes de pelo y peluquería.
                        </p>
                        <p className="mt-4 text-neutral-200 leading-relaxed">
                            Ofrecemos una amplia gama de servicios profesionales de corte de pelo y peluquería para hombres. Nuestros barberos experimentados utilizan las últimas técnicas y herramientas para brindarte el look perfecto.
                        </p>

                        <div className="mt-6 flex items-center gap-3">
                            <a href="/reservations" className="inline-flex items-center justify-center px-5 py-3 rounded-md bg-brand-gold text-black font-semibold hover:opacity-90">
                                Agendar un corte
                            </a>
                            <a href="/services" className="inline-flex items-center justify-center px-5 py-3 rounded-md border border-white/30 text-white hover:bg-white/10">
                                Buscar servicios
                            </a>
                        </div>

                        <div className="mt-6 flex items-center gap-3">
                            <a href="#" className="size-9 rounded-full grid place-items-center bg-white/10 text-white border border-white/20 hover:bg-white/20">
                                <Facebook className="size-4" aria-hidden />
                            </a>
                            <a href="#" className="size-9 rounded-full grid place-items-center bg-white/10 text-white border border-white/20 hover:bg-white/20">
                                <Instagram className="size-4" aria-hidden />
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Quiénes somos / Dónde estamos */}
            <section className="bg-neutral-100 text-neutral-800">
                <div className="max-w-7xl mx-auto px-4 py-12 md:py-16 grid md:grid-cols-2 gap-10">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-brand-gold tracking-wide">Quiénes somos?</h2>
                        <div className="mt-5 space-y-4 text-neutral-700 leading-relaxed">
                            <p>
                                En <strong>Imperio Barbershop</strong> combinamos técnica moderna y tradición para ofrecer un servicio de excelencia. Nuestro equipo de barberos certificados se distingue por su atención personalizada, su experiencia y su pasión por el detalle.
                            </p>
                            <p>
                                Creemos que cada visita es más que un corte: es una experiencia. Desde el ambiente relajado hasta el trato profesional, trabajamos para que cada cliente se sienta cómodo, seguro y renovado al salir. Nuestro compromiso es reflejar tu estilo y realzar tu confianza.
                            </p>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-brand-gold tracking-wide">Dónde estamos?</h2>
                        <div className="mt-5 space-y-4 text-neutral-700 leading-relaxed">
                            <p>
                                Nos encuentras en <strong>Neiva, Huila</strong>, en la <strong>Cll 14A #34-20, Barrio Las Catleyas</strong>. Una ubicación estratégica, a pocos minutos del centro de la ciudad, ideal para quienes buscan comodidad y fácil acceso.
                            </p>
                            <p>
                                Contamos con un espacio moderno y climatizado, diseñado para tu confort. Ya sea que vengas por un cambio de look o un mantenimiento rápido, siempre te recibiremos con la mejor atención, los mejores productos y la pasión que caracteriza a nuestro equipo.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Por qué escogernos / Horario */}
            <section
                className="relative"
                style={{ backgroundImage: 'url(/images/interior.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
                <div className="absolute inset-0 bg-black/40" />
                <div className="relative z-10 max-w-7xl mx-auto px-4 py-14 md:py-20 grid md:grid-cols-2 gap-10">
                    <div className="text-white">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-brand-gold tracking-wide">Por qué escogernos?</h2>
                        <p className="mt-3 text-white/90">
                            Además, aquí hay más razones por las que los hombres prefieren Imperio Barbershop:
                        </p>
                        <ul className="mt-6 space-y-3 text-white/90">
                            <li>• Siempre un ambiente acogedor</li>
                            <li>• Nuestros maestros se enfocan en la calidad</li>
                            <li>• Valoramos tanto tu tiempo como tu dinero</li>
                            <li>• Solo productos de primera calidad</li>
                            <li>• Herramientas limpias y desinfectadas después de cada uso</li>
                        </ul>
                    </div>

                    <div className="md:self-center">
                        <div className="bg-white/95 backdrop-blur rounded-3xl p-7 md:p-8 shadow-2xl ring-1 ring-black/5">
                            <h3 className="text-xl md:text-2xl font-extrabold text-neutral-800 tracking-wide">
                                Horario de atención
                            </h3>
                            <ul className="mt-5 space-y-2 text-neutral-700 text-sm md:text-base">
                                <li className="flex justify-between"><span>Lunes</span><span>8 AM – 6 PM</span></li>
                                <li className="flex justify-between"><span>Martes</span><span>8 AM – 6 PM</span></li>
                                <li className="flex justify-between"><span>Miércoles</span><span>8 AM – 6 PM</span></li>
                                <li className="flex justify-between"><span>Jueves</span><span>8 AM – 6 PM</span></li>
                                <li className="flex justify-between"><span>Viernes</span><span>8 AM – 6 PM</span></li>
                                <li className="flex justify-between"><span>Sábado</span><span>10 AM – 5 PM</span></li>
                                <li className="flex justify-between"><span>Domingo</span><span>10 AM – 5 PM</span></li>
                            </ul>
                            <a href="/reservations" className="mt-6 inline-flex items-center justify-center px-5 py-3 rounded-md bg-brand-gold text-black font-semibold hover:opacity-90 w-full">
                                Agendar un corte
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="bg-white">
                <div className="max-w-7xl mx-auto px-4 py-14 md:py-16">
                    <h2 className="text-center text-3xl md:text-4xl font-extrabold text-brand-gold tracking-wide">
                        BÚSCANOS
                    </h2>
                    <p className="mt-3 text-center text-neutral-600 max-w-2xl mx-auto">
                        Nuestro equipo sigue estrictas pautas de fiabilidad para una experiencia segura y cómoda.
                    </p>

                    <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[ 
                            { title: "LICENCIADOS", img: "/images/feature1.jpg", text: "Barberos con licencia y asegurados." },
                            { title: "MAESTROS", img: "/images/feature2.jpg", text: "Apasionados por el servicio y la calidad." },
                            { title: "CONFIABLES", img: "/images/feature3.jpg", text: "Fuerte reputación y clientes satisfechos." },
                        ].map((f) => (
                            <article key={f.title} className="bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-sm">
                                <img src={f.img} alt={f.title} className="w-full h-40 object-cover" />
                                <div className="p-5">
                                    <h3 className="font-extrabold text-neutral-900 text-lg">{f.title}</h3>
                                    <p className="mt-2 text-neutral-600 text-sm">{f.text}</p>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* Locación */}
            <section className="bg-neutral-900 text-white">
                <div className="max-w-7xl mx-auto px-4 py-14 md:py-16 grid md:grid-cols-2 gap-8 items-end">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-brand-gold tracking-wide">
                            Aprende dónde nos encontramos
                        </h2>
                        <p className="mt-4 text-white/90 leading-relaxed">
                            Estamos ubicados en el corazón de la ciudad, rodeados de movimiento, estilo y cultura urbana. Nuestra barbería se ha convertido en un punto de encuentro para quienes valoran la autenticidad y la precisión en cada detalle. Ven, disfruta del ambiente y vive la experiencia Imperio Barbershop.
                        </p>
                        <img src="/images/map.png" alt="Map" className="mt-6 w-full h-64 object-cover rounded-lg" />
                    </div>
                    <div className="flex items-end">
                        <img src="/images/storefront.png" alt="Imperio storefront" className="w-full h-full object-cover rounded-lg" />
                    </div>
                </div>
            </section>

            {/* Opiniones */}
            <section className="bg-neutral-100 text-neutral-800">
                <div className="max-w-6xl mx-auto px-4 py-14 md:py-16 text-center">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-brand-gold tracking-wide">
                        Opiniones de nuestros clientes
                    </h2>
                    <p className="mt-4 text-neutral-600 max-w-2xl mx-auto">
                        Próximamente podrás ver aquí las <strong>opiniones verificadas de Google</strong> sobre Imperio Barbershop.  
                        Nuestro compromiso es seguir mejorando cada día para ofrecerte una experiencia excepcional.
                    </p>
                    <div className="mt-10">
                        <div className="border border-neutral-300 rounded-2xl p-10 text-neutral-500 italic">
                            <p>⭐ Las reseñas aparecerán aquí una vez activada la integración con Google Reviews ⭐</p>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
}
