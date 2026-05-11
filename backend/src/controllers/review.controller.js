import Review from "../models/Review.js";
import User from "../models/User.js";



export const getReviews = async (req, res) => {
  try {

    const docs = await Review.find().sort({ createdAt: 1 });
    res.status(200).json(docs);
  } catch (error) {
    res.status(500).json({ message: "Error fetch", error: error.message });
  }
};


export const createReview = async (req, res) => {
  try {
    const payload = req.body;
    if (req.user) {
       const dbUser = await User.findById(req.user.id);
       if(!dbUser) return res.status(404).json({ message: "Usuario no encontrado" });
       payload.name = dbUser.name;
       payload.userId = dbUser._id;
       payload.date = "Reciente";
       payload.img = `https://ui-avatars.com/api/?name=${encodeURIComponent(dbUser.name)}&background=C5A253&color=fff`;
    }
    const newDoc = await Review.create(payload);
    res.status(201).json(newDoc);
  } catch (error) {
    res.status(500).json({ message: "Error create", error: error.message });
  }
};

export const getMyReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Error fetch my reviews", error: error.message });
  }
};

export const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: "Reseña no encontrada" });
    
    // Solo el dueño o un admin puede borrar
    if (req.user.role !== "admin" && review.userId?.toString() !== req.user.id) {
        return res.status(403).json({ message: "No tienes permiso para eliminar esta reseña" });
    }

    await Review.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Reseña eliminada con éxito" });
  } catch (error) {
    res.status(500).json({ message: "Error delete", error: error.message });
  }
};
