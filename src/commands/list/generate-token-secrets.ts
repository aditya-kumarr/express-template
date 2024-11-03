import { Command } from "@/lib/command-module.js";
import logger from "@/lib/logger-module.js";
import { Random } from "@/lib/utils.js";

export default new Command({
  name: "generate-token-secrets",
  description: "Generate token secrets",
  fn: () => {
    const data = Random.generateString(64, "base64");
    console.log("Generated Secret:", data);
    var proc = require("child_process").spawn("pbcopy");
    proc.stdin.write(data);
    proc.stdin.end();
    console.log("btw, also pasted to your clipboard :)");
  },
});
