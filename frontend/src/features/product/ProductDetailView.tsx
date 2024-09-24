import "./ProductDetailView.css";

import { useGetProduct } from "../../custom-hooks";
import { Loading } from "../../components";

interface ProductDetailViewProps {
  id: string;
  backToProductList: () => void;
}

const ProductDetailView = ({
  id,
  backToProductList,
}: ProductDetailViewProps) => {
  const { product, isLoading, hasError } = useGetProduct(id);

  if (isLoading) {
    return <Loading />;
  }

  if (hasError) {
    return <div>Error loading product</div>;
  }

  return (
    <>
      <div className="back-link">
        <a onClick={backToProductList}>← Back to Product List</a>
      </div>
      <div className="product-view">
        <div className="product-image">
          {product ? (
            <img src={product.imageUrl} alt={product.name} />
          ) : (
            <div className="image-not-found"></div>
          )}
        </div>
        {product ? (
          <div className="product-details">
            <h2>{product.name}</h2>
            <p className="description">{product.description}</p>
            <p className="category">Category: {product.category}</p>
            <p className="price">SEK {product.price}</p>
          </div>
        ) : (
          <div>Product not found</div>
        )}
      </div>
    </>
  );
};

export default ProductDetailView;
