import Loan from "../models/Loan.js";

export const createLoan = (data) => Loan.create(data);
export const findAllLoans = () => Loan.find({}).populate("book member");
export const findLoanById = (id) => Loan.findById(id).populate("book member");
export const updateLoan = (id, data) => Loan.findByIdAndUpdate(id, data, { new: true });
export const deleteLoan = (id) => Loan.findByIdAndDelete(id);

// Find active loans for a member
export const findActiveLoansByMember = (memberId) => Loan.find({ member: memberId, status: "borrowed" });
