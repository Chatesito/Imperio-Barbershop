import Contact from "../models/Contact.js";

export const submitContact = async (req, res) => {
  try {
    const newContactMessage = await Contact.create(req.body);
    res.status(201).json({ message: "Mensaje de contacto enviado con éxito", contact: newContactMessage });
  } catch (error) {
    res.status(500).json({ message: "Error enviando el formulario de contacto", error: error.message });
  }
};

export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: "Error obteniendo mensajes", error: error.message });
  }
};
