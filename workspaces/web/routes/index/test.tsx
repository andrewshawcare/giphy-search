import "global-jsdom/register";
import test from "node:test";
import assert from "node:assert";
import { IndexRoute } from "./route";
import { act } from "react";
import { createRoot } from "react-dom/client";

test("includes the appropriate text content", async () => {
  const rootElement = document.createElement("main");
  document.body.appendChild(rootElement);

  global.IS_REACT_ACT_ENVIRONMENT = true;
  await act(async () => {
    const root = createRoot(rootElement);
    root.render(<IndexRoute path="/" />);
  });

  assert.strictEqual(rootElement.textContent, "");
});
