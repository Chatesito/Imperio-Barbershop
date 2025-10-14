import { MapPin, Mail, Phone, Clock } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-neutral-800 text-neutral-300 border-t border-neutral-700 mt-10">
            <div className="max-w-7xl mx-auto px-4 py-10 text-center">
                <div className="h-16 w-16 mx-auto mb-3 rounded-full bg-neutral-700 grid place-items-center border border-neutral-600">
                    <span className="text-xs tracking-widest text-brand-gold">2025</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-wide mb-6">
                    Imperio Barbershop
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8 text-left md:text-center">
                    <FooterItem
                        icon={<MapPin className="size-4" aria-hidden />}
                        label="ADDRESS"
                        content={
                            <>
                                304 North Cardinal St.
                                <br />
                                Dorchester Center, MA 02124
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
                        label="PHONE"
                        content={
                            <>
                                <a href="tel:+635551212" className="hover:text-white">(+63) 555 1212</a>
                                <br />
                                <a href="tel:+635551212" className="hover:text-white">(+63) 555 1212</a>
                            </>
                        }
                    />
                    <FooterItem
                        icon={<Clock className="size-4" aria-hidden />}
                        label="WORKING HOURS"
                        content={
                            <>
                                Mon - Fri: 10am - 6pm
                                <br />
                                Sat - Sun: 10am - 6pm
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