import { createContext, PropsWithChildren, useState } from "react";

type AuthContextData = {};

export const AuthContext = createContext<AuthContextData>({});

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [value, setValue] = useState<AuthContextData>({});

  return (
    <AuthContext.Provider value={{ value, setValue }}>
      {children}
    </AuthContext.Provider>
  );
};
