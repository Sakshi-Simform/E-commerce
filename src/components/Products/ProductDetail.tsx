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
    <main className="min-h-screen bg-white p-6 sm:p-10 text-black pb-28 flex items-start justify-center pt-10">
      <div className="flex flex-col md:flex-row justify-center items-start gap-12 w-full max-w-6xl">
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
    </main>
  );
};