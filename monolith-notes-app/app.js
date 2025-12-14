import 'dotenv/config';
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import path from "path";
import { fileURLToPath } from "url";

import noteRoutes from "./routes/noteRoutes.js";
import connectDB from "./config/db.js";
import expressLayouts from "express-ejs-layouts";

const app = express();

// __dirname setup (since ES modules don’t have it by default)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Connect MongoDB
connectDB();

// ✅ Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(morgan("dev"));

app.use(expressLayouts);
app.set("layout", "layout"); // Default layout: views/layout.ejs

// ✅ Static files (for CSS, JS, etc.)
app.use(express.static(path.join(__dirname, "public")));

// ✅ Set EJS as template engine (optional)
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// ✅ Routes
app.use("/notes", noteRoutes);

// ✅ Default route
app.get("/", (req, res) => {
//   res.render("index", { title: "Notes App" });
    res.redirect("/notes");
});

// ✅ Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
