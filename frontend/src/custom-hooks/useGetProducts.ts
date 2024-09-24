import { useEffect, useState } from "react";
import { PaginatedProducts } from "../models";

const useGetProducts = (searchText: string, start: number, limit: number) => {
  const [paginatedProducts, setPaginatedProducts] =
    useState<PaginatedProducts>();
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let url;
    const limitQuery = `start=${start}&limit=${limit}`;

    if (!searchText) {
      url = `http://localhost:3000/api/products?${limitQuery}`;
    } else {
      url = `http://localhost:3000/api/search?q=${searchText}&${limitQuery}`;
    }

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        return response.json();
      })
      .then((data) => {
        setPaginatedProducts(data);
        setIsLoading(false);
      })
      .catch(() => {
        setHasError(true);
        setIsLoading(false);
      });
  }, [searchText, start, limit]);

  return { paginatedProducts, isLoading, hasError };
};

export default useGetProducts;
