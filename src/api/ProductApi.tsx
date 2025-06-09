import axios from "axios";
import type { Product } from "@/types/product";

export const fetchAllProducts = async (
  limit: number,
  skip: number
): Promise<Product[]> => {
  try {
    const res = await axios.get("https://dummyjson.com/products", {
      params: { limit, skip },
    });
    return res.data.products;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    throw new Error("Failed to fetch products");
  }
};

export const fetchProductById = async (id: string): Promise<Product> => {
  try {
    const res = await axios.get(`https://dummyjson.com/products/${id}`);
    return res.data;
  } catch (error) {
    console.error("Product not found:", error);
    throw new Error("Product not found");
  }
};