import { useState } from "react";

interface SearchProps {
  defaultQuery: string;
  onQueryChange: (query: string) => void;
}

export function Search(props: SearchProps) {
  const [query, setQuery] = useState<string>(props.defaultQuery);

  return (
    <form
      className="search"
      onSubmit={(event) => {
        event.preventDefault();
        props.onQueryChange(query);
      }}
    >
      <input
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
    </form>
  );
}
