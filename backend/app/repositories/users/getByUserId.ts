import db from "../../connection";
import { User } from "../../db/seeds/data/test/users";

export const getByUserId = async (id: number): Promise<User> => {
  const { rows } = await db.query(
    "SELECT id, username, email, avatar_url, age, first_name, last_name, about, address, postcode, phone_number, additional_contacts, help_radius, longitude, latitude FROM users WHERE id = $1",
    [id]
  );
  return rows[0];
};
