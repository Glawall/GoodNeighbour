import express, { Application } from "express";
import cors from "cors";
import errorHandler from "./errors/errorHandler";
import router from "./routes";

const app: Application = express();

app.use(cors());

// * Parser
app.use(express.json());

// * Route
app.use(router);

// * Custom Error Handler
app.use(errorHandler);

export default app;
