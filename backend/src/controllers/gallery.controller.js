import Gallery from "../models/Gallery.js";



export const getGallery = async (req, res) => {
  try {

    const docs = await Gallery.find().sort({ createdAt: 1 });
    res.status(200).json(docs);
  } catch (error) {
    res.status(500).json({ message: "Error fetch", error: error.message });
  }
};

export const createGalleryImage = async (req, res) => {
  try {
    const newDoc = await Gallery.create(req.body);
    res.status(201).json(newDoc);
  } catch (error) {
    res.status(500).json({ message: "Error create", error: error.message });
  }
};

export const deleteGalleryImage = async (req, res) => {
  try {
    await Gallery.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error delete", error: error.message });
  }
};
