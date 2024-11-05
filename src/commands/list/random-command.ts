import { Command } from "@/lib/command-module.js";

export default new Command({
  name: "random-command",
  description: "Random command",
  fn: () => {
    console.log("somthing random");
  },
});
