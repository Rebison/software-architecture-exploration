import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import { connectRabbitMQ, getChannel } from "./utils/rabbitmq.js";
import { consumeOrderEvents } from "./events/orderConsumer.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());

connectDB();

await connectRabbitMQ();
await consumeOrderEvents();

app.use("/", productRoutes);

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`🛍 Product Service running on port ${PORT}`));
