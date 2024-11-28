import express, { Application } from "express";
import cors from "cors";
import errorHandler from "./errors/errorHandler";
import router from "./routes";

const app: Application = express();

const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "X-User-ID"],
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(router);

app.use(errorHandler);

export default app;
