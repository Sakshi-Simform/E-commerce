import { useParams, useNavigate } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useFetchProductById } from "@/Hooks/useFetch";

export const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: product, error, isLoading } = useFetchProductById(id);

  const discountedPrice = (price: number, discount: number) =>
    (price - (price * discount) / 100).toFixed(2);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white pt-20 pb-28">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white text-red-600 p-6 pt-20 pb-28">
        <h2 className="text-3xl font-bold mb-4">
          Sorry, we couldn't load the product details. Please try again later.
        </h2>
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

  if (!product) return null;

  return (
    <main className="fixed inset-0 bg-white p-6 sm:p-10 text-black pt-24 pb-28 overflow-hidden">
      <div className="flex flex-col md:flex-row justify-center items-start gap-8 w-full">
        <div className="w-full md:w-[550px] h-[300px] sm:h-[450px] md:h-[500px] flex justify-center items-center rounded-lg overflow-hidden bg-gray-100 mt-20">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="max-w-full max-h-full object-contain"
          />
        </div>
        <div className="flex flex-col gap-6 w-full md:w-[55%]">
          <h2 className="text-3xl font-bold mt-26">{product.title}</h2>
          <p className="text-gray-700">{product.description}</p>

          <div className="text-2xl font-semibold flex items-center gap-2">
            <span className="line-through text-gray-400">${product.price}</span>
            <span>${discountedPrice(product.price, product.discountPercentage)}</span>
            <span className="text-sm text-green-600 font-medium">
              -{product.discountPercentage}%
            </span>
          </div>

          <p className="text-gray-600">
            Brand: <span className="font-semibold">{product.brand}</span>
          </p>
          <p className="text-gray-600">
            Category: <span className="font-semibold">{product.category}</span>
          </p>
          <p className="text-gray-600">
            Stock available: <span className="font-semibold">{product.stock}</span>
          </p>
        </div>
      </div>
    </main>
  );
};