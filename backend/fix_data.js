import mongoose from "mongoose";
import dotenv from "dotenv";
import Service from "./src/models/Service.js";
import Staff from "./src/models/Staff.js";
import Category from "./src/models/Category.js";
import Branch from "./src/models/Branch.js";

dotenv.config();

const fixData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB for data cleanup...");

    // 1. Fix Services (ensure category is a valid ObjectId)
    const services = await Service.find();
    for (const s of services) {
      if (typeof s.category === "string" || !mongoose.Types.ObjectId.isValid(s.category)) {
        console.log(`Fixing service: ${s.name} - Invalid category reference found.`);
        // Try to find a valid category or assign the first one found
        const firstCat = await Category.findOne();
        if (firstCat) {
          s.category = firstCat._id;
          await s.save();
          console.log(`-> Assigned category: ${firstCat.name}`);
        } else {
            console.log(`-> No categories found to assign to ${s.name}`);
        }
      }
    }

    // 2. Fix Staff (ensure branches and services are arrays of valid ObjectIds)
    const staff = await Staff.find();
    for (const member of staff) {
      let changed = false;
      
      if (member.branches && Array.isArray(member.branches)) {
        const validBranches = [];
        for (const b of member.branches) {
          if (mongoose.Types.ObjectId.isValid(b)) {
            const exists = await Branch.exists({ _id: b });
            if (exists) validBranches.push(b);
            else changed = true;
          } else {
            changed = true;
          }
        }
        if (changed) {
          member.branches = validBranches;
        }
      }

      let serviceChanged = false;
      if (member.services && Array.isArray(member.services)) {
        const validServices = [];
        for (const s of member.services) {
          if (mongoose.Types.ObjectId.isValid(s)) {
            const exists = await Service.exists({ _id: s });
            if (exists) validServices.push(s);
            else serviceChanged = true;
          } else {
            serviceChanged = true;
          }
        }
        if (serviceChanged) {
          member.services = validServices;
        }
      }

      if (changed || serviceChanged) {
        await member.save();
        console.log(`Fixed staff member: ${member.name} - Cleaned up invalid references.`);
      }
    }

    console.log("Data cleanup complete.");
    process.exit(0);
  } catch (error) {
    console.error("Cleanup failed:", error);
    process.exit(1);
  }
};

fixData();
