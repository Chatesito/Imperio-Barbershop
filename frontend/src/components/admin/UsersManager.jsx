import { useState, useEffect } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";
import { Users, UserCircle, ShieldCheck, Mail, Scissors, Search, Filter, Plus, ChevronLeft, ChevronRight } from "lucide-react";

export default function UsersManager() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [roleFilter, setRoleFilter] = useState("all");
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [page, setPage] = useState(1);
    const limit = 8;

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const { data } = await api.get("/auth/users");
            setUsers(data);
        } catch (error) {
            toast.error("Error al cargar lista de usuarios");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    useEffect(() => {
        setPage(1);
    }, [searchTerm, roleFilter]);

    const handleRoleChange = async (userId, newRole) => {
        if (!window.confirm(`¿Seguro que quieres cambiar el rol a ${newRole}?`)) return;
        try {
            await api.put("/auth/users/role", { userId, role: newRole });
            toast.success("Rol actualizado correctamente");
            fetchUsers();
        } catch (error) {
            toast.error("Error al actualizar rol");
        }
    };

    const [newUser, setNewUser] = useState({ name: "", email: "", password: "", role: "user" });

    const handleCreateUser = async (e) => {
        e.preventDefault();
        try {
            await api.post("/auth/create-user", newUser);
            toast.success("Usuario creado con éxito");
            setNewUser({ name: "", email: "", password: "", role: "user" });
            setShowCreateForm(false);
            fetchUsers();
        } catch (error) {
            toast.error(error.response?.data?.message || "Error al crear usuario");
        }
    };

    const filteredUsers = users.filter(u => {
        const matchesSearch = u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                             u.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = roleFilter === "all" || u.role === roleFilter;
        return matchesSearch && matchesRole;
    });

    const paginatedUsers = filteredUsers.slice((page - 1) * limit, page * limit);
    const hasNext = (page * limit) < filteredUsers.length;

    if (paginatedUsers.length === 0 && page > 1) {
        setPage(page - 1);
    }

    if (loading && users.length === 0) return <div className="p-10 text-center text-neutral-500 uppercase tracking-widest animate-pulse">Cargando base de datos...</div>;

    return (
        <section className="space-y-6 animate-fade-in">
            {/* Header y Acciones Rápidas */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-neutral-900/50 p-6 rounded-3xl border border-neutral-800 shadow-xl">
                <div className="flex items-center gap-4">
                    <div className="size-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 shadow-inner">
                        <Users className="size-6" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-white uppercase tracking-tight">Usuarios</h2>
                        <p className="text-[10px] text-neutral-500 uppercase tracking-[0.2em] font-bold">Control de Acceso e Identidad</p>
                    </div>
                </div>
                <button 
                    onClick={() => setShowCreateForm(!showCreateForm)}
                    className="flex items-center justify-center gap-2 bg-brand-gold text-neutral-950 px-6 py-3 rounded-xl font-bold text-sm hover:scale-[1.02] transition-all shadow-lg active:scale-95"
                >
                    <Plus className="size-4" /> {showCreateForm ? "Cerrar Panel" : "Registrar Nuevo"}
                </button>
            </div>

            {/* Formulario Expandible */}
            {showCreateForm && (
                <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-8 shadow-2xl animate-fade-in">
                    <h3 className="text-white font-bold mb-6 flex items-center gap-2">
                        <Plus className="text-brand-gold" /> Registro de Usuario / Barbero
                    </h3>
                    <form onSubmit={handleCreateUser} className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest ml-1">Nombre Completo</label>
                            <input type="text" required value={newUser.name} onChange={(e) => setNewUser({...newUser, name: e.target.value})} className="w-full bg-neutral-950 border border-neutral-800 text-white px-4 py-3 rounded-xl text-sm focus:border-brand-gold/50 outline-none transition-all" placeholder="Ej. Carlos Mendoza" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest ml-1">Email</label>
                            <input type="email" required value={newUser.email} onChange={(e) => setNewUser({...newUser, email: e.target.value})} className="w-full bg-neutral-950 border border-neutral-800 text-white px-4 py-3 rounded-xl text-sm focus:border-brand-gold/50 outline-none transition-all" placeholder="email@imperio.com" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest ml-1">Contraseña</label>
                            <input type="password" required minLength="6" value={newUser.password} onChange={(e) => setNewUser({...newUser, password: e.target.value})} className="w-full bg-neutral-950 border border-neutral-800 text-white px-4 py-3 rounded-xl text-sm focus:border-brand-gold/50 outline-none transition-all" placeholder="******" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest ml-1">Rol Inicial</label>
                            <select value={newUser.role} onChange={(e) => setNewUser({...newUser, role: e.target.value})} className="w-full bg-neutral-950 border border-neutral-800 text-white px-4 py-3 rounded-xl text-sm focus:border-brand-gold/50 outline-none transition-all appearance-none">
                                <option className="bg-neutral-950 text-white" value="user">Cliente Estándar</option>
                                <option className="bg-neutral-950 text-white" value="barber">Barbero / Profesional</option>
                                <option className="bg-neutral-950 text-white" value="admin">Administrador</option>
                            </select>
                        </div>
                        <div className="md:col-span-4 flex justify-end pt-2">
                             <button type="submit" className="bg-brand-gold text-neutral-950 font-bold px-10 py-3 rounded-xl hover:shadow-[0_0_20px_rgba(200,162,86,0.3)] transition-all uppercase text-xs tracking-widest">Confirmar Registro</button>
                        </div>
                    </form>
                </div>
            )}

            {/* Filtros y Búsqueda */}
            <div className="flex flex-col sm:flex-row gap-4 bg-neutral-900 border border-neutral-800 p-4 rounded-2xl shadow-lg">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-neutral-500" />
                    <input 
                        type="text" 
                        placeholder="Buscar por nombre o email..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl pl-12 pr-4 py-3 text-sm text-white focus:border-brand-gold/30 outline-none transition-all"
                    />
                </div>
                <div className="flex items-center gap-2 bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-1">
                    <Filter className="size-4 text-brand-gold" />
                    <select 
                        value={roleFilter} 
                        onChange={(e) => setRoleFilter(e.target.value)}
                        className="bg-neutral-950 text-sm text-white outline-none py-2 px-1 font-bold uppercase tracking-widest cursor-pointer border-0 rounded-xl"
                    >
                        <option className="bg-neutral-950 text-white" value="all">Todos los Roles</option>
                        <option className="bg-neutral-950 text-white" value="user">Clientes</option>
                        <option className="bg-neutral-950 text-white" value="barber">Barberos</option>
                        <option className="bg-neutral-950 text-white" value="admin">Admins</option>
                    </select>
                </div>
            </div>

            {/* Tabla de Usuarios */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-neutral-950/50 text-[10px] font-bold text-neutral-500 uppercase tracking-[0.2em] border-b border-neutral-800">
                                <th className="px-8 py-5">Identidad</th>
                                <th className="px-8 py-5 text-center">Nivel de Acceso</th>
                                <th className="px-8 py-5 text-right">Acciones de Gestión</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-800">
                            {paginatedUsers.map((u) => (
                                <tr key={u._id} className="group hover:bg-neutral-800/30 transition-all">
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-4">
                                            <div className="size-12 rounded-2xl bg-neutral-800 flex items-center justify-center text-neutral-400 group-hover:bg-brand-gold/10 group-hover:text-brand-gold transition-all shadow-inner overflow-hidden">
                                                {u.role === 'barber' ? <Scissors className="size-6" /> : <UserCircle className="size-7" />}
                                            </div>
                                            <div>
                                                <p className="text-white font-bold tracking-tight uppercase text-sm group-hover:text-brand-gold transition-colors">{u.name}</p>
                                                <p className="text-neutral-500 text-xs flex items-center gap-2 mt-0.5">
                                                    <Mail className="size-3" /> {u.email}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5 text-center">
                                        <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.15em] border ${
                                            u.role === 'admin' ? 'bg-brand-gold/10 text-brand-gold border-brand-gold/20' : 
                                            u.role === 'barber' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' : 
                                            'bg-neutral-800/50 text-neutral-400 border-neutral-700'
                                        }`}>
                                            {u.role === 'admin' && <ShieldCheck className="size-3" />}
                                            {u.role === 'barber' && <Scissors className="size-3" />}
                                            {u.role}
                                        </span>
                                    </td>
                                    <td className="px-8 py-5 text-right">
                                        <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                            {['user', 'barber', 'admin'].filter(r => r !== u.role).map(r => (
                                                <button
                                                    key={r}
                                                    onClick={() => handleRoleChange(u._id, r)}
                                                    className="px-4 py-2 rounded-xl border border-neutral-800 text-[10px] font-bold text-neutral-500 hover:text-white hover:border-brand-gold/50 hover:bg-brand-gold/5 transition-all uppercase tracking-widest"
                                                >
                                                    Promover a {r}
                                                </button>
                                            ))}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {filteredUsers.length === 0 && (
                    <div className="py-20 text-center space-y-4">
                        <Users className="size-12 text-neutral-800 mx-auto" />
                        <p className="text-neutral-500 uppercase text-xs tracking-widest">No se encontraron resultados para los filtros actuales</p>
                    </div>
                )}
            </div>

            {/* Paginación */}
            {(page > 1 || hasNext) && (
                <div className="flex items-center justify-center gap-4 mt-8 pt-6 border-t border-neutral-800/50">
                    <button
                        disabled={page === 1}
                        onClick={() => setPage(page - 1)}
                        className="p-2 bg-neutral-900 border border-neutral-800 rounded-xl text-neutral-400 hover:text-brand-gold disabled:opacity-30 disabled:hover:text-neutral-400 transition-all"
                    >
                        <ChevronLeft className="size-5" />
                    </button>
                    <span className="text-sm font-bold text-neutral-400 uppercase tracking-widest">Página {page}</span>
                    <button
                        disabled={!hasNext}
                        onClick={() => setPage(page + 1)}
                        className="p-2 bg-neutral-900 border border-neutral-800 rounded-xl text-neutral-400 hover:text-brand-gold disabled:opacity-30 disabled:hover:text-neutral-400 transition-all"
                    >
                        <ChevronRight className="size-5" />
                    </button>
                </div>
            )}
        </section>
    );
}
