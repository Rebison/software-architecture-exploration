import * as bookService from "../services/bookService.js";

// Display all books
export const listBooks = async (req, res) => {
  const books = await bookService.getAllBooks();
  res.render("books/list", { title: "All Books", books });
};

// Render Add Book form
export const addBookPage = (req, res) => {
  res.render("books/add", { title: "Add Book", book: {}, buttonText: "Add Book", formAction: "/books/add" });
};

// Handle Add Book
export const addBook = async (req, res) => {
  await bookService.addBook(req.body);
  res.redirect("/books");
};

// Render Edit Book form
export const editBookPage = async (req, res) => {
  const book = await bookService.getBookById(req.params.id);
  res.render("books/edit", { title: "Edit Book", book, buttonText: "Update Book", formAction: `/books/edit/${req.params.id}?_method=PUT` });
};

// Handle Edit Book
export const editBook = async (req, res) => {
  await bookService.editBook(req.params.id, req.body);
  res.redirect("/books");
};

// Handle Delete Book
export const deleteBook = async (req, res) => {
  await bookService.removeBook(req.params.id);
  res.redirect("/books");
};
