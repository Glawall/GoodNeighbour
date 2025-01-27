import db from "../../connection";
import { User } from "../../db/seeds/data/test/users";

export const updateUser = async (
  id: number,
  updateBody: Partial<User>
): Promise<User> => {
  const {
    avatar_url,
    email,
    about,
    address,
    postcode,
    phone_number,
    additional_contacts,
    help_radius = 0,
  } = updateBody;

  const setClause = [];
  const values = [];

  if (avatar_url) {
    setClause.push(`avatar_url = $${values.push(avatar_url)}`);
  }
  if (email) {
    setClause.push(`email = $${values.push(email)}`);
  }
  if (about) {
    setClause.push(`about = $${values.push(about)}`);
  }
  if (address) {
    setClause.push(`address = $${values.push(address)}`);
  }
  if (postcode) {
    setClause.push(`postcode = $${values.push(postcode)}`);
  }
  if (phone_number) {
    setClause.push(`phone_number = $${values.push(phone_number)}`);
  }
  if (additional_contacts) {
    setClause.push(
      `additional_contacts = $${values.push(additional_contacts)}`
    );
  }
  if (help_radius) {
    setClause.push(`help_radius = $${values.push(help_radius)}`);
  }

  if (setClause.length === 0) {
    const { rows } = await db.query(
      "SELECT id, username, email, avatar_url, age, first_name, last_name, about, address, postcode, phone_number, additional_contacts, help_radius FROM users WHERE id = $1",
      [id]
    );
    return rows[0];
  }

  const query = `
    UPDATE users
    SET ${setClause.join(", ")}
    WHERE id = $${values.length + 1}
    RETURNING id, username, email, avatar_url, age, first_name, last_name, about, address, postcode, phone_number, additional_contacts, help_radius;
  `;

  values.push(id);

  const { rows } = await db.query(query, values);

  return rows[0];
};
