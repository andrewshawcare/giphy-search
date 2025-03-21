import { useState } from "react";

interface SearchProps {
  onQueryChange: ({ query }: { query: string }) => void;
}

export function Search(props: SearchProps) {
  const [searchValue, setSearchValue] = useState<string>("");

  return (
    <form
      className="search"
      onSubmit={(event) => {
        event.preventDefault();
        props.onQueryChange({ query: searchValue });
      }}
    >
      <input
        type="search"
        value={searchValue}
        onChange={(event) => setSearchValue(event.target.value)}
      />
    </form>
  );
}
