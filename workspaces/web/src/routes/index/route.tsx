import { Route, RouteProps } from "navigo-react";
import { Images } from "../../components/images/component.jsx";
import { useState } from "react";
import { Search } from "../../components/search/component.js";
import "./stylesheet.css";

export function IndexRoute(props: RouteProps) {
  const [query, setQuery] = useState<string>("dogs");
  return (
    <Route {...props}>
      <h1>GIPHY Search</h1>
      <Search
        initialSearchValue={query}
        onQueryChange={({ query }) => setQuery(query)}
      />
      <Images query={query} />
    </Route>
  );
}
