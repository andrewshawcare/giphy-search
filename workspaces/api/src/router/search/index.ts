import Express from "express";
import { GiphyImageService } from "../../service/image/giphy-image-service.js";
import { configuration } from "../../configuration.js";

const imageService = new GiphyImageService(configuration.giphy);
const router = Express.Router();

router.get("/:query", async (req, res) => {
  const imagesByYear = await imageService.search({ query: req.params.query });
  res.status(200).send(imagesByYear);
});

export default router;
