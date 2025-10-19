import * as bookRepo from "../repositories/bookRepository.js";

export const addBook = async (data) => {
  return bookRepo.createBook(data);
};

export const getAllBooks = async () => {
  return bookRepo.findAllBooks();
};

export const getBookById = async (id) => {
  return bookRepo.findBookById(id);
};

export const editBook = async (id, data) => {
  return bookRepo.updateBook(id, data);
};

export const removeBook = async (id) => {
  return bookRepo.deleteBook(id);
};
