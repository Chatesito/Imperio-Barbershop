import React from "react";

const TimeInput = ({ label, id, register, errors, minTime, maxTime, showSchedule, scheduleText }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-semibold mb-2 tracking-wide">
      {label}
    </label>
    <input
      id={id}
      type="time"
      {...register(id, { required: `${label} es requerido` })}
      min={minTime}
      max={maxTime}
      className={`w-full px-4 py-3 rounded-md bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 transition-all ${
        errors[id] ? "ring-red-500" : "focus:ring-[#C5A253]"
      }`}
    />
    {errors[id] && (
      <span className="text-red-500 text-sm mt-1">{errors[id].message}</span>
    )}
    {showSchedule && scheduleText && (
      <p className="text-xs text-gray-400 mt-1">{scheduleText}</p>
    )}
  </div>
);

export default TimeInput;