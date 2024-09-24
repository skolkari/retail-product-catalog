import "./Searchbar.css";

interface SearchbarProps {
  searchText: string;
  onSearch: (searchText: string) => void;
}

const Searchbar = ({ searchText, onSearch }: SearchbarProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    onSearch(text);
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
