import { configuration } from "./configuration.js";
import { App } from "./app.js";
import { GiphyImageService } from "./service/image/giphy-image-service.js";

const app = App({
  origin: configuration.web.origin,
  imageService: new GiphyImageService(configuration.giphy),
});

app.listen(configuration.api.port);
