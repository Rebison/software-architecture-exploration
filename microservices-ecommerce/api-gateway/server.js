import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";
import { createProxyMiddleware } from "http-proxy-middleware";
import { verifyToken } from "./middleware/auth.js";

// process.env.NODE_OPTIONS = "--dns-result-order=ipv4first";
dotenv.config();

const app = express();
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(compression());

const {
    USER_SERVICE_URL,
    PRODUCT_SERVICE_URL,
    ORDER_SERVICE_URL,
} = process.env;

app.use((req, res, next) => {
    console.log(`➡️ ${req.method} ${req.originalUrl}`);
    next();
});

const proxyOptions = {
    changeOrigin: true,
    //   timeout: 5000,
      proxyTimeout: 5000,
    onError: (err, req, res) => {
        console.error(`❌ Proxy error for ${req.originalUrl}:`, err.message);
        res.status(502).json({ message: "Service temporarily unavailable" });
    },
};

// Public routes (no auth)
app.use(
    "/api/users",
    createProxyMiddleware({
        target: USER_SERVICE_URL,
        ...proxyOptions
    })
);

// Protected routes
app.use(
    "/api/products",
    verifyToken,
    createProxyMiddleware({
        target: PRODUCT_SERVICE_URL,
        ...proxyOptions,
    })
);

app.use(
    "/api/orders",
    verifyToken,
    createProxyMiddleware({
        target: ORDER_SERVICE_URL,
        ...proxyOptions,
    })
);

app.get("/", (req, res) => res.json({ status: "API Gateway running 🚀" }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () =>
    console.log(`🚀 API Gateway running on http://127.0.0.1:${PORT}`)
);
