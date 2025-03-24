import ServerlessHTTP from "serverless-http";
import { App } from "../../app.js";
import { configuration } from "../../configuration.js";
import { GiphyImageService } from "../../service/image/giphy-image-service.js";

const app = App({
  origin: configuration.web.origin,
  imageService: new GiphyImageService(configuration.giphy),
});

export const handler = ServerlessHTTP(app);
