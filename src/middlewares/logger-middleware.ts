import logger from "@/lib/logger-module.js";
import morgan from "morgan";

const morganFormat = ":method :url :status :response-time ms";
const loggerMiddleware = morgan(morganFormat, {
  stream: {
    write: (message) => {
      const log = `${message.split(" ")[0]} ${message.split(" ")[1]} ${
        message.split(" ")[2]
      } ${message.split(" ")[3]} ms`;
      logger.info(log);
    },
  },
});

export default loggerMiddleware;
