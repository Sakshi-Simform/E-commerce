import {Sidebar} from "@/components/Sidebar/Sidebar";
import {Navbar} from "@/components/Navbar/Navbar";
import {ProductCard} from "@/components/Products/ProductCard";

export const HomePage = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-20 flex-1">
        <Navbar />
        <main className="pl-50 pt-18 bg-white min-h-screen text-white">
          <ProductCard />
        </main>
      </div>
    </div>
  );
};