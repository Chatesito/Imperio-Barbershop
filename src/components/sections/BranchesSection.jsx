import React from "react";
import BranchCard from "../BranchCard";
import sede1 from "../../assets/images/sede-uno.png";
import sede2 from "../../assets/images/sede-dos.png";
import sede3 from "../../assets/images/sede-tres.png";

export default function BranchesSection() {
  const branches = [
    {
      name: "Sede Ipanema",
      address: "Calle 29, Neiva, Huila",
      image: sede1,
      mapUrl: "https://maps.app.goo.gl/qHXLv8SrMyg2Nayq5",
    },
    {
      name: "Sede Candido",
      address: "Cl. 37 #1 26, Neiva, Huila",
      image: sede2,
      mapUrl: "https://maps.app.goo.gl/i7D5SCKU4SS2ihuD8",
    },
    {
      name: "Sede Neiva La Nueva",
      address: "Cra. 20 #26-385, Neiva, Huila",
      image: sede3,
      mapUrl: "https://maps.app.goo.gl/AQykuFbBc8nwNPVt9",
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
