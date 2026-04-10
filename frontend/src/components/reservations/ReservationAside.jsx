import React from "react";
import { Clock, CreditCard, XCircle, MapPin, Phone } from "lucide-react";

const ReservationAside = () => {
  return (
    <aside className="bg-neutral-900/40 backdrop-blur-md border border-brand-gold/20 text-white rounded-[2.5rem] p-8 md:p-10 flex flex-col gap-10 sticky top-24 transition-all duration-500 hover:border-brand-gold/40 shadow-2xl overflow-hidden group">
      <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
        <Clock className="size-32 text-brand-gold" />
      </div>

      <div className="space-y-2">
        <h2 className="text-sm font-bold text-brand-gold uppercase tracking-[0.4em]">Protocolo</h2>
        <h3 className="text-4xl font-karantina font-extrabold uppercase leading-none tracking-tight">
          DETALLES DEL <span className="text-brand-gold">RITUAL</span>
        </h3>
      </div>

      <ul className="space-y-8 relative z-10">
        {[
          { icon: Clock, title: "PUNTUALIDAD", desc: "Llega 10 minutos antes. El respeto por el tiempo es parte de nuestra excelencia." },
          { icon: CreditCard, title: "MÉTODOS DE PAGO", desc: "Efectivo, tarjetas y pagos digitales (Nequi, Daviplata) disponibles." },
          { icon: XCircle, title: "CANCELACIONES", desc: "Si tus planes cambian, avísanos con al menos 2 horas de antelación." }
        ].map((item, idx) => (
          <li key={idx} className="flex gap-5 group/item">
            <div className="size-12 rounded-xl bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center text-brand-gold group-hover/item:bg-brand-gold group-hover/item:text-neutral-950 transition-all duration-300">
              <item.icon className="size-6" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-1">{item.title}</h4>
              <p className="text-neutral-500 text-sm font-light leading-relaxed">
                {item.desc}
              </p>
            </div>
          </li>
        ))}
      </ul>

      {/* Soporte */}
      <div className="pt-6 border-t border-white/5">
        <p className="text-xs text-neutral-500 uppercase tracking-widest mb-6 text-center">¿Necesitas asistencia inmediata?</p>
        <a
          href="tel:+573009735155"
          className="group flex items-center justify-center gap-4 bg-white/5 border border-white/10 text-white font-bold uppercase tracking-widest py-4 px-8 rounded-2xl hover:bg-brand-gold hover:text-neutral-950 hover:border-brand-gold transition-all duration-500"
        >
          <Phone className="size-5 transition-transform group-hover:rotate-12" />
          LLAMAR AL IMPERIO
        </a>
      </div>
    </aside>
  );
};

export default ReservationAside;
