import mongoose from "mongoose";

const branchSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
    image: { type: String, required: true },
    mapUrl: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Branch", branchSchema);
