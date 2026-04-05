import Service from "../models/Service.js";

const seedServices = [
    { category: "Corte de Cabello", name: "Corte clásico", price: "$25.000" },
    { category: "Corte de Cabello", name: "Fade / Degradado", price: "$30.000" },
    { category: "Corte de Cabello", name: "Corte con diseño", price: "$35.000" },
    { category: "Cuidado de Barba", name: "Afeitado clásico", price: "$20.000" },
    { category: "Cuidado de Barba", name: "Perfilado con navaja", price: "$25.000" },
    { category: "Cuidado de Barba", name: "Tratamiento hidratante", price: "$28.000" },
    { category: "Mascarillas Faciales", name: "Mascarilla revitalizante", price: "$18.000" },
    { category: "Mascarillas Faciales", name: "Limpieza facial profunda", price: "$25.000" },
    { category: "Tintes para el Cabello", name: "Tinte completo", price: "$40.000" },
    { category: "Tintes para el Cabello", name: "Reflejos o mechas", price: "$50.000" },
    { category: "Paquetes Especiales", name: "Corte + Barba", price: "$45.000" },
    { category: "Paquetes Especiales", name: "Corte + Cejas + Barba", price: "$55.000" },
];

export const getServices = async (req, res) => {
  try {
    const count = await Service.countDocuments();
    if (count === 0) {
      await Service.insertMany(seedServices);
    }
    const services = await Service.find().sort({ category: 1, name: 1 });
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: "Error fetch services", error: error.message });
  }
};

export const createService = async (req, res) => {
  try {
    const newDoc = await Service.create(req.body);
    res.status(201).json(newDoc);
  } catch (error) {
    res.status(500).json({ message: "Error create", error: error.message });
  }
};

export const deleteService = async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error delete", error: error.message });
  }
};
