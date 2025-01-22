import express, { Application } from "express";
import cors from "cors";
import errorHandler from "./errors/errorHandler";
import router from "./routes";
import { preloadHelpTypes } from "./utils/preloadHelpTypes";

const app: Application = express();

preloadHelpTypes().catch(console.error);

app.use(cors());

app.use(express.json());

app.use(router);

app.use(errorHandler);

export default app;
