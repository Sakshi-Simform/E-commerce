import type { ReactNode } from "react";

 {/* Product */}
export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  stock: number;
  thumbnail: string;
  brand:string;
  category:string;
  products: Array<Product>;
  total: number;
  skip: number;
  limit: number;
}

export interface ProductResponse {
  products: Array<Product>;
  total: number;
  skip: number;
  limit: number;
}

export interface ProductImage  {
  thumbnail: string;
  title: string;
  isLoading: boolean;
};

export interface ProductInfoProps  {
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  brand: string;
  category: string;
  stock: number;
};

{/* Context */}
export interface SortContextType {
  sort: string;
  setSort: (value: string) => void;
}

export interface SearchContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

{/* Error Boundry */}
export interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}