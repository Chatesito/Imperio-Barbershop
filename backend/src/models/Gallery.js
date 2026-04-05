import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    type: { type: String, enum: ['team', 'work', 'interior'], default: 'work' } // future proofing
  },
  { timestamps: true }
);

export default mongoose.model("Gallery", gallerySchema);
