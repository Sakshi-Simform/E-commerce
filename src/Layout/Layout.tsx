import { Outlet, useLocation } from "react-router-dom";
import { Sidebar } from "@/components/Sidebar/Sidebar";
import { Navbar } from "@/components/Navbar/Navbar";
import { Footer } from "@/components/Footer/Footer";

const Layout = () => {
  const location = useLocation();

  const isDetailPage = location.pathname.startsWith("/productdetail");

  const focusOnSearch = () => {
    const input = document.getElementById("search") as HTMLInputElement | null;
    if (input) input.focus();
  };

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1">
        {!isDetailPage && <Sidebar />}
        <div className={`${!isDetailPage ? "ml-20" : ""} flex-1`}>
          <Navbar isDetailPage={isDetailPage} />
          <main className={`pt-18 bg-white min-h-[10vh] text-black ${!isDetailPage ? "pl-20" : "px-4 sm:px-6 lg:px-8"}`}>
            <Outlet />
          </main>
        </div>
      </div>

      <Footer focusOnSearch={focusOnSearch} isDetailPage={isDetailPage} />
    </div>
  );
};

export default Layout;