import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useSort } from "@/Hooks/useSort";
import { useSearch } from "@/Hooks/useSearch";
import { useDebounce } from "@/Hooks/useDebounce";
import { useFetchProducts } from "@/Hooks/useFetch";
import "@/styles/ProductCard.css";

export const ProductCard = () => {
  const navigate = useNavigate();
  const { sort } = useSort();
  const { searchQuery } = useSearch();
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const { data, error, isLoading } = useFetchProducts();

  const products = data?.products ?? [];
  const trimmedQuery = debouncedSearchQuery.trim().toLowerCase();

  // Sort products
  const sortedProducts = useMemo(() => {
    const sorted = [...products];
    if (sort === "price-asc") sorted.sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") sorted.sort((a, b) => b.price - a.price);
    else if (sort === "name-asc") sorted.sort((a, b) => a.title.localeCompare(b.title));
    else if (sort === "name-desc") sorted.sort((a, b) => b.title.localeCompare(a.title));
    return sorted;
  }, [products, sort]);

  // Filter by search query
  const filteredProducts = useMemo(() => {
    if (!trimmedQuery) return sortedProducts;
    return sortedProducts.filter((product) =>
      product.title.toLowerCase().includes(trimmedQuery)
    );
  }, [sortedProducts, trimmedQuery]);

  return (
    <div className="p-4 sm:p-6 min-h-screen ml-0 md:ml-20">
      {error && (
        <p className="text-center text-red-500 text-lg mt-10">
          Error loading products: {error.message}
        </p>
      )}

      {!error && filteredProducts.length === 0 && !isLoading && trimmedQuery !== "" && (
        <p className="text-center text-gray-500 text-lg mt-10">
          No products found for "{debouncedSearchQuery}"
        </p>
      )}

      {!error && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group perspective cursor-pointer"
                onClick={() => navigate(`/productdetail/${product.id}`)}
              >
                <div className="relative bg-white w-full duration-700 transform-style preserve-3d group-hover:rotate-y-180 transition-transform rounded-xl shadow-lg min-h-[18rem] sm:min-h-[20rem]">
                  {/* Front */}
                  <div className="absolute w-full h-full backface-hidden rounded-xl shadow-lg p-4 bg-white text-black text-center flex flex-col">
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="w-full h-36 sm:h-40 object-contain rounded mb-3 flex-shrink-0"
                    />
                    <h3 className="text-base sm:text-lg font-bold mb-1 truncate">{product.title}</h3>
                    <p className="text-xs sm:text-sm text-gray-500 mb-1 truncate">Price: ${product.price}</p>
                    <p className="text-xs sm:text-sm text-green-600 truncate">
                      Discount: {product.discountPercentage}%
                    </p>
                    <div className="flex-grow" />
                  </div>

                  {/* Back */}
                  <div className="absolute w-full h-full backface-hidden rotate-y-180 rounded-xl shadow-lg p-4 bg-white text-black text-center flex flex-col justify-center items-center overflow-auto">
                    <h3 className="text-base sm:text-lg font-semibold mb-2">{product.title}</h3>
                    <p className="text-xs sm:text-sm text-gray-500 overflow-auto max-h-[6rem] hide-scrollbar">
                      {product.description}
                    </p>
                    <div className="mt-4 flex items-center gap-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/productdetail/${product.id}`);
                        }}
                        className="px-3 sm:px-4 py-2 bg-blue-600 text-white flex items-center rounded hover:bg-blue-700 cursor-pointer text-xs sm:text-sm"
                        aria-label="viewdetail-btn"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>

            ))}
          </div>

          {isLoading && (
            <div className="flex justify-center mt-6 h-10">
              <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </>
      )}
    </div>
  );
};