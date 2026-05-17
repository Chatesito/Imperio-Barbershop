import React, { useState, useEffect } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";
import { Trash2, PlusCircle, Loader2, Scissors, ChevronLeft, ChevronRight } from "lucide-react";
import { confirmAction } from "../../utils/alerts";

export default function ServicesManager() {
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ category: "", name: "", price: "" });
  
  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(false);
  const limit = 6;

  useEffect(() => {
    fetchData();
  }, [page]);

  const fetchData = async () => {
    try {
      const [srvRes, catRes] = await Promise.all([
        api.get("/services", { params: { page, limit: limit + 1 } }),
        api.get("/categories")
      ]);
      
      const srvData = srvRes.data;
      if (srvData.length > limit) {
        setHasNext(true);
        setServices(srvData.slice(0, limit));
      } else {
        setHasNext(false);
        setServices(srvData);
      }
      
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
    const numericPrice = parseInt(formData.price, 10);
    if (isNaN(numericPrice) || numericPrice <= 0) {
      return toast.error("El precio debe ser un número entero válido mayor a 0.");
    }
    
    try {
      const { data } = await api.post("/services", {
        ...formData,
        price: numericPrice
      });
      setPage(1);
      fetchData();
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
      fetchData();
      toast.success("Servicio eliminado.");
    } catch (err) {
      toast.error("Error al eliminar.");
    }
  };

  if (loading) return <div className="p-10 flex justify-center"><Loader2 className="animate-spin text-brand-gold size-8" /></div>;

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 md:p-8 shadow-2xl animate-fade-in relative">
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
          <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-2 block">Precio (Solo números)</label>
          <input 
            required 
            type="text" 
            value={formData.price} 
            onChange={e => setFormData({...formData, price: e.target.value.replace(/\D/g, "")})} 
            className="w-full bg-neutral-900 border border-neutral-800 text-white rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-brand-gold" 
            placeholder="Ej: 25000" 
          />
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
              <p className="text-[10px] font-bold text-brand-gold uppercase tracking-widest mb-1">
                {typeof s.category === "object" && s.category ? s.category.name : "Sin Categoría"}
              </p>
              <p className="text-white font-bold text-lg tracking-tight uppercase leading-tight">{s.name}</p>
              <p className="text-neutral-500 font-medium mt-1">${(s.price || 0).toLocaleString()}</p>
            </div>
            <button onClick={() => handleDelete(s._id)} className="p-2 text-neutral-600 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all">
              <Trash2 className="size-5" />
            </button>
          </div>
        ))}
      </div>

      {/* Paginación */}
      {(page > 1 || hasNext) && (
          <div className="flex items-center justify-center gap-4 mt-8 pt-6 border-t border-neutral-800/50">
              <button
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                  className="p-2 bg-neutral-950 border border-neutral-800 rounded-xl text-neutral-400 hover:text-brand-gold disabled:opacity-30 disabled:hover:text-neutral-400 transition-all"
              >
                  <ChevronLeft className="size-5" />
              </button>
              <span className="text-sm font-bold text-neutral-400 uppercase tracking-widest">Página {page}</span>
              <button
                  disabled={!hasNext}
                  onClick={() => setPage(page + 1)}
                  className="p-2 bg-neutral-950 border border-neutral-800 rounded-xl text-neutral-400 hover:text-brand-gold disabled:opacity-30 disabled:hover:text-neutral-400 transition-all"
              >
                  <ChevronRight className="size-5" />
              </button>
          </div>
      )}
    </div>
  );
}
