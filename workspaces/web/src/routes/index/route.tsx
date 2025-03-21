import { useContext, useEffect, useState } from "react";
import { Route, RouteProps } from "navigo-react";
import { Images } from "../../components/images/component.jsx";
import { Search } from "../../components/search/component.js";
import { ApplicationContext } from "../../application-context.js";

interface SearchImagesParameters {
  origin: string;
  query: string;
}

async function searchImages({ origin, query }: SearchImagesParameters) {
  const imageSearchResponse = await fetch(`${origin}/api/search/${query}`);
  const imageSearchJson = await imageSearchResponse.json();
  return typeof imageSearchJson === "object"
    ? Object.values(imageSearchJson)
        .flat()
        .filter((imageUrl) => typeof imageUrl === "string")
    : [];
}

export function IndexRoute(props: RouteProps) {
  const [query, setQuery] = useState<string>("dogs");
  const [imageURLs, setImageURLs] = useState<string[]>([]);
  const applicationContext = useContext(ApplicationContext);

  useEffect(() => {
    searchImages({
      origin: applicationContext.api.origin,
      query: query,
    }).then(setImageURLs);
  }, [query]);

  return (
    <Route {...props}>
      <article className="index route">
        <header>
          <h1>GIPHY Search</h1>
          <Search initialSearchValue={query} onQueryChange={setQuery} />
        </header>
        <main>
          <Images imageURLs={imageURLs} />
        </main>
      </article>
    </Route>
  );
}
