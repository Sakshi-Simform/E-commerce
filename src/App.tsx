import { useEffect, useState } from "react";
import { RouterProvider } from "react-router-dom";
import { routerWithSession } from "@/routes/routes";
import { checkAuth } from "@/utils/authValidation";
import { useSession } from "@/Hooks/useSession";
import { SortProvider } from "@/Context/SortContext";
import { SearchProvider } from "@/Context/SearchContext";

const App = () => {
  const [loading, setLoading] = useState(true);
  const { session, setSession } = useSession();

  useEffect(() => {
    async function validate() {
      const token = await checkAuth();
      setSession(token);
      setLoading(false);
    }
    validate();
  }, [setSession]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  const router = routerWithSession(session, loading);

  return (
    <SearchProvider>
      <SortProvider>

        <RouterProvider router={router} />
      </SortProvider>
    </SearchProvider>

  );
};

export default App;