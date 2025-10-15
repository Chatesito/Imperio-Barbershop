import { MapPin, Mail, Phone, Clock } from "lucide-react";

function FooterItem({ icon, label, content }) {
    return (
        <div className="flex flex-col items-start md:items-center gap-2">
            <div className="w-9 h-9 rounded-full grid place-items-center bg-neutral-700/60 border border-neutral-600 text-[var(--brand-gold)]">
                {icon}
            </div>
            <h3 className="text-white tracking-widest text-xs font-semibold">{label}</h3>
            <p className="text-neutral-400 text-sm">{content}</p>
        </div>
    );
}

export default function Footer() {
    return (
        <footer className="bg-neutral-800 text-neutral-300 border-t border-neutral-700 mt-10">
            <div className="max-w-7xl mx-auto px-4 py-10 text-center">
                <div className="h-39 w-45 mx-auto mb-3 rounded-full bg-neutral-700 grid place-items-center border border-neutral-600">
                    <img src="/public/images/logo.png" alt="Imperio Barbershop" className="h-full w-full object-contain" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8 text-left md:text-center">
                    <FooterItem
                        icon={<MapPin className="size-4" aria-hidden />}
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
                        icon={<Mail className="size-4" aria-hidden />}
                        label="EMAIL"
                        content={
                            <a href="mailto:ImperioBarbershop@gmail.com" className="hover:text-white">
                                ImperioBarbershop@gmail.com
                            </a>
                        }
                    />
                    <FooterItem
                        icon={<Phone className="size-4" aria-hidden />}
                        label="TELEFONO"
                        content={
                            <>
                                <a href="tel:+573009735155" className="hover:text-white">(+57) 300 973 51 55</a>
                            </>
                        }
                    />
                    <FooterItem
                        icon={<Clock className="size-4" aria-hidden />}
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

                <div className="h-px my-6 bg-gradient-to-r from-transparent via-brand-gold to-transparent" />
                <p className="text-neutral-400 text-sm">
                    © 2025 Imperio Barbershop. Todos los derechos reservados.
                </p>
            </div>
        </footer>
    );
}