import { Navigate } from "react-router-dom";
import type { SupabaseSession } from "@/types/supabase.type";
import { Loader } from "@/components/Loader/Loader";

interface PrivateRouteProps {
  session: SupabaseSession | null;
  children: React.ReactNode;
  loading:boolean;
}

const PrivateRoute = ({ loading , session, children }: PrivateRouteProps) => {
  if (loading) {
    return <Loader />; 
  }

  if (!session) {
    return <Navigate to="/sign-in" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;