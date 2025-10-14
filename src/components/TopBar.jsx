import { MapPin, Phone } from "lucide-react";

export default function TopBar() {
    return (
        <div className="bg-neutral-950 text-neutral-200 border-b border-neutral-800">
            <div className="max-w-7xl mx-auto px-4 h-10 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 text-sm">
                    <span className="text-brand-gold font-semibold tracking-wide">WE ARE OPEN</span>
                    <span className="text-white/90">7 DAYS A WEEK</span>
                </div>

                <div className="hidden sm:flex items-center gap-6 text-sm">
                    <span className="inline-flex items-center gap-2 text-neutral-300">
                        <MapPin className="size-4 text-brand-gold" aria-hidden />
                    <span>9400 Penatibus Road</span>
                    </span>
                    <span className="inline-flex items-center gap-2 text-neutral-300">
                        <Phone className="size-4 text-brand-gold" aria-hidden />
                        <a href="tel:+13662537950" className="hover:text-white">1-366-253-7950</a>
                    </span>
                </div>
            </div>
        </div>
    );
}