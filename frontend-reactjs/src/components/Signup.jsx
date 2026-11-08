import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, User, Phone } from "lucide-react";

import { AuthContext } from "../context/AuthContext";

export default function Signup({ goToLogin }) {

    const { register } = useContext(AuthContext);
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        phone_number: "",
    });

    const [errors, setErrors] = useState({});
    const [generalError, setGeneralError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm(previous => ({
            ...previous,
            [name]: value,
        }));

        setErrors(previous => ({
            ...previous,
            [name]: "",
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setErrors({});
        setGeneralError("");
        setIsSubmitting(true);

        try {
            await register(form);

            navigate("/");

        } catch (error) {

            if (error.response?.status === 422) {
                setErrors(error.response.data.errors || {});
            } else {
                setGeneralError(
                    error.response?.data?.message ||
                    "Unable to create your account. Please try again."
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
                    Create Account 🚀
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* General error */}
                    {generalError && (
                        <p
                            role="alert"
                            className="rounded-lg bg-red-50 p-3 text-sm text-red-600"
                        >
                            {generalError}
                        </p>
                    )}

                    {/* Name */}
                    <div>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

                            <input
                                name="name"
                                value={form.name}
                                placeholder="Full Name"
                                autoComplete="name"
                                required
                                onChange={handleChange}
                                className="w-full pl-10 p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400"
                            />
                        </div>

                        {errors.name && (
                            <p className="mt-1 text-xs text-red-600">
                                {errors.name[0]}
                            </p>
                        )}
                    </div>

                    {/* Email */}
                    <div>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

                            <input
                                name="email"
                                type="email"
                                value={form.email}
                                placeholder="Email"
                                autoComplete="email"
                                required
                                onChange={handleChange}
                                className="w-full pl-10 p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400"
                            />
                        </div>

                        {errors.email && (
                            <p className="mt-1 text-xs text-red-600">
                                {errors.email[0]}
                            </p>
                        )}
                    </div>

                    {/* Password */}
                    <div>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

                            <input
                                name="password"
                                type="password"
                                value={form.password}
                                placeholder="Password"
                                autoComplete="new-password"
                                required
                                onChange={handleChange}
                                className="w-full pl-10 p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400"
                            />
                        </div>

                        {errors.password && (
                            <p className="mt-1 text-xs text-red-600">
                                {errors.password[0]}
                            </p>
                        )}
                    </div>

                    {/* Phone */}
                    <div>
                        <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

                            <input
                                name="phone_number"
                                type="tel"
                                value={form.phone_number}
                                placeholder="Phone Number"
                                autoComplete="tel"
                                required
                                onChange={handleChange}
                                className="w-full pl-10 p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400"
                            />
                        </div>

                        {errors.phone_number && (
                            <p className="mt-1 text-xs text-red-600">
                                {errors.phone_number[0]}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {isSubmitting ? "Creating account..." : "Sign Up"}
                    </button>

                </form>

                <p className="text-sm text-center mt-4">
                    Already have an account?{" "}

                    <button
                        type="button"
                        onClick={goToLogin}
                        className="text-indigo-600 font-semibold hover:underline"
                    >
                        Login
                    </button>
                </p>

            </motion.div>

        </div>
    );
}
