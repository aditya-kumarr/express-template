type ServerEvent = {
  server: (() => void)[];
  db: (() => void)[];
  redis: (() => void)[];
};

export class ServerEvents {
  static events: ServerEvent = {
    server: [],
    db: [],
    redis: [],
  };

  static onServerReady(fn: () => void) {
    ServerEvents.events.server.push(fn);
  }

  static emitServerReady() {
    ServerEvents.events.server.forEach((fn) => fn());
  }
}