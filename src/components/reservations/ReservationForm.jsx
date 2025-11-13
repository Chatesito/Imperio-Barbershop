import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import InputField from "./InputField";

const ReservationForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      console.log("Datos enviados:", data);
      toast.success("Tu reservación fue enviada con éxito 🎉");
      reset();
    } catch (error) {
      console.error(error);
      toast.error("Hubo un problema al enviar tu reservación");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-neutral-950 text-white rounded-[2rem] p-6 sm:p-10 md:p-12 lg:p-14 xl:p-16 w-full max-w-4xl mx-auto flex flex-col gap-8 shadow-[0_8px_25px_rgba(0,0,0,0.15)] transition-all duration-500 hover:shadow-[0_12px_35px_rgba(0,0,0,0.25)]"
      aria-labelledby="form-reservation-title"
    >
      <h2
        id="form-reservation-title"
        className="text-3xl sm:text-4xl md:text-5xl font-karantina font-extrabold text-center uppercase text-[#C5A253]"
      >
        Agenda tu cita
      </h2>

      {/* Nombre y Correo */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <InputField
          label="Tu nombre"
          id="nombre"
          placeholder="Juan Pérez"
          register={register}
          errors={errors}
        />
        <InputField
          label="Tu correo"
          id="email"
          type="email"
          placeholder="ejemplo@email.com"
          register={register}
          errors={errors}
        />
      </div>

      {/* Fecha y Hora */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <InputField
          label="Fecha"
          id="fecha"
          type="date"
          register={register}
          errors={errors}
        />
        <InputField
          label="Hora"
          id="hora"
          type="time"
          register={register}
          errors={errors}
        />
      </div>

      {/* Servicio */}
      <div>
        <label htmlFor="servicio" className="block text-sm font-semibold mb-2 tracking-wide">
          Servicio
        </label>
        <select
          id="servicio"
          {...register("servicio", { required: "Selecciona un servicio" })}
          className={`w-full px-4 py-3 rounded-md bg-white text-black focus:outline-none focus:ring-2 transition-all ${
            errors.servicio ? "ring-red-500" : "focus:ring-[#C5A253]"
          }`}
        >
          <option value="">Selecciona un servicio</option>
          <option value="corte">Corte clásico</option>
          <option value="barba">Afeitado y cuidado de barba</option>
          <option value="tinte">Color y estilo</option>
          <option value="premium">Servicio Premium</option>
        </select>
        {errors.servicio && (
          <span className="text-red-500 text-sm mt-1">{errors.servicio.message}</span>
        )}
      </div>

      {/* Comentarios */}
      <div>
        <label htmlFor="mensaje" className="block text-sm font-semibold mb-2 tracking-wide">
          Comentarios adicionales
        </label>
        <textarea
          id="mensaje"
          rows="4"
          placeholder="Ej: Prefiero atención con cierto barbero..."
          {...register("mensaje")}
          className="w-full px-4 py-3 rounded-md bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#C5A253] transition-all resize-none"
        ></textarea>
      </div>

      {/* Botón */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-[#C5A253] text-black font-extrabold uppercase tracking-wider py-4 rounded-md hover:bg-[#b89540] transition-all focus:outline-none focus:ring-4 focus:ring-[#C5A253] disabled:opacity-70"
      >
        {isSubmitting ? "Enviando..." : "Confirmar Reservación"}
      </button>
    </form>
  );
};

export default ReservationForm;
