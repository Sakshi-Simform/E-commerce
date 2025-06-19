import { Navigate } from "react-router-dom";
import { Loader } from "@/components/Loader/Loader";

const PrivateRoute = ({
  session,
  loading,
  children,
}: {
  session: string | null;
  loading: boolean;
  children: React.ReactNode;
}) => {
  if (loading) {
    return <Loader />;
  }

  if (!session) {
    return <Navigate to="/sign-in" replace />;
  }

  return children;
};

export default PrivateRoute;