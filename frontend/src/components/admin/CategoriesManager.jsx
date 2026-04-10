import { useState, useEffect } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";
import { Plus, Trash2, Tag } from "lucide-react";

export default function CategoriesManager() {
    const [categories, setCategories] = useState([]);
    const [newName, setNewName] = useState("");
    const [loading, setLoading] = useState(false);

    const fetchCategories = async () => {
        try {
            const { data } = await api.get("/categories");
            setCategories(data);
        } catch (error) {
            toast.error("Error al cargar categorías");
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleAdd = async (e) => {
        e.preventDefault();
        if (!newName.trim()) return;
        setLoading(true);
        try {
            await api.post("/categories", { name: newName });
            setNewName("");
            fetchCategories();
            toast.success("Categoría añadida");
        } catch (error) {
            toast.error("Error al añadir categoría");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("¿Estás seguro? Los servicios asociados podrían dejar de ser visibles correctamente.")) return;
        try {
            await api.delete(`/categories/${id}`);
            fetchCategories();
            toast.success("Categoría eliminada");
        } catch (error) {
            toast.error("Error al eliminar categoría");
        }
    };

    return (
        <section className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 md:p-8 shadow-2xl animate-fade-in">
            <div className="flex items-center gap-4 mb-8">
                <div className="size-12 rounded-2xl bg-brand-gold/10 flex items-center justify-center text-brand-gold">
                    <Tag className="size-6" />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-white uppercase tracking-tight">Gestor de Categorías</h2>
                    <p className="text-xs text-neutral-500 uppercase tracking-widest font-medium">Control de servicios cerrados</p>
                </div>
            </div>

            {/* Formulario */}
            <form onSubmit={handleAdd} className="flex gap-4 mb-10">
                <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="Nueva categoría (ej: Colorimetría)"
                    className="flex-1 bg-neutral-950 border border-neutral-800 text-white px-5 py-3 rounded-xl focus:ring-2 focus:ring-brand-gold outline-none transition-all"
                />
                <button
                    disabled={loading}
                    className="bg-brand-gold text-neutral-950 px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:scale-105 transition-all disabled:opacity-50"
                >
                    <Plus className="size-5" />
                    <span className="hidden sm:inline">AÑADIR</span>
                </button>
            </form>

            {/* Lista */}
            <div className="space-y-3">
                {categories.map((cat) => (
                    <div key={cat._id} className="flex items-center justify-between p-4 bg-neutral-950 border border-neutral-800 rounded-2xl group hover:border-brand-gold/20 transition-all">
                        <span className="text-white font-medium tracking-wide">{cat.name}</span>
                        <button
                            onClick={() => handleDelete(cat._id)}
                            className="p-2 text-neutral-600 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
                        >
                            <Trash2 className="size-5" />
                        </button>
                    </div>
                ))}
            </div>
        </section>
    );
}
