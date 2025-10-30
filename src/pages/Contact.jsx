import React from "react";
import ImgFondoSeccion from "../assets/images/barbero-cortando-cabello.png";
import BranchesSection from "../components/sections/BranchesSection";

export default function Contact() {
  return (
    <>
      {/* Hero / Sección de fondo */}
      <section
        className="relative w-full min-h-[calc(100vh-6.5rem)] flex flex-col items-center justify-center text-center
        bg-cover bg-center bg-no-repeat
        shadow-[inset_0_-110px_30px_0_rgba(0,0,0,0.45)]
        px-4 sm:px-6 md:px-12"
        style={{ backgroundImage: `url(${ImgFondoSeccion})` }}
        role="banner"
        aria-label="Sección principal de contacto"
      >
        {/* Overlay para contraste visual */}
        <div className="absolute inset-0 bg-black/25" aria-hidden="true" />

        <div className="relative z-10 max-w-2xl mx-auto">
          <h2
            className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-[3rem] font-barlow font-extrabold 
            tracking-[.1rem] uppercase leading-tight drop-shadow-lg"
          >
            Experimente el lujo de los servicios de barbero a domicilio
          </h2>
        </div>
      </section>

      {/* Sección de ubicación */}
      <section
        className="w-full max-w-7xl mx-auto px-6 sm:px-8 py-16 flex flex-col items-center justify-center text-center"
        aria-labelledby="ubicacion-titulo"
      >
        <h2
          id="ubicacion-titulo"
          className="text-[#C5A253] text-4xl sm:text-5xl md:text-[5rem] font-karantina font-extrabold uppercase tracking-[.3rem]"
        >
          ¿Dónde estamos ubicados?
        </h2>
        <p className="mt-6 text-neutral-400 max-w-2xl text-base sm:text-lg">
          Encuéntranos en el corazón de la ciudad y disfruta de la experiencia
          exclusiva de Imperio Barbershop, donde el estilo y la elegancia se encuentran.
        </p>
      </section>
       <BranchesSection/>
    </>
  );
}
