import express, { Application } from "express";
import cors from "cors";
import errorHandler from "./errors/errorHandler";
import router from "./routes";

const app: Application = express();

app.use(cors());

app.use(express.json());

app.use(router);

app.use(errorHandler);

export default app;
