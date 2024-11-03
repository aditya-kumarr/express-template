import bcrypt from "bcrypt";
export class HashingModule {
  static hash(password: string) {
    return bcrypt.hash(password, 10);
  }
  static compare(password: string, hash: string) {
    return bcrypt.compare(password, hash);
  }
}
