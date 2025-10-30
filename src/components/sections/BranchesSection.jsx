import React from "react";
import BranchCard from "../BranchCard";
import sede1 from "../../assets/images/sede-uno.png";
import sede2 from "../../assets/images/sede-uno.png";
import sede3 from "../../assets/images/sede-uno.png";

export default function BranchesSection() {
  const branches = [
    {
      name: "Sede Platino",
      address: "Calle 10 #4-55, Neiva, Huila",
      image: sede1,
      mapUrl: "https://maps.app.goo.gl/ApWLAAtUJZ41DMg99?g_st=aw",
    },
    {
      name: "Sede Dorada",
      address: "Carrera 12 #6-22, Neiva, Huila",
      image: sede2,
      mapUrl: "https://maps.app.goo.gl/tSiJwQp5rYepYwh26",
    },
    {
      name: "Sede Master",
      address: "Av. Circunvalar #8-14, Neiva, Huila",
      image: sede3,
      mapUrl: "https://maps.app.goo.gl/1geQQGUaJU9YJ1WEA",
    },
  ];

  return (
    <section
      id="branches"
      className="w-full max-w-7xl mx-auto px-6 flex flex-col items-center justify-center text-center"
    >
      <h2 className="text-brand-gold text-7xl font-karantina font-extrabold uppercase mb-14">
        Nuestras Sedes
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
        {branches.map((branch) => (
          <BranchCard key={branch.name} {...branch} />
        ))}
      </div>
    </section>
  );
}
