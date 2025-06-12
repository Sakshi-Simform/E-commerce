import { useQuery } from "@tanstack/react-query";
import { fetchProducts , fetchProductById } from "@/api/productApi";
import type { Product, ProductResponse } from "@/types/product";

export const useFetchProducts = () => {
  return useQuery<ProductResponse, Error>({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
};

export const useFetchProductById = (productId?: string) => {
  return useQuery<Product, Error>({
    queryKey: ["product", productId],
    queryFn: () => fetchProductById(productId!)
  });
};