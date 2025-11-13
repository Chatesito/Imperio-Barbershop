import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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

  return (
    <nav className="bg-neutral-900 border-b border-neutral-700 relative z-40 shadow-md shadow-black/20">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="h-10 w-10 shrink-0">
            <img
              src="/images/Isotipo.png"
              alt="Logo - Imperio Barbershop"
              className="h-full w-full object-contain"
            />
          </div>
          <div className="leading-tight">
            <div className="font-extrabold tracking-wide text-white text-lg">IMPERIO</div>
            <div className="text-xs text-neutral-400 tracking-widest">BARBERSHOP</div>
          </div>
        </Link>

        {/* Links principales (pantallas grandes) */}
        <div className="hidden lg:flex items-center gap-6">
          {links.map((l) => (
            <NavLink
              key={l.label}
              to={l.to}
              className={({ isActive }) =>
                [
                  "px-1 py-2 text-sm font-semibold tracking-wide border-b-2 transition-colors",
                  isActive
                    ? "text-brand-gold border-brand-gold"
                    : "text-neutral-300 hover:text-brand-gold border-transparent hover:border-brand-gold",
                ].join(" ")
              }
            >
              {l.label}
            </NavLink>
          ))}
        </div>

        {/* Botón del carrito (solo escritorio) */}
        <button className="hidden lg:inline-flex items-center gap-2 px-3 py-2 rounded-md bg-neutral-700/60 hover:bg-neutral-700 transition-all">
          <ShoppingBag className="size-4" aria-hidden />
          <span>CARD</span>
          <span className="ml-1 text-xs font-bold bg-brand-gold text-black rounded-full px-2 py-0.5">
            0
          </span>
        </button>

        {/* Botón menú móvil */}
        <button
          className="lg:hidden text-neutral-300 focus:outline-none text-2xl"
          onClick={() => setOpen(!open)}
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* Menú móvil con animación */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden absolute inset-x-0 top-full bg-neutral-900 border-t border-neutral-700 shadow-md"
          >
            <div className="px-4 py-3 flex flex-col gap-1">
              {links.map((l) => (
                <NavLink
                  key={l.label}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    [
                      "block px-2 py-2 rounded-md text-sm font-semibold transition-all",
                      isActive
                        ? "bg-neutral-700 text-white"
                        : "text-neutral-300 hover:bg-neutral-700 hover:text-white",
                    ].join(" ")
                  }
                >
                  {l.label}
                </NavLink>
              ))}

              <button className="mt-2 inline-flex items-center gap-2 px-3 py-2 rounded-md bg-neutral-700/60 hover:bg-neutral-700 transition-all">
                <ShoppingBag className="size-4" aria-hidden />
                <span>CARD</span>
                <span className="ml-1 text-xs font-bold bg-brand-gold text-black rounded-full px-2 py-0.5">
                  0
                </span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
