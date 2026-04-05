import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";
import { Trash2, Calendar, Mail, Loader2, LayoutDashboard, Scissors, Users, Images, MessageSquare, MapPin } from "lucide-react";

// Admin Managers
import ServicesManager from "../components/admin/ServicesManager";
import BranchesManager from "../components/admin/BranchesManager";
import StaffManager from "../components/admin/StaffManager";
import ReviewsManager from "../components/admin/ReviewsManager";
import GalleryManager from "../components/admin/GalleryManager";

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [reservations, setReservations] = useState([]);
  const [messages, setMessages] = useState([]);
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

  const fetchData = async () => {
    try {
      setLoading(true);
      if (user.role === "admin") {
        const [resRes, msgRes] = await Promise.all([
          api.get("/reservations"),
          api.get("/contact"),
        ]);
        setReservations(resRes.data);
        setMessages(msgRes.data);
      } else {
        const resRes = await api.get("/reservations/me");
        setReservations(resRes.data);
      }
    } catch (error) {
      toast.error("Error al cargar información base.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelReservation = async (id) => {
    if (!window.confirm("¿Seguro que deseas cancelar esta cita?")) return;
    try {
      await api.delete(`/reservations/${id}`);
      setReservations(reservations.filter((r) => r._id !== id));
      toast.success("Cita cancelada con éxito.");
    } catch (error) {
      toast.error("Hubo un error al cancelar.");
    }
  };

  const handleDeleteMessage = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar este mensaje?")) return;
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
    <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 shadow-xl w-full max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
        <Calendar className="text-brand-gold" />
        Mis Próximas Citas
      </h2>
      
      {reservations.length === 0 ? (
        <p className="text-neutral-400">No tienes citas próximas agendadas.</p>
      ) : (
        <div className="space-y-4">
          {reservations.map((r) => (
            <div key={r._id} className="bg-neutral-800 p-4 rounded-md flex flex-wrap justify-between items-center gap-4 border border-neutral-700">
              <div>
                <p className="text-brand-gold font-bold">{r.servicio}</p>
                <p className="text-white text-sm">Sede: {r.sede || "A domicilio"} - {r.fecha} a las {r.hora}</p>
              </div>
              <button
                onClick={() => handleCancelReservation(r._id)}
                className="flex items-center gap-2 text-sm text-red-400 hover:text-red-300 transition-colors bg-red-400/10 px-3 py-1.5 rounded-md"
              >
                <Trash2 className="size-4" /> Cancelar Cita
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );

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
        <h2 className="text-xl font-bold text-white mb-6 border-b border-neutral-800 pb-2">Gestión de Reservaciones</h2>
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
                <td className="px-4 py-4">{r.servicio}</td>
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
    { id: "services", label: "Servicios", icon: Scissors },
    { id: "staff", label: "Personal", icon: Users },
    { id: "branches", label: "Sedes", icon: MapPin },
    { id: "gallery", label: "Galería", icon: Images },
    { id: "reviews", label: "Reseñas", icon: MessageSquare },
  ];

  const renderAdminCMSContent = () => {
    switch (activeTab) {
      case "overview": return renderAdminOverview();
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

  return (
    <div className="min-h-[100dvh] bg-neutral-950 py-12 px-4 md:py-20 animate-fade-in">
      {/* Header Panel */}
      <div className={`max-w-7xl mx-auto mb-8 ${user.role === "admin" ? "" : "max-w-4xl"}`}>
        <h1 className="text-4xl md:text-5xl font-karantina font-extrabold text-white tracking-wide uppercase">
          Panel de <span className="text-brand-gold">Control</span>
        </h1>
        <p className="text-neutral-400 mt-2">
          {user.role === "admin" ? "Centro de Administración Total. Modifica los módulos de negocio a tu gusto." : `Bienvenido de vuelta, ${user.name}.`}
        </p>
      </div>

      {user.role === "admin" ? renderAdminDashboard() : renderUserDashboard()}
    </div>
  );
}
