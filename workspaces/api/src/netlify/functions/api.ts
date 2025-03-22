import ServerlessHTTP from "serverless-http";
import { app } from "../../app.js";

export const handler = ServerlessHTTP(app);
