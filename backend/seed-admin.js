import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./src/models/User.js";
import bcrypt from "bcryptjs";

dotenv.config();

const seedAdmin = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      console.error("❌ MONGODB_URI not defined in .env");
      process.exit(1);
    }

    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB for admin seeding...");

    // Check if admin already exists
    const adminExists = await User.findOne({ role: "admin" });

    if (adminExists) {
      console.log("⚠️ An admin already exists. No changes made.");
      console.log(`Admin email: ${adminExists.email}`);
    } else {
      const email = process.env.ADMIN_EMAIL || "admin@imperio.com";
      const password = process.env.ADMIN_PASSWORD || "Admin123!";
      const name = "Administrador Imperio";

      const hashedPassword = await bcrypt.hash(password, 10);

      await User.create({
        email,
        password: hashedPassword,
        name,
        role: "admin"
      });

      console.log("✅ Admin user created successfully!");
      console.log(`Email: ${email}`);
      console.log(`Password: ${password} (Please change it after first login)`);
    }

    console.log("🚀 Project is now clean and ready for launch with a single admin.");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error seeding admin:", err);
    process.exit(1);
  }
};

seedAdmin();
