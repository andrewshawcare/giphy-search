import Express from "express";

export const HelloRouter = Express.Router();

HelloRouter.get("/:name", (req, res) => {
  res.status(200).send(`Hello, ${req.params.name}!`);
});
