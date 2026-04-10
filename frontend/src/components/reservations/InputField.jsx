import React from "react";

const InputField = ({ label, id, type = "text", placeholder, register, errors, ...props }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-semibold mb-2 tracking-wide">
      {label}
    </label>
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      {...register(id, { 
        required: `${label} es requerido`,
        ...props.validation 
      })}
      className={`w-full px-5 py-4 rounded-2xl bg-white/5 border text-white placeholder-neutral-500 focus:outline-none focus:ring-2 transition-all duration-300 ${
        errors[id] ? "border-red-500 ring-red-500/20" : "border-white/10 focus:ring-brand-gold focus:border-brand-gold"
      }`}
      {...props}
    />
    {errors[id] && (
      <span className="text-red-500 text-sm mt-1">{errors[id].message}</span>
    )}
  </div>
);

export default InputField;