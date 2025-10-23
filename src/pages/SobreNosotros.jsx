import { Link } from "react-router-dom";

export default function SobreNosotros() {
    return (
        <>
            {/* Primera sección */}
            <section className="bg-[#FFFFFF] w-full min-h-screen flex items-center py-20">
                <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-16">
                    
                    {/* Contenido izquierdo */}
                    <div className="md:w-1/2 space-y-8">
                        <h1 className="text-4xl md:text-5xl font-bold text-[#977656] leading-tight">
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

                        <Link to="/reservaciones">
                            <button
                                className="px-10 py-4 bg-[#977656] text-white rounded-md font-medium text-sm uppercase tracking-wider hover:bg-[#846647] transition-colors shadow-md"
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
                        <h1 className="text-4xl md:text-5xl font-bold text-[#977656] leading-tight">
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
        </>
    );
}