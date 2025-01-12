import * as dotenv from "dotenv";
import { Environment } from "../constant";
dotenv.config();

const envVars = process.env

export const DB_CONFIG: Environment = {
  email: {
    smtp: {
      host: envVars.SMTP_HOST,
      port: envVars.SMTP_PORT,
      auth: {
        user: envVars.SMTP_USERNAME,
        pass: envVars.SMTP_PASSWORD,
      },
    },
    from: envVars.EMAIL_FROM,
  },
};
