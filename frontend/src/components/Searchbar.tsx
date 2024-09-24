import { useCallback } from "react";
import "./Searchbar.css";
import { debounce, throttle } from "../utils";

interface SearchbarProps {
  searchText: string;
  onSearch: (searchText: string) => void;
}

const Searchbar = ({ searchText, onSearch }: SearchbarProps) => {
  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((text: string) => {
      onSearch(text);
    }, 500),
    []
  );

  // Throttled input handler
  const throttledInputHandler = useCallback(
    throttle((text: string) => {
      debouncedSearch(text);
    }, 300),
    []
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    throttledInputHandler(text); // Use throttled input handler
  };

  return (
    <div className="search-bar">
      <input
        type="search"
        placeholder="Search products..."
        className="search-input"
        value={searchText}
        onChange={handleChange}
      />
      <button className="search-btn" onClick={() => onSearch(searchText)}>
        Search
      </button>
    </div>
  );
};

export default Searchbar;
