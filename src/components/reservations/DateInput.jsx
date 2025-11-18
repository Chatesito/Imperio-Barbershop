import React from "react";

const DateInput = ({ label, id, register, errors, minDate, maxDate, validate }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-semibold mb-2 tracking-wide">
      {label}
    </label>
    <input
      id={id}
      type="date"
      {...register(id, { 
        required: `${label} es requerido`,
        validate: validate
      })}
      min={minDate}
      max={maxDate}
      className={`w-full px-4 py-3 rounded-md bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 transition-all ${
        errors[id] ? "ring-red-500" : "focus:ring-[#C5A253]"
      }`}
    />
    {errors[id] && (
      <span className="text-red-500 text-sm mt-1">{errors[id].message}</span>
    )}
  </div>
);

export default DateInput;