import { useContext } from "react";
import { Navigate } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {

    const { isLogged, loading } = useContext(AuthContext);

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <p className="text-gray-600">Checking session...</p>
            </div>
        );
    }

    if (!isLogged) {
        return <Navigate to="/login" replace />;
    }

    return children;
}
