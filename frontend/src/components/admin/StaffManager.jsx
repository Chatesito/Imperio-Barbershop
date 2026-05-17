import React, { useState, useEffect } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";
import { Edit2, Trash2, Loader2, X, Check, Image as ImageIcon, MapPin, Briefcase, Scissors, ChevronLeft, ChevronRight } from "lucide-react";
import { compressImageToBase64 } from "../../utils/imageHelper";
import { confirmAction } from "../../utils/alerts";

export default function StaffManager() {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingMember, setEditingMember] = useState(null);
  const [branches, setBranches] = useState([]);
  const [services, setServices] = useState([]);
  
  const [page, setPage] = useState(1);
  const limit = 6;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [staffRes, branchRes, serviceRes] = await Promise.all([
        api.get("/staff"),
        api.get("/branches"),
        api.get("/services")
      ]);
      setStaff(staffRes.data);
      setBranches(branchRes.data);
      setServices(serviceRes.data);
    } catch (err) {
      toast.error("Error al cargar datos.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/staff/${editingMember._id}`, editingMember);
      toast.success("Perfil actualizado correctamente");
      setEditingMember(null);
      fetchData();
    } catch (err) {
      toast.error("Error al actualizar");
    }
  };

  const handleDelete = async (id) => {
    if (!(await confirmAction("¿Eliminar del Staff?", "El usuario conservará su cuenta pero ya no aparecerá como profesional disponible."))) return;
    try {
      await api.delete(`/staff/${id}`);
      toast.success("Miembro removido del staff");
      fetchData();
    } catch (err) {
      toast.error("Error al eliminar.");
    }
  };

  if (loading) return <div className="p-20 text-center animate-pulse text-neutral-500 uppercase tracking-widest">Sincronizando equipo profesional...</div>;

  const paginatedStaff = staff.slice((page - 1) * limit, page * limit);
  const hasNext = (page * limit) < staff.length;

  if (paginatedStaff.length === 0 && page > 1) {
      setPage(page - 1);
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center gap-4 bg-neutral-900/50 p-6 rounded-3xl border border-neutral-800 shadow-xl">
          <div className="size-12 rounded-2xl bg-brand-gold/10 flex items-center justify-center text-brand-gold shadow-inner">
              <Briefcase className="size-6" />
          </div>
          <div>
              <h2 className="text-2xl font-bold text-white uppercase tracking-tight">Perfiles Profesionales</h2>
              <p className="text-[10px] text-neutral-500 uppercase tracking-[0.2em] font-bold">Gestión de Especialidades y Sedes</p>
          </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedStaff.map(s => (
          <div key={s._id} className="bg-neutral-900 border border-neutral-800 rounded-[2.5rem] p-6 group relative overflow-hidden transition-all hover:border-brand-gold/30 hover:shadow-2xl">
            <div className="flex items-center gap-5 mb-6">
                <div className="relative">
                    <img src={s.imageUrl} alt={s.name} className="size-20 rounded-2xl object-cover border-2 border-neutral-800 group-hover:border-brand-gold/30 transition-all shadow-xl" />
                    <div className="absolute -bottom-2 -right-2 bg-neutral-950 p-1.5 rounded-lg border border-neutral-800">
                        <Check className="size-3 text-green-500" />
                    </div>
                </div>
                <div>
                    <h3 className="text-white font-bold text-lg uppercase tracking-tight">{s.name}</h3>
                    <p className="text-brand-gold text-[10px] font-bold uppercase tracking-widest">{s.role}</p>
                </div>
            </div>
            
            <p className="text-neutral-500 text-xs line-clamp-3 mb-6 leading-relaxed italic font-light">
                {s.bio || "Sin biografía profesional redactada aún."}
            </p>

            <div className="flex gap-2">
                <button 
                    onClick={() => setEditingMember(s)}
                    className="flex-1 bg-neutral-800 text-white font-bold py-2.5 rounded-xl text-[10px] uppercase tracking-widest hover:bg-brand-gold hover:text-neutral-950 transition-all flex items-center justify-center gap-2"
                >
                    <Edit2 className="size-3" /> Editar Perfil
                </button>
                <button 
                    onClick={() => handleDelete(s._id)}
                    className="bg-red-500/10 text-red-500 p-2.5 rounded-xl border border-red-500/20 hover:bg-red-500 hover:text-white transition-all"
                >
                    <Trash2 className="size-4" />
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
      {editingMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-neutral-950/90 backdrop-blur-sm animate-fade-in">
            <div className="bg-neutral-900 border border-neutral-800 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[3rem] shadow-2xl p-8 md:p-12 relative scrollbar-hide">
                <button onClick={() => setEditingMember(null)} className="absolute top-8 right-8 text-neutral-500 hover:text-white transition-colors">
                    <X className="size-6" />
                </button>

                <div className="flex items-center gap-4 mb-10">
                    <div className="size-14 rounded-2xl bg-brand-gold flex items-center justify-center text-neutral-950">
                        <Edit2 className="size-7" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-extrabold text-white uppercase tracking-tighter">Perfil Profesional</h2>
                        <p className="text-xs text-neutral-500 uppercase tracking-widest font-bold">Personalizando a {editingMember.name}</p>
                    </div>
                </div>

                <form onSubmit={handleUpdate} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Especialidad (Título Público)</label>
                                <input required type="text" value={editingMember.role} onChange={e => setEditingMember({...editingMember, role: e.target.value})} className="w-full bg-neutral-950 border border-neutral-800 text-white px-5 py-4 rounded-2xl text-sm focus:border-brand-gold/50 outline-none transition-all" />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Biografía / Experiencia</label>
                                <textarea rows="4" value={editingMember.bio} onChange={e => setEditingMember({...editingMember, bio: e.target.value})} className="w-full bg-neutral-950 border border-neutral-800 text-white px-5 py-4 rounded-2xl text-sm focus:border-brand-gold/50 outline-none transition-all resize-none" placeholder="Escribe algo inspirador..." />
                            </div>

                            <div className="space-y-4">
                                <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest block">Imagen de Perfil</label>
                                <div className="flex items-center gap-6">
                                    <img src={editingMember.imageUrl} className="size-24 rounded-3xl object-cover border-2 border-brand-gold/20" />
                                    <label className="flex-1 cursor-pointer bg-neutral-950 border-2 border-dashed border-neutral-800 hover:border-brand-gold/50 rounded-3xl flex flex-col items-center justify-center p-4 transition-all">
                                        <ImageIcon className="size-6 text-neutral-600 mb-2" />
                                        <span className="text-[10px] text-neutral-500 font-bold uppercase">Cambiar Foto</span>
                                        <input type="file" className="hidden" accept="image/*" onChange={async (e) => {
                                            if (e.target.files && e.target.files[0]) {
                                                const b64 = await compressImageToBase64(e.target.files[0]);
                                                setEditingMember({...editingMember, imageUrl: b64});
                                            }
                                        }} />
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-8">
                            {/* Sedes */}
                            <div className="space-y-4">
                                <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest flex items-center gap-2">
                                    <MapPin className="size-3" /> Asignación de Sedes
                                </label>
                                <div className="grid grid-cols-1 gap-2 max-h-48 overflow-y-auto pr-2 scrollbar-thin">
                                    {branches.map(b => (
                                        <label key={b._id} className="flex items-center justify-between p-4 bg-neutral-950 rounded-2xl border border-neutral-800 cursor-pointer hover:border-brand-gold/30 transition-all">
                                            <span className="text-xs font-bold text-neutral-300 uppercase">{b.name}</span>
                                            <input type="checkbox" checked={editingMember.branches?.some(branch => (branch._id || branch) === b._id)} onChange={e => {
                                                const current = editingMember.branches || [];
                                                setEditingMember({...editingMember, branches: e.target.checked ? [...current, b._id] : current.filter(x => (x._id || x) !== b._id)});
                                            }} className="accent-brand-gold size-4 rounded-md" />
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Servicios */}
                            <div className="space-y-4">
                                <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest flex items-center gap-2">
                                    <Scissors className="size-3" /> Servicios Disponibles
                                </label>
                                <div className="grid grid-cols-1 gap-2 max-h-48 overflow-y-auto pr-2 scrollbar-thin">
                                    {services.map(s => (
                                        <label key={s._id} className="flex items-center justify-between p-4 bg-neutral-950 rounded-2xl border border-neutral-800 cursor-pointer hover:border-brand-gold/30 transition-all">
                                            <span className="text-xs font-bold text-neutral-300 uppercase">{s.name}</span>
                                            <input type="checkbox" checked={editingMember.services?.some(service => (service._id || service) === s._id)} onChange={e => {
                                                const current = editingMember.services || [];
                                                setEditingMember({...editingMember, services: e.target.checked ? [...current, s._id] : current.filter(x => (x._id || x) !== s._id)});
                                            }} className="accent-brand-gold size-4 rounded-md" />
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end gap-4 pt-6 border-t border-neutral-800">
                        <button type="button" onClick={() => setEditingMember(null)} className="px-8 py-4 rounded-2xl font-bold text-neutral-500 uppercase text-[10px] tracking-widest hover:text-white transition-all">Cancelar</button>
                        <button type="submit" className="bg-brand-gold text-neutral-950 font-bold px-12 py-4 rounded-2xl shadow-xl hover:scale-[1.02] active:scale-95 transition-all uppercase text-[10px] tracking-widest">Guardar Cambios</button>
                    </div>
                </form>
            </div>
        </div>
      )}
    </div>
  );
}
