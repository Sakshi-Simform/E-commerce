import { useParams } from "react-router-dom";
import { useFetchProductById } from "@/Hooks/useFetch";
import { NotFound } from "../Notfound/NotFound";

export const ProductDetail = () => {
  const { id } = useParams();

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
    return <NotFound />
  }

  if (!product) return null;

  return (
    <main className="min-h-screen bg-white p-6 sm:p-10 text-black pb-28 flex items-start justify-center pt-10">
      <div className="flex flex-col md:flex-row justify-center items-start gap-12 w-full max-w-6xl">
        {/* Product Image */}
        <div className="w-full md:w-[500px] h-[600px] flex justify-center items-center rounded-lg overflow-hidden bg-gray-100">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-full object-contain"
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col gap-6 w-full md:w-[55%]">
          <h2 className="text-4xl font-bold">{product.title}</h2>
          <p className="text-gray-700 text-lg">{product.description}</p>

          <div className="text-3xl font-semibold flex items-center gap-3">
            <span className="line-through text-gray-400">${product.price}</span>
            <span>${discountedPrice(product.price, product.discountPercentage)}</span>
            <span className="text-base text-green-600 font-medium">
              -{product.discountPercentage}%
            </span>
          </div>

          <p className="text-gray-600 text-lg">
            Brand: <span className="font-semibold">{product.brand}</span>
          </p>
          <p className="text-gray-600 text-lg">
            Category: <span className="font-semibold">{product.category}</span>
          </p>
          <p className="text-gray-600 text-lg">
            Stock available: <span className="font-semibold">{product.stock}</span>
          </p>
        </div>
      </div>
    </main>
  );
};