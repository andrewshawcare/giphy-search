import test from "node:test";
import assert from "node:assert";
import { IndexRoute } from "./route";
import { testRender } from "../../utilities/test-render";

test("includes the appropriate text content", async () => {
  const rootElement = await testRender(<IndexRoute path="/" />);

  assert.strictEqual(rootElement.textContent, "Index");
});
