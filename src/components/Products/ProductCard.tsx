import { useEffect, useState, useMemo, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import type { Product } from "@/types/product";
import { useSort } from "@/Context/SortContext";
import { useSearch } from "@/Context/SearchContext";
import { fetchAllProducts } from "@/api/ProductApi";
import { useDebounce } from "@/Hooks/UseDebounce";
import "@/styles/ProductCard.css";

const LIMIT = 20;

export const ProductCard = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const [isSearching , setIsSearching] = useState(false);

  const observer = useRef<IntersectionObserver | null>(null);
  const navigate = useNavigate();
  const { sort } = useSort();
  const { searchQuery } = useSearch();

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const fetchMoreProducts = useCallback(async () => {
    if (loading || !hasMore || debouncedSearchQuery) return;

    setLoading(true);
    try {
      const newProducts = await fetchAllProducts(LIMIT, page * LIMIT);
      if (newProducts.length < LIMIT) setHasMore(false);

      setProducts((prev) => {
        const ids = new Set(prev.map((p) => p.id));
        const filtered = newProducts.filter((p) => !ids.has(p.id));
        return [...prev, ...filtered];
      });
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  }, [page, loading, hasMore, debouncedSearchQuery]);

  useEffect(() => {
    fetchMoreProducts();
  }, []); 
  
  useEffect(() => {
    if (debouncedSearchQuery.trim() === "") {
      setIsSearching(false);
      setHasMore(true);
      setPage(0);
    } else {
      setIsSearching(true);
      setLoading(true);
      setHasMore(false);
  
      fetchAllProducts(1000, 0)
        .then((res) => {
          setProducts(res);
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [debouncedSearchQuery]);
  
  const lastProductRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading || !hasMore || debouncedSearchQuery) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((prev) => prev + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore, debouncedSearchQuery]
  );

  const sortedProducts = useMemo(() => {
    const sorted = [...products];
    if (sort === "price-asc") sorted.sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") sorted.sort((a, b) => b.price - a.price);
    else if (sort === "name-asc") sorted.sort((a, b) => a.title.localeCompare(b.title));
    else if (sort === "name-desc") sorted.sort((a, b) => b.title.localeCompare(a.title));
    return sorted;
  }, [products, sort]);

  const filteredProducts = useMemo(
    () =>
      sortedProducts.filter((product) =>
        product.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
      ),
    [sortedProducts, debouncedSearchQuery]
  );

  return (
    <div className="p-4 sm:p-6 min-h-screen">
      {filteredProducts.length === 0 && !loading && isSearching ? (
        <p className="text-center text-gray-500 text-lg mt-10">
          No products found for "{debouncedSearchQuery}"
        </p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredProducts.map((product, index) => {
              const isLast = index === filteredProducts.length - 1;
              return (
                <div
                  key={product.id}
                  ref={isLast ? lastProductRef : null}
                  className="group perspective"
                >
                  <div className="relative bg-white w-full h-72 sm:h-80 duration-700 transform-style preserve-3d group-hover:rotate-y-180 transition-transform rounded-xl shadow-lg">
                    {/* Front */}
                    <div className="absolute w-full h-full backface-hidden rounded-xl shadow-lg p-4 bg-white text-black text-center">
                      <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="w-full h-36 sm:h-40 object-contain rounded mb-3"
                      />
                      <h3 className="text-base sm:text-lg font-bold mb-1">{product.title}</h3>
                      <p className="text-xs sm:text-sm text-black-300 mb-1">Price: ${product.price}</p>
                      <p className="text-xs sm:text-sm text-green-400">
                        Discount: {product.discountPercentage}%
                      </p>
                    </div>

                    {/* Back */}
                    <div className="absolute w-full h-full backface-hidden rotate-y-180 rounded-xl shadow-lg p-4 bg-white text-black text-center flex flex-col justify-center items-center">
                      <h3 className="text-base sm:text-lg font-semibold mb-2">{product.title}</h3>
                      <p className="text-xs sm:text-sm text-black-300">{product.description}</p>
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
              );
            })}
          </div>

          <div className="flex justify-center mt-6 h-10">
            {loading && (
              <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            )}
          </div>
        </>
      )}
    </div>
  );
};