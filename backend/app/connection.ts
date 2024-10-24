import { Pool, PoolConfig } from "pg";
import dotenv from "dotenv";

const ENV = process.env.NODE_ENV || "production";

dotenv.config({ path: `${__dirname}/../.env.${ENV}` });

if (!process.env.PGDATABASE && !process.env.DATABASE_URL) {
  throw new Error("PGDATABASE or DATABASE_URL not set");
}
console.log(ENV, "in connection");

const config: PoolConfig = {};

if (ENV === "production") {
  config.connectionString = process.env.DATABASE_URL;
  config.max = 2;
} else {
  config.database = process.env.PGDATABASE || "goodneighbour_test";
}

const db = new Pool(config);

export default db;
