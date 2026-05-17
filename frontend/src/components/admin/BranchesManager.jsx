import React, { useState, useEffect } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";
import { Trash2, PlusCircle, Loader2, Edit, ChevronLeft, ChevronRight } from "lucide-react";
import { compressImageToBase64 } from "../../utils/imageHelper";
import { confirmAction } from "../../utils/alerts";

export default function BranchesManager() {
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ name: "", address: "", mapUrl: "", image: "" });
  const [editingBranch, setEditingBranch] = useState(null);
  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(false);
  const limit = 6;

  useEffect(() => {
    fetchBranches();
  }, [page]);

  const fetchBranches = async () => {
    try {
      const { data } = await api.get("/branches", {
        params: { page, limit: limit + 1 }
      });
      if (data.length > limit) {
        setHasNext(true);
        setBranches(data.slice(0, limit));
      } else {
        setHasNext(false);
        setBranches(data);
      }
    } catch (err) {
      toast.error("Error al cargar sedes.");
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!formData.image) return toast.error("Por favor selecciona una fachada.");
    try {
      const { data } = await api.post("/branches", formData);
      setPage(1);
      fetchBranches();
      setFormData({ name: "", address: "", mapUrl: "", image: "" });
      toast.success("Sede añadida con éxito.");
    } catch (err) {
      toast.error("Error al crear la sede.");
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/branches/${editingBranch._id}`, editingBranch);
      setEditingBranch(null);
      fetchBranches();
      toast.success("Sede actualizada");
    } catch (err) {
      toast.error("Error al actualizar la sede.");
    }
  };

  const handleDelete = async (id) => {
    if (!(await confirmAction("¿Cerrar Sede?", "Se eliminará esta matriz de la lista de reservas."))) return;
    try {
      await api.delete(`/branches/${id}`);
      fetchBranches();
      toast.success("Sede eliminada.");
    } catch (err) {
      toast.error("Error al eliminar.");
    }
  };

  if (loading) return <div className="p-10 flex justify-center"><Loader2 className="animate-spin text-brand-gold size-8" /></div>;

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 md:p-8 shadow-2xl animate-fade-in relative">
      <div className="flex items-center gap-4 mb-8">
          <div className="size-12 rounded-2xl bg-brand-gold/10 flex items-center justify-center text-brand-gold">
              <PlusCircle className="size-6" />
          </div>
          <div>
              <h2 className="text-2xl font-bold text-white uppercase tracking-tight">Gestión de Sedes y Ubicaciones</h2>
              <p className="text-xs text-neutral-500 uppercase tracking-widest font-medium">Control de sucursales físicas</p>
          </div>
      </div>
      
      <form onSubmit={handleCreate} className="mb-8 bg-neutral-950 p-6 rounded-[2rem] border border-neutral-800 flex flex-col gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-2 block">Nombre de la Sede</label>
            <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-neutral-900 border border-neutral-800 text-white rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-brand-gold" placeholder="Ej: Sede Norte" />
          </div>
          <div>
            <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-2 block">Dirección Física</label>
            <input required type="text" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} className="w-full bg-neutral-900 border border-neutral-800 text-white rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-brand-gold" placeholder="Ej: Calle 1 # 23-45" />
          </div>
          <div>
            <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-2 block">URL de Google Maps</label>
            <input required type="text" value={formData.mapUrl} onChange={e => setFormData({...formData, mapUrl: e.target.value})} className="w-full bg-neutral-900 border border-neutral-800 text-white rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-brand-gold" placeholder="https://maps.app.goo.gl/..." />
          </div>
          <div>
            <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-2 block">Subir Fachada o Interior (Sede)</label>
            <input required type="file" accept="image/*" onChange={async (e) => {
              if (e.target.files && e.target.files[0]) {
                 try {
                   const b64 = await compressImageToBase64(e.target.files[0]);
                   setFormData({...formData, image: b64});
                 } catch (err) {
                   toast.error("Error optimizando imagen");
                 }
              }
            }} className="w-full text-sm text-neutral-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-brand-gold file:text-black hover:file:bg-yellow-500 cursor-pointer outline-none" />
            {formData.image && <p className="text-[10px] text-green-400 mt-1">✓ Fachada lista ({(formData.image.length / 1024).toFixed(1)} KB)</p>}
          </div>
        </div>
        <div className="flex justify-end mt-2">
          <button type="submit" className="bg-brand-gold text-neutral-950 whitespace-nowrap font-bold px-8 py-3 rounded-xl hover:scale-105 transition-all flex items-center gap-2">
            <PlusCircle className="size-4" /> Registrar Sede
          </button>
        </div>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {branches.map(b => (
          <div key={b._id} className="bg-neutral-950 rounded-[2rem] border border-neutral-800 overflow-hidden relative group hover:border-brand-gold/20 transition-all flex flex-col justify-between">
            <div>
              <img src={b.image} alt={b.name} className="w-full h-36 object-cover opacity-80" />
              <div className="p-5">
                <p className="text-brand-gold font-bold text-lg tracking-tight uppercase leading-tight">{b.name}</p>
                <p className="text-neutral-400 text-sm mt-1 truncate">{b.address}</p>
                <a href={b.mapUrl} target="_blank" rel="noreferrer" className="text-xs text-blue-400 hover:text-blue-300 mt-3 inline-block">Ver en Maps &rarr;</a>
              </div>
            </div>
            <div className="flex items-center gap-2 p-5 border-t border-neutral-900/50 justify-end">
              <button onClick={() => setEditingBranch(b)} className="p-2 text-neutral-600 hover:text-brand-gold hover:bg-brand-gold/10 rounded-lg transition-all">
                <Edit className="size-5" />
              </button>
              <button onClick={() => handleDelete(b._id)} className="p-2 text-neutral-600 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all">
                <Trash2 className="size-5" />
              </button>
            </div>
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

      {/* Modal de Edición */}
      {editingBranch && (
          <div className="fixed inset-0 z-50 bg-neutral-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
              <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 md:p-8 max-w-xl w-full shadow-2xl relative">
                  <h3 className="text-xl font-bold text-white uppercase tracking-tight mb-2">Editar Sede</h3>
                  <p className="text-xs text-neutral-500 uppercase tracking-widest font-medium mb-6">Actualiza la información de la sede</p>
                  
                  <form onSubmit={handleEditSubmit} className="space-y-4">
                      <div>
                        <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-1 block">Nombre de la Sede</label>
                        <input required type="text" value={editingBranch.name} onChange={e => setEditingBranch({...editingBranch, name: e.target.value})} className="w-full bg-neutral-950 border border-neutral-800 text-white rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-brand-gold" />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-1 block">Dirección Física</label>
                        <input required type="text" value={editingBranch.address} onChange={e => setEditingBranch({...editingBranch, address: e.target.value})} className="w-full bg-neutral-950 border border-neutral-800 text-white rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-brand-gold" />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-1 block">URL de Google Maps</label>
                        <input required type="text" value={editingBranch.mapUrl} onChange={e => setEditingBranch({...editingBranch, mapUrl: e.target.value})} className="w-full bg-neutral-950 border border-neutral-800 text-white rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-brand-gold" />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-1 block">Fachada o Interior (Opcional - Reemplazar)</label>
                        <input type="file" accept="image/*" onChange={async (e) => {
                          if (e.target.files && e.target.files[0]) {
                             try {
                               const b64 = await compressImageToBase64(e.target.files[0]);
                               setEditingBranch({...editingBranch, image: b64});
                             } catch (err) {
                               toast.error("Error optimizando imagen");
                             }
                          }
                        }} className="w-full text-sm text-neutral-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-brand-gold file:text-black hover:file:bg-yellow-500 cursor-pointer outline-none" />
                      </div>

                      <div className="flex gap-4 justify-end pt-4">
                          <button
                              type="button"
                              onClick={() => setEditingBranch(null)}
                              className="px-5 py-2.5 rounded-xl border border-neutral-800 text-white hover:bg-neutral-800 transition-all font-bold text-xs"
                          >
                              CANCELAR
                          </button>
                          <button
                              type="submit"
                              className="bg-brand-gold text-neutral-950 px-5 py-2.5 rounded-xl font-bold hover:scale-105 transition-all text-xs"
                          >
                              GUARDAR
                          </button>
                      </div>
                  </form>
              </div>
          </div>
      )}
    </div>
  );
}
