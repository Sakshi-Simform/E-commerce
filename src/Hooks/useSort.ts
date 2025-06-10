import { useContext } from "react";
import type { SortContextType } from "@/types/product";
import { SortContext } from "@/Context/SortContext";

export const useSort = (): SortContextType => {
    const context = useContext(SortContext);
    if (!context) {
        throw new Error("useSort must be used within a SortProvider");
    }
    return context;
};