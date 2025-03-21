import CORS from "cors";
import Express from "express";
import SearchRouter from "./routers/search/index.js";

export const app = Express();

app.use(
  CORS({
    origin(requestOrigin, callback) {
      callback(null, requestOrigin);
    },
  })
);

app.use("/search", SearchRouter);
