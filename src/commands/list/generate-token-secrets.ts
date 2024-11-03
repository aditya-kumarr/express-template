import { Command } from "@/lib/command-module.js";
import logger from "@/lib/logger-module.js";
import { Random } from "@/lib/utils.js";

export default new Command({
  name: "generate-token-secrets",
  description: "Generate token secrets",
  fn: () => {
    logger.info(Random.generateString(64, "base64"));
  },
});
