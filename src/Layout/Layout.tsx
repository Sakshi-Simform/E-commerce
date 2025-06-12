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
          <Navbar hideSearch={isDetailPage} isDetailPage={isDetailPage} />
          <main className="pl-50 pt-18 bg-white min-h-[70vh] text-black">
            <Outlet />
          </main>
        </div>
      </div>

      <Footer focusOnSearch={focusOnSearch} isDetailPage={isDetailPage} />
    </div>
  );
};

export default Layout;