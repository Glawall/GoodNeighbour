import seed from "./seed";
import db from "../../connection";
import { Data } from "./data/test";
import { testData } from "./data/test";
import { devData } from "./data/development";

const ENV = process.env.NODE_ENV || "development";

const runSeed = async (data: Data) => {
  try {
    await seed(data);
    console.log("Seeding completed successfully.");
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    await db.end();
  }
};

const dataToSeed = ENV === "test" ? testData : devData;

if (dataToSeed) {
  runSeed(dataToSeed);
} else {
  console.warn("No seed data available for the current environment.");
}

export default runSeed;
