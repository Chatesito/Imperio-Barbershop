import React, { useState, useEffect } from "react";
import BranchCard from "../BranchCard";

export default function BranchesSection() {
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const { default: api } = await import("../../services/api.js");
        const { data } = await api.get("/branches");
        setBranches(data);
      } catch (error) {
        console.error("Error loading branches:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBranches();
  }, []);

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
