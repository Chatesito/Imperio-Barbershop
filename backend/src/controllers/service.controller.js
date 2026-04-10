import Service from "../models/Service.js";

export const getServices = async (req, res) => {
  try {
    const services = await Service.find()
      .populate("category")
      .sort({ name: 1 });
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: "Error obteniendo servicios", error: error.message });
  }
};

export const createService = async (req, res) => {
  try {
    const newDoc = await (await Service.create(req.body)).populate("category");
    res.status(201).json(newDoc);
  } catch (error) {
    res.status(500).json({ message: "Error creando servicio", error: error.message });
  }
};

export const deleteService = async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) return res.status(404).json({ message: "Servicio no encontrado" });
    res.status(200).json({ message: "Servicio eliminado con éxito" });
  } catch (error) {
    res.status(500).json({ message: "Error eliminando servicio", error: error.message });
  }
};
