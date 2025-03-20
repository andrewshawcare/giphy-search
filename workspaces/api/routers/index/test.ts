import test from "node:test";
import assert from "node:assert";
import SuperTest from "supertest";
import { app } from "../../app";

test("It returns the correct response", async () => {
  const testAgent = SuperTest(app);

  const name = "World";
  const response = await testAgent.get(`/hello/${name}`);
  assert.strictEqual(response.text, "Hello, World!");
});
