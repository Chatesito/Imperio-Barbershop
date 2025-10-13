import React from 'react';
import { ShoppingBag, Phone, MapPin } from 'lucide-react';
import './Navbar.css'; // opcional

export default function Navbar() {
  return (
    <header className="w-full text-sm text-white">
      <div className="bg-black py-2 px-12 flex justify-between items-center">
        <div className="flex items-center gap-2 text-xs">
          <span className="text-[var(--brand-gold)] font-semibold">
            WE ARE OPEN
          </span>
          <span>7 DAYS A WEEK</span>
        </div>
        <div className="flex items-center gap-6 text-xs">
          <div className="flex items-center gap-1">
            <MapPin className="size-4 text-[var(--brand-gold)]" />
            <span>9400 Penatibus Road</span>
          </div>
          <div className="flex items-center gap-1">
            <Phone className="size-4 text-[var(--brand-gold)]" />
            <span>1-386-253-7950</span>
          </div>
        </div>
      </div>

      <nav className="bg-[#1a1a1a] py-4 px-12 flex justify-between items-center border-b border-[#2a2a2a]">
        <div className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="Imperio Barber Shop"
            className="size-12 object-contain"
          />
        </div>

        <ul className="flex items-center gap-8 uppercase text-xs font-semibold tracking-wide">
          <li className="text-[var(--brand-gold)] cursor-pointer">The Home</li>
          <li className="hover:text-[var(--brand-gold)] cursor-pointer">Services & Prices</li>
          <li className="hover:text-[var(--brand-gold)] cursor-pointer">About Us</li>
          <li className="hover:text-[var(--brand-gold)] cursor-pointer">Reservations</li>
          <li className="hover:text-[var(--brand-gold)] cursor-pointer">Our Team</li>
          <li className="hover:text-[var(--brand-gold)] cursor-pointer">Contact</li>
        </ul>

        <div className="flex items-center gap-2 cursor-pointer hover:text-[var(--brand-gold)] transition-colors">
          <ShoppingBag className="size-5" />
          <span className="text-xs font-semibold">Cart (0)</span>
        </div>
      </nav>
    </header>
  );
}
