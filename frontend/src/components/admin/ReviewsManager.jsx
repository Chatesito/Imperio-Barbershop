import React, { useState, useEffect } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";
import { Trash2, PlusCircle, Loader2, Star } from "lucide-react";
import { compressImageToBase64 } from "../../utils/imageHelper";
import { confirmAction } from "../../utils/alerts";

export default function ReviewsManager() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ name: "", rating: 5, date: "", img: "", comment: "" });

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const { data } = await api.get("/reviews");
      setReviews(data);
    } catch (err) {
      toast.error("Error al cargar testimonios.");
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/reviews", formData);
      setReviews([...reviews, data]);
      setFormData({ name: "", rating: 5, date: "", img: "", comment: "" });
      toast.success("Reseña añadida éxito.");
    } catch (err) {
      toast.error("Error al crear reseña.");
    }
  };

  const handleDelete = async (id) => {
    if (!(await confirmAction("¿Eliminar Testimonio?", "Se purgará este registro de valoraciones."))) return;
    try {
      await api.delete(`/reviews/${id}`);
      setReviews(reviews.filter((r) => r._id !== id));
      toast.success("Testimonio eliminado.");
    } catch (err) {
      toast.error("Error al eliminar.");
    }
  };

  if (loading) return <div className="p-10 flex justify-center"><Loader2 className="animate-spin text-brand-gold size-8" /></div>;

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 shadow-xl">
      <h2 className="text-xl font-bold text-white mb-6 border-b border-neutral-800 pb-2">Destacar Reseñas y Testimonios</h2>
      
      <form onSubmit={handleCreate} className="mb-8 bg-neutral-800 p-4 rounded-md border border-neutral-700 flex flex-col gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="text-xs text-neutral-400 mb-1 block">Nombre Cliente</label>
            <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-neutral-900 text-white rounded px-3 py-2 outline-none focus:ring-1 focus:ring-brand-gold" placeholder="Juan Perez" />
          </div>
          <div>
            <label className="text-xs text-neutral-400 mb-1 block">Puntaje (1-5)</label>
            <input required type="number" min="1" max="5" value={formData.rating} onChange={e => setFormData({...formData, rating: Number(e.target.value)})} className="w-full bg-neutral-900 text-white rounded px-3 py-2 outline-none focus:ring-1 focus:ring-brand-gold" />
          </div>
          <div>
            <label className="text-xs text-neutral-400 mb-1 block">Contexto / Fecha</label>
            <input required type="text" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className="w-full bg-neutral-900 text-white rounded px-3 py-2 outline-none focus:ring-1 focus:ring-brand-gold" placeholder="Ej: Hace 2 días" />
          </div>
          <div>
            <label className="text-xs text-neutral-400 mb-1 block">Avatar del Cliente</label>
            <input required type="file" accept="image/*" onChange={async (e) => {
              if (e.target.files && e.target.files[0]) {
                 try {
                   const b64 = await compressImageToBase64(e.target.files[0], 200, 200);
                   setFormData({...formData, img: b64});
                 } catch (err) {
                   toast.error("Error optimizando foto");
                 }
              }
            }} className="w-full text-sm text-neutral-400 file:block file:w-full file:py-1.5 file:rounded-md file:border-0 file:text-xs file:bg-brand-gold file:text-black hover:file:bg-yellow-500 cursor-pointer outline-none" />
            {formData.img && <p className="text-[10px] text-green-400 mt-1 block">✓ Optimizada</p>}
          </div>
          <div className="lg:col-span-4 flex gap-4 items-end">
            <div className="flex-1">
              <label className="text-xs text-neutral-400 mb-1 block">Comentario del Cliente</label>
              <textarea required value={formData.comment} onChange={e => setFormData({...formData, comment: e.target.value})} className="w-full bg-neutral-900 text-white rounded px-3 py-2 outline-none focus:ring-1 focus:ring-brand-gold h-12 resize-none" placeholder="El mejor corte de mi vida..."></textarea>
            </div>
            <button type="submit" className="bg-brand-gold text-black whitespace-nowrap font-bold px-5 py-3 rounded hover:bg-yellow-500 transition-colors flex items-center gap-2 h-12">
              <PlusCircle className="size-4" /> Publicar
            </button>
          </div>
        </div>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {reviews.map(r => (
          <div key={r._id} className="bg-neutral-800 p-4 rounded border border-neutral-700 relative">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-3">
                <img src={r.img} alt={r.name} className="w-10 h-10 rounded-full bg-neutral-900 border border-neutral-700" />
                <div>
                  <p className="text-white font-bold leading-tight">{r.name}</p>
                  <p className="text-xs text-neutral-500">{r.date}</p>
                </div>
              </div>
              <div className="flex text-brand-gold">
                {[...Array(r.rating)].map((_, i) => <Star key={i} className="size-3 fill-current" />)}
              </div>
            </div>
            <p className="text-sm text-neutral-300 italic">"{r.comment}"</p>
            <button onClick={() => handleDelete(r._id)} className="absolute bottom-4 right-4 text-red-500 hover:text-red-400 p-1">
              <Trash2 className="size-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
