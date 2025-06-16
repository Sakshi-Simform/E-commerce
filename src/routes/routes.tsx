import { createBrowserRouter, Navigate } from "react-router-dom";
import Layout from "@/Layout/Layout";
import { HomePage } from "@/pages/HomePage";
import { ProductDetail } from "@/components/Products/ProductDetail";
import { NotFound } from "@/components/Notfound/NotFound";
import { SignIn } from "@/pages/SignIn";
import { SignUp } from "@/pages/SignUp";
import PrivateRoute from "@/Auth/PrivateRoutes";
import type { SupabaseSession } from "@/types/supabase.type";

export const routerWithSession = (
  session: SupabaseSession | null,
  loading: boolean
) =>
  createBrowserRouter([
    {
      path: "/",
      element: (
        <PrivateRoute session={session} loading={loading}>
          <Layout />
        </PrivateRoute>
      ),
      children: [
        { index: true, element: <HomePage /> },
        { path: "productdetail/:id", element: <ProductDetail /> },
      ],
    },
    {
      path: "/sign-in",
      element: !session ? <SignIn /> : <Navigate to="/" />,
    },
    {
      path: "/sign-up",
      element: !session ? <SignUp /> : <Navigate to="/" />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);