import React from "react";

const HeroSection = () => (
  <section
    className="w-full h-[50vh] md:h-[60vh] flex flex-col items-center justify-center text-center px-6 relative overflow-hidden"
    aria-labelledby="hero-reservation-title"
  >
    {/* Overlay cinemático */}
    <div className="absolute inset-0 bg-neutral-950/70 z-10"></div>
    <div 
      className="absolute inset-0 bg-[url('/images/hero.jpg')] bg-cover bg-center scale-110 animate-fade-in"
      style={{ filter: "grayscale(30%) brightness(0.6)" }}
    ></div>

    <div className="relative z-20 animate-fade-in-up">
      <span className="text-brand-gold text-xs font-bold tracking-[0.4em] uppercase mb-4 block">
        Exclusividad & Estilo
      </span>
      <h1
        id="hero-reservation-title"
        className="text-6xl md:text-8xl font-extrabold font-karantina uppercase leading-[0.8] tracking-tighter text-white"
      >
        TOMA EL <span className="text-brand-gold">TRONO</span>
      </h1>
      <p className="text-lg md:text-xl mt-6 text-neutral-400 max-w-xl font-light">
        Asegura tu lugar en el Imperio. Tu transformación comienza con un solo clic.
      </p>
    </div>
  </section>
);

export default HeroSection;
