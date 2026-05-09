import React, { useState, useEffect } from "react";
import { Facebook, Instagram, Scissors, Star, Clock, Trophy, ShieldCheck, MapPin, ChevronRight } from "lucide-react";
import api from "../services/api";

export default function Home() {
    const [branches, setBranches] = useState([]);

    useEffect(() => {
        const fetchBranches = async () => {
            try {
                const { data } = await api.get("/branches");
                setBranches(data || []);
            } catch (error) {
                console.error("Error loading branches:", error);
            }
        };
        fetchBranches();
    }, []);

    return (
        <div className="flex flex-col bg-neutral-950">
            {/* ... Rest of the component (Hero, About, etc.) */}
            {/* UBICACIÓN FINAL */}
            <section className="py-24 bg-neutral-950 relative">
                <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
                    <div>
                         <h2 className="text-4xl md:text-5xl font-karantina font-extrabold text-white uppercase mb-6">
                            Ven a <span className="text-brand-gold">Dominar</span> tu estilo
                         </h2>
                         <p className="text-neutral-400 mb-10 leading-relaxed max-w-lg">
                            Visítanos en nuestras sedes en Neiva. Espacios climatizados, modernos y diseñados pensando en tu confort absoluto.
                         </p>
                         <div className="space-y-8">
                             {branches.length > 0 ? branches.map((branch) => (
                                 <div key={branch._id} className="flex items-start gap-4 p-6 rounded-2xl bg-neutral-900/50 border border-neutral-800 hover:border-brand-gold/30 transition-all group">
                                    <div className="p-3 rounded-lg bg-neutral-900 border border-neutral-800 text-brand-gold group-hover:bg-brand-gold group-hover:text-neutral-950 transition-all">
                                        <MapPin className="size-6" />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold">{branch.name}</h4>
                                        <p className="text-neutral-500 text-sm">{branch.address}</p>
                                    </div>
                                 </div>
                             )) : (
                                 <div className="flex items-start gap-4">
                                    <div className="p-3 rounded-lg bg-neutral-900 border border-neutral-800 text-brand-gold">
                                        <MapPin className="size-6" />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold">Nuestra Sede Principal</h4>
                                        <p className="text-neutral-500 text-sm">Cll 14A #34-20, Barrio Las Catleyas, Neiva.</p>
                                    </div>
                                 </div>
                             )}
                         </div>
                    </div>
                    <div className="h-[450px] rounded-3xl overflow-hidden border border-neutral-800 shadow-2xl">
                         <iframe
                            title="Mapa Imperio"
                            src={branches[0]?.mapUrl || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3984.5774530734902!2d-75.265569!3d2.9370423!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3b7415e24bef73%3A0x77c1c66f24bab228!2sCl.%2014a%20%23%2034-20%2C%20Neiva%2C%20Huila!5e0!3m2!1ses-419!2sco!4v1763579753457!5m2!1ses-419!2sco"}
                            className="w-full h-full grayscale invert opacity-80 hover:grayscale-0 hover:invert-0 hover:opacity-100 transition-all duration-700"
                            loading="lazy"
                        />
                    </div>
                </div>
            </section>
        </div>
    );
}
