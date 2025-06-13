import { useNavigate } from "react-router-dom";
import cartIcon from "@/assets/cart.png";
import { useSort } from "@/Hooks/useSort";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

export const Sidebar = () => {
  const navigate = useNavigate();
  const { sort, setSort } = useSort();

  const handleSort = (value: string) => {
    setSort(value);
  };

  const sortLabel =
    {
      "price-asc": "Price: Low to High",
      "price-desc": "Price: High to Low",
      "name-asc": "Name: A - Z",
      "name-desc": "Name: Z - A",
    }[sort] || "-- Sort --";

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
              <DropdownMenu.Item onSelect={() => handleSort("")}>
                -- No Sorting --
              </DropdownMenu.Item>
              <DropdownMenu.Item onSelect={() => handleSort("price-asc")}>
                Price: Low to High
              </DropdownMenu.Item>
              <DropdownMenu.Item onSelect={() => handleSort("price-desc")}>
                Price: High to Low
              </DropdownMenu.Item>
              <DropdownMenu.Item onSelect={() => handleSort("name-asc")}>
                Name: A - Z
              </DropdownMenu.Item>
              <DropdownMenu.Item onSelect={() => handleSort("name-desc")}>
                Name: Z - A
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </div>
      </div>
    </div>
  );
};