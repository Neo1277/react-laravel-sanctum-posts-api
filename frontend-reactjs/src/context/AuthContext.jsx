import { createContext, useEffect, useState } from "react";
import authService from "../services/authService";

export const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Check the authenticated user when the application starts
    useEffect(() => {

        const checkAuth = async () => {
            try {
                const response = await authService.getUser();

                setUser(response.data.user);

            } catch (error) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();

    }, []);

    // Authenticate user
    const login = async (credentials) => {
        const response = await authService.login(credentials);

        setUser(response.data.user);

        return response;
    };

    // Register a new user
    const register = async (userData) => {
        const response = await authService.register(userData);

        setUser(response.data.user);

        return response;
    };

    // Log out authenticated user
    const logout = async () => {
        await authService.logout();

        setUser(null);
    };

    // Update user information in context
    const updateUser = (userData) => {
        setUser(currentUser => ({
            ...currentUser,
            ...userData
        }));
    };

    const isLogged = Boolean(user);

    return (
        <AuthContext.Provider
            value={{
                user,
                isLogged,
                loading,
                login,
                register,
                logout,
                updateUser
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
