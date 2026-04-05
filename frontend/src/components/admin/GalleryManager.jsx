import React, { useState, useEffect } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";
import { Trash2, PlusCircle, Loader2 } from "lucide-react";

export default function GalleryManager() {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ url: "", type: "work" });

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      const { data } = await api.get("/gallery");
      setGallery(data);
    } catch (err) {
      toast.error("Error al cargar galería.");
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/gallery", formData);
      setGallery([...gallery, data]);
      setFormData({ url: "", type: "work" });
      toast.success("Imagen añadida.");
    } catch (err) {
      toast.error("Error al subir foto.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Eliminar esta foto del portafolio?")) return;
    try {
      await api.delete(`/gallery/${id}`);
      setGallery(gallery.filter((g) => g._id !== id));
      toast.success("Foto eliminada.");
    } catch (err) {
      toast.error("Error al eliminar foto.");
    }
  };

  if (loading) return <div className="p-10 flex justify-center"><Loader2 className="animate-spin text-brand-gold size-8" /></div>;

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 shadow-xl">
      <h2 className="text-xl font-bold text-white mb-6 border-b border-neutral-800 pb-2">Catálogo de Trabajos (Galería)</h2>
      
      <form onSubmit={handleCreate} className="mb-8 bg-neutral-800 p-4 rounded-md border border-neutral-700 flex gap-4 items-end">
        <div className="flex-1">
          <label className="text-xs text-neutral-400 mb-1 block">URL de la Imagen (Resolución Cuadrada o Vertical Preferida)</label>
          <input required type="text" value={formData.url} onChange={e => setFormData({...formData, url: e.target.value})} className="w-full bg-neutral-900 text-white rounded px-3 py-2 outline-none focus:ring-1 focus:ring-brand-gold" placeholder="Ej: /images/gallery/nuevoCorte.jpg" />
        </div>
        <div>
          <label className="text-xs text-neutral-400 mb-1 block">Categoría (Opcional)</label>
          <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} className="w-full bg-neutral-900 text-white rounded px-3 py-2 outline-none focus:ring-1 focus:ring-brand-gold">
            <option value="work">Cortes/Trabajos</option>
            <option value="interior">Interior Barbería</option>
            <option value="team">Momentos del Equipo</option>
          </select>
        </div>
        <button type="submit" className="bg-brand-gold text-black whitespace-nowrap font-bold px-5 py-2 rounded hover:bg-yellow-500 transition-colors flex items-center gap-2 h-10">
          <PlusCircle className="size-4" /> Agregar Foto
        </button>
      </form>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {gallery.map(g => (
          <div key={g._id} className="relative group rounded-md overflow-hidden bg-neutral-800 aspect-square">
            <img src={g.url} alt="Gallery item" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            <div className="absolute inset-0 bg-neutral-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                <button onClick={() => handleDelete(g._id)} className="bg-red-500/20 text-red-400 hover:bg-red-500/40 p-3 rounded-full transition-colors">
                  <Trash2 className="size-5" />
                </button>
            </div>
            <span className="absolute top-2 left-2 bg-neutral-950/80 text-[10px] text-brand-gold uppercase tracking-wider px-2 py-0.5 rounded">{g.type}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
