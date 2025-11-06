import React from "react";

const ContactSection = () => {
  return (
    <section
      id="contacto"
      className="w-full bg-white text-gray-900 py-24 px-6 sm:px-10 lg:px-20 relative overflow-hidden"
    >
      {/* Línea decorativa superior */}
      <div className="w-32 sm:w-5xl h-[3px] bg-[#C5A253] mx-auto mb-16 rounded-full"></div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-stretch">
        {/* --- Información de Contacto --- */}
        <article
          className="bg-[#C5A253]/95 text-black rounded-[2rem] shadow-[0_8px_25px_rgba(0,0,0,0.15)] p-12 flex flex-col justify-center transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_12px_35px_rgba(0,0,0,0.25)]"
          aria-labelledby="info-contacto-title"
        >
          <h2
            id="info-contacto-title"
            className="text-5xl sm:text-6xl font-extrabold font-karantina mb-10 text-center lg:text-left uppercase tracking-wide"
          >
            Visítanos
          </h2>

          <div className="space-y-10 text-center lg:text-left text-lg">
            <section>
              <h3 className="font-semibold text-2xl mb-3 relative inline-block after:content-[''] after:block after:w-10 after:h-[2px] after:bg-black after:mt-1 after:rounded-full">
                Oficina
              </h3>
              <p className="text-base leading-relaxed mt-2">
                Calle 10 #15-34, Centro<br />Neiva - Huila, Colombia
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-2xl mb-3 relative inline-block after:content-[''] after:block after:w-10 after:h-[2px] after:bg-black after:mt-1 after:rounded-full">
                Contacto
              </h3>
              <ul className="space-y-1">
                <li>
                  <a
                    href="mailto:info@barberapp.com"
                    className="hover:underline focus:outline-none focus:ring-2 focus:ring-black transition-all"
                  >
                    info@barberapp.com
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+573009735155"
                    className="hover:underline focus:outline-none focus:ring-2 focus:ring-black transition-all"
                  >
                    (+57) 300 973 5155
                  </a>
                </li>
              </ul>
            </section>

            <section>
              <h3 className="font-semibold text-2xl mb-3 relative inline-block after:content-[''] after:block after:w-10 after:h-[2px] after:bg-black after:mt-1 after:rounded-full">
                Horarios de Atención
              </h3>
              <p>Lunes a Sábado: 9:00 a.m. - 6:00 p.m.</p>
              <p>Domingo: 10:00 a.m. - 5:00 p.m.</p>
            </section>
          </div>
        </article>

        {/* --- Formulario de Contacto --- */}
        <form
          className="bg-neutral-950 text-white rounded-[2rem] p-12 flex flex-col space-y-8 shadow-[0_8px_25px_rgba(0,0,0,0.15)] transition-all duration-500 hover:shadow-[0_12px_35px_rgba(0,0,0,0.25)]"
          aria-labelledby="formulario-contacto-title"
        >
          <h2 id="formulario-contacto-title" className="sr-only">
            Formulario de contacto
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="nombre"
                className="block text-sm font-semibold mb-2 tracking-wide"
              >
                Tu nombre
              </label>
              <input
                id="nombre"
                name="nombre"
                type="text"
                required
                className="w-full px-4 py-3 rounded-md bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#C5A253] transition-all"
                placeholder="Juan Pérez"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold mb-2 tracking-wide"
              >
                Tu correo
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full px-4 py-3 rounded-md bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#C5A253] transition-all"
                placeholder="ejemplo@email.com"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="asunto"
              className="block text-sm font-semibold mb-2 tracking-wide"
            >
              Asunto
            </label>
            <input
              id="asunto"
              name="asunto"
              type="text"
              className="w-full px-4 py-3 rounded-md bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#C5A253] transition-all"
              placeholder="Reserva, consulta o comentario"
            />
          </div>

          <div>
            <label
              htmlFor="mensaje"
              className="block text-sm font-semibold mb-2 tracking-wide"
            >
              Tu mensaje
            </label>
            <textarea
              id="mensaje"
              name="mensaje"
              rows="5"
              className="w-full px-4 py-3 rounded-md bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#C5A253] transition-all resize-none"
              placeholder="Escribe tu mensaje aquí..."
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-[#C5A253] text-black font-extrabold uppercase tracking-wider py-4 rounded-md hover:bg-[#b89540] transition-all focus:outline-none focus:ring-4 focus:ring-[#C5A253]"
          >
            Reservar Cita
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;