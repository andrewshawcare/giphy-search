import { useContext, useEffect, useState } from "react";
import { ApplicationContext } from "../../application-context";
import "./stylesheet.css";

interface SearchImagesParameters {
  origin: string;
  query: string;
}

async function searchImages({ origin, query }: SearchImagesParameters) {
  const imageSearchResponse = await fetch(`${origin}/search/${query}`);
  const imageSearchJson = await imageSearchResponse.json();
  return typeof imageSearchJson === "object"
    ? Object.values(imageSearchJson)
        .flat()
        .filter((imageUrl) => typeof imageUrl === "string")
    : [];
}

interface ImagesProps {
  query: string;
}

export function Images({ query }: ImagesProps) {
  const applicationContext = useContext(ApplicationContext);
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  useEffect(() => {
    searchImages({
      origin: applicationContext.api.origin,
      query: query,
    }).then(setImageUrls);
  }, [query]);

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
