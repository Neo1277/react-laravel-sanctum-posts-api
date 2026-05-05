import { useState } from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Slider from "./components/Slider";
import PostList from "./components/PostList";
import Pagination from "./components/Pagination";
import Navbar from "./components/Navbar";
import { posts } from "./data/posts";

export default function App() {
  const [isLogged, setIsLogged] = useState(false);
  const [authMode, setAuthMode] = useState("login"); // 👈 new
  const [currentPage, setCurrentPage] = useState(1);

  const postsPerPage = 6;
  const start = (currentPage - 1) * postsPerPage;
  const currentPosts = posts.slice(start, start + postsPerPage);
  const totalPages = Math.ceil(posts.length / postsPerPage);

  const handleLogout = () => {
    setIsLogged(false);
  };

  if (!isLogged) {
    return authMode === "login" ? (
      <Login
        onLogin={setIsLogged}
        goToSignup={() => setAuthMode("signup")}
      />
    ) : (
      <Signup
        onSignup={setIsLogged}
        goToLogin={() => setAuthMode("login")}
      />
    );
  }

  return (
    <div className="bg-gradient-to-br from-slate-100 via-gray-200 to-slate-300 min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <Navbar onLogout={handleLogout} />
        <Slider />
        <h1 className="text-3xl font-bold mt-8">Latest Posts</h1>
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