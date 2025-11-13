import React from "react";

const InputField = ({ label, id, type = "text", register, errors, placeholder }) => (
  <div className="flex flex-col w-full">
    <label htmlFor={id} className="block text-sm font-semibold mb-2 tracking-wide">
      {label}
    </label>
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      {...register(id, { required: `${label} es obligatorio` })}
      className={`w-full px-4 py-3 rounded-md bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 transition-all ${
        errors[id] ? "ring-red-500" : "focus:ring-[#C5A253]"
      }`}
    />
    {errors[id] && <span className="text-red-500 text-sm mt-1">{errors[id].message}</span>}
  </div>
);

export default InputField;
