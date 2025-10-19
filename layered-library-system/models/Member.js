import mongoose from "mongoose";

const memberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  membershipDate: { type: Date, default: Date.now },
}, { timestamps: true });

export default mongoose.model("Member", memberSchema);
