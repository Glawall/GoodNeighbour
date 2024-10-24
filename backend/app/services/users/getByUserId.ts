import { userExists } from "../../utils";

export const getByUserId = async (userId: number) => {
  const user = userExists(userId);
  return user;
};
