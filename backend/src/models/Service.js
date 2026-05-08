import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    category: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Category", 
        required: true 
    },
    name: { 
      type: String, 
      required: true, 
      trim: true,
      minlength: [3, "El nombre del servicio debe ser válido"],
      validate: {
        validator: function(v) {
          return !/^(.)\1+$/.test(v); // Evita nombres como 'sdsdsds'
        },
        message: "El nombre del servicio no es válido"
      }
    },
    price: { type: Number, required: true, min: [0, "El precio no puede ser negativo"] },
    duration: { type: Number, default: 30 },
  },
  { timestamps: true }
);

export default mongoose.model("Service", serviceSchema);
