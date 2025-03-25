import test from "node:test";
import assert from "node:assert";
import SuperTest from "supertest";
import { App } from "../../app.js";
import { SimpleImageService } from "../../service/image/image-service.js";

test("returns images by year", async () => {
  const imagesByYear = { 2025: ["https://example.com/foo.png"] };
  const app = App({
    origin: "",
    imageService: new SimpleImageService({ imagesByYear }),
  });
  const testAgent = SuperTest(app);

  const response = await testAgent.get("/api/search/abstract");

  assert.deepStrictEqual(response.body, imagesByYear);
});
