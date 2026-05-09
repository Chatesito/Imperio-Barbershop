import React from "react";

const TimeInput = ({ label, id, register, errors, minTime, maxTime, showSchedule, scheduleText }) => (
  <div>
    <label htmlFor={id} className="block text-[10px] font-bold text-neutral-500 uppercase tracking-[0.2em] mb-2 ml-1">
      {label}
    </label>
    <input
      id={id}
      type="time"
      {...register(id, { required: `${label} es requerido` })}
      min={minTime}
      max={maxTime}
      className={`w-full px-5 py-4 rounded-2xl bg-neutral-950 border text-white text-sm focus:outline-none focus:ring-1 transition-all duration-300 ${
        errors[id] ? "border-red-500 ring-red-500/20" : "border-neutral-800 focus:border-brand-gold/50 focus:ring-brand-gold/10"
      }`}
    />
    {errors[id] && (
      <span className="text-red-500 text-[10px] font-bold uppercase tracking-widest mt-2 block ml-1">{errors[id].message}</span>
    )}
    {showSchedule && scheduleText && (
      <p className="text-[10px] text-neutral-500 italic mt-2 ml-1">{scheduleText}</p>
    )}
  </div>
);

export default TimeInput;