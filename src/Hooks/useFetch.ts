import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/api/ProductApi";
import type { ProductResponse } from "@/types/product";

export const useFetchProducts = () => {
  return useQuery<ProductResponse, Error>({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
};