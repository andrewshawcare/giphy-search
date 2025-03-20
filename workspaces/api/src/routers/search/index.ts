import querystring from "node:querystring";
import Express from "express";
import { configuration } from "../../configuration.js";

const router = Express.Router();
router.get("/:q", async (req, res) => {
  const qs = querystring.stringify({
    api_key: configuration.giphy.key,
    q: req.params.q,
  });
  const response = await fetch(
    `${configuration.giphy.origin}/v1/gifs/search?${qs}`
  );
  const json = await response.json();
  const images = json.data
    .map((datum: any) => {
      const importDateTime = datum.import_datetime;
      const url = datum.images.fixed_width.url;

      return { importDateTime, url };
    })
    .reduce((images: any, image: any) => {
      const { importDateTime, url } = image;
      const year = new Date(importDateTime).getFullYear();
      images[year] = images[year] || [];
      images[year].push(image.url);
      return images;
    }, {});
  res.status(200).send(images);
});

export default router;
