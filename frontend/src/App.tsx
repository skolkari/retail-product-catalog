import { useState } from "react";
import "./App.css";
import { Searchbar } from "./components";
import { ProductListView, ProductDetailView } from "./features/product";

function App() {
  const [searchText, setSearchText] = useState("");
  const [productId, setProductId] = useState("");
  const [showProductDetails, setShowProductDetails] = useState(false);

  const handleProductClick = (id: string) => {
    setProductId(id);
    setShowProductDetails(true);
  };

  const handleBackClick = () => {
    setShowProductDetails(false);
  };

  return (
    <div className="page-container">
      <header className="header">
        <h1>Retail Product Catalog</h1>
      </header>

      {showProductDetails ? (
        <ProductDetailView id={productId} backToProductList={handleBackClick} />
      ) : (
        <>
          <Searchbar
            searchText={searchText}
            onSearch={(searchText) => {
              setSearchText(searchText);
            }}
          />
          <ProductListView
            searchText={searchText}
            handleProductClick={handleProductClick}
          />
        </>
      )}
    </div>
  );
}

export default App;
