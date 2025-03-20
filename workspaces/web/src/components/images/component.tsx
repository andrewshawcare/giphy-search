import { useContext, useEffect, useState } from "react";
import { ApplicationContext } from "../../application-context";

interface SearchImagesParameters {
  origin: string;
  query: string;
}

async function searchImages({ origin, query }: SearchImagesParameters) {
  const response = await fetch(`${origin}/search/${query}`);
  const json: object = await response.json();
  return Object.entries(json).map(([key, value]: [any, any]) => value);
}

export function Images() {
  const applicationContext = useContext(ApplicationContext);
  const [searchValue, setSearchValue] = useState<string>();
  const [query, setQuery] = useState<string>();
  const [images, setImages] = useState<[]>();

  function onSearchValueChange(event: any) {  
    setSearchValue(event.target.value);
  }

  function onSearchSubmit(event: any) {
    setQuery(searchValue);
  }

  useEffect(() => {
    if (typeof query === "string") {
      searchImages({
        origin: applicationContext.api.origin,
        query,
      }).then(setImages);
    }    
  }, [query]);

  return <div>
    <input type="search" onChange={onSearchValueChange} value={searchValue} />
    <button type="button" onClick={onSearchSubmit}>Search</button>
    <div className="images">
    {
      typeof images === "object" &&
      images.map((image: any) => {
        return <img src={image} />;
      })
    }
    </div>
  </div>;
}
