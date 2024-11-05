import db from "@/db/db.js";
import { usersTable } from "@/db/schema.js";
import FileBasedBucket from "@/lib/bucket-module/file-storage.js";
import { Random } from "@/lib/utils.js";
import { AuthMiddlewares } from "@/middlewares/auth-middleware.js";
import { Router } from "express";
import fileUpload from "express-fileupload";
import type { UploadedFile } from "express-fileupload";

export function createUserRouter() {
  const router = Router();

  router.get("/list", AuthMiddlewares.validateAccessToken, async (req, res) => {
    // db.insert(usersTable).values([{ email: "1" }]).run();
    const data = await db.query.usersTable.findMany();
    res.json({
      success: true,
      data: data,
    });
  });
  router.post("/add", fileUpload(), async (req, res) => {
    const random = Random.generateString(4, "hex");

    const data = await db
      .insert(usersTable)
      .values([{ email: `test-${random}@gmail.com` }]);

    res.json({
      success: true,
      data: data,
    });
  });

  router.post("/upload", fileUpload(), async (req, res) => {
    const file = req.files?.file;
    if (!file) {
      res.status(400).json({ message: "File is required" });
      return;
    } else if (file instanceof Array) {
      res.status(400).json({ message: "Only one file is allowed" });
      return;
    } else {
      const path = await FileBasedBucket.upload(file, "users/homework");
      res.json({ path });
      return;
    }
  });
  return router;
}
