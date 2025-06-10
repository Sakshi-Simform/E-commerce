import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import type { Product } from "@/types/product";
import { fetchProductById } from "@/api/ProductApi";

export const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getProduct = async () => {
      if (id) {
        setLoading(true);
        setError(null);
        try {
          const data = await fetchProductById(id);
          if (!data) {
            setError("Product not found");
            setProduct(null);
          } else {
            setProduct(data);
          }
        } catch{
          setError("Failed to fetch product");
          setProduct(null);
        } finally {
          setLoading(false);
        }
      }
    };
    getProduct();
  }, [id]);

  const discountedPrice = (price: number, discount: number) =>
    (price - (price * discount) / 100).toFixed(2);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white text-red-600 p-6">
        <h2 className="text-3xl font-bold mb-4">{error}</h2>
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-blue-600 font-semibold px-3 py-2 rounded cursor-pointer"
        >
          <AiOutlineArrowLeft className="text-xl" />
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-start p-6 sm:p-10 bg-white text-black relative">
      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-2 text-blue-600 font-semibold  px-3 py-2 rounded w-max cursor-pointer"
      >
        <AiOutlineArrowLeft className="text-xl" />
        Back
      </button>

      <div className="flex flex-col md:flex-row justify-center items-start gap-8 w-full max-w-[1200px] mx-auto">

        {/* Left: Image */}
        <div className="w-full md:w-[550px] h-[400px] sm:h-[550px] md:h-[650px] flex justify-center items-center rounded-lg overflow-hidden bg-gray-100">
          <img
            src={product!.thumbnail}
            alt={product!.title}
            className="w-full md:w-[550px] h-full sm:h-[550px] md:h-[650px] object-contain rounded-md"
          />
        </div>

        {/* Right: Product Info */}
        <div className="flex flex-col justify-start pl-0 md:pl-5 w-full md:w-[55%]">
          <h1 className="text-3xl font-bold mb-8">{product!.title}</h1>
          <p className="text-gray-700 mb-6 text-lg">{product!.description}</p>
          <div className="mb-6">
            <span className="text-3xl text-green-600 font-semibold">
              ${discountedPrice(product!.price, product!.discountPercentage)}
            </span>
            <span className="text-lg text-gray-500 line-through ml-4">
              ${product!.price}
            </span>
          </div>

          <p className="text-lg sm:text-xl text-blue-600 mb-6 font-medium">
            Discount: {product!.discountPercentage}%
          </p>
          <p className="text-lg sm:text-xl text-gray-500 mb-6">
            Category: <span className="capitalize font-semibold">{product!.category}</span>
          </p>
          <p className="text-lg sm:text-xl text-gray-500 mb-6 font-semibold">
            Brand: {product!.brand}
          </p>
          <p className="text-sm sm:text-xl text-gray-500 mb-6 font-semibold">
            Stock Available: {product!.stock}
          </p>
        </div>
      </div>
    </div>
  );
};