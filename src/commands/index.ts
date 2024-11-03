import { Constants } from "@/config/constants.js";
import { commands, executeCommand } from "@/lib/command-module.js";
import changeStuff from "./change-stuff.js";

commands.set("change-stuff", changeStuff);

executeCommand();
