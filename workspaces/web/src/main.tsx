import { Switch } from "navigo-react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ImageSearchRoute } from "./route/image-search/route";
import { GiphyImageService } from "./service/image/service";
import { configuration } from "./configuration";

const imageService = new GiphyImageService({
  origin: configuration.api.origin,
});

const rootElement = document.getElementById("root")!;

if (!rootElement.innerHTML) {
  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <Switch>
        <ImageSearchRoute
          path="/"
          title="GIPHY Search"
          logo={new URL("./giphy.png", import.meta.url).href}
          defaultQuery="abstract"
          imageService={imageService}
        />
      </Switch>
    </StrictMode>
  );
}
