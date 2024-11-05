import type { UploadedFile } from "express-fileupload";
import fs from "fs";
import path from "path";
import { Random } from "../utils.js";

export default class FileBasedBucket {
  static async upload(file: UploadedFile, subpath?: string) {
    const fileName = Random.generateString(4, "hex") + path.extname(file.name);
    const filePath = path.join(
      process.cwd(),
      "storage",
      subpath ?? "",
      fileName,
    );
    await FileBasedBucket.createDirectoryIfNotExists(
      `storage/${subpath ?? ""}`,
    );
    file.mv(filePath);
    const publicUrl = path.join(
      process.env.SERVER_URL,
      "/files",
      subpath ?? "",
      fileName,
    );
    return publicUrl;
  }

  static async createDirectoryIfNotExists(path: string) {
    return new Promise<boolean>((resolve, reject) => {
      if (fs.existsSync(path)) {
        resolve(true);
      } else {
        fs.mkdir(path, { recursive: true }, (err) => {
          if (err) {
            reject(err);
          }
          resolve(true);
        });
      }
    });
  }
}
