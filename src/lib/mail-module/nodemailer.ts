import type { Transporter } from "nodemailer";
import nodemailer from "nodemailer";
import logger from "@/lib/logger-module.js";

class SMTPMailService {
  private static transporter: Transporter;

  // Initialize the transporter only once
  private static initializeTransporter() {
    if (!this.transporter) {
      this.transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST, // Replace with your SMTP host
        port: parseInt(process.env.SMTP_PORT) ?? 587, // Replace with your SMTP port (587 is common for TLS)
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.SMTP_USER, // Replace with your SMTP email
          pass: process.env.SMTP_PASSWORD, // Replace with your SMTP password
        },
      });
    }
  }

  public static async sendMail(
    to: string,
    subject: string,
    text: string,
    html?: string,
  ): Promise<void> {
    this.initializeTransporter();

    const mailOptions = {
      from: process.env.SENDER_MAIL, // Replace with sender's name and email
      to,
      subject,
      text,
      html,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      logger.info(`Email sent: ${info.messageId}`);
    } catch (error) {
      logger.error("Error sending email:", error);
      throw new Error("Failed to send email");
    }
  }
}

export default SMTPMailService;
