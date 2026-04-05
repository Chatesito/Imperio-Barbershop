import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    category: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    price: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

export default mongoose.model("Service", serviceSchema);
