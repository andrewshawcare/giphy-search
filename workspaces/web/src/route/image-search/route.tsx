import { useEffect, useState } from "react";
import { Route, RouteProps } from "navigo-react";
import { ImageList } from "../../component/image-list/component.js";
import { Search } from "../../component/search/component.js";
import { ImageService } from "../../service/image/service.js";

interface ImageSearchRouteProps extends RouteProps {
  title: string;
  logo?: string;
  defaultQuery: string;
  imageService: ImageService;
}

export function ImageSearchRoute(props: ImageSearchRouteProps) {
  const [query, setQuery] = useState<string>(props.defaultQuery);
  const [imageURLs, setImageURLs] = useState<string[]>([]);

  useEffect(() => {
    props.imageService.search({ query }).then(setImageURLs);
  }, [query]);

  return (
    <Route {...props}>
      <article className="image search route">
        <header>
          <h1 className="title">
            {props.logo ? <img className="logo" src={props.logo} /> : null}
            {props.title}
          </h1>
          <Search defaultQuery={query} onQueryChange={setQuery} />
        </header>
        <main>
          <ImageList imageURLs={imageURLs} />
        </main>
      </article>
    </Route>
  );
}
