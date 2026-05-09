import React from "react";

const SelectInput = ({ label, id, register, errors, options, placeholder }) => (
  <div>
    <label htmlFor={id} className="block text-[10px] font-bold text-neutral-500 uppercase tracking-[0.2em] mb-2 ml-1">
      {label}
    </label>
    <div className="relative">
      <select
        id={id}
        {...register(id, { required: `Selecciona ${label.toLowerCase()}` })}
        className={`w-full px-5 py-4 rounded-2xl bg-neutral-950 border text-white text-sm appearance-none focus:outline-none focus:ring-1 transition-all duration-300 ${
          errors[id] ? "border-red-500 ring-red-500/20" : "border-neutral-800 focus:border-brand-gold/50 focus:ring-brand-gold/10"
        }`}
      >
        <option value="" className="bg-neutral-950">{placeholder}</option>
        {options.map((option, index) => (
          <option key={index} value={option.value} className="bg-neutral-950">
            {option.label}
          </option>
        ))}
      </select>
      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-500">
        <svg xmlns="http://www.w3.org/2000/svg" className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
    {errors[id] && (
      <span className="text-red-500 text-[10px] font-bold uppercase tracking-widest mt-2 block ml-1">{errors[id].message}</span>
    )}
  </div>
);

export default SelectInput;