import mongoose from "mongoose";
import dotenv from "dotenv";
import Service from "./src/models/Service.js";
import Category from "./src/models/Category.js";

dotenv.config();

const cleanup = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB for cleanup...");

    // 1. Remove invalid services
    const result = await Service.deleteMany({
      $or: [
        { name: /sdsds/i },
        { name: "" },
        { price: { $exists: false } },
        { price: null }
      ]
    });
    console.log(`Removed ${result.deletedCount} invalid services.`);

    // 2. Ensure all services have a duration
    const updated = await Service.updateMany(
      { duration: { $exists: false } },
      { $set: { duration: 30 } }
    );
    console.log(`Updated ${updated.modifiedCount} services with default duration.`);

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

cleanup();
