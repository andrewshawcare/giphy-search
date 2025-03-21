import { useState } from "react";

interface SearchProps {
  initialSearchValue: string;
  onQueryChange: (query: string) => void;
}

export function Search(props: SearchProps) {
  const [searchValue, setSearchValue] = useState<string>(
    props.initialSearchValue
  );

  return (
    <form
      className="search"
      onSubmit={(event) => {
        event.preventDefault();
        props.onQueryChange(searchValue);
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
