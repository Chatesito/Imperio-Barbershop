import React from "react";

const SelectInput = ({ label, id, register, errors, options, placeholder }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-semibold mb-2 tracking-wide">
      {label}
    </label>
    <select
      id={id}
      {...register(id, { required: `Selecciona ${label.toLowerCase()}` })}
      className={`w-full px-4 py-3 rounded-md bg-white text-black focus:outline-none focus:ring-2 transition-all ${
        errors[id] ? "ring-red-500" : "focus:ring-[#C5A253]"
      }`}
    >
      <option value="">{placeholder}</option>
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
    {errors[id] && (
      <span className="text-red-500 text-sm mt-1">{errors[id].message}</span>
    )}
  </div>
);

export default SelectInput;