import React, { createContext, useState } from "react";

type SessionContextType = {
  session: string | null;
  setSession: (session: string | null) => void;
};

const SessionContext = createContext<SessionContextType | undefined>(undefined);

const SessionProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<string | null>(null);

  return (
    <SessionContext.Provider value={{ session, setSession }}>
      {children}
    </SessionContext.Provider>
  );
};

export { SessionContext, SessionProvider };