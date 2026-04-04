import React from "react";

const TextArea = ({ label, id, register, placeholder, rows = 4 }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-semibold mb-2 tracking-wide">
      {label}
    </label>
    <textarea
      id={id}
      rows={rows}
      placeholder={placeholder}
      {...register(id)}
      className="w-full px-4 py-3 rounded-md bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#C5A253] transition-all resize-none"
    ></textarea>
  </div>
);

export default TextArea;