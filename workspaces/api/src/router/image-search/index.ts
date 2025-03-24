import Express from "express";
import { ImageService } from "../../service/image/image-service.js";

export function ImageSearchRouter({
  imageService,
}: {
  imageService: ImageService;
}) {
  const router = Express.Router();

  router.get("/:query", async (req, res) => {
    res.send(await imageService.search({ query: req.params.query }));
  });

  return router;
}
