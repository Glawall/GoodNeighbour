import * as usersRepo from "../../repositories/users";
import { User } from "../../db/seeds/data/test/users";

export const createUser = async (userBody: User) => {
  const user = await usersRepo.createUser(userBody);
  return user;
};
