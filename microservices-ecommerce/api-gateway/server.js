import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";
import { createProxyMiddleware } from "http-proxy-middleware";
import { verifyToken } from "./middleware/auth.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(compression());
app.use(express.json());

const { USER_SERVICE_URL, PRODUCT_SERVICE_URL, ORDER_SERVICE_URL } = process.env;

// ------------------- PROXY ROUTES -------------------
app.use(
  "/api/users",
  createProxyMiddleware({
    target: USER_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: { "^/api/users": "/api/users" },
  })
);

app.use(
  "/api/products",
  verifyToken,
  createProxyMiddleware({
    target: PRODUCT_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: { "^/api/products": "/api/products" },
  })
);

app.use(
  "/api/orders",
  verifyToken,
  createProxyMiddleware({
    target: ORDER_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: { "^/api/orders": "/api/orders" },
  })
);

// ------------------- HEALTH CHECK -------------------
app.get("/", (req, res) => {
  res.json({ message: "API Gateway is up and running 🚀" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 API Gateway running on port ${PORT}`));
