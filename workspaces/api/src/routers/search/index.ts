import querystring from "node:querystring";
import Express from "express";
import { configuration } from "../../configuration.js";

interface GiphyImage {
  url: string;
}

interface GiphyImageFormats {
  fixed_width: GiphyImage;
}

interface GiphySearchDatum {
  import_datetime: string;
  images: GiphyImageFormats;
}

interface GiphySearchResponse {
  data: GiphySearchDatum[];
}

const router = Express.Router();

router.get("/:q", async (req, res) => {
  const qs = querystring.stringify({
    api_key: configuration.giphy.key,
    q: req.params.q,
  });

  const response = await fetch(
    `${configuration.giphy.origin}/v1/gifs/search?${qs}`
  );

  const giphySearchResponse: GiphySearchResponse = await response.json();

  const images = giphySearchResponse.data
    .map(
      ({
        import_datetime,
        images: {
          fixed_width: { url },
        },
      }) => {
        return { import_datetime, url };
      }
    )
    .reduce((images: { [key: number]: string[] | undefined }, image) => {
      const { import_datetime, url } = image;

      const year = new Date(import_datetime).getFullYear();

      images[year] = images[year] || [];
      images[year].push(url);

      return images;
    }, {});

  res.status(200).send(images);
});

export default router;
