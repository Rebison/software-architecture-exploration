import express from "express";
import { listLoans, borrowPage, borrowBook, returnBook } from "../controllers/loanController.js";
import { isAuthenticated, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(isAuthenticated);

router.get("/", listLoans);
router.get("/borrow", isAdmin, borrowPage);
router.post("/borrow", isAdmin, borrowBook);
router.post("/return/:id", isAdmin, returnBook);

export default router;
