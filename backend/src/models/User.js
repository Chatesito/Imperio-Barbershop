import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: { 
      type: String, 
      required: true, 
      unique: true, 
      trim: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Por favor ingresa un correo válido']
    },
    password: { type: String, required: true },
    name: { 
      type: String, 
      required: true, 
      trim: true,
      minlength: [3, "El nombre debe tener al menos 3 caracteres"],
      validate: {
        validator: function(v) {
          return /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(v);
        },
        message: "El nombre no puede contener números ni símbolos"
      }
    },
    role: { type: String, enum: ["user", "barber", "admin"], default: "user" },
    refreshToken: { type: String }
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
