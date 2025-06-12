import { useNavigate } from "react-router-dom";
import cartIcon from "@/assets/cart.png";
import { useSort } from "@/Hooks/useSort";

export const Sidebar = () => {
  const navigate = useNavigate();
  const { sort, setSort } = useSort();

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSort(e.target.value);
  };

  return (
    <div className="w-64 bg-white text-black h-screen flex flex-col justify-between fixed top-0 left-0 z-50 px-8 py-5 shadow-lg">
      <div>
        <div className="flex justify-center mb-8 w-full">
          <img
            tabIndex={0}
            src={cartIcon}
            alt="Logo"
            className="h-14 w-14 rounded-full cursor-pointer border border-gray-700"
            onClick={() => navigate("/")}
          />
        </div>

        {/* Sort By */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Sort By</h2>
          <select
            value={sort}
            onChange={handleSortChange}
            className="w-full p-3 rounded bg-white-800 border border-gray-600 "
          >
            <option value="">-- Sort --</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name-asc">Name: A - Z</option>
            <option value="name-desc">Name: Z - A</option>
          </select>
        </div>
      </div>
    </div>
  );
};