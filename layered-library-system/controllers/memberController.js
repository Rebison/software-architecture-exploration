import * as memberService from "../services/memberService.js";

// List all members
export const listMembers = async (req, res) => {
  const members = await memberService.getAllMembers();
  res.render("members/list", { title: "All Members", members });
};

// Render Add Member form
export const addMemberPage = (req, res) => {
  res.render("members/add", { title: "Add Member", member: {}, buttonText: "Add Member", formAction: "/members/add" });
};

// Handle Add Member
export const addMember = async (req, res) => {
  try {
    await memberService.addMember(req.body);
    res.redirect("/members");
  } catch (err) {
    req.flash("error", err.message);
    res.redirect("/members/add");
  }
};

// Render Edit Member form
export const editMemberPage = async (req, res) => {
  const member = await memberService.getMemberById(req.params.id);
  res.render("members/edit", { title: "Edit Member", member, buttonText: "Update Member", formAction: `/members/edit/${req.params.id}?_method=PUT` });
};

// Handle Edit Member
export const editMember = async (req, res) => {
  await memberService.editMember(req.params.id, req.body);
  res.redirect("/members");
};

// Handle Delete Member
export const deleteMember = async (req, res) => {
  await memberService.removeMember(req.params.id);
  res.redirect("/members");
};
