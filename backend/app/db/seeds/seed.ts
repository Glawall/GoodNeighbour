import format from "pg-format";
import { readFileSync } from "fs";
import path from "path";
import dotenv from "dotenv";
import db from "../../connection";
import { Data } from "./data/test";
import * as bcrypt from "bcrypt";

dotenv.config();

const schemaFiles = [
  "types.sql",
  "users.sql",
  "help_types.sql",
  "help_requests.sql",
  "help_offers.sql",
  "comments.sql",
];

const createTables = async () => {
  try {
    await db.query(`
      DROP TABLE IF EXISTS comments CASCADE;
      DROP TABLE IF EXISTS help_offers CASCADE;
      DROP TABLE IF EXISTS help_requests CASCADE;
      DROP TABLE IF EXISTS help_types CASCADE;
      DROP TABLE IF EXISTS users CASCADE;
      
      DROP TYPE IF EXISTS REQUEST_STATUS CASCADE;
      DROP TYPE IF EXISTS OFFER_STATUS CASCADE;
    `);

    for (const file of schemaFiles) {
      const filePath = path.join(`${__dirname}/../../db/schema`, file);
      const sql = readFileSync(filePath, "utf-8");
      await db.query(sql);
    }
  } catch (error) {
    console.error("Error creating tables:", error);
    throw error;
  }
};

const seed = async ({
  usersData,
  typesData,
  helpRequestsData,
  commentsData,
  helpOffersData,
}: Data): Promise<void> => {
  try {
    await createTables();

    const usersWithHashedPasswords = await Promise.all(
      usersData.map(async (user) => {
        const passwordToHash = user.password || process.env.USER_PASSWORD;
        if (!passwordToHash) {
          throw new Error("Password is required for all users in seed data");
        }
        return {
          ...user,
          password: await bcrypt.hash(passwordToHash, 10),
        };
      })
    );

    const insertUsersStr = format(
      "INSERT INTO users (username, email, avatar_url, age, first_name, last_name, about, address, postcode, phone_number, additional_contacts, help_radius, longitude, latitude, password) VALUES %L RETURNING *;",
      usersWithHashedPasswords.map(
        ({
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
          password,
        }) => [
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
          password,
        ]
      )
    );

    const insertUsersResult = await db.query(insertUsersStr);
    const users = insertUsersResult.rows;

    const insertHelpTypeDataStr = format(
      "INSERT INTO help_types (name, description) VALUES %L",
      typesData.map(({ name, description }) => [name, description])
    );

    await db.query(insertHelpTypeDataStr);

    const insertHelpRequestsDataStr = format(
      "INSERT INTO help_requests (title, author_id, help_type_id, description, created_at, req_date, status) VALUES %L",
      helpRequestsData.map(
        ({
          title,
          author_id,
          help_type_id,
          description,
          created_at,
          req_date,
          status,
        }) => [
          title,
          author_id,
          help_type_id,
          description,
          created_at,
          req_date,
          status,
        ]
      )
    );

    await db.query(insertHelpRequestsDataStr);

    const insertHelpOffersDataStr = format(
      "INSERT INTO help_offers (helper_id, help_request_id, status, created_at) VALUES %L",
      helpOffersData.map(
        ({ helper_id, help_request_id, status, created_at }) => [
          helper_id,
          help_request_id,
          status,
          created_at,
        ]
      )
    );

    await db.query(insertHelpOffersDataStr);

    const parentCommentsData = commentsData.filter(
      (comment) => comment.parent_id === null
    );

    const insertParentCommentsStr = format(
      "INSERT INTO comments (author_id, help_request_id, created_at, description) VALUES %L RETURNING id, description;",
      parentCommentsData.map(
        ({ author_id, help_request_id, created_at, description }) => [
          author_id,
          help_request_id,
          created_at,
          description,
        ]
      )
    );

    const parentCommentsResult = await db.query(insertParentCommentsStr);
    const parentComments = parentCommentsResult.rows;

    const childCommentsData = commentsData.filter(
      (comment) => comment.parent_id !== null
    );

    const insertChildCommentsStr = format(
      "INSERT INTO comments (author_id, help_request_id, parent_id, created_at, description) VALUES %L",
      childCommentsData.map(
        ({
          author_id,
          help_request_id,
          parent_id,
          created_at,
          description,
        }) => [author_id, help_request_id, parent_id, created_at, description]
      )
    );

    if (childCommentsData.length > 0) {
      await db.query(insertChildCommentsStr);
    }
  } catch (error) {
    console.error("Error in seed:", error);
    throw error;
  }
};

export default seed;
