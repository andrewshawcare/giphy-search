import QueryString from "node:querystring";
import { Configuration } from "../../configuration.js";
import {
  ImagesByYear,
  ImageService,
  SearchParameters,
} from "./image-service.js";

interface GiphyImageSearchResponse {
  data: [
    {
      import_datetime: string;
      images: {
        fixed_width: {
          url: string;
        };
      };
    }
  ];
}

export class GiphyImageService implements ImageService {
  private readonly configuration: Configuration["giphy"];

  constructor(configuration: Configuration["giphy"]) {
    this.configuration = configuration;
  }
  async search({
    query,
  }: SearchParameters): ReturnType<ImageService["search"]> {
    const qs = QueryString.stringify({
      api_key: this.configuration.key,
      q: query,
    });

    const response = await fetch(
      `${this.configuration.origin}/v1/gifs/search?${qs}`
    );

    const giphySearchResponse: GiphyImageSearchResponse = await response.json();

    return giphySearchResponse.data
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
      .reduce((images: ImagesByYear, image) => {
        const { import_datetime, url } = image;

        const year = new Date(import_datetime).getFullYear();

        images[year] = images[year] || [];
        images[year].push(url);

        return images;
      }, {});
  }
}
