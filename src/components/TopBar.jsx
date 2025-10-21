import { MapPin, Phone } from "lucide-react";

export default function TopBar() {
    return (
        <div className="bg-neutral-950 text-neutral-200 border-b border-neutral-800">
            <div className="max-w-7xl mx-auto px-7 h-10 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 text-sm">
                    <span className="text-brand-gold font-semibold tracking-wide">TE ESPERAMOS</span>
                    <span className="text-white/90">CUALQUIER DIA DE LA SEMANA</span>
                </div>

                <div className="hidden sm:flex items-center gap-6 text-sm">
                    <span className="inline-flex items-center gap-2 text-neutral-300">
                        <MapPin className="size-4 text-brand-gold" aria-hidden />
                    <span>Huila - Neiva</span>
                    </span>
                    <span className="inline-flex items-center gap-2 text-neutral-300">
                        <Phone className="size-4 text-brand-gold" aria-hidden />
                        <a href="tel:+13662537950" className="hover:text-white">(+57) 300 973 51 55</a>
                    </span>
                </div>
            </div>
        </div>
    );
}