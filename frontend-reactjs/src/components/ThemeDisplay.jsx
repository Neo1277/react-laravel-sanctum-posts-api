import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function ThemeDisplay() {

    const { theme } = useContext(ThemeContext);

    return (
        <div className="p-4 mt-4 border rounded-lg">
            <h2 className="font-bold text-lg">
                Theme Display
            </h2>

            <p className="mt-2">
                The current theme is: <strong>{theme}</strong>
            </p>
        </div>
    );
}
