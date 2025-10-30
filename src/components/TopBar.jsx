import { MapPin, Phone } from "lucide-react";

export default function TopBar() {
    return (
        <div className="bg-neutral-950 text-neutral-200 border-b border-neutral-800 text-xs sm:text-sm tracking-widest">
            
            <div className="max-w-7xl mx-auto px-4 h-10 flex items-center justify-between gap-4">
                <div className="flex items-center gap-2 sm:gap-3">
                    <span className="text-brand-gold font-semibold uppercase">
                        Estilo y precisión
                    </span>
                    <span className="text-white/85">los 7 días de la semana</span>
                </div>

                <div className="hidden sm:flex items-center gap-6">
                    <span className="inline-flex items-center gap-2 text-neutral-300">
                        <MapPin className="size-4 text-brand-gold" aria-hidden />
                        <span className="text-white/90">Huila - Neiva</span>
                    </span>
                    <span className="inline-flex items-center gap-2 text-neutral-300">
                        <Phone className="size-4 text-brand-gold" aria-hidden />
                        <a
                        href="tel:+573009735155"
                        className="hover:text-brand-gold transition-colors duration-200"
                        >
                        (+57) 300 973 51 55
                        </a>
                    </span>
                </div>
            </div>
        </div>
    );
}
