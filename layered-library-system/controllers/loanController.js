import * as loanService from "../services/loanService.js";
import * as bookService from "../services/bookService.js";
import * as memberService from "../services/memberService.js";

// List all loans
export const listLoans = async (req, res) => {
  const loans = await loanService.getAllLoans();
  res.render("loans/list", { title: "All Loans", loans });
};

// Render borrow book form
export const borrowPage = async (req, res) => {
  const books = await bookService.getAllBooks();
  const members = await memberService.getAllMembers();
  res.render("loans/borrow", { title: "Borrow Book", books, members });
};

// Handle borrow book
export const borrowBook = async (req, res) => {
  try {
    await loanService.borrowBook({ bookId: req.body.book, memberId: req.body.member });
    res.redirect("/loans");
  } catch (err) {
    req.flash("error", err.message);
    res.redirect("/loans/borrow");
  }
};

// Handle return book
export const returnBook = async (req, res) => {
  try {
    await loanService.returnBook(req.params.id);
    res.redirect("/loans");
  } catch (err) {
    req.flash("error", err.message);
    res.redirect("/loans");
  }
};
