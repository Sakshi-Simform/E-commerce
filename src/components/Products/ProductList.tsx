import { Sidebar } from "@/components/Sidebar/Sidebar";
import { Navbar } from "@/components/Navbar/Navbar";
import { ProductCard } from "@/components/Products/ProductCard";
import { Footer } from "@/components/Footer/Footer";

export const HomePage = () => {
  const focusOnSearch = () => {
    const input = document.getElementById("search") as HTMLInputElement | null;
    if (input) input.focus();
  };

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1">
        <Sidebar />
        <div className="ml-20 flex-1">
          <Navbar />
          <main className="pl-50 pt-18 bg-white min-h-[70vh] text-black">
            <ProductCard />
          </main>
        </div>
      </div>
      <Footer focusOnSearch={focusOnSearch} />
    </div>
  );
};