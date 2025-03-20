import test from "node:test";
import assert from "node:assert";
import Express from "express";
import SuperTest from "supertest";
import { HelloRouter } from "./index.js";

test("It returns the correct response", async () => {
  const app = Express();

  app.use(HelloRouter);

  const testAgent = SuperTest(app);

  const name = "World";

  const response = await testAgent.get(`/hello/${name}`);

  assert.strictEqual(response.text, "Hello, World!");
});
