import "global-jsdom/register";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { JSX } from "react";

global.IS_REACT_ACT_ENVIRONMENT = true;

export async function testRender(reactNode: JSX.Element) {
  const rootElement = document.createElement("main");
  document.body.appendChild(rootElement);

  await act(() => {
    createRoot(rootElement).render(reactNode);
  });

  return rootElement;
}
