import * as fs from "fs";
export const httpsOptions = {
    key: fs.readFileSync(process.env.BACK_URL_KEY, 'utf-8'),
    cert: fs.readFileSync(process.env.BACK_URL_CERT, 'utf-8'),
  };