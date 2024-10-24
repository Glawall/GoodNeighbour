import db from "../../connection";
import { User } from "../../db/seeds/data/test/users";

export const getAllUsers = async (): Promise<User[]> => {
  const { rows } = await db.query(
    "SELECT id, username, email, avatar_url, age, first_name, last_name, about, address, postcode, phone_number, additional_contacts, help_radius FROM users;"
  );
  return rows;
};
