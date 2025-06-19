import type { Product, ProductResponse } from "@/types/product";

const fetchProducts = async (): Promise<ProductResponse> => {
  try {
    const res = await fetch("https://dummyjson.com/products?skip=25&limit=150");

    if (!res.ok) {
      console.error("API error:", res.status, res.statusText);
      throw new Error("Error occurred while fetching the Products.");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("An error occurred while fetching products:", error);
    throw new Error("Error occurred while fetching the Products.");
  }
};

const fetchProductDetails = async (
  productId: string | number
): Promise<Product> => {
  try {
    const res = await fetch(`https://dummyjson.com/products/${productId}`);

    if (!res.ok) {
      throw new Error("Failed to fetch product");
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching product details:", error);
    throw error;
  }
};

export { fetchProducts, fetchProductDetails };