import CORS from "cors";
import Express from "express";
import SearchRouter from "./router/search/index.js";

export const app = Express();

app.use(Express.static("static"));

app.use(
  CORS({
    origin(requestOrigin, callback) {
      callback(null, requestOrigin);
    },
  })
);

app.use("/api/search", SearchRouter);
