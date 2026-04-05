import Review from "../models/Review.js";

const seedReviews = [
    {
        name: "Daniel Herrera",
        rating: 5,
        date: "Hace 3 semanas",
        img: "/images/reviews/review1.png",
        comment: "Excelente servicio, barberos muy profesionales. El ambiente es agradable y salí con el mejor corte que me he hecho.",
    },
    {
        name: "Camilo Vargas",
        rating: 4,
        date: "Hace 1 mes",
        img: "/images/reviews/review2.png",
        comment: "Muy buena atención y cortes de calidad. Un poco lleno a veces, pero vale la pena totalmente.",
    },
    {
        name: "Andrés Rojas",
        rating: 5,
        date: "Hace 2 semanas",
        img: "/images/reviews/review3.png",
        comment: "Barbería impecable, herramientas limpias y un ambiente muy cómodo. Lo recomiendo al cien por ciento.",
    },
    {
        name: "Carlos Muñoz",
        rating: 5,
        date: "Hace 5 días",
        img: "/images/reviews/review4.png",
        comment: "La mejor barbería de Neiva. Grande el equipo, siempre me dejan mejor de lo que imagino.",
    },
    {
        name: "Sebastián Liz",
        rating: 4,
        date: "Hace 2 meses",
        img: "/images/reviews/review5.png",
        comment: "Servicio rápido y de calidad. Los barberos saben lo que hacen y escuchan lo que uno quiere.",
    },
    {
        name: "Felipe Trujillo",
        rating: 5,
        date: "Hace 1 semana",
        img: "/images/reviews/review6.png",
        comment: "Excelente atención, ambiente muy agradable. El corte quedó perfecto. Volveré sin duda.",
    }
];

export const getReviews = async (req, res) => {
  try {
    const count = await Review.countDocuments();
    if (count === 0) {
      await Review.insertMany(seedReviews);
    }
    const docs = await Review.find().sort({ createdAt: 1 });
    res.status(200).json(docs);
  } catch (error) {
    res.status(500).json({ message: "Error fetch", error: error.message });
  }
};

export const createReview = async (req, res) => {
  try {
    const payload = req.body;
    if (req.user && req.user.role === 'user') {
       payload.name = req.user.name;
       payload.date = "Reciente";
       payload.img = `https://ui-avatars.com/api/?name=${encodeURIComponent(req.user.name)}&background=C5A253&color=fff`;
    }
    const newDoc = await Review.create(payload);
    res.status(201).json(newDoc);
  } catch (error) {
    res.status(500).json({ message: "Error create", error: error.message });
  }
};

export const deleteReview = async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error delete", error: error.message });
  }
};
