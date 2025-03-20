import { Route, RouteProps } from "navigo-react";
import { Images } from "../../src/components/images/component";

export function IndexRoute(props: RouteProps) {
  return (
    <Route {...props}>
      <Images />
    </Route>
  );
}
