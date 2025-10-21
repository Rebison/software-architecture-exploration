import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("🛍 Product DB connected");
  } catch (err) {
    console.error("Product DB connection error:", err.message);
    process.exit(1);
  }
};
