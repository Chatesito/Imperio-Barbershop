import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import toast from "react-hot-toast";
import InputField from "./InputField";
import CustomSelect from "./CustomSelect";
import DateInput from "./DateInput";
import TimeInput from "./TimeInput";
import SelectInput from "./SelectInput";
import TextArea from "./TextArea";

const ReservationForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    control,
    formState: { errors, isSubmitting },
  } = useForm();

  const [minTime, setMinTime] = useState("08:00");
  const [maxTime, setMaxTime] = useState("18:00");
  
  const selectedDate = watch("fecha");

  const services = [
    { category: "Corte de Cabello", name: "Corte clásico", price: "$25.000" },
    { category: "Corte de Cabello", name: "Fade / Degradado", price: "$30.000" },
    { category: "Corte de Cabello", name: "Corte con diseño", price: "$35.000" },
    { category: "Cuidado de Barba", name: "Afeitado clásico", price: "$20.000" },
    { category: "Cuidado de Barba", name: "Perfilado con navaja", price: "$25.000" },
    { category: "Cuidado de Barba", name: "Tratamiento hidratante", price: "$28.000" },
    { category: "Mascarillas Faciales", name: "Mascarilla revitalizante", price: "$18.000" },
    { category: "Mascarillas Faciales", name: "Limpieza facial profunda", price: "$25.000" },
    { category: "Tintes para el Cabello", name: "Tinte completo", price: "$40.000" },
    { category: "Tintes para el Cabello", name: "Reflejos o mechas", price: "$50.000" },
    { category: "Paquetes Especiales", name: "Corte + Barba", price: "$45.000" },
    { category: "Paquetes Especiales", name: "Corte + Cejas + Barba", price: "$55.000" },
  ];

  const branches = [
    {
      name: "Sede Ipanema",
      address: "Calle 29, Neiva, Huila",
      mapUrl: "https://maps.app.goo.gl/qHXLv8SrMyg2Nayq5",
    },
    {
      name: "Sede Candido",
      address: "Cl. 37 #1 26, Neiva, Huila",
      mapUrl: "https://maps.app.goo.gl/i7D5SCKU4SS2ihuD8",
    },
    {
      name: "Sede Neiva La Nueva",
      address: "Cra. 20 #26-385, Neiva, Huila",
      mapUrl: "https://maps.app.goo.gl/AQykuFbBc8nwNPVt9",
    },
  ];

  const branchOptions = branches.map(branch => ({
    value: branch.name,
    label: `${branch.name} - ${branch.address}`
  }));

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const minDate = today.toISOString().split('T')[0];
  
  const maxDate = new Date(today);
  maxDate.setMonth(maxDate.getMonth() + 6);
  const maxDateStr = maxDate.toISOString().split('T')[0];

  useEffect(() => {
    if (selectedDate) {
      const date = new Date(selectedDate + 'T00:00:00');
      const dayOfWeek = date.getDay();
      
      if (dayOfWeek === 0 || dayOfWeek === 6) {
        setMinTime("10:00");
        setMaxTime("17:00");
      } else {
        setMinTime("08:00");
        setMaxTime("18:00");
      }
    }
  }, [selectedDate]);

  const validateDate = (value) => {
    const selectedDate = new Date(value + 'T00:00:00');
    const todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);
    
    const maxAllowedDate = new Date(todayDate);
    maxAllowedDate.setMonth(maxAllowedDate.getMonth() + 6);

    if (selectedDate < todayDate) {
      return "No puedes reservar en fechas pasadas";
    }
    
    if (selectedDate > maxAllowedDate) {
      return "No puedes reservar con más de 6 meses de anticipación";
    }
    
    return true;
  };

  const onSubmit = async (data) => {
    try {
      const date = new Date(data.fecha + 'T00:00:00');
      const dayOfWeek = date.getDay();
      const [hours, minutes] = data.hora.split(':').map(Number);
      const timeInMinutes = hours * 60 + minutes;
      
      let isValidTime = false;
      if (dayOfWeek === 0 || dayOfWeek === 6) {
        isValidTime = timeInMinutes >= 10 * 60 && timeInMinutes <= 17 * 60;
      } else {
        isValidTime = timeInMinutes >= 8 * 60 && timeInMinutes <= 18 * 60;
      }
      
      if (!isValidTime) {
        const horario = (dayOfWeek === 0 || dayOfWeek === 6) 
          ? "10:00 AM - 5:00 PM" 
          : "8:00 AM - 6:00 PM";
        toast.error(`La hora seleccionada está fuera del horario de atención (${horario})`);
        return;
      }
      
      console.log("Datos enviados:", data);
      toast.success("Tu reservación fue enviada con éxito 🎉");
      
      reset({
        nombre: "",
        email: "",
        sede: "",
        fecha: "",
        hora: "",
        servicio: "",
        mensaje: ""
      });
    } catch (error) {
      console.error(error);
      toast.error("Hubo un problema al enviar tu reservación");
    }
  };

  return (
    <div
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

      {/* Sede */}
      <SelectInput
        label="Selecciona la sede"
        id="sede"
        register={register}
        errors={errors}
        options={branchOptions}
        placeholder="Selecciona una sede"
      />

      {/* Fecha y Hora */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <DateInput
          label="Fecha"
          id="fecha"
          register={register}
          errors={errors}
          minDate={minDate}
          maxDate={maxDateStr}
          validate={validateDate}
        />
        <TimeInput
          label="Hora"
          id="hora"
          register={register}
          errors={errors}
          minTime={minTime}
          maxTime={maxTime}
          showSchedule={!!selectedDate}
          scheduleText={`Horario disponible: ${minTime} - ${maxTime}`}
        />
      </div>

      {/* Servicio personalizado */}
      <Controller
        name="servicio"
        control={control}
        rules={{ required: "Selecciona un servicio" }}
        render={({ field }) => (
          <CustomSelect
            label="Servicio"
            value={field.value || ""}
            onChange={field.onChange}
            options={services}
            error={errors.servicio?.message}
            placeholder="Selecciona un servicio"
          />
        )}
      />

      {/* Comentarios */}
      <TextArea
        label="Comentarios adicionales"
        id="mensaje"
        register={register}
        placeholder="Ej: Prefiero atención con cierto barbero..."
      />

      {/* Botón */}
      <button
        type="button"
        onClick={handleSubmit(onSubmit)}
        disabled={isSubmitting}
        className="bg-[#C5A253] text-black font-extrabold uppercase tracking-wider py-4 rounded-md hover:bg-[#b89440] transition-all focus:outline-none focus:ring-4 focus:ring-[#C5A253] disabled:opacity-70"
      >
        {isSubmitting ? "Enviando..." : "Confirmar Reservación"}
      </button>
    </div>
  );
};

export default ReservationForm;