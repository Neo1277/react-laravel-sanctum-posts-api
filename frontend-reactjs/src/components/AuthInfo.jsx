import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function AuthInfo() {

    const { user, isLogged, logout } = useContext(AuthContext);

    if (!isLogged) {
        return (
            <p className="text-red-600">
                No user is logged in.
            </p>
        );
    }

    return (
        <div className="border rounded-lg p-4 mt-4">

            <h2 className="font-bold text-lg mb-2">
                Auth Context Example
            </h2>

            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Role: {user.role}</p>

            <button
                onClick={logout}
                className="mt-4 bg-red-600 text-white px-4 py-2 rounded"
            >
                Logout
            </button>

        </div>
    );
}
