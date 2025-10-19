import * as memberRepo from "../repositories/memberRepository.js";

export const addMember = async (data) => {
  const existing = await memberRepo.findMemberByEmail(data.email);
  if (existing) throw new Error("Email already exists");
  return memberRepo.createMember(data);
};

export const getAllMembers = async () => memberRepo.findAllMembers();
export const getMemberById = async (id) => memberRepo.findMemberById(id);
export const editMember = async (id, data) => memberRepo.updateMember(id, data);
export const removeMember = async (id) => memberRepo.deleteMember(id);
