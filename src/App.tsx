import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {ProductDetail} from "@/components/Products/ProductDetail";
import { HomePage } from "@/components/Products/ProductList";
import { SortProvider } from "@/Context/SortContext";
import { SearchProvider } from "@/Context/SearchContext";

const App = () => {
  return (
    <Router>
      <SearchProvider>
        <SortProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/productdetail/:id" element={<ProductDetail />} />
          </Routes>
        </SortProvider>
      </SearchProvider>
    </Router>
  );
};

export default App;