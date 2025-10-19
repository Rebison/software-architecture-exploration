import express from "express";
import {
  listBooks,
  addBookPage,
  addBook,
  editBookPage,
  editBook,
  deleteBook,
} from "../controllers/bookController.js";

import { isAuthenticated, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(isAuthenticated); // All routes require login

router.get("/", listBooks);
router.get("/add", isAdmin, addBookPage);
router.post("/add", isAdmin, addBook);
router.get("/edit/:id", isAdmin, editBookPage);
router.put("/edit/:id", isAdmin, editBook);
router.delete("/delete/:id", isAdmin, deleteBook);

export default router;
