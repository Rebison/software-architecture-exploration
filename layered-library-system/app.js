import express from "express";
import mongoose from "mongoose";
import session from "express-session";
import MongoStore from "connect-mongo";
import flash from "express-flash";
import methodOverride from "method-override";
import morgan from "morgan";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import expressLayouts from "express-ejs-layouts";

// Load environment variables
dotenv.config();

// For __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import routes
import authRoutes from "./routes/authRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
import memberRoutes from "./routes/memberRoutes.js";
import loanRoutes from "./routes/loanRoutes.js";

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB connection error:", err));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));

// EJS setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(expressLayouts);
app.set("layout", "layout"); // default layout is views/layout.ejs
// Session setup (store in MongoDB)
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    cookie: { maxAge: 1000 * 60 * 60 * 24 } // 1 day
}));

// Flash messages
app.use(flash());

// Make session user available in all views
app.use((req, res, next) => {
    res.locals.currentUser = req.session.user || null;
    next();
});

// Routes
app.use("/", authRoutes);        // /login, /register, /logout
app.use("/books", bookRoutes);   // book CRUD routes (protected)
app.use("/members", memberRoutes); // member CRUD routes (protected)
app.use("/loans", loanRoutes);     // loan routes (protected)

// Home route redirects to books
app.get("/", (req, res) => {
    res.redirect("/books");
});

// 404 page
app.use((req, res) => {
    res.status(404).render("404", { title: "Page Not Found" });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
