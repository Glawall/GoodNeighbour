import db from "../../connection";
import { User } from "../../db/seeds/data/test/users";
import { postcodeConverter } from "../../utils/postcodeConverter";
import { AppError } from "../../errors/AppError";
import { errors } from "../../errors/errors";

export const createUser = async (userBody: User): Promise<User> => {
  const { first_name, last_name, address, postcode } = userBody;

  const coordinates = await postcodeConverter(postcode.toString());
  let latitude: number | undefined;
  let longitude: number | undefined;

  if (coordinates) {
    latitude = coordinates.latitude;
    longitude = coordinates.longitude;
  }

  userBody.longitude = longitude;
  userBody.latitude = latitude;

  const {
    username,
    email,
    avatar_url,
    age,
    about,
    phone_number,
    additional_contacts,
    help_radius,
  } = userBody;

  if (
    !first_name ||
    !last_name ||
    !address ||
    !postcode ||
    !longitude ||
    !latitude ||
    !help_radius
  ) {
    throw new AppError(errors.MANDATORY_FIELD_ERROR);
  }

  const values = [
    username,
    email,
    avatar_url,
    age,
    first_name,
    last_name,
    about,
    address,
    postcode,
    phone_number,
    additional_contacts,
    help_radius,
    longitude,
    latitude,
  ];

  const query = `
    INSERT INTO users 
    (username, email, avatar_url, age, first_name, last_name, about, address, postcode, phone_number, additional_contacts, help_radius, longitude, latitude)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
    RETURNING id, username, email, avatar_url, age, first_name, last_name, about, address, postcode, phone_number, additional_contacts, help_radius, longitude, latitude;
  `;

  const { rows } = await db.query(query, values);
  return rows[0];
};
