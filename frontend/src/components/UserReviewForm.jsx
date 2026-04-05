import React, { useState } from "react";
import toast from "react-hot-toast";
import { Star, Send } from "lucide-react";
import api from "../services/api";

export default function UserReviewForm() {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return toast.error("El comentario no puede estar vacío");
    setLoading(true);
    try {
      await api.post("/reviews", { rating, comment });
      toast.success("¡Gracias por tu reseña! Ha sido publicada.");
      setComment("");
      setRating(5);
    } catch (error) {
      toast.error("Hubo un error al enviar tu reseña");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-neutral-800 p-6 rounded-md border border-neutral-700 mt-4">
      <p className="text-sm text-neutral-400 mb-4">Tu opinión es muy importante para nosotros y para la comunidad. ¿Cómo fue tu experiencia?</p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="text-xs text-neutral-400 mb-2 block">Puntuación de Servicio</label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map(num => (
              <Star 
                key={num} 
                onClick={() => setRating(num)}
                className={`size-8 cursor-pointer transition-colors ${rating >= num ? "fill-brand-gold text-brand-gold" : "text-neutral-600"}`} 
              />
            ))}
          </div>
        </div>
        <div>
          <label className="text-xs text-neutral-400 mb-1 block">Comentario</label>
          <textarea
            required
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full bg-neutral-900 text-white rounded px-3 py-2 outline-none focus:ring-1 focus:ring-brand-gold h-24 resize-none"
            placeholder="Escribe aquí qué fue lo que más te gustó..."
          />
        </div>
        <button 
          disabled={loading}
          type="submit" 
          className="bg-brand-gold text-black font-bold py-3 mt-2 rounded flex items-center justify-center gap-2 hover:bg-yellow-500 transition-colors disabled:opacity-50"
        >
          <Send className="size-4" /> {loading ? "Enviando..." : "Publicar Experiencia"}
        </button>
      </form>
    </div>
  );
}
