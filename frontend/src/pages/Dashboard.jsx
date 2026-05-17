import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";
import { Trash2, Calendar, Mail, Loader2, LayoutDashboard, Scissors, Users, Images, MessageSquare, MapPin, Tag } from "lucide-react";

// Admin Managers
import ServicesManager from "../components/admin/ServicesManager";
import BranchesManager from "../components/admin/BranchesManager";
import StaffManager from "../components/admin/StaffManager";
import ReviewsManager from "../components/admin/ReviewsManager";
import GalleryManager from "../components/admin/GalleryManager";
import CategoriesManager from "../components/admin/CategoriesManager";
import UsersManager from "../components/admin/UsersManager";
import UserReviewForm from "../components/UserReviewForm";
import { confirmAction } from "../utils/alerts";

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [reservations, setReservations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [myReviews, setMyReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Tab System
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }
    fetchData();
  }, [user, navigate]);

  const [newPassword, setNewPassword] = useState("");
  const [passwordUpdating, setPasswordUpdating] = useState(false);
  const [profileData, setProfileData] = useState({ name: user?.name || "", email: user?.email || "" });
  const [profileUpdating, setProfileUpdating] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const promises = [];
      
      if (user.role === "admin") {
        promises.push(api.get("/reservations"), api.get("/contact"));
      } else if (user.role === "barber") {
        promises.push(api.get("/reservations"));
      } else {
        promises.push(api.get("/reservations/me"), api.get("/reviews/my-reviews"));
      }
      
      const results = await Promise.all(promises);
      
      if (user.role === "admin") {
        setReservations(results[0].data);
        setMessages(results[1].data);
      } else if (user.role === "barber") {
        setReservations(results[0].data);
      } else {
        setReservations(results[0].data);
        setMyReviews(results[1].data);
      }
    } catch (error) {
      toast.error("Error al cargar información.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    try {
      setPasswordUpdating(true);
      await api.put("/auth/change-password", { newPassword });
      toast.success("Contraseña actualizada con éxito");
      setNewPassword("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error al actualizar");
    } finally {
      setPasswordUpdating(false);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      setProfileUpdating(true);
      await api.put("/auth/update-profile", profileData);
      toast.success("Perfil actualizado con éxito");
      // Update local context if needed (requires useAuth to have a method for it)
    } catch (error) {
      toast.error(error.response?.data?.message || "Error al actualizar perfil");
    } finally {
      setProfileUpdating(false);
    }
  };

  const handleDeleteReview = async (id) => {
    if (!(await confirmAction("¿Eliminar reseña?", "Ya no será visible en la web."))) return;
    try {
      await api.delete(`/reviews/${id}`);
      setMyReviews(myReviews.filter(r => r._id !== id));
      toast.success("Reseña eliminada");
    } catch (error) {
      toast.error("Error al eliminar");
    }
  };

  const handleCancelReservation = async (id) => {
    if (!(await confirmAction("¿Cancelar reservación?", "Se liberará el espacio en la agenda."))) return;
    try {
      await api.delete(`/reservations/${id}`);
      setReservations(reservations.filter((r) => r._id !== id));
      toast.success("Cita cancelada con éxito.");
    } catch (error) {
      toast.error("Hubo un error al cancelar.");
    }
  };

  const handleDeleteMessage = async (id) => {
    if (!(await confirmAction("¿Eliminar este mensaje?", "No podrás recuperarlo más adelante."))) return;
    try {
      await api.delete(`/contact/${id}`);
      setMessages(messages.filter((m) => m._id !== id));
      toast.success("Mensaje eliminado.");
    } catch (error) {
      toast.error("No se pudo eliminar el mensaje.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-950">
        <Loader2 className="size-10 animate-spin text-brand-gold" />
      </div>
    );
  }

  // --- RENDERS ---
  const renderUserDashboard = () => (
    <div className="w-full max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* 1. Reservaciones */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-8 shadow-2xl overflow-hidden relative group">
        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
          <Calendar className="size-24 text-brand-gold" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <div className="size-10 bg-brand-gold/10 rounded-xl flex items-center justify-center">
            <Calendar className="size-5 text-brand-gold" />
          </div>
          Mis Próximas Citas
        </h2>
        
        {reservations.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-neutral-500 italic mb-4">Aún no has agendado tu próximo ritual.</p>
            <button onClick={() => navigate("/Reservations")} className="text-brand-gold font-bold text-sm uppercase tracking-widest border border-brand-gold/30 px-6 py-2 rounded-xl hover:bg-brand-gold hover:text-black transition-all">Agendar Ahora</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {reservations.map((r) => (
              <div key={r._id} className="bg-neutral-950/50 p-6 rounded-2xl flex flex-wrap justify-between items-center gap-6 border border-neutral-800 hover:border-brand-gold/30 transition-all group/item">
                <div className="flex items-center gap-4">
                  <div className="size-12 bg-neutral-800 rounded-xl flex items-center justify-center font-bold text-brand-gold">
                    {r.fecha.split("-")[2]}
                  </div>
                  <div>
                    <p className="text-white font-bold">{Array.isArray(r.servicio) ? r.servicio.join(" + ") : r.servicio}</p>
                    <p className="text-neutral-500 text-xs tracking-wider uppercase">{r.fecha} a las {r.hora}</p>
                    {r.barbero && <p className="text-[10px] text-brand-gold font-bold mt-1 uppercase tracking-widest">Barbero: {r.barbero}</p>}
                  </div>
                </div>
                <button
                  onClick={() => handleCancelReservation(r._id)}
                  className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-red-500/70 hover:text-red-500 transition-colors bg-red-500/5 px-4 py-2 rounded-xl border border-red-500/10"
                >
                  <Trash2 className="size-3" /> Cancelar
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 2. Perfil y Seguridad */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-8 shadow-2xl">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
             <div className="size-10 bg-brand-gold/10 rounded-xl flex items-center justify-center">
              <Users className="size-5 text-brand-gold" />
            </div>
            Mi Perfil
          </h2>
          <form onSubmit={handleUpdateProfile} className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest ml-1">Nombre</label>
              <input 
                type="text" 
                value={profileData.name} 
                onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white text-sm focus:border-brand-gold/50 outline-none transition-all"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest ml-1">Correo</label>
              <input 
                type="email" 
                value={profileData.email} 
                onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white text-sm focus:border-brand-gold/50 outline-none transition-all"
              />
            </div>
            <button type="submit" disabled={profileUpdating} className="w-full bg-neutral-800 hover:bg-neutral-700 text-white font-bold py-3 rounded-xl transition-all text-xs uppercase tracking-widest mt-2">
              {profileUpdating ? "Guardando..." : "Actualizar Datos"}
            </button>
          </form>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-8 shadow-2xl">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
             <div className="size-10 bg-brand-gold/10 rounded-xl flex items-center justify-center">
              <Tag className="size-5 text-brand-gold" />
            </div>
            Seguridad
          </h2>
          <form onSubmit={handleUpdatePassword} className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest ml-1">Nueva Contraseña</label>
              <input 
                type="password" 
                placeholder="Mínimo 6 caracteres"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white text-sm focus:border-brand-gold/50 outline-none transition-all"
              />
            </div>
            <button type="submit" disabled={passwordUpdating} className="w-full bg-brand-gold/10 border border-brand-gold/30 hover:bg-brand-gold hover:text-black text-brand-gold font-bold py-3 rounded-xl transition-all text-xs uppercase tracking-widest mt-2">
              {passwordUpdating ? "Procesando..." : "Cambiar Contraseña"}
            </button>
          </form>
        </div>
      </div>

      {/* 3. Mis Reseñas */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-8 shadow-2xl">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <div className="size-10 bg-brand-gold/10 rounded-xl flex items-center justify-center">
            <MessageSquare className="size-5 text-brand-gold" />
          </div>
          Mis Reseñas Publicadas
        </h2>
        
        {myReviews.length === 0 ? (
          <div className="text-center py-6 border-2 border-dashed border-neutral-800 rounded-2xl">
            <p className="text-neutral-500 text-sm">Aún no has compartido tu experiencia.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {myReviews.map((rev) => (
              <div key={rev._id} className="bg-neutral-950/30 p-6 rounded-2xl border border-neutral-800 relative group/rev">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={i < rev.rating ? "text-brand-gold text-lg" : "text-neutral-700 text-lg"}>★</span>
                    ))}
                  </div>
                  <button onClick={() => handleDeleteReview(rev._id)} className="opacity-0 group-hover/rev:opacity-100 p-2 text-neutral-500 hover:text-red-500 transition-all">
                    <Trash2 className="size-4" />
                  </button>
                </div>
                <p className="text-neutral-300 text-sm italic line-clamp-3">"{rev.comment}"</p>
                <p className="text-neutral-500 text-[10px] mt-4 uppercase tracking-widest">{rev.date}</p>
              </div>
            ))}
          </div>
        )}

        <div className="mt-10 pt-8 border-t border-neutral-800">
           <h3 className="text-lg font-bold text-white mb-4">Publicar Nueva Reseña</h3>
           <UserReviewForm />
        </div>
      </div>
    </div>
  );

  const renderBarberDashboard = () => {
    const todayStr = new Date().toLocaleDateString('en-CA');
    
    // Filter and sort reservations
    const sortedReservations = [...reservations].sort((a, b) => {
      const dateCompare = a.fecha.localeCompare(b.fecha);
      if (dateCompare !== 0) return dateCompare;
      return a.hora.localeCompare(b.hora);
    });
    const todayReservations = sortedReservations.filter(r => r.fecha === todayStr && r.status !== 'cancelled');
    const upcomingReservations = sortedReservations.filter(r => r.fecha > todayStr && r.status !== 'cancelled');
    const pastReservations = sortedReservations.filter(r => r.fecha < todayStr && r.status !== 'cancelled').reverse();

    const renderReservationCard = (r) => (
      <div key={r._id} className="bg-neutral-950/50 p-6 rounded-2xl border border-neutral-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 hover:border-brand-gold/20 transition-all group/card">
        <div className="flex items-center gap-4">
          <div className="size-14 bg-neutral-900 rounded-2xl flex flex-col items-center justify-center border border-neutral-800">
            <span className="text-brand-gold font-bold text-lg leading-none">{r.hora}</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p className="text-white font-bold text-lg tracking-tight uppercase">{Array.isArray(r.servicio) ? r.servicio.join(" + ") : r.servicio}</p>
              <span className={`text-[8px] px-2 py-0.5 rounded-full font-bold uppercase tracking-widest ${
                r.status === 'confirmed' ? 'bg-green-500/10 text-green-500' : 'bg-brand-gold/10 text-brand-gold animate-pulse'
              }`}>
                {r.status === 'confirmed' ? 'Confirmado' : 'Pendiente'}
              </span>
            </div>
            <p className="text-neutral-500 text-sm font-medium">Cliente: <span className="text-neutral-300">{r.nombre}</span></p>
            <div className="flex flex-wrap items-center gap-3 mt-2">
                <span className="text-[10px] bg-neutral-800 text-neutral-400 px-2 py-0.5 rounded-full uppercase tracking-widest">{r.sede || "Domicilio"}</span>
                {r.guests > 1 && <span className="text-[10px] bg-brand-gold/10 text-brand-gold px-2 py-0.5 rounded-full uppercase tracking-widest">+{r.guests - 1} Acompañantes</span>}
                {r.fecha !== todayStr && <span className="text-[10px] bg-white/5 text-neutral-500 px-2 py-0.5 rounded-full uppercase tracking-widest font-bold">{r.fecha}</span>}
            </div>
          </div>
        </div>
        {r.mensaje && (
          <div className="bg-neutral-900/80 p-3 rounded-xl border-l-2 border-brand-gold text-xs text-neutral-400 italic max-w-xs">
            "{r.mensaje}"
          </div>
        )}
      </div>
    );

    return (
      <div className="w-full max-w-4xl mx-auto space-y-12 animate-fade-in">
        <p className="text-[10px] text-neutral-800 text-center uppercase tracking-widest font-bold">
          Sincronizando: {reservations.length} entradas encontradas
        </p>
        {/* Hoy Section */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3 uppercase font-karantina tracking-wider">
              <div className="size-10 rounded-xl bg-brand-gold/10 flex items-center justify-center text-brand-gold">
                <Calendar className="size-5" />
              </div>
              Agenda de Hoy
            </h2>
            <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest bg-neutral-900 px-3 py-1 rounded-full border border-neutral-800">
              {todayStr}
            </span>
          </div>
          
          {todayReservations.length === 0 ? (
            <div className="text-center py-12 border-2 border-dashed border-neutral-800 rounded-[2.5rem] bg-neutral-900/20">
              <p className="text-neutral-500 italic text-sm">No tienes citas programadas para hoy.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {todayReservations.map(renderReservationCard)}
            </div>
          )}
        </section>

        {/* Proximas Section */}
        {upcomingReservations.length > 0 && (
          <section className="space-y-6">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3 uppercase font-karantina tracking-wider">
                <div className="size-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                  <Calendar className="size-5" />
                </div>
                Próximas Reservaciones
              </h2>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              {upcomingReservations.map(renderReservationCard)}
            </div>
          </section>
        )}

        {/* Pasadas Section */}
        {pastReservations.length > 0 && (
          <section className="space-y-6">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3 uppercase font-karantina tracking-wider">
                <div className="size-10 rounded-xl bg-neutral-800 flex items-center justify-center text-neutral-500">
                  <Calendar className="size-5" />
                </div>
                Historial de Citas
              </h2>
            </div>
            
            <div className="grid grid-cols-1 gap-4 opacity-70 hover:opacity-100 transition-opacity">
              {pastReservations.map(renderReservationCard)}
            </div>
          </section>
        )}

        {/* Perfil y Seguridad (Barber) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-neutral-800">
         <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-8 shadow-2xl">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3 uppercase tracking-tight">
                Actualizar Perfil
            </h2>
            <form onSubmit={handleUpdateProfile} className="space-y-4">
                <div className="space-y-1">
                    <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest ml-1">Nombre</label>
                    <input type="text" value={profileData.name} onChange={e => setProfileData({...profileData, name: e.target.value})} className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white text-sm focus:border-brand-gold/50 outline-none transition-all" />
                </div>
                <button type="submit" disabled={profileUpdating} className="w-full bg-neutral-800 hover:bg-neutral-700 text-white font-bold py-3 rounded-xl transition-all text-xs uppercase tracking-widest">
                    {profileUpdating ? "Guardando..." : "Guardar Cambios"}
                </button>
            </form>
         </div>

         <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-8 shadow-2xl">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3 uppercase tracking-tight">
                Seguridad
            </h2>
            <form onSubmit={handleUpdatePassword} className="space-y-4">
                <div className="space-y-1">
                    <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest ml-1">Nueva Contraseña</label>
                    <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="Mínimo 6 caracteres" className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white text-sm focus:border-brand-gold/50 outline-none transition-all" />
                </div>
                <button type="submit" disabled={passwordUpdating} className="w-full bg-brand-gold/10 border border-brand-gold/30 hover:bg-brand-gold hover:text-black text-brand-gold font-bold py-3 rounded-xl transition-all text-xs uppercase tracking-widest">
                    {passwordUpdating ? "Actualizando..." : "Cambiar Contraseña"}
                </button>
            </form>
         </div>
      </div>
    </div>
    );
  };

  const renderAdminOverview = () => (
    <div className="space-y-8 fade-in">
      {/* Resumen */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 shadow-xl flex items-center gap-4">
          <div className="bg-brand-gold/10 p-4 rounded-full">
            <Calendar className="size-8 text-brand-gold" />
          </div>
          <div>
            <p className="text-neutral-400 text-sm font-semibold uppercase tracking-wider">Citas Totales</p>
            <p className="text-3xl font-bold text-white">{reservations.length}</p>
          </div>
        </div>
        <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 shadow-xl flex items-center gap-4">
          <div className="bg-brand-gold/10 p-4 rounded-full">
            <Mail className="size-8 text-brand-gold" />
          </div>
          <div>
            <p className="text-neutral-400 text-sm font-semibold uppercase tracking-wider">Buzón de Mensajes</p>
            <p className="text-3xl font-bold text-white">{messages.length}</p>
          </div>
        </div>
      </div>

      {/* Citas */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 shadow-xl overflow-x-auto">
        <div className="flex justify-between items-center mb-6 border-b border-neutral-800 pb-2">
            <h2 className="text-xl font-bold text-white">Gestión de Reservaciones</h2>
            <button 
                onClick={() => navigate("/reservations")}
                className="bg-brand-gold text-neutral-950 font-bold px-4 py-2 rounded-md text-sm hover:scale-105 transition-transform"
            >
                + Crear Cita (Walk-in)
            </button>
        </div>
        <table className="w-full text-left text-sm text-neutral-300">
          <thead className="bg-neutral-800 text-brand-gold uppercase text-xs">
            <tr>
              <th className="px-4 py-3 rounded-tl-md">Cliente</th>
              <th className="px-4 py-3">Servicio</th>
              <th className="px-4 py-3">Fecha y Hora</th>
              <th className="px-4 py-3">Ubicación</th>
              <th className="px-4 py-3 rounded-tr-md text-right">Acción</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((r) => (
              <tr key={r._id} className="border-b border-neutral-800 hover:bg-neutral-800/50 transition-colors">
                <td className="px-4 py-4">
                  <p className="font-semibold text-white">{r.nombre}</p>
                  <p className="text-xs text-neutral-500">{r.email}</p>
                </td>
                <td className="px-4 py-4">{Array.isArray(r.servicio) ? r.servicio.join(", ") : r.servicio}</td>
                <td className="px-4 py-4 whitespace-nowrap">{r.fecha} - {r.hora}</td>
                <td className="px-4 py-4">{r.sede || "Domicilio: " + r.direccion}</td>
                <td className="px-4 py-4 text-right">
                  <button onClick={() => handleCancelReservation(r._id)} className="text-red-400 hover:text-red-300">
                    <Trash2 className="size-5 inline" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {reservations.length === 0 && <p className="text-neutral-500 py-4 text-center">No hay reservaciones.</p>}
      </div>

      {/* Mensajes */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 shadow-xl overflow-x-auto">
        <h2 className="text-xl font-bold text-white mb-6 border-b border-neutral-800 pb-2">Buzón de Contacto</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {messages.map((m) => (
            <div key={m._id} className="bg-neutral-800 p-4 rounded-md border border-neutral-700 flex flex-col justify-between">
              <div>
                <p className="font-bold text-white">{m.name} <span className="text-xs font-normal text-brand-gold bg-brand-gold/10 px-2 py-0.5 rounded-full ml-2">{m.service}</span></p>
                <p className="text-xs text-neutral-400 mb-2">{m.email} - {m.phone}</p>
                <p className="text-sm text-neutral-300 italic">"{m.message}"</p>
              </div>
              <div className="mt-4 text-right border-t border-neutral-700 pt-3">
                <button onClick={() => handleDeleteMessage(m._id)} className="text-xs flex items-center justify-end w-full gap-1 text-neutral-500 hover:text-red-400 transition-colors">
                  <Trash2 className="size-4" /> Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
        {messages.length === 0 && <p className="text-neutral-500 py-4 text-center">No hay mensajes nuevos.</p>}
      </div>
    </div>
  );

  const TABS = [
    { id: "overview", label: "Resumen", icon: LayoutDashboard },
    { id: "users", label: "Usuarios", icon: Users },
    { id: "categories", label: "Categorías", icon: Tag },
    { id: "services", label: "Servicios", icon: Scissors },
    { id: "staff", label: "Personal", icon: Users },
    { id: "branches", label: "Sedes", icon: MapPin },
    { id: "gallery", label: "Galería", icon: Images },
    { id: "reviews", label: "Reseñas", icon: MessageSquare },
  ];

  const renderAdminCMSContent = () => {
    switch (activeTab) {
      case "overview": return renderAdminOverview();
      case "users": return <UsersManager />;
      case "categories": return <CategoriesManager />;
      case "services": return <ServicesManager />;
      case "staff": return <StaffManager />;
      case "branches": return <BranchesManager />;
      case "gallery": return <GalleryManager />;
      case "reviews": return <ReviewsManager />;
      default: return renderAdminOverview();
    }
  };

  const renderAdminDashboard = () => (
    <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 items-start">
      {/* Sidebar Navigation */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-4 shadow-xl w-full lg:w-64 shrink-0 space-y-2 sticky top-24">
        <p className="text-xs font-bold text-brand-gold uppercase tracking-widest pl-3 mb-4 border-b border-neutral-800 pb-2">Módulos CMS</p>
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-md transition-all text-sm font-semibold
                ${isActive ? "bg-brand-gold text-black shadow-md" : "text-neutral-400 hover:bg-neutral-800 hover:text-white"}`}
            >
              <Icon className="size-5" />
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 w-full relative">
         {renderAdminCMSContent()}
      </div>
    </div>
  );

  if (!user) return null;

  const renderViewByRole = () => {
    if (user.role === "admin") return renderAdminDashboard();
    if (user.role === "barber") return renderBarberDashboard();
    return renderUserDashboard();
  };

  return (
    <div className="min-h-[100dvh] bg-neutral-950 py-12 px-8 md:px-16 lg:px-24 md:py-20 animate-fade-in">
      {/* Header Panel */}
      <div className={`max-w-7xl mx-auto mb-8 ${user.role === "admin" ? "" : "max-w-4xl"}`}>
        <h1 className="text-4xl md:text-5xl font-karantina font-extrabold text-white tracking-wide uppercase">
          Panel de <span className="text-brand-gold">{user.role === 'barber' ? 'Profesionales' : 'Control'}</span>
        </h1>
        <p className="text-neutral-400 mt-2">
          {user.role === "admin" ? "Centro de Administración Total. Modifica los módulos de negocio a tu gusto." : `Bienvenido de vuelta, ${user.name}.`}
        </p>
      </div>

      {renderViewByRole()}
    </div>
  );
}
