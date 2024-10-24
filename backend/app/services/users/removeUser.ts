import * as usersRepo from "../../repositories/users";
import { userExists } from "../../utils";
export const removeUser = async (userId: number) => {
  await userExists(userId);

  const { rows } = await usersRepo.removeUser(userId);
  return rows;
};
