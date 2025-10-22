import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";
import { connectDB } from "./config/db.js";
import orderRoutes from "./routes/orderRoutes.js";
import { connectRabbitMQ, getChannel } from "./utils/rabbitmq.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());

connectDB();


await connectRabbitMQ();
const channel = getChannel();
await channel.assertExchange("order_exchange", "fanout", { durable: false });

app.use("/", orderRoutes);

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => console.log(`📦 Order Service running on port ${PORT}`));
