import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    asunto: { type: String, trim: true },
    mensaje: { type: String, required: true, trim: true }
  },
  { timestamps: true }
);

export default mongoose.model("Contact", contactSchema);
