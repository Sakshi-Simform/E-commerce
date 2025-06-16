import { useNavigate } from "react-router-dom";
import cartIcon from "@/assets/cart.png";
import { useSort } from "@/Hooks/useSort";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

enum SortOption {
  NONE = "",
  PRICE_ASC = "price-asc",
  PRICE_DESC = "price-desc",
  NAME_ASC = "name-asc",
  NAME_DESC = "name-desc",
}

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: SortOption.NONE, label: "-- No Sorting --" },
  { value: SortOption.PRICE_ASC, label: "Price: Low to High" },
  { value: SortOption.PRICE_DESC, label: "Price: High to Low" },
  { value: SortOption.NAME_ASC, label: "Name: A - Z" },
  { value: SortOption.NAME_DESC, label: "Name: Z - A" },
];

export const Sidebar = () => {
  const navigate = useNavigate();
  const { sort, setSort } = useSort();

  const handleSort = (value: SortOption) => {
    setSort(value);
  };

  const sortLabel =
    SORT_OPTIONS.find((option) => option.value === sort)?.label || "-- Sort --";

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

        {/* Sort By Dropdown */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Sort By</h2>
          <DropdownMenu.Root modal={false}>
            <DropdownMenu.Trigger asChild>
              <button className="w-full p-3 rounded bg-white border border-gray-600 text-left">
                {sortLabel}
              </button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content
              className="bg-white border rounded p-2 w-full"
              sideOffset={5}
            >
              {SORT_OPTIONS.map(({ value, label }) => (
                <DropdownMenu.Item key={value} onSelect={() => handleSort(value)}>
                  {label}
                </DropdownMenu.Item>
              ))}
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </div>
      </div>
    </div>
  );
};