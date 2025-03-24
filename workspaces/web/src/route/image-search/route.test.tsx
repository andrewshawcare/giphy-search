import "global-jsdom/register";
import test from "node:test";
import assert from "node:assert";
import { ImageSearchRoute } from "./route";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { SimpleImageService } from "../../service/image/service";

test("includes the title", async () => {
  const rootElement = document.createElement("main");
  document.body.appendChild(rootElement);

  const title = "Image Search";

  await act(async () => {
    const root = createRoot(rootElement);
    root.render(
      <ImageSearchRoute
        title={title}
        logo=""
        defaultQuery=""
        path="/"
        imageService={new SimpleImageService()}
      />
    );
  });

  const titleElement = rootElement.querySelector(".title")!;

  assert.strictEqual(titleElement.textContent, title);
});
