
import { createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [user, setUser] = useState({
        id: 1,
        name: "Admin User",
        email: "admin@myblog.com",
        role: "Administrator"
    });

    const [isLogged, setIsLogged] = useState(true);

    const login = (userData) => {
        setUser(userData);
        setIsLogged(true);
    };

    const logout = () => {
        setUser(null);
        setIsLogged(false);
    };

    const updateUser = (userData) => {
        setUser(currentUser => ({
            ...currentUser,
            ...userData
        }));
    };    

    return (
        <AuthContext.Provider
            value={{
                user,
                isLogged,
                login,
                logout,
                updateUser
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
