import * as usersRepo from "../../repositories/users";

export const getAllUsers = async () => {
  const allUsers = await usersRepo.getAllUsers();
  return allUsers;
};
