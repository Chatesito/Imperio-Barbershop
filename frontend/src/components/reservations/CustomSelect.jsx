import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const CustomSelect = ({ label, value = [], onChange, options, error, placeholder, isMulti = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredOptions = options.filter(opt => {
    const catName = (typeof opt.category === 'object' && opt.category !== null) ? opt.category.name : (opt.category || "");
    return opt.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           catName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const groupedOptions = filteredOptions.reduce((acc, service) => {
    const cat = (typeof service.category === 'object' && service.category !== null) ? service.category.name : (service.category || "Otros");
    if (!acc[cat]) {
      acc[cat] = [];
    }
    acc[cat].push(service);
    return acc;
  }, {});

  const handleSelect = (service) => {
    const optionStr = `${service.name} - ${service.price}`;
    if (isMulti) {
      if (value.includes(optionStr)) {
        onChange(value.filter(v => v !== optionStr));
      } else {
        onChange([...value, optionStr]);
      }
    } else {
      onChange(optionStr);
      setIsOpen(false);
    }
    setSearchTerm("");
  };

  const getDisplayValue = () => {
    if (isMulti) {
      if (value.length === 0) return placeholder;
      if (value.length === 1) return value[0];
      return `${value.length} servicios seleccionados`;
    }
    return value || placeholder;
  };

  return (
    <div className="relative">
      <label className="block text-sm font-semibold mb-2 tracking-wide text-brand-gold uppercase text-[10px]">
        {label}
      </label>
      
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-700 text-white cursor-pointer flex items-center justify-between focus:outline-none focus:ring-1 focus:ring-brand-gold transition-all ${
          error ? "border-red-500" : ""
        } ${isOpen ? "border-brand-gold" : ""}`}
      >
        <span className={value && (isMulti ? value.length > 0 : value) ? "text-white text-sm" : "text-neutral-500 text-sm"}>
          {getDisplayValue()}
        </span>
        <ChevronDown className={`w-4 h-4 transition-transform text-neutral-500 ${isOpen ? "rotate-180" : ""}`} />
      </div>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <div className="absolute z-20 w-full mt-2 bg-neutral-900 rounded-xl shadow-2xl border border-neutral-800 max-h-80 overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-3 border-b border-neutral-800 sticky top-0 bg-neutral-900">
              <input
                type="text"
                placeholder="Buscar servicio..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-brand-gold text-xs text-white"
                onClick={(e) => e.stopPropagation()}
              />
            </div>

            <div className="overflow-y-auto max-h-60 custom-scrollbar">
              {Object.keys(groupedOptions).length === 0 ? (
                <div className="px-4 py-6 text-neutral-500 text-xs text-center">
                  No se encontraron servicios
                </div>
              ) : (
                Object.entries(groupedOptions).map(([category, categoryServices]) => (
                  <div key={category}>
                    <div className="px-4 py-2 bg-neutral-800/50 font-bold text-[10px] text-brand-gold uppercase tracking-widest sticky top-0 backdrop-blur-sm">
                      {category}
                    </div>
                    {categoryServices.map((service, index) => {
                      const optionStr = `${service.name} - ${service.price}`;
                      const isSelected = isMulti ? value.includes(optionStr) : value === optionStr;
                      return (
                        <div
                          key={index}
                          onClick={() => handleSelect(service)}
                          className={`px-4 py-3 flex items-center justify-between hover:bg-brand-gold/10 cursor-pointer transition-colors border-b border-neutral-800/50 last:border-b-0 ${isSelected ? "bg-brand-gold/5" : ""}`}
                        >
                          <div className="flex flex-col">
                            <span className={`text-sm font-medium ${isSelected ? "text-brand-gold" : "text-white"}`}>{service.name}</span>
                            <span className="text-[10px] text-neutral-500">{service.duration || "30"} min</span>
                          </div>
                          <span className={`text-sm font-bold ${isSelected ? "text-brand-gold" : "text-neutral-300"}`}>
                            ${service.price}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}

      {error && <span className="text-red-500 text-[10px] mt-1 block font-medium uppercase tracking-wider">{error}</span>}
    </div>
  );
};

export default CustomSelect;