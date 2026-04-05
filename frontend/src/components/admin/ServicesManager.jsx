import React, { useState, useEffect } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";
import { Trash2, PlusCircle, Loader2 } from "lucide-react";

export default function ServicesManager() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ category: "", name: "", price: "" });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const { data } = await api.get("/services");
      setServices(data);
    } catch (err) {
      toast.error("Error al cargar servicios.");
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
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
    if (!window.confirm("¿Seguro que deseas eliminar este servicio?")) return;
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
    <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 shadow-xl">
      <h2 className="text-xl font-bold text-white mb-6 border-b border-neutral-800 pb-2">Gestión de Servicios</h2>
      
      {/* Formulario */}
      <form onSubmit={handleCreate} className="mb-8 bg-neutral-800 p-4 rounded-md border border-neutral-700 flex flex-col md:flex-row gap-4 items-end">
        <div className="w-full">
          <label className="text-xs text-neutral-400 mb-1 block">Categoría (Ej: Corte de Cabello)</label>
          <input required type="text" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full bg-neutral-900 text-white rounded px-3 py-2 outline-none focus:ring-1 focus:ring-brand-gold" placeholder="Categoría" />
        </div>
        <div className="w-full">
          <label className="text-xs text-neutral-400 mb-1 block">Nombre del Servicio</label>
          <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-neutral-900 text-white rounded px-3 py-2 outline-none focus:ring-1 focus:ring-brand-gold" placeholder="Ej: Fade Clásico" />
        </div>
        <div className="w-full">
          <label className="text-xs text-neutral-400 mb-1 block">Precio (String)</label>
          <input required type="text" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full bg-neutral-900 text-white rounded px-3 py-2 outline-none focus:ring-1 focus:ring-brand-gold" placeholder="Ej: $25.000" />
        </div>
        <button type="submit" className="bg-brand-gold text-black whitespace-nowrap font-bold px-5 py-2.5 rounded hover:bg-yellow-500 transition-colors flex items-center gap-2">
          <PlusCircle className="size-4" /> Agregar
        </button>
      </form>

      {/* Lista */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map(s => (
          <div key={s._id} className="bg-neutral-800 p-4 rounded border border-neutral-700 flex justify-between items-start">
            <div>
              <p className="text-xs font-bold text-brand-gold">{s.category}</p>
              <p className="text-white font-semibold">{s.name}</p>
              <p className="text-neutral-400 text-sm">{s.price}</p>
            </div>
            <button onClick={() => handleDelete(s._id)} className="text-red-400 hover:text-red-300 p-1">
              <Trash2 className="size-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
