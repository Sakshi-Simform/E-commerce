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
}

export interface SortContextType {
  sort: string;
  setSort: (value: string) => void;
}

export interface SearchContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}