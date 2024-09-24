import { fuzzySearch } from "./fuzzySearchService";

interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  imageUrl: string;
}

interface PaginatedProducts {
  products: Product[];
  total: number;
}

/**
 * Variable to store the list of products in memory
 */
export const products: Product[] = [];

/**
 * Generate a random id
 * @returns A random id
 */
const generateRandomId = (): string => {
  return Math.random().toString(36).substring(2, 11);
};

/**
 * Add a product to the list of products
 * @param product The product to add
 */
export const addProduct = (product: Product) => {
  product.id = generateRandomId();
  products.push(product);
};

/**
 * Get all products
 * @param id The id of the product to retrieve
 * @returns The product with the given id, or undefined if no product was found
 */
export const getProductById = (id: string): Product | undefined => {
  return products.find((product) => product.id === id);
};

/**
 * Get all products with pagination information
 * @param startPage The page number to start from
 * @param limit The number of products to return
 * @returns A list of products with pagination information
 */
export const getAllProducts = (
  startPage: number,
  limit: number
): PaginatedProducts => {
  const start = (startPage - 1) * limit;
  const end = start + limit;
  return {
    products: products.slice(start, end),
    total: products.length,
  };
};

/**
 * Search for products by name
 * @param query Search text
 * @returns A list of products that match the query with pagination information
 */
export const searchProducts = (
  query: string,
  startPage: number,
  limit: number
): PaginatedProducts => {
  const filteredProducts = products.filter((product) =>
    fuzzySearch(product.name, query, 2)
  );
  const start = (startPage - 1) * limit;
  const end = start + limit;

  return {
    products: filteredProducts.slice(start, end),
    total: filteredProducts.length,
  };
};
