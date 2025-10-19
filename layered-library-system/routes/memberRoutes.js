import express from "express";
import {
  listMembers,
  addMemberPage,
  addMember,
  editMemberPage,
  editMember,
  deleteMember,
} from "../controllers/memberController.js";

import { isAuthenticated, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(isAuthenticated); // All routes require login

router.get("/", isAdmin, listMembers);
router.get("/add", isAdmin, addMemberPage);
router.post("/add", isAdmin, addMember);
router.get("/edit/:id", isAdmin, editMemberPage);
router.put("/edit/:id", isAdmin, editMember);
router.delete("/delete/:id", isAdmin, deleteMember);

export default router;
