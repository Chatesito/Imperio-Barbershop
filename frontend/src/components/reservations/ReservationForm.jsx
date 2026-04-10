import React, { useState, useEffect } from "react";
import { Scissors } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import toast from "react-hot-toast";
import InputField from "./InputField";
import CustomSelect from "./CustomSelect";
import DateInput from "./DateInput";
import TimeInput from "./TimeInput";
import SelectInput from "./SelectInput";
import TextArea from "./TextArea";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const ReservationForm = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
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

  // Filtrar gerencia y ocultar roles en el label
  const staffOptions = staff
    .filter(member => !member.role.toLowerCase().includes("gerencia") && !member.role.toLowerCase().includes("gerente"))
    .map(member => ({
      value: member.name,
      label: member.name
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
    // Auth Guard
    if (!user) {
      toast.error("Debes iniciar sesión o registrarte para completar tu reserva.");
      navigate("/login", { state: { from: "/Reservations" } });
      return;
    }

    try {
      if (user) {
        data.nombre = user.name;
        data.email = user.email;
      }
      
      const date = new Date(data.fecha + 'T00:00:00');
      const dayOfWeek = date.getDay();
      
      // Validación estricta de tiempo futuro si es hoy
      const now = new Date();
      const todayStr = now.toISOString().split('T')[0];
      if (data.fecha === todayStr) {
        const [h, m] = data.hora.split(':').map(Number);
        const reservationTime = new Date();
        reservationTime.setHours(h, m, 0, 0);
        
        if (reservationTime < now) {
          toast.error("No puedes reservar para una hora que ya ha pasado hoy.");
          return;
        }
      }

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
      className="bg-neutral-900/50 backdrop-blur-md border border-neutral-800 rounded-[2.5rem] p-8 md:p-12 w-full max-w-4xl mx-auto flex flex-col gap-10 shadow-2xl relative overflow-hidden group transition-all duration-700 hover:border-brand-gold/20"
      aria-labelledby="form-reservation-title"
    >
      <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
        <Scissors className="size-40 text-brand-gold" />
      </div>

      <h2
        id="form-reservation-title"
        className="text-4xl md:text-6xl font-karantina font-extrabold text-center uppercase tracking-tight text-white leading-none"
      >
        AGENDA TU <span className="text-brand-gold">RITUAL</span>
      </h2>

      {/* Perfil de Usuario */}
      {user ? (
        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl flex items-center gap-6 animate-fade-in">
          <div className="size-16 bg-brand-gold text-neutral-950 font-karantina text-4xl tracking-widest rounded-2xl flex items-center justify-center transform -rotate-3 hover:rotate-0 transition-transform duration-500">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1">
            <p className="text-white font-bold text-lg">{user.name}</p>
            <p className="text-neutral-500 text-sm tracking-wider">{user.email}</p>
          </div>
          <div className="hidden sm:block">
            <span className="text-[10px] font-bold text-brand-gold uppercase tracking-[0.3em] bg-brand-gold/10 px-3 py-1 rounded-full border border-brand-gold/20">
              Cliente Premium
            </span>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <InputField
            label="Tu nombre"
            id="nombre"
            placeholder="Juan Pérez"
            register={register}
            errors={errors}
            validation={{
              pattern: {
                value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
                message: "El nombre no puede contener números ni símbolos"
              }
            }}
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
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 p-6 rounded-2xl bg-white/5 border border-white/10">
          <div>
            <label className="block text-xs font-bold uppercase tracking-[0.2em] mb-3 text-brand-gold">
              ¿Servicio a domicilio?
            </label>
            <div className="flex items-center gap-8">
              <label className="inline-flex items-center gap-3 cursor-pointer group">
                <input
                  type="radio"
                  value="No"
                  className="size-5 accent-brand-gold"
                  {...register("domicilio", { required: "Selecciona una opción" })}
                />
                <span className="text-sm font-medium text-neutral-300 group-hover:text-white transition-colors">No, iré a la sede</span>
              </label>
              <label className="inline-flex items-center gap-3 cursor-pointer group">
                <input
                  type="radio"
                  value="Sí"
                  className="size-5 accent-brand-gold"
                  {...register("domicilio", { required: "Selecciona una opción" })}
                />
                <span className="text-sm font-medium text-neutral-300 group-hover:text-white transition-colors">Sí, lo prefiero aquí</span>
              </label>
            </div>
            {errors.domicilio && (
              <span className="text-red-500 text-xs font-medium mt-3 block animate-pulse">
                {errors.domicilio.message}
              </span>
            )}
          </div>

          {domicilio === "Sí" && (
            <div className="flex-1 animate-fade-in">
              <InputField
                label="Dirección Completa"
                id="direccion"
                placeholder="Calle 10 #5-23, Barrio..."
                register={register}
                errors={errors}
              />
            </div>
          )}
        </div>
        {domicilio !== "Sí" && (
          <div className="animate-fade-in">
            <SelectInput
              label="Sede del Imperio"
              id="sede"
              register={register}
              errors={errors}
              options={branchOptions}
              placeholder="Selecciona una sede"
            />
          </div>
        )}
      </div>

      {/* Fecha y Hora */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <DateInput
          label="Fecha del Ritual"
          id="fecha"
          register={register}
          errors={errors}
          minDate={minDate}
          maxDate={maxDateStr}
          validate={validateDate}
        />
        <TimeInput
          label="Hora Preferida"
          id="hora"
          register={register}
          errors={errors}
          minTime={minTime}
          maxTime={maxTime}
          showSchedule={!!selectedDate}
          scheduleText={`Disponibilidad: ${minTime} - ${maxTime}`}
        />
      </div>

      {/* Selección Profesional */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
              placeholder="Escoge tu experiencia"
            />
          )}
        />
        
        <SelectInput
          label="Maestro Barbero (Opcional)"
          id="barbero"
          register={register}
          errors={errors}
          options={staffOptions}
          placeholder="Sin preferencia / El mejor disponible"
        />
      </div>

      {/* Comentarios */}
      <TextArea
        label="Instrucciones Especiales"
        id="mensaje"
        register={register}
        placeholder="Ej: Prefiero atención en silencio o algún producto específico..."
      />

      {/* Botón de Acción */}
      <div className="pt-4">
        <button
          type="button"
          onClick={handleSubmit(onSubmit)}
          disabled={isSubmitting}
          className="w-full bg-brand-gold text-neutral-950 font-bold uppercase tracking-[0.2em] py-5 rounded-2xl hover:scale-[1.02] active:scale-95 transition-all duration-300 shadow-[0_0_25px_rgba(200,162,86,0.2)] hover:shadow-[0_0_35px_rgba(200,162,86,0.4)] disabled:opacity-50 disabled:grayscale cursor-pointer"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-3">
              <div className="size-5 border-2 border-neutral-950 border-t-transparent animate-spin rounded-full" />
              FORJANDO TU CITA...
            </span>
          ) : "CONFIRMAR RESERVACIÓN"}
        </button>
        <p className="text-center text-[10px] text-neutral-500 mt-4 uppercase tracking-widest font-medium">
          Al confirmar, aceptas nuestras políticas de puntualidad.
        </p>
      </div>
    </div>
  );
};

export default ReservationForm;