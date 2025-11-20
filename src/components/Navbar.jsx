import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { User } from "lucide-react";
import AuthModal from "./AuthModal";

const links = [
  { to: "/", label: "INICIO" },
  { to: "/Services", label: "SERVICIOS Y PRECIOS" },
  { to: "/About", label: "SOBRE NOSOTROS" },
  { to: "/Reservations", label: "RESERVACIONES" },
  { to: "/OurTeam", label: "NUESTRO EQUIPO" },
  { to: "/Contact", label: "CONTACTO" },
];

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [showAuthModal, setShowAuthModal] = useState(false);

    const desktopLinkClass = ({ isActive }) =>
        [
            "px-1 py-2 text-sm font-semibold tracking-wide border-b-2 transition-colors",
            isActive
                ? "text-brand-gold border-brand-gold"
                : "text-neutral-300 hover:text-brand-gold border-transparent hover:border-brand-gold",
        ].join(" ");

    return (
        <>
            <nav className="bg-neutral-900 border-b border-neutral-700 relative z-40 shadow-md shadow-black/20">
                <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">

                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2">
                        <img
                            src="/images/Isotipo.png"
                            className="h-10 w-10 object-contain"
                        />
                        <div className="leading-tight">
                            <div className="font-extrabold text-white text-lg tracking-wide">IMPERIO</div>
                            <div className="text-xs text-neutral-400 tracking-widest">BARBERSHOP</div>
                        </div>
                    </Link>

                    {/* Links desktop */}
                    <div className="hidden lg:flex items-center gap-6">
                        {links.map((l) => (
                            <NavLink key={l.label} to={l.to} className={desktopLinkClass}>
                                {l.label}
                            </NavLink>
                        ))}
                    </div>

                    {/* Login outline */}
                    <button 
                        onClick={() => setShowAuthModal(true)}
                        className="hidden lg:flex items-center gap-2 px-4 py-1.5 rounded-md border border-brand-gold text-brand-gold font-semibold text-sm tracking-wide hover:bg-brand-gold hover:text-black transition-colors"
                    >
                        <User className="size-4" />
                        <span>Ingresar</span>
                    </button>

                    {/* Mobile menu */}
                    <button
                        className="lg:hidden text-neutral-300 text-2xl"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? "✕" : "☰"}
                    </button>
                </div>

                {/* Mobile dropdown */}
                {open && (
                    <div className="lg:hidden bg-neutral-900 border-t border-neutral-700">
                        <div className="px-4 py-3 flex flex-col gap-1">
                            {links.map((l) => (
                                <NavLink
                                    key={l.label}
                                    to={l.to}
                                    onClick={() => setOpen(false)}
                                    className="block px-2 py-2 rounded-md text-sm font-semibold text-neutral-300 hover:bg-neutral-700 hover:text-white"
                                >
                                    {l.label}
                                </NavLink>
                            ))}

                            {/* Login mobile */}
                            <button 
                                onClick={() => {
                                    setShowAuthModal(true);
                                    setOpen(false);
                                }}
                                className="mt-2 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md border border-brand-gold text-brand-gold font-semibold text-sm tracking-wide hover:bg-brand-gold hover:text-black transition-colors"
                            >
                                <User className="size-4" />
                                <span>Ingresar</span>
                            </button>
                        </div>
                    </div>
                )}
            </nav>

            {/* AuthModal separado */}
            <AuthModal 
                isOpen={showAuthModal}
                onClose={() => setShowAuthModal(false)}
            />
        </>
    );
}
