import mongoose from "mongoose";

const loanSchema = new mongoose.Schema({
  book: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
  member: { type: mongoose.Schema.Types.ObjectId, ref: "Member", required: true },
  borrowedAt: { type: Date, default: Date.now },
  dueDate: { type: Date, required: true },
  returnedAt: { type: Date, default: null },
  status: { type: String, enum: ["borrowed", "returned"], default: "borrowed" }
}, { timestamps: true });

export default mongoose.model("Loan", loanSchema);
