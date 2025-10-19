import Note from "../models/Note.js";

///////////////////////////
// JSON API CRUD
///////////////////////////

export const getAllNotesAPI = async (req, res) => {
    try {
        const notes = await Note.find().sort({ createdAt: -1 });
        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getNoteByIdAPI = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) return res.status(404).json({ message: "Note not found" });
        res.status(200).json(note);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createNoteAPI = async (req, res) => {
    try {
        const { title, description } = req.body;
        const newNote = await Note.create({ title, description });
        res.status(201).json(newNote);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateNoteAPI = async (req, res) => {
    try {
        const note = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!note) return res.status(404).json({ message: "Note not found" });
        res.status(200).json(note);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteNoteAPI = async (req, res) => {
    try {
        const note = await Note.findByIdAndDelete(req.params.id);
        if (!note) return res.status(404).json({ message: "Note not found" });
        res.status(200).json({ message: "Note deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

///////////////////////////
// EJS Pages & Forms
///////////////////////////

export const getAllNotesPage = async (req, res) => {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.render("index", { title: "Notes APP", notes });
};

export const addNotePage = (req, res) => {
    res.render("addNote", { title: "Add New Note", formAction: "/notes/add", buttonText: "Add Note", note: {} });
};

export const createNoteEJS = async (req, res) => {
    const { title, description } = req.body;
    await Note.create({ title, description });
    res.redirect("/notes");
};

export const editNotePage = async (req, res) => {
    const note = await Note.findById(req.params.id);
    res.render("editNote", { title: "Edit Note", formAction: `/notes/edit/${note._id}`, buttonText: "Update Note", note });
};

export const updateNoteEJS = async (req, res) => {
    await Note.findByIdAndUpdate(req.params.id, req.body, { runValidators: true });
    res.redirect("/notes");
};

export const deleteNoteEJS = async (req, res) => {
    await Note.findByIdAndDelete(req.params.id);
    res.redirect("/notes");
};
