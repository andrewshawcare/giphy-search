import { useContext, useEffect, useState } from "react";
import { ApplicationContext } from "../../application-context";
import "./stylesheet.css";

interface SearchImagesParameters {
  origin: string;
  query: string;
}

async function searchImages({ origin, query }: SearchImagesParameters) {
  const response = await fetch(`${origin}/search/${query}`);
  const json: object = await response.json();
  return Object.entries(json).flatMap(([key, value]: [any, any]) => value);
}

interface ImagesProps {
  query: string;
}

export function Images(props: ImagesProps) {
  const applicationContext = useContext(ApplicationContext);
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  useEffect(() => {
    if (typeof props.query === "string") {
      searchImages({
        origin: applicationContext.api.origin,
        query: props.query,
      }).then(setImageUrls);
    }
  }, [props.query]);

  return (
    <div className="images">
      {imageUrls.map((imageUrl) => {
        return (
          <figure key={imageUrl}>
            <img src={imageUrl} />
          </figure>
        );
      })}
    </div>
  );
}
