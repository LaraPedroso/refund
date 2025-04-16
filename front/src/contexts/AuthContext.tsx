import React, { createContext, useEffect, useState } from "react";
import { set } from "zod";
import { api } from "../services/api";

type AuthContextType = {
    isLoading: boolean;
    session: null | UserAPIResponse;
    save: (data: UserAPIResponse) => void;
    remove: () => void;
};

const LOCAL_STORAGE_KEY = "@refund";

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [session, setSession] = useState<UserAPIResponse | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    function save(data: UserAPIResponse) {
        localStorage.setItem(`${LOCAL_STORAGE_KEY}:token`, data.token);
        localStorage.setItem(
            `${LOCAL_STORAGE_KEY}:user`,
            JSON.stringify(data.user)
        );

        api.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;

        setSession(data);
    }

    function remove() {
        setSession(null);
        localStorage.removeItem(`${LOCAL_STORAGE_KEY}:token`);
        localStorage.removeItem(`${LOCAL_STORAGE_KEY}:user`);
        window.location.assign("/");
    }

    function loadUser() {
        const user = localStorage.getItem(`${LOCAL_STORAGE_KEY}:user`);
        const token = localStorage.getItem(`${LOCAL_STORAGE_KEY}:token`);

        if (token && user) {
            api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

            setSession({
                token,
                user: JSON.parse(user),
            });
        }

        setIsLoading(false);
    }

    useEffect(() => {
        loadUser();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                session,
                save,
                isLoading,
                remove,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
