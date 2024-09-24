import { useCallback, useState } from "react";
import "./Searchbar.css";
import { throttle } from "../utils";

interface SearchbarProps {
  searchText: string;
  onSearch: (searchText: string) => void;
}

const Searchbar = ({ searchText, onSearch }: SearchbarProps) => {
  const [searchTerm, setSearchTerm] = useState(searchText);
  // Throttled input handler
  const throttledInputHandler = useCallback(
    throttle((text: string) => {
      onSearch(text);
    }, 300),
    []
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setSearchTerm(text);
    throttledInputHandler(text); // Use throttled input handler
  };

  return (
    <div className="search-bar">
      <input
        type="search"
        placeholder="Search products..."
        className="search-input"
        value={searchTerm}
        onChange={handleChange}
      />
      <button className="search-btn" onClick={() => onSearch(searchText)}>
        Search
      </button>
    </div>
  );
};

export default Searchbar;
