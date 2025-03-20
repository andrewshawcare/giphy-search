import Express from "express";
import IndexRouter from "./routers/index/index.js";

export const app = Express();

app.use("/", IndexRouter);
