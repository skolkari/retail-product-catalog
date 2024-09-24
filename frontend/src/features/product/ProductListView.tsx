import "./ProductListView.css";
import { useEffect, useState } from "react";

import { Product } from "../../models";
import { Loading, Pagination } from "../../components";
import useGetProducts from "../../custom-hooks/useGetProducts";

interface ProductListViewProps {
  searchText: string;
  handleProductClick: (id: string) => void;
}

const ProductListView = ({
  searchText,
  handleProductClick,
}: ProductListViewProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(12);
  const [totalPages, setTotalPages] = useState(1);
  const [products, setProducts] = useState<Product[]>([]);

  const { paginatedProducts, isLoading, hasError } = useGetProducts(
    searchText,
    currentPage,
    limit
  );

  useEffect(() => {
    if (!paginatedProducts) return;
    if (paginatedProducts.total) {
      setTotalPages(Math.ceil(paginatedProducts.total / limit));
    } else {
      setTotalPages(0);
    }

    if (paginatedProducts.products) {
      setProducts(paginatedProducts.products);
    }
  }, [paginatedProducts, limit]);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const onLimitChange = (limit: number) => {
    setLimit(limit);
  };

  if (isLoading) {
    return <Loading />;
  }

  if (hasError) {
    return <div>Error loading products</div>;
  }

  return (
    <>
      <div className="product-grid">
        {products &&
          products.map((product) => (
            <div
              key={product.id}
              className="product-card"
              onClick={() => handleProductClick(product.id)}
            >
              <img src={product.imageUrl} alt={product.name} />
              <h3>{product.name}</h3>
              <p className="description">{product.description}</p>
              <p className="category">Category: {product.category}</p>
              <p className="price">SEK {product.price}</p>
            </div>
          ))}
        {products.length === 0 && <div>No products found</div>}
      </div>

      <Pagination
        totalPages={totalPages}
        onPageChange={onPageChange}
        onLimitChange={onLimitChange}
      />
    </>
  );
};

export default ProductListView;
