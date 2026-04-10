import React, { useState, useEffect } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";
import { Trash2, PlusCircle, Loader2, Scissors } from "lucide-react";
import { confirmAction } from "../../utils/alerts";

export default function ServicesManager() {
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ category: "", name: "", price: "" });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [srvRes, catRes] = await Promise.all([
        api.get("/services"),
        api.get("/categories")
      ]);
      setServices(srvRes.data);
      setCategories(catRes.data);
    } catch (err) {
      toast.error("Error al cargar datos.");
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!formData.category) return toast.error("Selecciona una categoría.");
    try {
      const { data } = await api.post("/services", formData);
      setServices([...services, data]);
      setFormData({ category: "", name: "", price: "" });
      toast.success("Servicio creado con éxito.");
    } catch (err) {
      toast.error("No se pudo crear el servicio.");
    }
  };

  const handleDelete = async (id) => {
    if (!(await confirmAction("¿Eliminar este servicio?", "El historial no se perderá, pero ya no estará para agendar."))) return;
    try {
      await api.delete(`/services/${id}`);
      setServices(services.filter((s) => s._id !== id));
      toast.success("Servicio eliminado.");
    } catch (err) {
      toast.error("Error al eliminar.");
    }
  };

  if (loading) return <div className="p-10 flex justify-center"><Loader2 className="animate-spin text-brand-gold size-8" /></div>;

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 md:p-8 shadow-2xl animate-fade-in">
      <div className="flex items-center gap-4 mb-8">
          <div className="size-12 rounded-2xl bg-brand-gold/10 flex items-center justify-center text-brand-gold">
              <Scissors className="size-6" />
          </div>
          <div>
              <h2 className="text-2xl font-bold text-white uppercase tracking-tight">Gestión de Servicios</h2>
              <p className="text-xs text-neutral-500 uppercase tracking-widest font-medium">Catálogo de experiencias</p>
          </div>
      </div>
      
      {/* Formulario */}
      <form onSubmit={handleCreate} className="mb-10 bg-neutral-950 p-6 rounded-[2rem] border border-neutral-800 flex flex-col lg:flex-row gap-6 items-end">
        <div className="w-full">
          <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-2 block">Categoría Cerrada</label>
          <select 
            required 
            value={formData.category} 
            onChange={e => setFormData({...formData, category: e.target.value})} 
            className="w-full bg-neutral-900 border border-neutral-800 text-white rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-brand-gold appearance-none cursor-pointer"
          >
            <option value="">Selecciona...</option>
            {categories.map(c => (
                <option key={c._id} value={c._id}>{c.name}</option>
            ))}
          </select>
        </div>
        <div className="w-full">
          <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-2 block">Nombre del Servicio</label>
          <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-neutral-900 border border-neutral-800 text-white rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-brand-gold" placeholder="Ej: Fade Clásico" />
        </div>
        <div className="w-full">
          <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-2 block">Precio</label>
          <input required type="text" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full bg-neutral-900 border border-neutral-800 text-white rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-brand-gold" placeholder="Ej: $25.000" />
        </div>
        <button type="submit" className="w-full lg:w-auto bg-brand-gold text-neutral-950 whitespace-nowrap font-bold px-8 py-3.5 rounded-xl hover:scale-105 transition-all flex items-center justify-center gap-2 shadow-lg shadow-brand-gold/10">
          <PlusCircle className="size-5" /> AGREGAR
        </button>
      </form>

      {/* Lista */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {services.map(s => (
          <div key={s._id} className="bg-neutral-950 p-6 rounded-[2rem] border border-neutral-800 flex justify-between items-start group hover:border-brand-gold/20 transition-all">
            <div>
              <p className="text-[10px] font-bold text-brand-gold uppercase tracking-widest mb-1">{s.category?.name || "Sin Categoría"}</p>
              <p className="text-white font-bold text-lg tracking-tight uppercase leading-tight">{s.name}</p>
              <p className="text-neutral-500 font-medium mt-1">{s.price}</p>
            </div>
            <button onClick={() => handleDelete(s._id)} className="p-2 text-neutral-600 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all">
              <Trash2 className="size-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
