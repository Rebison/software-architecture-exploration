import express from "express";
import core from "./core/core.js";
import emailPlugin from "./plugins/emailPlugin.js";
import smsPlugin from "./plugins/smsPlugin.js";
import pushPlugin from "./plugins/pushPlugin.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();
app.use(express.json());

// Register plugins
core.registerPlugin(emailPlugin);
core.registerPlugin(smsPlugin);
core.registerPlugin(pushPlugin);

// Routes
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Microkernel Notification Service running on port ${PORT}`));
