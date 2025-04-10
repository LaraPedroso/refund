import React, { createContext } from "react";

type AuthContextType = {
    session: null | UserAPIResponse;
};

export const AuthContext = createContext({});

export function AuthProvider({ children }: { children: React.ReactNode }) {
    return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
}
