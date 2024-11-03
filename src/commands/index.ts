// import { Constants } from "@/config/constants.js";
import { CommandExecuter } from "@/lib/command-module.js";
import changeStuff from "./list/change-stuff.js";

// add your commands in this array
const commands = [changeStuff];

//this will register all the commands
CommandExecuter.registerAll(commands);
CommandExecuter.start();
