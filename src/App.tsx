import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import { supabase } from "@/supabase-client";
import { SortProvider } from "@/Context/SortContext";
import { SearchProvider } from "@/Context/SearchContext";
import { routerWithSession } from "@/routes/routes";
import type { SupabaseSession } from "@/types/supabase.type";

const queryClient = new QueryClient();

const App = () => {
  const [session, setSession] = useState<SupabaseSession | null | undefined>(undefined);

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session ?? null);
    };

    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  if (session === undefined) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <SearchProvider>
        <SortProvider>
          <RouterProvider router={routerWithSession(session)} />
        </SortProvider>
      </SearchProvider>
    </QueryClientProvider>
  );
};

export default App;