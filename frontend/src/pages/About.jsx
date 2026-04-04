import { Link } from "react-router-dom";

export default function About() {
    return (
        <>
            {/* Primera sección */}
            <section className="bg-[#FFFFFF] w-full min-h-screen flex items-center py-20">
                <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-16">
                    
                    {/* Contenido izquierdo */}
                    <div className="md:w-1/2 space-y-8">
                        <h1 className="text-4xl md:text-5xl font-bold text-[#C5A253] leading-tight">
                            Más que una barbería,
                            <br />
                            una experiencia
                        </h1>

                        <p className="text-[#6B5D52] text-base md:text-lg leading-relaxed">
                            En <span className="font-semibold">Imperio Barbershop</span> nos especializamos en cortes clásicos,
                            afeitados tradicionales y cuidado de la barba con el más alto nivel de detalle.
                            Cada visita es una experiencia pensada para quienes valoran la elegancia,
                            la precisión y el estilo.
                        </p>

                        <Link to="/Reservations">
                            <button
                                className="px-10 py-4 bg-[#C5A253] text-white rounded-md font-medium text-sm uppercase tracking-wider hover:bg-[#b48e46] transition-colors shadow-md"
                            >
                                Agenda tu cita
                            </button>
                        </Link>
                    </div>

                    {/* Imagen derecha */}
                    <div className="md:w-1/2 flex justify-center">
                        <img
                            src="/images/about-us.png"
                            alt="Barbero trabajando"
                            className="w-full max-w-[500px] h-auto object-cover rounded-2xl shadow-2xl"
                        />
                    </div>
                </div>
            </section>

            {/* Segunda sección - Nuestra Historia */}
            <section className="bg-[#212121] w-full min-h-screen flex items-center py-20">
                <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row-reverse justify-between items-center gap-16">
                    
                    {/* Contenido derecha */}
                    <div className="md:w-1/2 space-y-8">
                        <h1 className="text-4xl md:text-5xl font-bold text-[#C5A253] leading-tight">
                            Nuestra Historia
                        </h1>

                        <p className="text-[#FFFFFF] text-base md:text-lg leading-relaxed">
                            Fundada en 2025,  <span className="font-semibold">Imperio Barbershop</span> nació con el propósito de devolverle a la barbería su esencia tradicional. Más que un simple corte, buscamos ofrecer una experiencia donde el estilo, la conversación y el ambiente se mezclen para crear un momento único.
                        </p>
                    </div>

                    {/* Imagen izquierda */}
                    <div className="md:w-1/2 flex justify-center">
                        <img
                            src="/images/about-us-NuestraHistoria.png"
                            alt="Barbero trabajando"
                            className="w-full max-w-[500px] h-auto object-cover rounded-2xl shadow-2xl"
                        />
                    </div>
                </div>
            </section>

            {/* Tercera sección - Nuestra Filosofía */}
            <section className="bg-white py-20">
                <div className="max-w-6xl mx-auto px-6 text-center">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-[#C5A253] tracking-wide">
                        NUESTRA FILOSOFÍA
                    </h2>
                    <p className="mt-3 text-[#6B5D52] text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
                        En <strong>IMPERIO</strong> creemos que cada cliente merece un servicio
                        excepcional, donde la elegancia, la precisión y la confianza definen cada corte.
                    </p>

                    <div className="mt-14 grid md:grid-cols-3 gap-10">
                        {/* 1 */}
                        <div className="text-center">
                            <div className="flex justify-center mb-4 text-4xl text-[#C5A253]">
                                <i className="lucide lucide-crown"></i>
                            </div>
                            <h3 className="text-[#8C723C] font-extrabold text-2xl mb-2">01.</h3>
                            <h4 className="text-xl font-semibold text-[#C5A253]">Excelencia en cada detalle</h4>
                            <p className="mt-2 text-neutral-600 text-base md:text-lg leading-relaxed">
                                Nuestros barberos combinan técnica y estilo para brindar una experiencia
                                única, cuidando cada trazo como una obra de arte.
                            </p>
                        </div>

                        {/* 2 */}
                        <div className="text-center">
                            <div className="flex justify-center mb-4 text-4xl text-[#C5A253]">
                                <i className="lucide lucide-scissors"></i>
                            </div>
                            <h3 className="text-[#8C723C] font-extrabold text-2xl mb-2">02.</h3>
                            <h4 className="text-xl font-semibold text-[#C5A253]">Arte y precisión</h4>
                            <p className="mt-2 text-neutral-600 text-base md:text-lg leading-relaxed">
                                Cada corte refleja nuestra pasión por la barbería clásica, fusionando tradición
                                y modernidad para realzar la imagen de cada cliente.
                            </p>
                        </div>

                        {/* 3 */}
                        <div className="text-center">
                            <div className="flex justify-center mb-4 text-4xl text-[#C5A253]">
                                <i className="lucide lucide-gem"></i>
                            </div>
                            <h3 className="text-[#8C723C] font-extrabold text-2xl mb-2">03.</h3>
                            <h4 className="text-xl font-semibold text-[#C5A253]">Experiencia de lujo</h4>
                            <p className="mt-2 text-neutral-600 text-base md:text-lg leading-relaxed">
                                En <strong>IMPERIO</strong> no solo cuidamos tu estilo, cuidamos tu tiempo. 
                                Atención personalizada y ambiente premium en cada visita.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}