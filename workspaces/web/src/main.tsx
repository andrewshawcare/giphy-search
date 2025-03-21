import { Switch } from "navigo-react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { SearchRoute } from "./route/search/route";

const rootElement = document.getElementById("root")!;

if (!rootElement.innerHTML) {
  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <Switch>
        <SearchRoute path="/" />
      </Switch>
    </StrictMode>
  );
}
