import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock } from "lucide-react";
import { motion } from "framer-motion";

import { AuthContext } from "../context/AuthContext";

export default function Login({ goToSignup }) {

    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setIsSubmitting(true);

        try {
            const response = await login({
                email,
                password,
            });

            const user = response.data.user;

            if (user.roles?.includes("admin")) {
                navigate("/dashboard");
            } else {
                navigate("/");
            }

        } catch (error) {

            if (error.response?.status === 422) {
                setError(
                    Object.values(error.response.data.errors || {})
                        .flat()[0] || "Please check your information."
                );
            } else if (error.response?.status === 401) {
                setError("Invalid email or password.");
            } else {
                setError(
                    error.response?.data?.message ||
                    "Unable to log in. Please try again."
                );
            }

        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400">

            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white/70 backdrop-blur-lg border border-white/30 shadow-2xl rounded-2xl p-8 w-full max-w-md"
            >

                <h2 className="text-2xl font-bold text-center mb-6">
                    Welcome Back 👋
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* Error message */}
                    {error && (
                        <p
                            role="alert"
                            className="rounded-lg bg-red-50 p-3 text-sm text-red-600"
                        >
                            {error}
                        </p>
                    )}

                    {/* Email */}
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

                        <input
                            type="email"
                            placeholder="Email"
                            autoComplete="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full pl-10 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                    </div>

                    {/* Password */}
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

                        <input
                            type="password"
                            placeholder="Password"
                            autoComplete="current-password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full pl-10 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition duration-300 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {isSubmitting ? "Logging in..." : "Login"}
                    </button>

                </form>

                <p className="text-sm text-center mt-4">
                    Don’t have an account?{" "}

                    <button
                        type="button"
                        onClick={goToSignup}
                        className="text-indigo-600 font-semibold hover:underline"
                    >
                        Sign up
                    </button>
                </p>

            </motion.div>
        </div>
    );
}
