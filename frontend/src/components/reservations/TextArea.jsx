import React from "react";

const TextArea = ({ label, id, register, placeholder, rows = 4 }) => (
  <div>
    <label htmlFor={id} className="block text-[10px] font-bold text-neutral-500 uppercase tracking-[0.2em] mb-2 ml-1">
      {label}
    </label>
    <textarea
      id={id}
      rows={rows}
      placeholder={placeholder}
      {...register(id)}
      className="w-full px-5 py-4 rounded-2xl bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-600 text-sm focus:outline-none focus:ring-1 focus:border-brand-gold/50 focus:ring-brand-gold/10 transition-all resize-none"
    ></textarea>
  </div>
);

export default TextArea;