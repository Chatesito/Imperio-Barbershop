import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./src/models/User.js";
import bcrypt from "bcryptjs";

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const hashedPassword = await bcrypt.hash("123456", 10);
    const user = await User.findOneAndUpdate(
      { email: "admin@admin.com" },
      { 
        name: "Admin Test", 
        password: hashedPassword, 
        role: "admin" 
      },
      { upsert: true, new: true }
    );
    console.log("Admin user created/updated:", user.email);
    process.exit(0);
  } catch (error) {
    console.error("Error creating admin:", error);
    process.exit(1);
  }
};

createAdmin();
