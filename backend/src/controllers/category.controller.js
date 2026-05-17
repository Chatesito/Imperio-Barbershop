import Category from "../models/Category.js";

export const getCategories = async (req, res) => {
  try {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    let categories;
    if (page && limit) {
      const skip = (page - 1) * limit;
      categories = await Category.find().sort({ name: 1 }).skip(skip).limit(limit);
    } else {
      categories = await Category.find().sort({ name: 1 });
    }
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Error obteniendo categorías", error: error.message });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { name },
      { new: true, runValidators: true }
    );
    if (!category) return res.status(404).json({ message: "Categoría no encontrada" });
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: "Error actualizando categoría", error: error.message });
  }
};

export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const category = await Category.create({ name });
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: "Error creando categoría", error: error.message });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Categoría eliminada" });
  } catch (error) {
    res.status(500).json({ message: "Error eliminando categoría", error: error.message });
  }
};
