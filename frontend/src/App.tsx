import { useState } from "react";
import "./App.css";
import { Searchbar } from "./components";

function App() {
  const [searchText, setSearchText] = useState("");

  return (
    <div className="page-container">
      <header className="header">
        <h1>Retail Product Catalog</h1>
      </header>

      <Searchbar
        searchText={searchText}
        onSearch={(searchText) => {
          setSearchText(searchText);
        }}
      />
    </div>
  );
}

export default App;
