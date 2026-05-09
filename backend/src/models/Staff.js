import mongoose from "mongoose";

const staffSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
    bio: { type: String, default: "" },
    imageUrl: { type: String, default: "/images/staff/barber_default.png" },
    branches: [{ type: mongoose.Schema.Types.ObjectId, ref: "Branch" }], 
    services: [{ type: mongoose.Schema.Types.ObjectId, ref: "Service" }],
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Staff", staffSchema);
