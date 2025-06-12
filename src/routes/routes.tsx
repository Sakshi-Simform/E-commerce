import type{ RouteObject } from "react-router-dom";
import { HomePage } from "@/components/HomePage/HomePage";
import { ProductDetail } from "@/components/Products/ProductDetail";
import { NotFound } from "@/components/Notfound/NotFound";

export const routes: RouteObject[] = [
  { path: "/", element: <HomePage /> },
  { path: "/productdetail/:id", element: <ProductDetail /> },
  { path: "*", element: <NotFound /> },
];