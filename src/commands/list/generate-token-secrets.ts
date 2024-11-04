import { Command } from "@/lib/command-module.js";
import childProcess from "child_process";
import { Random } from "@/lib/utils.js";

export default new Command({
  name: "generate-token-secrets",
  description: "Generate token secrets",
  fn: () => {
    const data = Random.generateString(64, "base64");
    console.log("Generated Secret:", data);
    const proc = childProcess.spawn("pbcopy");
    proc.stdin.write(data);
    proc.stdin.end();
    console.log("btw, also pasted to your clipboard :)");
  },
});
