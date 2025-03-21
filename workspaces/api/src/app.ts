import CORS from "cors";
import Express from "express";
import SearchRouter from "./router/search/index.js";
import { configuration } from "./configuration.js";

export const app = Express();

app.use(Express.static("static"));

app.use(CORS({ origin: configuration.web.origin }));

app.use("/api/search", SearchRouter);
