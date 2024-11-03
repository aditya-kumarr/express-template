import { Command } from "@/lib/command-module.js";
import logger from "@/lib/logger-module.js";

export default new Command(
  "change-stuff",
  "Change stuff",
  function changeStuff() {
    logger.info("changeStuff");
  }
);
