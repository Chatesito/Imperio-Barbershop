import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const CustomSelect = ({ label, value, onChange, options, error, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredOptions = options.filter(opt => 
    opt.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    opt.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const groupedOptions = filteredOptions.reduce((acc, service) => {
    if (!acc[service.category]) {
      acc[service.category] = [];
    }
    acc[service.category].push(service);
    return acc;
  }, {});

  const handleSelect = (optionValue) => {
    onChange(optionValue);
    setIsOpen(false);
    setSearchTerm("");
  };

  const selectedOption = options.find(opt => `${opt.name} - ${opt.price}` === value);

  return (
    <div className="relative">
      <label className="block text-sm font-semibold mb-2 tracking-wide">
        {label}
      </label>
      
      {/* Campo principal */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-4 py-3 rounded-md bg-white text-black cursor-pointer flex items-center justify-between focus:outline-none focus:ring-2 transition-all ${
          error ? "ring-red-500" : "focus:ring-[#C5A253]"
        } ${isOpen ? "ring-2 ring-[#C5A253]" : ""}`}
      >
        <span className={selectedOption ? "text-black" : "text-gray-500"}>
          {selectedOption ? `${selectedOption.name} - ${selectedOption.price}` : placeholder}
        </span>
        <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </div>

      {/* Dropdown */}
      {isOpen && (
        <>
          {/* Overlay para cerrar al hacer clic fuera */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          
          <div className="absolute z-20 w-full mt-2 bg-white rounded-md shadow-lg border border-gray-200 max-h-64 overflow-hidden">
            {/* Campo de búsqueda */}
            <div className="p-2 border-b border-gray-200 sticky top-0 bg-white">
              <input
                type="text"
                placeholder="Buscar servicio..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#C5A253] text-sm text-black"
                onClick={(e) => e.stopPropagation()}
              />
            </div>

            {/* Opciones con scroll */}
            <div className="overflow-y-auto max-h-52">
              {Object.keys(groupedOptions).length === 0 ? (
                <div className="px-4 py-3 text-gray-500 text-sm">
                  No se encontraron servicios
                </div>
              ) : (
                Object.entries(groupedOptions).map(([category, categoryServices]) => (
                  <div key={category}>
                    <div className="px-4 py-2 bg-gray-100 font-semibold text-sm text-gray-800 sticky top-0">
                      {category}
                    </div>
                    {categoryServices.map((service, index) => (
                      <div
                        key={index}
                        onClick={() => handleSelect(`${service.name} - ${service.price}`)}
                        className="px-4 py-3 hover:bg-[#C5A253] hover:text-white cursor-pointer transition-colors text-sm border-b border-gray-100 last:border-b-0 text-gray-900"
                      >
                        <span className="font-medium">{service.name}</span>
                        <span className="ml-2">- {service.price}</span>
                      </div>
                    ))}
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}

      {error && (
        <span className="text-red-500 text-sm mt-1">{error}</span>
      )}
    </div>
  );
};

export default CustomSelect;