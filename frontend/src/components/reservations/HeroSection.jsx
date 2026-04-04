import React from "react";

const HeroSection = () => (
  <section
    className="w-full h-[60vh] bg-neutral-950 text-white flex flex-col items-center justify-center text-center px-6 sm:px-10 lg:px-20 relative overflow-hidden"
    aria-labelledby="hero-reservation-title"
  >
    <div className="absolute inset-0 bg-[url('/images/hero.jpg')] bg-cover bg-center opacity-20"></div>

    <h1
      id="hero-reservation-title"
      className="text-5xl sm:text-6xl font-extrabold font-karantina uppercase tracking-wider relative z-10"
    >
      Reserva tu cita
    </h1>
    <p className="text-lg sm:text-xl mt-4 text-white/90 max-w-2xl relative z-10">
      Vive la experiencia de nuestros servicios premium de barbería con cita
      previa. Rápido, fácil y seguro.
    </p>
  </section>
);

export default HeroSection;
