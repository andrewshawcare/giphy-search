import Express from "express";

const router = Express.Router();
router.get("/hello/:name", (req, res) => {
  res.status(200).send(`Hello, ${req.params.name}!`);
});

export default router;
