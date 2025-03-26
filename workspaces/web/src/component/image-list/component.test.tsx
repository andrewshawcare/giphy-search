import "global-jsdom/register";
import test from "node:test";
import assert from "node:assert";
import { ImageList } from "./component.js";
import { act } from "react";
import { createRoot } from "react-dom/client";
import React from "react";

interface ImageListProps {
  imageURLs: string[];
}

async function renderComponent<Props extends object>(
  Component: React.ComponentType<Props>,
  props: Props
): Promise<HTMLElement> {
  const rootElement = document.createElement("div");
  document.body.appendChild(rootElement);

  global.IS_REACT_ACT_ENVIRONMENT = true;
  await act(async () => {
    const root = createRoot(rootElement);
    root.render(React.createElement<Props>(Component, props));
  });

  return rootElement;
}

test("ImageList renders all provided image URLs", async () => {
  const imageURLs = [
    "https://example.com/image1.jpg",
    "https://example.com/image2.jpg"
  ];

  const rootElement = await renderComponent<ImageListProps>(ImageList, { imageURLs });

  const images = rootElement.querySelectorAll("figure img");
  assert.strictEqual(images.length, imageURLs.length);
  
  images.forEach((img, index) => {
    assert.strictEqual(img.getAttribute("src"), imageURLs[index]);
  });
});

test("ImageList shows dialog when image is clicked", async () => {
  const imageURLs = ["https://example.com/image1.jpg"];

  const rootElement = await renderComponent<ImageListProps>(ImageList, { imageURLs });

  // Initial state - no dialog
  assert.strictEqual(rootElement.querySelectorAll("dialog").length, 0);

  // Click image
  const figure = rootElement.querySelector("figure");
  await act(async () => {
    figure?.click();
  });

  // Dialog should be visible with the clicked image
  const dialog = rootElement.querySelector("dialog");
  assert.ok(dialog);
  assert.strictEqual(dialog?.querySelector("img")?.getAttribute("src"), imageURLs[0]);

  // Click dialog to close
  await act(async () => {
    dialog?.click();
  });

  // Dialog should be closed
  assert.strictEqual(rootElement.querySelectorAll("dialog").length, 0);
});
