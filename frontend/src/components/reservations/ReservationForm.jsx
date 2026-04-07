import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import toast from "react-hot-toast";
import InputField from "./InputField";
import CustomSelect from "./CustomSelect";
import DateInput from "./DateInput";
import TimeInput from "./TimeInput";
import SelectInput from "./SelectInput";
import TextArea from "./TextArea";
import { useAuth } from "../../context/AuthContext";

const ReservationForm = () => {
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  const [minTime, setMinTime] = useState("08:00");
  const [maxTime, setMaxTime] = useState("18:00");
  
  const selectedDate = watch("fecha");
  const domicilio = watch("domicilio");

  const [services, setServices] = useState([]);
  const [branches, setBranches] = useState([]);
  const [staff, setStaff] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { default: api } = await import("../../services/api.js");
        const [servicesRes, branchesRes, staffRes] = await Promise.all([
          api.get("/services"),
          api.get("/branches"),
          api.get("/staff")
        ]);
        setServices(servicesRes.data);
        setBranches(branchesRes.data);
        setStaff(staffRes.data);
      } catch (error) {
        console.error("Error fetching reservation options:", error);
      }
    };
    fetchData();
  }, []);

  const branchOptions = branches.map(branch => ({
    value: branch.name,
    label: `${branch.name} - ${branch.address}`
  }));

  const staffOptions = staff.map(member => ({
    value: member.name,
    label: `${member.name} (${member.role})`
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

  useEffect(() => {
    if (domicilio === "Sí") {
      setValue("sede", "");
    }
  }, [domicilio, setValue]);

  const onSubmit = async (data) => {
    try {
      if (user) {
        data.nombre = user.name;
        data.email = user.email;
      }
      
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
      
      await import("../../services/api.js").then((module) => {
        const api = module.default;
        return api.post("/reservations", data);
      });
      console.log("Datos enviados:", data);
      toast.success("Tu reservación fue enviada con éxito 🎉");
      
      reset({
        nombre: "",
        email: "",
        sede: "",
        fecha: "",
        hora: "",
        servicio: "",
        barbero: "",
        mensaje: "",
        domicilio: "",
        direccion: ""
      });
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Hubo un problema al enviar tu reservación");
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
      {user ? (
        <div className="bg-neutral-900 border border-brand-gold/30 p-4 rounded-lg flex items-center gap-4">
          <div className="size-12 bg-brand-gold text-black font-karantina text-3xl tracking-widest rounded-full flex items-center justify-center">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="text-white font-bold">{user.name}</p>
            <p className="text-neutral-400 text-sm">{user.email}</p>
          </div>
        </div>
      ) : (
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
      )}

      {/* Servicio a domicilio */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
        <div>
          <label className="block text-sm font-semibold mb-2 tracking-wide">
            ¿Servicio a domicilio?
          </label>
          <div className="flex items-center gap-6">
            <label className="inline-flex items-center gap-2">
              <input
                type="radio"
                value="No"
                className="h-4 w-4 accent-[#C5A253]"
                {...register("domicilio", { required: "Selecciona una opción" })}
              />
              <span>No</span>
            </label>
            <label className="inline-flex items-center gap-2">
              <input
                type="radio"
                value="Sí"
                className="h-4 w-4 accent-[#C5A253]"
                {...register("domicilio", { required: "Selecciona una opción" })}
              />
              <span>Sí</span>
            </label>
          </div>
          {errors.domicilio && (
            <span className="text-red-500 text-sm mt-2 block">
              {errors.domicilio.message}
            </span>
          )}
          <p className="text-xs text-neutral-400 mt-2">
            Al elegir “Sí” se solicitará la dirección y no es necesario seleccionar sede.
          </p>
        </div>

        {domicilio === "Sí" && (
          <InputField
            label="Dirección"
            id="direccion"
            placeholder="Ej: Calle 10 #5-23 Barrio Centro"
            register={register}
            errors={errors}
          />
        )}
      </div>

      {/* Sede */}
      {domicilio !== "Sí" && (
        <SelectInput
          label="Selecciona la sede"
          id="sede"
          register={register}
          errors={errors}
          options={branchOptions}
          placeholder="Selecciona una sede"
        />
      )}

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

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
        
        {/* Selector de Barbero */}
        <SelectInput
          label="Tu profesional (Opcional)"
          id="barbero"
          register={register}
          errors={errors}
          options={staffOptions}
          placeholder="Cualquiera / Sin Preferencia"
        />
      </div>

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