import { Navigate } from "react-router-dom";
import type { SupabaseSession } from "@/types/supabase.type";
import { Loader } from "@/components/Loader/Loader";

interface PrivateRouteProps {
  session: SupabaseSession | null | undefined;
  children: React.ReactNode;
}

const PrivateRoute = ({ session, children }: PrivateRouteProps) => {
  if (session === undefined) {
    return <Loader />; 
  }

  if (!session) {
    return <Navigate to="/sign-in" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;