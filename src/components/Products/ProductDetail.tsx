import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { Product } from "@/types/product";
import { fetchProductById } from "@/api/ProductApi";

export const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getProduct = async () => {
      if (id) {
        const data = await fetchProductById(id);
        setProduct(data);
      }
    };
    getProduct();
  }, [id]);

  const discountedPrice = (price: number, discount: number) =>
    (price - (price * discount) / 100).toFixed(2);

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen bg-gray-50 flex flex-col items-center justify-center">
      <div className="relative p-8 max-w-3xl w-full bg-white text-black rounded-xl shadow-lg">
        {/* X Button */}
        <button
          onClick={() => navigate("/")}
          className="absolute top-4 right-4 text-gray-500 hover:text-black text-2xl font-bold"
          aria-label="Close"
        >
          &times;
        </button>

        {/* Image */}
        <div className="w-full flex justify-center items-center mb-6">
          <div className="w-full max-w-md h-96 flex justify-center items-center rounded">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="max-h-full max-w-full object-contain"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="product-info transition-opacity duration-300 text-center">
          <h2 className="text-3xl font-bold mb-4">{product.title}</h2>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <p className="text-xl font-semibold text-green-600 mb-2">
            Discounted Price: ${discountedPrice(product.price, product.discountPercentage)}
          </p>
          <p className="text-md text-gray-500 mb-1">
            Original Price: <span className="line-through">${product.price}</span>
          </p>
          <p className="text-md text-blue-500 mb-2">
            Discount: {product.discountPercentage}%
          </p>
          <p className="text-sm text-gray-500">
            Stock Available: {product.stock}
          </p>
        </div>
      </div>
    </div>
  );
};
