import "dotenv/config";
import { ServerEvents } from "../events/index.js";

before(() => {
  ServerEvents.emitServerReady();
  console.log("before");
});
