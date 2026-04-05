import React, { useState, useEffect } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";
import { Trash2, PlusCircle, Loader2 } from "lucide-react";
import { compressImageToBase64 } from "../../utils/imageHelper";

export default function StaffManager() {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ name: "", role: "", bio: "", imageUrl: "" });

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    try {
      const { data } = await api.get("/staff");
      setStaff(data);
    } catch (err) {
      toast.error("Error al cargar personal.");
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/staff", formData);
      setStaff([...staff, data.member]);
      setFormData({ name: "", role: "", bio: "", imageUrl: "" });
      toast.success("Barbero añadido.");
    } catch (err) {
      toast.error("Error al crear barbero.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar este miembro del equipo?")) return;
    try {
      await api.delete(`/staff/${id}`);
      setStaff(staff.filter((s) => s._id !== id));
      toast.success("Barbero eliminado.");
    } catch (err) {
      toast.error("Error al eliminar.");
    }
  };

  if (loading) return <div className="p-10 flex justify-center"><Loader2 className="animate-spin text-brand-gold size-8" /></div>;

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 shadow-xl">
      <h2 className="text-xl font-bold text-white mb-6 border-b border-neutral-800 pb-2">Gestión de Personal</h2>
      
      <form onSubmit={handleCreate} className="mb-8 bg-neutral-800 p-4 rounded-md border border-neutral-700 flex flex-col gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="text-xs text-neutral-400 mb-1 block">Nombre</label>
            <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-neutral-900 text-white rounded px-3 py-2 outline-none focus:ring-1 focus:ring-brand-gold" placeholder="Nombre completo" />
          </div>
          <div>
            <label className="text-xs text-neutral-400 mb-1 block">Especialidad (Rol)</label>
            <input required type="text" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} className="w-full bg-neutral-900 text-white rounded px-3 py-2 outline-none focus:ring-1 focus:ring-brand-gold" placeholder="Ej: Especialista Fades" />
          </div>
          <div className="lg:col-span-2">
            <label className="text-xs text-neutral-400 mb-1 block">Biografía Corta</label>
            <input required type="text" value={formData.bio} onChange={e => setFormData({...formData, bio: e.target.value})} className="w-full bg-neutral-900 text-white rounded px-3 py-2 outline-none focus:ring-1 focus:ring-brand-gold" placeholder="Descripción de experiencia..." />
          </div>
        </div>
        <div className="flex gap-4 items-end">
          <div className="flex-1">
            <label className="text-xs text-neutral-400 mb-1 block">Subir Fotografía</label>
            <input required type="file" accept="image/*" onChange={async (e) => {
              if (e.target.files && e.target.files[0]) {
                 try {
                   const b64 = await compressImageToBase64(e.target.files[0]);
                   setFormData({...formData, imageUrl: b64});
                 } catch (err) {
                   toast.error("Error optimizando imagen");
                 }
              }
            }} className="w-full text-sm text-neutral-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-brand-gold file:text-black hover:file:bg-yellow-500 cursor-pointer outline-none" />
            {formData.imageUrl && <p className="text-[10px] text-green-400 mt-1">✓ Imagen adjuntada ({(formData.imageUrl.length / 1024).toFixed(1)} KB)</p>}
          </div>
          <button type="submit" className="bg-brand-gold text-black whitespace-nowrap font-bold px-5 py-2.5 rounded hover:bg-yellow-500 transition-colors flex items-center gap-2">
            <PlusCircle className="size-4" /> Agregar Barbero
          </button>
        </div>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {staff.map(s => (
          <div key={s._id} className="bg-neutral-800 p-4 rounded border border-neutral-700 flex gap-4 items-center relative overflow-hidden group">
            <img src={s.imageUrl} alt={s.name} className="w-16 h-16 rounded-full object-cover border-2 border-neutral-700" />
            <div>
              <p className="text-white font-bold">{s.name}</p>
              <p className="text-xs text-brand-gold mb-1">{s.role}</p>
              <p className="text-neutral-400 text-xs line-clamp-2">{s.bio}</p>
            </div>
            <button onClick={() => handleDelete(s._id)} className="absolute top-2 right-2 bg-neutral-900/80 p-2 rounded-full text-red-400 hover:text-red-300 opacity-0 group-hover:opacity-100 transition-opacity">
              <Trash2 className="size-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
