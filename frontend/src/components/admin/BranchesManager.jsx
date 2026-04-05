import React, { useState, useEffect } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";
import { Trash2, PlusCircle, Loader2 } from "lucide-react";
import { compressImageToBase64 } from "../../utils/imageHelper";
import { confirmAction } from "../../utils/alerts";

export default function BranchesManager() {
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ name: "", address: "", mapUrl: "", image: "" });

  useEffect(() => {
    fetchBranches();
  }, []);

  const fetchBranches = async () => {
    try {
      const { data } = await api.get("/branches");
      setBranches(data);
    } catch (err) {
      toast.error("Error al cargar sedes.");
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/branches", formData);
      setBranches([...branches, data]);
      setFormData({ name: "", address: "", mapUrl: "", image: "" });
      toast.success("Sede añadida éxito.");
    } catch (err) {
      toast.error("Error al crear la sede.");
    }
  };

  const handleDelete = async (id) => {
    if (!(await confirmAction("¿Cerrar Sede?", "Se eliminará esta matriz de la lista de reservas."))) return;
    try {
      await api.delete(`/branches/${id}`);
      setBranches(branches.filter((b) => b._id !== id));
      toast.success("Sede eliminada.");
    } catch (err) {
      toast.error("Error al eliminar.");
    }
  };

  if (loading) return <div className="p-10 flex justify-center"><Loader2 className="animate-spin text-brand-gold size-8" /></div>;

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 shadow-xl">
      <h2 className="text-xl font-bold text-white mb-6 border-b border-neutral-800 pb-2">Gestión de Sedes y Ubicaciones</h2>
      
      <form onSubmit={handleCreate} className="mb-8 bg-neutral-800 p-4 rounded-md border border-neutral-700 flex flex-col gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-neutral-400 mb-1 block">Nombre de la Sede</label>
            <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-neutral-900 text-white rounded px-3 py-2 outline-none focus:ring-1 focus:ring-brand-gold" placeholder="Ej: Sede Norte" />
          </div>
          <div>
            <label className="text-xs text-neutral-400 mb-1 block">Dirección Física</label>
            <input required type="text" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} className="w-full bg-neutral-900 text-white rounded px-3 py-2 outline-none focus:ring-1 focus:ring-brand-gold" placeholder="Ej: Calle 1 # 23-45" />
          </div>
          <div>
            <label className="text-xs text-neutral-400 mb-1 block">URL de Google Maps</label>
            <input required type="text" value={formData.mapUrl} onChange={e => setFormData({...formData, mapUrl: e.target.value})} className="w-full bg-neutral-900 text-white rounded px-3 py-2 outline-none focus:ring-1 focus:ring-brand-gold" placeholder="https://maps.app.goo.gl/..." />
          </div>
          <div>
            <label className="text-xs text-neutral-400 mb-1 block">Subir Fachada o Interior (Sede)</label>
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
          <button type="submit" className="bg-brand-gold text-black whitespace-nowrap font-bold px-5 py-2.5 rounded hover:bg-yellow-500 transition-colors flex items-center gap-2">
            <PlusCircle className="size-4" /> Registrar Sede
          </button>
        </div>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {branches.map(b => (
          <div key={b._id} className="bg-neutral-800 rounded border border-neutral-700 overflow-hidden relative group">
            <img src={b.image} alt={b.name} className="w-full h-32 object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
            <div className="p-4">
              <p className="text-brand-gold font-bold">{b.name}</p>
              <p className="text-white text-sm mt-1 truncate">{b.address}</p>
              <a href={b.mapUrl} target="_blank" rel="noreferrer" className="text-xs text-blue-400 hover:text-blue-300 mt-2 inline-block">Ver en Maps &rarr;</a>
            </div>
            <button onClick={() => handleDelete(b._id)} className="absolute top-2 right-2 bg-neutral-900/90 p-2 rounded text-red-400 hover:text-red-300 opacity-0 group-hover:opacity-100 transition-opacity">
              <Trash2 className="size-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
