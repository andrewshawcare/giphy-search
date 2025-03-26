import "global-jsdom/register";
import test from "node:test";
import assert from "node:assert";
import { Search } from "./component.js";
import { act } from "react";
import { createRoot } from "react-dom/client";
import React from "react";
import { fireEvent } from "@testing-library/dom";

interface SearchProps {
  defaultQuery: string;
  onQueryChange: (query: string) => void;
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

test("Search renders with default query", async () => {
  const defaultQuery = "test query";

  const rootElement = await renderComponent<SearchProps>(Search, {
    defaultQuery,
    onQueryChange: () => {}
  });

  const inputElement = rootElement.querySelector("input");
  assert.ok(inputElement);
  assert.strictEqual(inputElement.value, defaultQuery);
});

test("Search calls onQueryChange when form is submitted", async () => {
  let actualQuery = "";
  const expectedQuery = "new test query";

  const rootElement = await renderComponent<SearchProps>(Search, {
    defaultQuery: "",
    onQueryChange: (query: string) => {
      actualQuery = query;
    }
  });

  const inputElement = rootElement.querySelector("input") as HTMLInputElement;
  const formElement = rootElement.querySelector("form") as HTMLFormElement;

  // Change input value
  await act(async () => {
    fireEvent.change(inputElement, { target: { value: expectedQuery } });
  });

  // Submit form
  await act(async () => {
    fireEvent.submit(formElement);
  });

  assert.strictEqual(actualQuery, expectedQuery);
});
