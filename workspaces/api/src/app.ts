import Express from "express";
import CORS from "cors";
import { ImageSearchRouter } from "./router/image-search/index.js";
import { ImageService } from "./service/image/image-service.js";

export function App({
  origin,
  imageService,
}: {
  origin: string;
  imageService: ImageService;
}) {
  const app = Express();

  app.use(Express.static("static"));

  app.use(CORS({ origin }));

  app.use("/api/image/search", ImageSearchRouter({ imageService }));

  return app;
}
