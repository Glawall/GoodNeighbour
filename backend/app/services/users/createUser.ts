import * as bcrypt from "bcrypt";
import * as usersRepo from "../../repositories/users";
import { AppError } from "../../errors/AppError";
import { errors } from "../../errors/errors";
import { User } from "../../db/seeds/data/test/users";

export const createUser = async (userBody: User) => {
  const mandatoryFields = [
    "username",
    "email",
    "password",
    "first_name",
    "last_name",
    "address",
    "postcode",
    "help_radius",
  ];

  for (const field of mandatoryFields) {
    if (!userBody[field as keyof User]) {
      throw new AppError(errors.MANDATORY_FIELD_ERROR);
    }
  }

  const hashedPassword = await bcrypt.hash(userBody.password!, 10);

  const newUser = await usersRepo.createUser({
    ...userBody,
    password: hashedPassword,
  });

  if (!newUser) {
    throw new AppError(errors.REPOSITORY_ERROR);
  }
  const { password: _, ...userWithoutPassword } = newUser;
  return userWithoutPassword;
};
