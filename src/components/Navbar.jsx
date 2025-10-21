import { useState } from "react";
import { ShoppingBag, Menu, X } from "lucide-react";

const links = [
    { href: "#", label: "INICIO" },
    { href: "#", label: "SERVICIOS Y PRECIOS" },
    { href: "#", label: "SOBRE NOSOTROS" },
    { href: "#", label: "RESERVACIONES" },
    { href: "#", label: "NUESTRO EQUIPO" },
    { href: "#", label: "CONTACTO" },
];

export default function Navbar() {
    const [open, setOpen] = useState(false);

    return (
        <nav className="bg-neutral-800 border-b border-neutral-700 relative z-40">
            <div className="max-w-7xl mx-auto px-7 h-16 flex items-center justify-between gap-4">
                <a hrwef="#" className="flex items-center gap-3">
                    <div className="h-[5rem] w-11">
                        <img src="/public/images/logo.png" alt="Logo - Imperio Barbershop" className="h-full w-full object-contain" />
                    </div>
                </a>

                {/* Toggle móvil */}
                <button
                    className="lg:hidden inline-flex items-center justify-center p-2 rounded-md text-neutral-200 hover:bg-neutral-700"
                    onClick={() => setOpen((v) => !v)}
                    aria-label="menu desplegable"
                    aria-expanded={open}
                >
                    {open ? <X className="size-5" /> : <Menu className="size-5" />}
                </button>

                {/* Links desktop */}
                <div className="hidden lg:flex items-center gap-6">
                    {links.map((l) => (
                        <a
                            key={l.label}
                            href={l.href}
                            className="px-1 py-2 text-sm font-semibold tracking-wide text-neutral-300 hover:text-brand-gold border-b-2 border-transparent hover:border-brand-gold"
                        >
                            {l.label}
                        </a>
                    ))}
                </div>

                {/* Acciones */}
                <div className="hidden lg:flex items-center gap-2">
                    <button className="inline-flex items-center gap-2 px-3 py-2 rounded-md hover:bg-neutral-700/60">
                        <ShoppingBag className="size-4" aria-hidden />
                        <span className="hidden md:inline">TARJETA</span>
                        <span className="ml-1 text-xs font-bold bg-brand-gold text-black rounded-full px-2 py-0.5">0</span>
                    </button>
                </div>
            </div>

        {/* Drawer móvil */}
            {open && (
                <div className="lg:hidden absolute inset-x-0 top-full bg-neutral-800 border-t border-neutral-700">
                    <div className="px-4 py-3 flex flex-col gap-1">
                        {links.map((l) => (
                            <a
                                key={l.label}
                                href={l.href}
                                onClick={() => setOpen(false)}
                                className="block px-2 py-2 rounded-md text-sm font-semibold text-neutral-300 hover:bg-neutral-700 hover:text-white"
                            >
                                {l.label}
                            </a>
                        ))}

                        <button className="mt-2 inline-flex items-center gap-2 px-3 py-2 rounded-md bg-neutral-700/60 hover:bg-neutral-700">
                            <ShoppingBag className="size-4" aria-hidden />
                            <span>CARD</span>
                            <span className="ml-1 text-xs font-bold bg-brand-gold text-black rounded-full px-2 py-0.5">0</span>
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
}
