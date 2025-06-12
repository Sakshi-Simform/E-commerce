import { Navigate } from "react-router-dom"; 
import type { SupabaseSession } from "@/types/supabase.type";

interface PrivateRouteProps {
  session: SupabaseSession | null | undefined;
  children: React.ReactNode;
}

const PrivateRoute = ({ session, children }: PrivateRouteProps) => {
  if (session === undefined) {
    return <div>Loading session...</div>;
  }
  if (!session) {
    return <Navigate to="/sign-in" replace />;
  }
  return <>{children}</>;
};

export default PrivateRoute;