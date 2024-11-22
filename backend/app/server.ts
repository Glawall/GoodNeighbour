import app from "./app";
import { preloadHelpTypes } from "./utils/preloadHelpTypes";

const { PORT = 8003 } = process.env;

const startServer = async () => {
  try {
    await preloadHelpTypes();
    app.listen(PORT, () => console.log(`Listening on ${PORT}...`));
  } catch (error) {
    console.error("Failed to preload help types and start the server:", error);
    process.exit(1);
  }
};

startServer();
