import React from "react";
import ImgFondoSeccion from "../assets/images/barbero-cortando-cabello.png";
import BranchesSection from "../components/sections/BranchesSection";
import ContactSection from "../components/ContactSection.jsx";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function Contact() {
  return (
    <main className="bg-neutral-950 text-white selection:bg-brand-gold selection:text-neutral-950">
      {/* Hero / Sección de fondo */}
      <section
        className="relative w-full h-[60vh] md:h-[70vh] flex flex-col items-center justify-center text-center overflow-hidden px-6"
        role="banner"
        aria-label="Sección principal de contacto"
      >
        {/* Fondo con zoom y overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-105 animate-fade-in"
          style={{ 
            backgroundImage: `url(${ImgFondoSeccion})`,
            filter: "brightness(0.4) grayscale(20%)"
          }}
          aria-hidden="true" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent z-10" />

        <div className="relative z-20 max-w-4xl mx-auto animate-fade-in-up">
          <span className="text-brand-gold text-xs font-bold tracking-[0.4em] uppercase mb-4 block">Contacto de Lujo</span>
          <h1
            className="text-white text-5xl md:text-8xl font-karantina font-extrabold uppercase leading-[0.8] tracking-tighter drop-shadow-2xl"
          >
            EXTIENDE TU <span className="text-brand-gold">DOMINIO</span>
          </h1>
          <p className="mt-6 text-neutral-400 text-lg md:text-xl font-light max-w-2xl mx-auto">
            Estamos listos para forjar tu nueva imagen en cualquiera de nuestras sedes reales.
          </p>
        </div>
      </section>

      {/* Sección de ubicación e Info Rapida */}
      <section
        className="w-full max-w-7xl mx-auto px-6 py-24"
        aria-labelledby="ubicacion-titulo"
      >
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
            <div className="space-y-6">
                <h2
                    id="ubicacion-titulo"
                    className="text-brand-gold text-sm font-bold uppercase tracking-[0.5em]"
                >
                    Presencia Imperial
                </h2>
                <h3 className="text-5xl md:text-7xl font-karantina font-extrabold text-white uppercase leading-none">
                    ¿DÓNDE ESTAMOS <br />
                    <span className="text-brand-gold italic">UBICADOS?</span>
                </h3>
                <p className="text-neutral-500 text-lg font-light leading-relaxed">
                    Encuéntranos en el corazón de la ciudad. Nuestras sedes están diseñadas para ofrecer un ambiente de exclusividad y confort total mientras transformamos tu estilo.
                </p>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-6">
                {[
                    { icon: Phone, label: "Línea Real", val: "+57 300 973 5155" },
                    { icon: Mail, label: "Correo", val: "hola@imperio.com" },
                    { icon: Clock, label: "Horario", val: "8:00 AM - 8:00 PM" },
                    { icon: MapPin, label: "Sede Central", val: "Neiva, Huila" }
                ].map((item, i) => (
                    <div key={i} className="p-6 bg-neutral-900 border border-neutral-800 rounded-2xl group hover:border-brand-gold/20 transition-all duration-500">
                        <item.icon className="size-5 text-brand-gold mb-4 group-hover:scale-110 transition-transform" />
                        <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-1">{item.label}</p>
                        <p className="text-white font-bold text-sm tracking-wide">{item.val}</p>
                    </div>
                ))}
            </div>
        </div>

        <BranchesSection/>
      </section>

      <section className="pb-32">
        <ContactSection />
      </section>
    </main>
  );
}

