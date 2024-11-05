import { Command } from "@/lib/command-module.js";
import MockMailService from "@/lib/mail-module/mock.js";
import SMTPMailService from "@/lib/mail-module/nodemailer.js";

export default new Command({
  name: "send-mail",
  description: "Send mail for testing",
  fn: () => {
    MockMailService.sendMail({
      text: "your otp is 1000",
      to: "test@test.com",
      html: "test",
    });
  },
});
