import { useState, useContext } from "react";
import {
    Routes,
    Route,
    Navigate,
    useNavigate
} from "react-router-dom";

import Login from "./components/Login";
import Signup from "./components/Signup";
import Slider from "./components/Slider";
import PostList from "./components/PostList";
import Pagination from "./components/Pagination";
import Navbar from "./components/Navbar";
import PostPage from "./components/PostPage";

import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

import Dashboard from "./pages/Dashboard";
import Posts from "./pages/Posts";
import Categories from "./pages/Categories";
import Users from "./pages/Users";
import Profile from "./pages/Profile";
//import AxiosExample from "./pages/AxiosExample";
//import AxiosCrudExample from "./pages/AxiosCrudExample";

import { posts } from "./data/posts";

import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider, AuthContext } from "./context/AuthContext";


// Home page
function Home() {

    const [currentPage, setCurrentPage] = useState(1);

    const postsPerPage = 6;
    const start = (currentPage - 1) * postsPerPage;

    const currentPosts = posts.slice(
        start,
        start + postsPerPage
    );

    const totalPages = Math.ceil(
        posts.length / postsPerPage
    );

    return (
        <div className="bg-gradient-to-br from-slate-100 via-gray-200 to-slate-300 min-h-screen p-6">

            <div className="max-w-6xl mx-auto">

                <Navbar />

                <Slider />

                <h1 className="text-3xl font-bold mt-8">
                    Latest Posts
                </h1>

                <PostList posts={currentPosts} />

                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />

            </div>

        </div>
    );
}


// Routes for users who are not authenticated
function GuestRoute({ children }) {

    const { user, isLogged, loading } = useContext(AuthContext);

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                Checking session...
            </div>
        );
    }

    if (isLogged) {

        const isAdmin = user?.roles?.includes("admin");

        return (
            <Navigate
                to={isAdmin ? "/dashboard" : "/"}
                replace
            />
        );
    }

    return children;
}


// Application routes
function AppRoutes() {

    const navigate = useNavigate();

    return (
        <Routes>

            {/* Authentication */}
            <Route
                path="/login"
                element={
                    <GuestRoute>
                        <Login
                            goToSignup={() => navigate("/signup")}
                        />
                    </GuestRoute>
                }
            />

            <Route
                path="/signup"
                element={
                    <GuestRoute>
                        <Signup
                            goToLogin={() => navigate("/login")}
                        />
                    </GuestRoute>
                }
            />

            {/* Blog - authenticated users */}
            <Route
                path="/"
                element={
                    <ProtectedRoute>
                        <Home />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/posts/:id"
                element={
                    <ProtectedRoute>
                        <PostPage />
                    </ProtectedRoute>
                }
            />

            {/* Admin panel */}
            <Route
                path="/dashboard"
                element={
                    <AdminRoute>
                        <Dashboard />
                    </AdminRoute>
                }
            />

            <Route
                path="/posts"
                element={
                    <AdminRoute>
                        <Posts />
                    </AdminRoute>
                }
            />

            <Route
                path="/categories"
                element={
                    <AdminRoute>
                        <Categories />
                    </AdminRoute>
                }
            />

            <Route
                path="/users"
                element={
                    <AdminRoute>
                        <Users />
                    </AdminRoute>
                }
            />

            <Route
                path="/profile"
                element={
                    <AdminRoute>
                        <Profile />
                    </AdminRoute>
                }
            />

            {/* Development examples */}
            {/*
            <Route
                path="/axios-example"
                element={
                    <ProtectedRoute>
                        <AxiosExample />
                    </ProtectedRoute>
                }
            />
            */}

            {/*
            <Route
                path="/axios-crud-example"
                element={
                    <ProtectedRoute>
                        <AxiosCrudExample />
                    </ProtectedRoute>
                }
            />
            */}

            {/* Not found */}
            <Route
                path="*"
                element={<Navigate to="/" replace />}
            />

        </Routes>
    );
}


// Main application
export default function App() {

    return (
        <ThemeProvider>
            <AuthProvider>
                <AppRoutes />
            </AuthProvider>
        </ThemeProvider>
    );
}
