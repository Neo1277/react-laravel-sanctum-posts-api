import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import ThemeDisplay from "./ThemeDisplay";

export default function ThemeButton() {

    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <div className="p-6 border rounded-lg">

            <h2 className="text-xl font-bold mb-4">
                Context API Example
            </h2>

            <p className="mb-4">
                Current theme: <strong>{theme}</strong>
            </p>

            <button
                onClick={toggleTheme}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                Change theme
            </button>

            <ThemeDisplay />

        </div>
    );
}
