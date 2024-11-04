import { ServerEvents } from "@/events/index.js";
import jwt from "jsonwebtoken";
export type AuthTokenPayload = {
  userID: string;
  email: string;
};
let accessTokenSecret: string;
let refreshTokenSecret: string;
ServerEvents.onServerReady(() => {
  accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
  refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
  if (!accessTokenSecret || !refreshTokenSecret)
    throw new Error("Missing env variables for token generation");
});

export class TokenModule {
  static signRefreshToken(payload: AuthTokenPayload) {
    return jwt.sign(payload, refreshTokenSecret, { expiresIn: "30d" });
  }
  static verifyRefreshToken(refreshToken: string) {
    try {
      const payload = jwt.verify(
        refreshToken,
        refreshTokenSecret,
      ) as AuthTokenPayload;
      return payload;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      //   console.log(error);
      return null;
    }
  }
  static signAccessToken(payload: AuthTokenPayload) {
    return jwt.sign(payload, accessTokenSecret, { expiresIn: "30m" });
  }
  static verifyAccessToken(accessToken: string) {
    try {
      const payload = jwt.verify(
        accessToken,
        accessTokenSecret,
      ) as AuthTokenPayload;
      return payload;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      // console.log(error);
      return null;
    }
  }
}
