import React from "react";
import { Clock, CreditCard, XCircle, MapPin, Phone } from "lucide-react";

const ReservationAside = () => {
  return (
    <aside className="bg-[#C5A253]/95 text-black rounded-[2rem] shadow-[0_8px_25px_rgba(0,0,0,0.15)] p-8 sm:p-10 flex flex-col justify-between gap-10 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_12px_35px_rgba(0,0,0,0.25)] w-full">
      <h2 className="text-3xl sm:text-4xl font-karantina font-extrabold uppercase text-center sm:text-left">
        Detalles importantes
      </h2>

      <ul className="space-y-6 text-base sm:text-lg leading-relaxed">
        <li className="flex items-start gap-3">
          <Clock className="w-5 h-5 sm:w-6 sm:h-6 mt-1" />
          <p>
            <strong>Llegada puntual:</strong> llega al menos 10 minutos antes de tu cita para evitar retrasos.
          </p>
        </li>

        <li className="flex items-start gap-3">
          <CreditCard className="w-5 h-5 sm:w-6 sm:h-6 mt-1" />
          <p>
            <strong>Pagos:</strong> aceptamos efectivo, tarjeta y pagos digitales (Nequi, Daviplata).
          </p>
        </li>

        <li className="flex items-start gap-3">
          <XCircle className="w-5 h-5 sm:w-6 sm:h-6 mt-1" />
          <p>
            <strong>Cancelaciones:</strong> si no puedes asistir, cancela con al menos 2 horas de anticipación.
          </p>
        </li>

      </ul>

      {/* --- Botón de llamada --- */}
      <a
        href="tel:+573009735155"
        className="mt-6 flex items-center justify-center gap-3 bg-neutral-950 text-white font-extrabold uppercase tracking-wider py-3 sm:py-4 px-6 sm:px-8 rounded-xl hover:bg-neutral-800 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-black w-full sm:w-auto text-center text-sm sm:text-base md:text-lg"
      >
        <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
        Llamar para asistencia
      </a>
    </aside>
  );
};

export default ReservationAside;
