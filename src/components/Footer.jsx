import { MapPin, Mail, Phone, Clock } from "lucide-react";

function FooterItem({ icon, label, content }) {
    return (
        <div className="flex flex-col items-center text-center gap-2 group">
            <div className="text-brand-gold group-hover:scale-110 transition-transform">
                {icon}
            </div>
            <h3 className="text-white text-sm font-semibold tracking-wide">{label}</h3>
            <div className="text-neutral-400 text-sm leading-relaxed group-hover:text-white transition-colors">
                {content}
            </div>
        </div>
    );
}

export default function Footer() {
    return (
        <footer className="bg-gradient-to-b from-neutral-900 to-neutral-950 border-t border-brand-gold/20 text-neutral-300">
            <div className="max-w-7xl mx-auto px-4 py-14 text-center space-y-10">

                <div className="flex flex-col md:flex-row justify-center items-center gap-3">
                    <img
                        src="/public/images/Isotipo.png"
                        alt="Imperio Barbershop"
                        className="h-14 w-auto object-contain"
                    />
                    <div className="text-center md:text-left">
                        <h2 className="text-white font-extrabold text-2xl tracking-wide">IMPERIO</h2>
                        <p className="text-neutral-400 uppercase text-xs tracking-[0.25em]">Barbershop</p>
                    </div>
                </div>

                {/* --- Información principal --- */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-12 mt-6">
                    <FooterItem
                        icon={<MapPin className="size-5" aria-hidden />}
                        label="DIRECCIÓN"
                        content={
                            <>
                                Cll 14a # 34-20
                                <br />
                                Barrio Las Catleyas
                            </>
                        }
                    />
                    <FooterItem
                        icon={<Mail className="size-5" aria-hidden />}
                        label="EMAIL"
                        content={
                            <a
                                href="mailto:ImperioBarbershop@gmail.com"
                                className="hover:text-white transition-colors"
                            >
                                ImperioBarbershop@gmail.com
                            </a>
                        }
                    />
                    <FooterItem
                        icon={<Phone className="size-5" aria-hidden />}
                        label="TELÉFONO"
                        content={
                            <a
                                href="tel:+573009735155"
                                className="hover:text-white transition-colors"
                            >
                                (+57) 300 973 51 55
                            </a>
                        }
                    />
                    <FooterItem
                        icon={<Clock className="size-5" aria-hidden />}
                        label="HORARIO"
                        content={
                            <>
                                Lun - Vier: 8am - 6pm
                                <br />
                                Sab - Dom: 10am - 5pm
                            </>
                        }
                    />
                </div>

                <div className="h-px my-8 bg-gradient-to-r from-transparent via-brand-gold to-transparent opacity-50" />

                <p className="text-neutral-500 text-sm tracking-wide">
                    © 2025 <span className="text-brand-gold font-semibold">Imperio Barbershop</span>. Todos los derechos reservados.
                </p>
            </div>
        </footer>
    );
}
