export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  imageUrl: string;
}

export interface PaginatedProducts {
  products: Product[];
  total: number;
}
