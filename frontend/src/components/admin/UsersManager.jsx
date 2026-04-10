import { useState, useEffect } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";
import { Users, UserShield, UserCircle, ShieldCheck, Mail, Calendar } from "lucide-react";

export default function UsersManager() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchUsers = async () => {
        try {
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

    if (loading) return <div className="p-10 text-center text-neutral-500 uppercase tracking-widest animate-pulse">Cargando base de datos de usuarios...</div>;

    return (
        <section className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 md:p-8 shadow-2xl animate-fade-in">
            <div className="flex items-center gap-4 mb-10">
                <div className="size-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                    <Users className="size-6" />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-white uppercase tracking-tight">Gestión de Usuarios</h2>
                    <p className="text-xs text-neutral-500 uppercase tracking-widest font-medium">Control de Roles y Permisos</p>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-separate border-spacing-y-3">
                    <thead>
                        <tr className="text-[10px] font-bold text-neutral-500 uppercase tracking-[0.2em]">
                            <th className="px-6 pb-2">Usuario</th>
                            <th className="px-6 pb-2 text-center">Rol Actual</th>
                            <th className="px-6 pb-2 text-right">Asignar Rol</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((u) => (
                            <tr key={u._id} className="bg-neutral-950 border border-neutral-800 rounded-2xl group transition-all hover:bg-neutral-900/50">
                                <td className="px-6 py-4 rounded-l-2xl border-y border-l border-neutral-800">
                                    <div className="flex items-center gap-4">
                                        <div className="size-10 rounded-full bg-neutral-800 flex items-center justify-center text-neutral-400 group-hover:text-brand-gold transition-colors">
                                            <UserCircle className="size-6" />
                                        </div>
                                        <div>
                                            <p className="text-white font-bold tracking-wide uppercase text-sm">{u.name}</p>
                                            <div className="flex items-center gap-2 text-neutral-500 text-xs mt-0.5">
                                                <Mail className="size-3" />
                                                <span>{u.email}</span>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 border-y border-neutral-800 text-center">
                                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                                        u.role === 'admin' ? 'bg-brand-gold/10 text-brand-gold' : 
                                        u.role === 'barber' ? 'bg-blue-500/10 text-blue-500' : 
                                        'bg-neutral-800 text-neutral-400'
                                    }`}>
                                        {u.role === 'admin' && <UserShield className="size-3" />}
                                        {u.role === 'barber' && <Scissors className="size-3" />}
                                        {u.role}
                                    </span>
                                </td>
                                <td className="px-6 py-4 rounded-r-2xl border-y border-r border-neutral-800 text-right">
                                    <div className="flex justify-end gap-2">
                                        {['user', 'barber', 'admin'].filter(r => r !== u.role).map(r => (
                                            <button
                                                key={r}
                                                onClick={() => handleRoleChange(u._id, r)}
                                                className="px-3 py-1.5 rounded-lg border border-neutral-800 text-[10px] font-bold text-neutral-500 hover:text-white hover:border-neutral-600 transition-all uppercase"
                                            >
                                                Mover a {r}
                                            </button>
                                        ))}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}
