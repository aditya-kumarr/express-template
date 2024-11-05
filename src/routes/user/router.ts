import db from "@/db/db.js";
import { usersTable } from "@/db/schema.js";
import { Random } from "@/lib/utils.js";
import { AuthMiddlewares } from "@/middlewares/auth-middleware.js";
import { Router } from "express";

export function createUserRouter() {
  const router = Router();

  router.get("/list", async (req, res) => {
    // db.insert(usersTable).values([{ email: "1" }]).run();
    const data = await db.query.usersTable.findFirst();
    res.json({
      success: true,
      data: data,
    });
  });
  router.post("/add", async (req, res) => {
    const random = Random.generateString(4, "hex");
    const data = await db
      .insert(usersTable)
      .values([{ email: `test-${random}@gmail.com` }]);

    res.json({
      success: true,
      data: data,
    });
  });
  return router;
}
