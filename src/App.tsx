import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ProductDetail } from "@/components/Products/ProductDetail";
import { HomePage } from "./components/HomePage/HomePage";
import { SortProvider } from "@/Context/SortContext";
import { SearchProvider } from "@/Context/SearchContext";
import {NotFound} from "@/components/Notfound/NotFound";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <SearchProvider>
          <SortProvider>
            <Routes>
            <Route path="*" element={<NotFound />} />
              <Route path="/" element={<HomePage />} />
              <Route path="/productdetail/:id" element={<ProductDetail />} />
            </Routes>
          </SortProvider>
        </SearchProvider>
      </Router>
    </QueryClientProvider>
  );
};

export default App;