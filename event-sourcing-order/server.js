import express from "express";
import mongoose from "mongoose";
import orderRoutes from "./routes/orderRoutes.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/api/orders", orderRoutes);

const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => console.log(`🚀 Event Sourcing Order Service running on port ${PORT}`));
  })
  .catch((err) => console.error(err));

app.listen(PORT, () => {
    console.log(`Event Sourcing Order running on port: ${PORT}`);
})
