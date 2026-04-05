import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    date: { type: String, required: true },
    img: { type: String, required: true },
    comment: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Review", reviewSchema);
