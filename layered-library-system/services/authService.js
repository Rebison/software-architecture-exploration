import * as userRepo from "../repositories/userRepository.js";

export const registerUser = async ({ name, email, password, role }) => {
  const existingUser = await userRepo.findUserByEmail(email);
  if (existingUser) throw new Error("Email already registered");
  return userRepo.createUser({ name, email, password, role });
};

export const loginUser = async (email, password) => {
  const user = await userRepo.findUserByEmail(email);
  if (!user) throw new Error("Invalid email or password");

  const isMatch = await user.comparePassword(password);
  if (!isMatch) throw new Error("Invalid email or password");

  return user;
};
