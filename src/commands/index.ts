// import { Constants } from "@/config/constants.js";
import { Command, CommandExecuter } from "@/lib/command-module.js";
import generateTokenSecrets from "./list/generate-token-secrets.js";
import { listRoutes } from "./list/routes.js";

// add your commands in this array
const commands: Command[] = [generateTokenSecrets, listRoutes];

//this will register all the commands
CommandExecuter.registerAll(commands);
CommandExecuter.start();
