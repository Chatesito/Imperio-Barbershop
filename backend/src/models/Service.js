import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    category: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Category", 
        required: true 
    },
    name: { type: String, required: true, trim: true },
    price: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

export default mongoose.model("Service", serviceSchema);
