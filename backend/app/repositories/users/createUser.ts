import db from "../../connection";
import { User } from "../../db/seeds/data/test/users";
import { postcodeConverter } from "../../utils/postcodeConverter";

export const createUser = async (userBody: User): Promise<User> => {
  const { first_name, last_name, address, postcode, help_radius } = userBody;

  const coordinates = await postcodeConverter(postcode.toString());
  let latitude: number | undefined;
  let longitude: number | undefined;

  if (coordinates) {
    latitude = coordinates.latitude;
    longitude = coordinates.longitude;
  }

  userBody.longitude = longitude;
  userBody.latitude = latitude;

  const query = `
    INSERT INTO users 
    (username, email, password, avatar_url, age, first_name, last_name, about, address, postcode, phone_number, additional_contacts, help_radius, longitude, latitude)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
    RETURNING *
  `;

  const values = [
    userBody.username,
    userBody.email,
    userBody.password,
    userBody.avatar_url || null,
    userBody.age || null,
    first_name,
    last_name,
    userBody.about || null,
    address,
    postcode,
    userBody.phone_number || null,
    userBody.additional_contacts || null,
    help_radius,
    longitude,
    latitude,
  ];

  const { rows } = await db.query<User>(query, values);
  return rows[0];
};
