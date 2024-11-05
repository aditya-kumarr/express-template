import { HashingModule } from "./hashing-module.js";
import { Random } from "./utils.js";
import db from "@/db/db.js";
import { otpTable } from "@/db/schema.js";
import { and, eq, gt } from "drizzle-orm";
import MockMailService from "./mail-module/mock.js";
import SMTPMailService from "./mail-module/nodemailer.js";

/**
 * @description Handles operations related to One Time Passwords (OTPs).
 */
export class OTPModule {
  /**
   * @description Generates a random OTP and sends it to the user's email via email service.
   * @param {{ email: string; name: string }} options
   * @returns {Promise<void>}
   */
  static async sendMailOTP({ email }: { email: string }): Promise<void> {
    const otp = Random.generateNumber(6);
    const hash = await HashingModule.hash(otp.toString());
    const otpDoc = await db.query.otpTable.findFirst({
      where: (data, { eq }) => eq(data.email, email),
    });
    if (otpDoc) {
      await db
        .update(otpTable)
        .set({ otp: hash })
        .where(eq(otpTable.email, email));
    } else {
      await db.insert(otpTable).values([{ email, otp: hash }]);
    }
    if (process.env.NODE_ENV === "dev") {
      await MockMailService.sendMail({
        to: email,
        text: `your otp is ${otp}`,
      });
    } else {
      await SMTPMailService.sendMail(
        email,
        `OTP for ${email}`,
        `your otp is ${otp}`,
      );
    }
  }

  /**
   * @description Verifies the OTP sent to the user's email.
   * @param {string} email
   * @param {string} otp
   * @param {boolean} [deleteOtp=true] whether to delete the OTP doc after verification
   * @returns {Promise<boolean>}
   */
  static async verifyMailOTP(
    email: string,
    otp: string,
    deleteOtp: boolean = false,
  ): Promise<boolean> {
    // const EXPIRATION_CONSTANT = 5 * 60 * 1000;
    // const expirationTime = new Date(Date.now() + EXPIRATION_CONSTANT).getTime();
    const otpDoc = await db.query.otpTable.findFirst({
      where: (data, { eq }) => and(eq(data.email, email)),
    });
    if (!otpDoc) return false;

    const verified = await HashingModule.compare(otp, otpDoc.otp);

    if (!verified) return false;
    if (deleteOtp) {
      await db.delete(otpTable).where(eq(otpTable.email, email));
    } else {
      await db
        .update(otpTable)
        .set({ status: "verified" })
        .where(eq(otpTable.email, email));
    }
    return true;
  }

  /**
   * @description Checks if the OTP has been verified.
   * @param {string} email
   * @returns {Promise<boolean>}
   */
  static async checkOTPStatus(email: string): Promise<boolean> {
    const otpDoc = await db.query.otpTable.findFirst({
      where: (data, { eq }) => eq(data.email, email),
    });
    if (!otpDoc) return false;
    const verified = otpDoc.status === "verified";
    if (!verified) return false;
    return true;
  }
  static async deleteOTP(email: string): Promise<boolean> {
    const otpDoc = await db.query.otpTable.findFirst({
      where: (data, { eq }) => eq(data.email, email),
    });
    if (!otpDoc) return false;
    await db.delete(otpTable).where(eq(otpTable.email, email));
    return true;
  }
}
