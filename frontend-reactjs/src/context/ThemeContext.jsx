import { createContext, useState } from "react";

// 1. Crear el contexto
export const ThemeContext = createContext();

// 2. Crear el Provider
export function ThemeProvider({ children }) {

    const [theme, setTheme] = useState("light");

    const toggleTheme = () => {
        setTheme(currentTheme =>
            currentTheme === "light" ? "dark" : "light"
        );
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}
