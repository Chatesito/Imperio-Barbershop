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
  const selectedBranch = watch("sede");
  const selectedServices = watch("servicio") || [];

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
        // Remove invalid services and ensure basic data exists
        const validServices = (servicesRes.data || []).filter(s => 
          s.name && 
          s.name.trim() !== "" && 
          !s.name.toLowerCase().includes("sdsds") && 
          s.price
        );
        setServices(validServices);
        setBranches(branchesRes.data || []);
        setStaff(staffRes.data || []);
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

  // Filtrar barberos por sede y servicio
  const staffOptions = staff
    .filter(member => {
      const isNotGerente = !member.role.toLowerCase().includes("gerencia") && !member.role.toLowerCase().includes("gerente");
      const worksInBranch = !selectedBranch || (member.branches && member.branches.includes(selectedBranch)) || domicilio === "Sí";
      const providesService = selectedServices.length === 0 || !member.services || selectedServices.every(s => member.services.includes(s.split(" - ")[0]));
      return isNotGerente && worksInBranch && (domicilio === "Sí" ? true : worksInBranch);
    })
    .map(member => ({
      value: member.name,
      label: member.name // Eliminamos el rol del label para evitar confusión
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

  // Generar slots de 30 minutos
  const generateTimeSlots = () => {
    const slots = [];
    let current = parseInt(minTime.split(":")[0]) * 60 + parseInt(minTime.split(":")[1]);
    const end = parseInt(maxTime.split(":")[0]) * 60 + parseInt(maxTime.split(":")[1]);
    
    while (current <= end) {
      const h = Math.floor(current / 60);
      const m = current % 60;
      const timeStr = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
      slots.push({ value: timeStr, label: timeStr });
      current += 30;
    }
    return slots;
  };

  const validateDate = (value) => {
    const selectedDate = new Date(value + 'T00:00:00');
    const todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);
    
    if (selectedDate < todayDate) {
      return "No puedes reservar en fechas pasadas";
    }
    return true;
  };

  useEffect(() => {
    if (domicilio === "Sí") {
      setValue("sede", "");
    }
  }, [domicilio, setValue]);

  const onSubmit = async (data) => {
    if (!user) {
      toast.error("Por favor inicia sesión para completar tu reserva.");
      navigate("/login", { state: { from: "/Reservations" } });
      return;
    }

    try {
      if (user && user.role !== "admin") {
        data.nombre = user.name;
        data.email = user.email;
      }
      if (user && user.role === "admin") {
        data.isWalkIn = true;
      }
      
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

      const api = (await import("../../services/api.js")).default;
      await api.post("/reservations", data);
      toast.success("Reserva confirmada. ¡Te esperamos!");
      reset();
    } catch (error) {
      toast.error(error.response?.data?.message || "Error al procesar la reserva");
    }
  };

  return (
    <div className="bg-neutral-900/50 backdrop-blur-md border border-neutral-800 rounded-[2.5rem] p-8 md:p-12 w-full max-w-4xl mx-auto flex flex-col gap-10 shadow-2xl relative overflow-hidden group transition-all duration-700 hover:border-brand-gold/20">
      <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
        <Scissors className="size-40 text-brand-gold" />
      </div>

      <h2 className="text-4xl md:text-6xl font-karantina font-extrabold text-center uppercase tracking-tight text-white leading-none">
        AGENDA TU <span className="text-brand-gold">RITUAL</span>
      </h2>

      {/* 1. Modalidad: Sede o Domicilio */}
      <div className="space-y-6">
        <label className="block text-xs font-bold uppercase tracking-[0.2em] mb-3 text-brand-gold">¿Dónde prefieres tu servicio?</label>
        <div className="flex flex-col sm:flex-row gap-6 p-6 rounded-2xl bg-white/5 border border-white/10">
          <label className="inline-flex items-center gap-3 cursor-pointer group">
            <input type="radio" value="No" className="size-5 accent-brand-gold" {...register("domicilio", { required: "Selecciona una modalidad" })} />
            <span className="text-sm font-medium text-neutral-300 group-hover:text-white transition-colors">En una de nuestras sedes</span>
          </label>
          <label className="inline-flex items-center gap-3 cursor-pointer group">
            <input type="radio" value="Sí" className="size-5 accent-brand-gold" {...register("domicilio", { required: "Selecciona una modalidad" })} />
            <span className="text-sm font-medium text-neutral-300 group-hover:text-white transition-colors">En mi domicilio</span>
          </label>
        </div>
        {errors.domicilio && <span className="text-red-500 text-xs">{errors.domicilio.message}</span>}

        {domicilio === "No" && (
          <div className="animate-fade-in">
            <SelectInput label="Sede del Imperio" id="sede" register={register} errors={errors} options={branchOptions} placeholder="Selecciona la sede más cercana" />
          </div>
        )}
        {domicilio === "Sí" && (
          <div className="animate-fade-in">
            <InputField label="Dirección de tu Residencia" id="direccion" placeholder="Calle, Carrera, Barrio y Apto..." register={register} errors={errors} validation={{ required: "La dirección es obligatoria para domicilios" }} />
          </div>
        )}
      </div>

      {/* 2. Profesional y Servicios */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <SelectInput 
          label="Tu Profesional" 
          id="barbero" 
          register={register} 
          errors={errors} 
          options={staffOptions} 
          placeholder="Sin preferencia / El mejor disponible" 
        />
        
        <Controller
          name="servicio"
          control={control}
          rules={{ required: "Selecciona al menos un servicio" }}
          render={({ field }) => (
            <CustomSelect
              label="Servicios"
              value={field.value || []}
              onChange={field.onChange}
              options={services}
              error={errors.servicio?.message}
              placeholder="Escoge tu experiencia (puedes elegir varios)"
              isMulti={true}
            />
          )}
        />
      </div>

      {/* 3. Fecha y Hora */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <DateInput label="Fecha de la Cita" id="fecha" register={register} errors={errors} minDate={minDate} maxDate={maxDateStr} validate={validateDate} />
        <SelectInput 
          label="Horario Disponible" 
          id="hora" 
          register={register} 
          errors={errors} 
          options={generateTimeSlots()} 
          placeholder="Selecciona la hora" 
        />
      </div>

      <div className="animate-fade-in">
          <label className="block text-xs font-bold uppercase tracking-[0.2em] mb-3 text-brand-gold">Número de Personas</label>
          <select {...register("guests", { required: true, valueAsNumber: true })} className="w-full bg-neutral-900 border border-neutral-700 text-white p-3.5 rounded-xl outline-none focus:border-brand-gold" defaultValue={1}>
            <option value={1}>1 Persona</option>
            <option value={2}>2 Personas</option>
            <option value={3}>3 Personas</option>
            <option value={4}>4 Personas</option>
          </select>
          <p className="text-neutral-500 text-xs mt-2 italic">Puedes reservar para ti y tus familiares (máx 4).</p>
      </div>

      <TextArea label="Instrucciones Especiales (Opcional)" id="mensaje" register={register} placeholder="Ej: Algún detalle que el barbero deba saber..." />

      <div className="pt-4">
        <button type="submit" onClick={handleSubmit(onSubmit)} disabled={isSubmitting} className="w-full bg-brand-gold text-neutral-950 font-bold uppercase tracking-[0.2em] py-5 rounded-2xl hover:scale-[1.02] active:scale-95 transition-all duration-300 shadow-xl disabled:opacity-50">
          {isSubmitting ? "FORJANDO TU CITA..." : "CONFIRMAR RESERVACIÓN"}
        </button>
      </div>
    </div>
  );
};

export default ReservationForm;