import { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useSearch } from "@/Hooks/useSearch";

export const Navbar = () => {
  const [showUserInfo, setShowUserInfo] = useState(false);
  const [user, setUser] = useState({ username: "", email: "" });

  const { searchQuery, setSearchQuery } = useSearch();

  useEffect(() => {
    const stored = localStorage.getItem("currentUser");
    if (stored) {
      const storedUser = JSON.parse(stored);
      setUser({
        username: storedUser.name || "",
        email: storedUser.email || "",
      });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setShowUserInfo(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  return (
    <nav className="fixed top-0 left-20 right-0 z-40 bg-white shadow-md h-20 px-8 flex items-center justify-end">
      <div className="flex items-center gap-6">
        {/* Search Bar */}
        <form
  onSubmit={handleSubmit}
  className="flex items-center bg-gray-100 text-gray-700 rounded-md px-4 py-2 w-64 focus-within:ring-2 focus-within:ring-gray-300"
>
  <input
    id="search"
    type="text"
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    placeholder="Search..."
    className="flex-1 bg-transparent placeholder-gray-500 outline-none"
  />
  <button
    type="submit"
    className="ml-2 text-gray-600 hover:text-black transition-colors"
    aria-label="submit-btn"
  ></button>
</form>

        {/* User Icon & Dropdown */}
        <div className="relative">
          <FaUserCircle
          
            className="text-3xl text-gray-800 cursor-pointer hover:text-gray-600 transition-colors"
            onClick={(e) => e.preventDefault()}
          />
          {showUserInfo && (
            <div className="absolute right-0 mt-3 w-64 bg-white border border-gray-200 rounded-md shadow-lg z-50 p-4 text-sm text-gray-800">
              <p className="mb-2">
                <span className="font-semibold">Username:</span> {user.username}
              </p>
              <p className="mb-4">
                <span className="font-semibold">Email:</span> {user.email}
              </p>
              <button
                onClick={handleLogout}
                className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition-colors"
                aria-label="log-out btn"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};