/**
 * @description Custom command class that extends for creating custom commands
 */
export class Command {
  name: string;
  description: string;
  fn: () => void;
  constructor(name: string, description: string, fn: () => void) {
    this.name = name;
    this.description = description;
    this.fn = fn;
  }
}

/**
 * @description map of all the commands
 */
export const commands = new Map<string, Command>();

/**
 * @description Execute the command
 */
export function executeCommand() {
  const command = process.argv[2];

  if (commands.has(command)) {
    commands.get(command)?.fn();
  } else {
    console.log(`Unknown command: ${command}`);
    listCommands();
  }
}

/**
 * @description List all the commands
 */
function listCommands() {
  console.log("Available commands:");
  for (const command of commands.values()) {
    console.log(`- ${command.name}: ${command.description}`);
  }
}
