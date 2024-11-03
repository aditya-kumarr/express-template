// if you want to run cron jobs directly from node you can register your commands here other wise you can add them in crontab
import cron from "node-cron";
import changeStuff from "./list/change-stuff.js";

cron.schedule("* * * * * *", changeStuff.fn);
