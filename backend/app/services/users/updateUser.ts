import * as usersRepo from "../../repositories/users";
import { userExists } from "../../utils";
export const updateUser = async (userId: number, updateBody: any) => {
  await userExists(userId);
  const user = await usersRepo.updateUser(userId, updateBody);
  return user;
};
