import * as loanRepo from "../repositories/loanRepository.js";
import * as bookRepo from "../repositories/bookRepository.js";

// Max books a member can borrow
const MAX_BORROW = 3;

export const borrowBook = async ({ bookId, memberId }) => {
  // Check active loans
  const activeLoans = await loanRepo.findActiveLoansByMember(memberId);
  if (activeLoans.length >= MAX_BORROW) throw new Error("Member has reached maximum borrowed books");

  // Check if book is available
  const book = await bookRepo.findBookById(bookId);
  if (!book || book.copiesAvailable <= 0) throw new Error("Book not available");

  // Create loan
  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + 14); // 2 weeks
  const loan = await loanRepo.createLoan({ book: bookId, member: memberId, dueDate });

  // Decrease available copies
  await bookRepo.updateBook(bookId, { copiesAvailable: book.copiesAvailable - 1 });

  return loan;
};

export const returnBook = async (loanId) => {
  const loan = await loanRepo.findLoanById(loanId);
  if (!loan || loan.status === "returned") throw new Error("Invalid loan");

  // Update loan
  loan.status = "returned";
  loan.returnedAt = new Date();
  await loan.save();

  // Increase available copies
  const book = await bookRepo.findBookById(loan.book._id);
  await bookRepo.updateBook(book._id, { copiesAvailable: book.copiesAvailable + 1 });

  return loan;
};

export const getAllLoans = async () => loanRepo.findAllLoans();
export const getLoanById = async (id) => loanRepo.findLoanById(id);
