import logger from "./lib/logger-module.js";
import app from "./server.js";

app.listen(3000, () => {
  logger.info("Server started on port 3000");
});
