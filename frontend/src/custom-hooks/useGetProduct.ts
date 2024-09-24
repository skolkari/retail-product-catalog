import { useState, useEffect } from "react";
import { Product } from "../models";

const useGetProduct = (id: string) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:3000/api/products/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }
        return response.json();
      })
      .then((data) => {
        setProduct(data);
        setIsLoading(false);
      })
      .catch(() => {
        setHasError(true);
        setIsLoading(false);
      });
  }, [id]);

  return { product, isLoading, hasError };
};

export default useGetProduct;
