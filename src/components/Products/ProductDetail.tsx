import { useParams } from "react-router-dom";
import { useFetchProductById } from "@/Hooks/useFetch";
import { NotFound } from "../Notfound/NotFound";
import { ProductImageWithSpinner } from "./ProductItem";
import { ProductInfo } from "@/components/Products/ProductInfo";

export const ProductDetail = () => {
  const { id } = useParams();

  const { data: product, error, isLoading } = useFetchProductById(id);

  if (error) return <NotFound />;

  if (!product) return null;

  return (
    <main className="min-h-screen py-10 mt-20">

      <div className="max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="bg-white  rounded-2xl p-6 space-y-8">
          <div className="flex flex-col lg:flex-row gap-15 items-start">
            <ProductImageWithSpinner
              thumbnail={product.thumbnail}
              title={product.title}
              isLoading={isLoading}
            />
            <ProductInfo
              title={product.title}
              description={product.description}
              price={product.price}
              discountPercentage={product.discountPercentage}
              brand={product.brand}
              category={product.category}
              stock={product.stock}
            />
          </div>
        </div>
      </div>
    </main>
  );
};