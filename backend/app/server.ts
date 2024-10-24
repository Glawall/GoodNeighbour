import app from "./app";
import { preloadHelpTypes } from "./utils/preloadHelpTypes";

const { PORT = 8001 } = process.env;

const startServer = async () => {
  try {
    await preloadHelpTypes(); // Ensure help types are preloaded before starting the server
    app.listen(PORT, () => console.log(`Listening on ${PORT}...`));
  } catch (error) {
    console.error("Failed to preload help types and start the server:", error);
    process.exit(1); // Exit the process on failure
  }
};

startServer();
