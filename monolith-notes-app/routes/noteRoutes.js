import express from "express";
import {
  // EJS Controllers
  getAllNotesPage,
  addNotePage,
  createNoteEJS,
  editNotePage,
  updateNoteEJS,
  deleteNoteEJS,
  // API Controllers
  getAllNotesAPI,
  getNoteByIdAPI,
  createNoteAPI,
  updateNoteAPI,
  deleteNoteAPI
} from "../controllers/noteController.js";

const router = express.Router();

///////////////////////////
// EJS Routes
///////////////////////////
router.get("/", getAllNotesPage);
router.get("/add", addNotePage);
router.post("/add", createNoteEJS);
router.get("/edit/:id", editNotePage);
router.post("/edit/:id", updateNoteEJS);
router.post("/delete/:id", deleteNoteEJS);

///////////////////////////
// JSON API Routes
///////////////////////////
router.get("/api", getAllNotesAPI);
router.get("/api/:id", getNoteByIdAPI);
router.post("/api", createNoteAPI);
router.put("/api/:id", updateNoteAPI);
router.delete("/api/:id", deleteNoteAPI);

export default router;
