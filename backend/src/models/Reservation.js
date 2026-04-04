import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    nombre: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    domicilio: { type: String, required: true, enum: ["Sí", "No"] },
    direccion: { type: String, trim: true },
    sede: { type: String, trim: true },
    fecha: { type: String, required: true },
    hora: { type: String, required: true },
    servicio: { type: String, required: true },
    mensaje: { type: String, trim: true },
    status: { type: String, enum: ["pending", "confirmed", "cancelled"], default: "pending" }
  },
  { timestamps: true }
);

export default mongoose.model("Reservation", reservationSchema);
