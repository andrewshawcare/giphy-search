import test from "node:test";
import assert from "node:assert";
import { SimpleImageService } from "./image-service.js";

test("SimpleImageService returns images grouped by year", async () => {
  const expectedImagesByYear = {
    2025: ["https://example.com/image1.jpg", "https://example.com/image2.jpg"],
    2024: ["https://example.com/image3.jpg"]
  };

  const imageService = new SimpleImageService({ imagesByYear: expectedImagesByYear });
  const result = await imageService.search();

  assert.deepStrictEqual(result, expectedImagesByYear);
});

test("SimpleImageService returns empty object when no images exist", async () => {
  const imageService = new SimpleImageService({ imagesByYear: {} });
  const result = await imageService.search();

  assert.deepStrictEqual(result, {});
});
