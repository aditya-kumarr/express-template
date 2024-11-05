import logger from "@/lib/logger-module.js";

class MockMailService {
  static async sendMail({
    text,
    to,
    html,
  }: {
    to: string;
    text: string;
    html?: string;
  }) {
    logger.info(`Email sent: ${to} ${text} \n${html}`);
  }
}
export default MockMailService;
