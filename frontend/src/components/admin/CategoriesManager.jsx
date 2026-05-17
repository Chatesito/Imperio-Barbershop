import { useState, useEffect } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";
import { Plus, Trash2, Tag, Edit, ChevronLeft, ChevronRight } from "lucide-react";

export default function CategoriesManager() {
    const [categories, setCategories] = useState([]);
    const [newName, setNewName] = useState("");
    const [loading, setLoading] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);
    const [page, setPage] = useState(1);
    const [hasNext, setHasNext] = useState(false);
    const limit = 5;

    const fetchCategories = async () => {
        try {
            const { data } = await api.get("/categories", {
                params: { page, limit: limit + 1 }
            });
            if (data.length === 0 && page > 1) {
                setPage(page - 1);
                return;
            }
            if (data.length > limit) {
                setHasNext(true);
                setCategories(data.slice(0, limit));
            } else {
                setHasNext(false);
                setCategories(data);
            }
        } catch (error) {
            toast.error("Error al cargar categorías");
        }
    };

    useEffect(() => {
        fetchCategories();
    }, [page]);

    const handleAdd = async (e) => {
        e.preventDefault();
        if (!newName.trim()) return;
        setLoading(true);
        try {
            await api.post("/categories", { name: newName });
            setNewName("");
            setPage(1);
            fetchCategories();
            toast.success("Categoría añadida");
        } catch (error) {
            toast.error("Error al añadir categoría");
        } finally {
            setLoading(false);
        }
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        if (!editingCategory.name.trim()) return;
        try {
            await api.put(`/categories/${editingCategory._id}`, { name: editingCategory.name });
            setEditingCategory(null);
            fetchCategories();
            toast.success("Categoría actualizada");
        } catch (error) {
            toast.error("Error al actualizar categoría");
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
        <section className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 md:p-8 shadow-2xl animate-fade-in relative">
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
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setEditingCategory(cat)}
                                className="p-2 text-neutral-600 hover:text-brand-gold hover:bg-brand-gold/10 rounded-lg transition-all"
                            >
                                <Edit className="size-5" />
                            </button>
                            <button
                                onClick={() => handleDelete(cat._id)}
                                className="p-2 text-neutral-600 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
                            >
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
            {editingCategory && (
                <div className="fixed inset-0 z-50 bg-neutral-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
                    <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl relative">
                        <h3 className="text-xl font-bold text-white uppercase tracking-tight mb-2">Editar Categoría</h3>
                        <p className="text-xs text-neutral-500 uppercase tracking-widest font-medium mb-6">Actualiza el nombre de la categoría</p>
                        
                        <form onSubmit={handleEditSubmit} className="space-y-6">
                            <input
                                required
                                type="text"
                                value={editingCategory.name}
                                onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                                className="w-full bg-neutral-950 border border-neutral-800 text-white px-5 py-3 rounded-xl focus:ring-2 focus:ring-brand-gold outline-none transition-all"
                            />
                            <div className="flex gap-4 justify-end">
                                <button
                                    type="button"
                                    onClick={() => setEditingCategory(null)}
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
        </section>
    );
}
