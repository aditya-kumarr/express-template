import { Command } from "@/lib/command-module.js";
import { OTPModule } from "@/lib/otp-module.js";

const testMail = "user1@test.com";
export const OTPCommands = {
  sendOtp: new Command({
    name: "send-otp",
    description: "Send otp for testing",
    fn: async () => {
      await OTPModule.sendMailOTP({ email: testMail });
    },
  }),
  verifyOtp: new Command({
    name: "verify-otp",
    description: "Verify otp for testing",
    fn: async ([otp]) => {
      console.log(otp);
      const verified = await OTPModule.verifyMailOTP(testMail, otp);
      if (verified) {
        console.log("verified");
      } else {
        console.log("not verified");
      }
    },
  }),
  checkStatus: new Command({
    name: "check-status",
    description: "Check otp status for testing",
    fn: async () => {
      const verified = await OTPModule.checkOTPStatus(testMail);
      if (verified) {
        console.log("verified");
      } else {
        console.log("not verified");
      }
    },
  }),
  deleteOtp: new Command({
    name: "delete-otp",
    description: "Delete otp for testing",
    fn: async () => {
      await OTPModule.deleteOTP(testMail);
      console.log("deleted");
    },
  }),
};
