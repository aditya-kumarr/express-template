import "@/config/env.js";
import { ServerEvents } from "./events/index.js";
import "@/config/custom-type.js";
import logger from "./lib/logger-module.js";
import app from "./routes/server.js";

app.listen(3000, () => {
  logger.info("Server started on port 3000");
  ServerEvents.emitServerReady();
});
