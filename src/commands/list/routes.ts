import { Command } from "@/lib/command-module.js";
import app from "@/routes/server.js";
import listEndpoints from "express-list-endpoints";

export const listRoutes = new Command({
  name: "list-routes",
  description: "List all routes",
  fn: () => {
    console.log(listEndpoints(app));
  },
});
