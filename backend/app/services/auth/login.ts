import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import * as authRepo from "../../repositories/auth";
import { LoginRequest } from "../../db/seeds/data/development/login";
import { AppError } from "../../errors/AppError";
import { errors } from "../../errors/errors";

export const login = async ({ email, password }: LoginRequest) => {
  if (!email || !password) {
    throw new AppError(errors.MANDATORY_FIELD_ERROR);
  }

  const user = await authRepo.findUserByEmail(email);

  if (!user) {
    throw new AppError(errors.AUTHORISATION_ERROR);
  }

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    throw new AppError(errors.AUTHORISATION_ERROR);
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET || "test-secret-key",
    { expiresIn: "24h" }
  );

  const { password: _, ...userWithoutPassword } = user;

  return {
    token,
    user: userWithoutPassword,
  };
};
