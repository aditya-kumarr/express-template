import { Command } from "@/lib/command-module.js";
import logger from "@/lib/logger-module.js";

export default new Command({
  name: "change-stuff",
  description: "Change stuff",
  fn: () => {
    logger.info("Change stuff");
  },
});
