import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSearch } from "@/Hooks/useSearch";
import { supabase } from "@/supabase-client";

interface NavbarProps {
  isDetailPage?: boolean;
}

export const Navbar = ({ isDetailPage = false }: NavbarProps) => {
  const [showUserInfo, setShowUserInfo] = useState(false);

  const { searchQuery, setSearchQuery } = useSearch();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setShowUserInfo(false);
    window.location.href = "/sign-in";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  return (
    <nav
      className={`${isDetailPage
          ? "fixed top-0 left-0 right-0 z-40 bg-white shadow-md h-20 px-8 flex items-center justify-between"
          : "relative right-0 z-40 bg-white shadow-md h-20 px-8 flex items-center justify-end"
        }`}
    >
      {isDetailPage && (
        <Link
          to="/"
          className="flex items-center gap-2 text-blue-600 font-semibold px-3 py-2 rounded cursor-pointer"
          aria-label="Back to home"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </Link>
      )}

      <div className="flex items-center gap-6">
        {/* Show search bar only if NOT detail page */}
        {!isDetailPage && (
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
            >
            </button>
          </form>
        )}

        {/* User Icon & Dropdown */}
        <div className="relative">
          <FaUserCircle
            className="text-3xl text-gray-800 cursor-pointer hover:text-gray-600 transition-colors"
            onClick={() => setShowUserInfo((prev) => !prev)}
          />
          {showUserInfo && (
            <div className="absolute right-0 mt-3 w-64 bg-white border border-gray-200 rounded-md shadow-lg z-50 p-4 text-sm text-gray-800">
              <button
                onClick={handleLogout}
                className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition-colors cursor-pointer"
                aria-label="logout-btn"
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