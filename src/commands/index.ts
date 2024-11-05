import "dotenv/config";
// import { Constants } from "@/config/constants.js";

import type { Command } from "@/lib/command-module.js";
import { CommandExecuter } from "@/lib/command-module.js";
import generateTokenSecrets from "./list/generate-token-secrets.js";
import { listRoutes } from "./list/routes.js";
import randomCommand from "./list/random-command.js";

// add your commands in this array
const commands: Command[] = [generateTokenSecrets, listRoutes, randomCommand];

//this will register all the commands
CommandExecuter.registerAll(commands);
CommandExecuter.start();
