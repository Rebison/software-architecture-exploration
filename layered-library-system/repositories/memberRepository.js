import Member from "../models/Member.js";

export const createMember = (data) => Member.create(data);
export const findAllMembers = () => Member.find({});
export const findMemberById = (id) => Member.findById(id);
export const updateMember = (id, data) => Member.findByIdAndUpdate(id, data, { new: true });
export const deleteMember = (id) => Member.findByIdAndDelete(id);
export const findMemberByEmail = (email) => Member.findOne({ email });
