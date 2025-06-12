import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SortProvider } from "@/Context/SortContext";
import { SearchProvider } from "@/Context/SearchContext";
import { routes } from "@/routes/routes";

const queryClient = new QueryClient();

const AppRoutes = () => {
  return useRoutes(routes);
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <SearchProvider>
          <SortProvider>
            <AppRoutes />
          </SortProvider>
        </SearchProvider>
      </Router>
    </QueryClientProvider>
  );
};

export default App;