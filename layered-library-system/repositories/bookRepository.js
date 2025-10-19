import Book from "../models/Book.js";

export const createBook = (data) => Book.create(data);
export const findAllBooks = () => Book.find({});
export const findBookById = (id) => Book.findById(id);
export const updateBook = (id, data) => Book.findByIdAndUpdate(id, data, { new: true });
export const deleteBook = (id) => Book.findByIdAndDelete(id);
