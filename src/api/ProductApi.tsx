
import type { Product, ProductResponse } from "@/types/product";

export const fetchProducts = async (): Promise<ProductResponse> => {
  const res = await fetch("https://dummyjson.com/products");

  if (!res.ok) {
    console.error("API error:", res.status, res.statusText);
    throw new Error("Error occurred while fetching the Products.");
  }

  const data = await res.json();
  return data;
};

export const fetchProductById = async (id: string): Promise<Product> => {
  const res = await fetch(`https://dummyjson.com/products/${id}`);

  if (!res.ok) {
    throw new Error(`Error fetching product ${id}: ${res.statusText}`);
  }

  return res.json();
};