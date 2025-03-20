import CORS from "cors";
import Express from "express";
import IndexRouter from "./routers/index/index.js";

export const app = Express();

app.use(
  CORS({
    origin(requestOrigin, callback) {
      callback(null, requestOrigin);
    },
  })
);

app.use("/", IndexRouter);
