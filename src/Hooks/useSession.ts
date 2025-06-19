import { SessionContext } from "@/Context/SessionContext";
import { useContext } from "react";

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context)
    throw new Error("useSession must be used within SessionProvider");
  return context;
};