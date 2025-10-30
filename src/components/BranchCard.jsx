import React from "react";

export default function BranchCard({ name, address, image, mapUrl }) {
  return (
    <a
      href={mapUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative rounded-2xl overflow-hidden shadow-lg bg-black/80 transition-all 
      duration-500 hover:-translate-y-2 focus:outline-none focus:ring-2 focus:ring-brand-gold"
      aria-label={`Abrir ubicación de ${name} en Google Maps`}
    >
      <figure className="w-full h-90 overflow-hidden">
        <img
          src={image}
          alt={`Fachada de ${name}`}
          className="size-full object-cover transition-all duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <figcaption className="absolute inset-0 flex flex-col items-center justify-center bg-black/40
         text-white px-4 transition-all duration-500 group-hover:bg-black/70">
          <h3 className="text-5xl font-karantina font-extrabold tracking-[0.3rem] uppercase text-brand-gold mb-3 translate-y-10 
          group-hover:translate-y-0 transition-all duration-500">
            {name}
          </h3>
          <p className="opacity-0 group-hover:opacity-100 text-sm transition-all duration-500 text-center">
            {address}
          </p>
        </figcaption>
      </figure>
    </a>
  );
}
