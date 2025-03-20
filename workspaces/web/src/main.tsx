import { Switch } from "navigo-react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { IndexRoute } from "./routes/index/route";

const rootElement = document.getElementById("root")!;

if (!rootElement.innerHTML) {
  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <Switch>
        <IndexRoute path="/" />
      </Switch>
    </StrictMode>
  );
}
