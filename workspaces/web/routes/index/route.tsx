import { Route, RouteProps } from "navigo-react";
import { Hello } from "../../components/hello/component";

export function IndexRoute(props: RouteProps) {
  return (
    <Route {...props}>
      <Hello name="Andrew" />
    </Route>
  );
}
