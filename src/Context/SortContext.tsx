import { createContext, useState, type ReactNode } from "react";
import type { SortContextType } from "@/types/product";

export const SortContext = createContext<SortContextType | undefined>(undefined);

export const SortProvider = ({ children }: { children: ReactNode }) => {
  const [sort, setSort] = useState("");

  return (
    <SortContext.Provider value={{ sort, setSort }}>
      {children}
    </SortContext.Provider>
  );
};