import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Plus, FileText, ChevronLeft, ChevronRight } from "lucide-react";

import Layout from "../components/Layout";
import SearchBar from "../components/posts/SearchBar";
import PostTable from "../components/posts/PostTable";
import PostForm from "../components/posts/PostForm";
import PostDetails from "../components/posts/PostDetails";

import usePosts from "../hooks/usePosts";

export default function Posts() {

    const location = useLocation();
    const navigate = useNavigate();

    // Custom Hook: manages posts and API operations
    const {
        posts,
        pagination,
        page,
        setPage,
        loading,
        error,
        addPost,
        deletePost,
        updatePost
    } = usePosts();

    // Local component states
    const [search, setSearch] = useState("");
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);
    const [viewingPost, setViewingPost] = useState(null);

    // Open create form when navigating from Dashboard
    useEffect(() => {
        if (location.state?.openCreateForm) {
            setViewingPost(null);
            setSelectedPost(null);
            setIsFormOpen(true);

            navigate(location.pathname, {
                replace: true,
                state: null,
            });
        }
    }, [location.state, location.pathname, navigate]);

    // Filter posts by title
    const filteredPosts = useMemo(() => {
        const query = search.trim().toLowerCase();

        if (!query) {
            return posts;
        }

        return posts.filter((post) =>
            post.title?.toLowerCase().includes(query)
        );
    }, [posts, search]);

    // View post details
    const handleView = (post) => {
        setViewingPost(post);
    };

    // Open create form
    const handleCreate = () => {
        setViewingPost(null);
        setSelectedPost(null);
        setIsFormOpen(true);
    };

    // Open edit form
    const handleEdit = (post) => {
        setViewingPost(null);
        setSelectedPost(post);
        setIsFormOpen(true);
    };

    // Close form
    const handleCancel = () => {
        setSelectedPost(null);
        setIsFormOpen(false);
    };

    // Save new or edited post
    const handleSave = async (formData) => {

        try {

            if (selectedPost) {

                // Update existing post
                await updatePost(selectedPost.id, formData);

            } else {

                // Create new post
                await addPost(formData);

            }

            handleCancel();

        } catch (err) {

            console.error("Error saving post:", err);

            window.alert(
                err.response?.data?.message ||
                "An error occurred while saving the post."
            );

        }
    };

    // Delete post
    const handleDelete = async (post) => {

        const confirmed = window.confirm(
            `Are you sure you want to delete "${post.title}"?`
        );

        if (!confirmed) {
            return;
        }

        try {

            await deletePost(post.id);

        } catch (err) {

            console.error("Error deleting post:", err);

            window.alert(
                err.response?.data?.message ||
                "An error occurred while deleting the post."
            );

        }
    };

    // Display post details
    if (viewingPost) {
        return (
            <Layout>
                <PostDetails
                    post={viewingPost}
                    onBack={() => setViewingPost(null)}
                    onEdit={handleEdit}
                />
            </Layout>
        );
    }

    return (
        <Layout>

            {isFormOpen ? (

                <PostForm
                    post={selectedPost}
                    onSave={handleSave}
                    onCancel={handleCancel}
                />

            ) : (

                <div className="mx-auto max-w-7xl space-y-8">

                    {/* Page heading */}
                    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

                        <div>
                            <div className="mb-2 flex items-center gap-2 text-sm text-slate-500">
                                <span>Dashboard</span>
                                <span>/</span>
                                <span className="font-medium text-indigo-600">
                                    Posts
                                </span>
                            </div>

                            <h1 className="text-3xl font-bold tracking-tight text-slate-800">
                                Posts Management
                            </h1>

                            <p className="mt-2 text-slate-500">
                                Create, organize, and manage your blog posts.
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={handleCreate}
                            className="inline-flex items-center justify-center gap-2 rounded-xl
                                       bg-indigo-600 px-5 py-3 font-semibold text-white
                                       shadow-lg shadow-indigo-200 transition
                                       hover:-translate-y-0.5 hover:bg-indigo-700"
                        >
                            <Plus size={20} />
                            New Post
                        </button>

                    </div>

                    {/* Summary cards */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                        <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                                <FileText size={24} />
                            </div>

                            <div>
                                <p className="text-sm text-slate-500">
                                    Total Posts
                                </p>

                                <p className="mt-1 text-2xl font-bold text-slate-800">
                                    {pagination?.total ?? 0}
                                </p>
                            </div>

                        </div>

                        <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                                <FileText size={24} />
                            </div>

                            <div>
                                <p className="text-sm text-slate-500">
                                    Search Results
                                </p>

                                <p className="mt-1 text-2xl font-bold text-slate-800">
                                    {filteredPosts.length}
                                </p>
                            </div>

                        </div>

                    </div>

                    {/* Posts table */}
                    <section className="space-y-5">

                        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

                            <h2 className="text-lg font-bold text-slate-800">
                                All Posts
                            </h2>

                            <SearchBar
                                search={search}
                                onSearchChange={setSearch}
                            />

                        </div>

                        {/* Loading state */}
                        {loading && (
                            <div className="rounded-xl border border-slate-200 bg-white p-8 text-center text-slate-500">
                                Loading posts...
                            </div>
                        )}

                        {/* Error state */}
                        {!loading && error && (
                            <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center text-red-600">
                                {error}
                            </div>
                        )}

                        {/* Posts table */}
                        {!loading && !error && (
                            <>
                                <PostTable
                                    posts={filteredPosts}
                                    onView={handleView}
                                    onEdit={handleEdit}
                                    onDelete={handleDelete}
                                />

                                {/* Pagination */}
                                {pagination && pagination.last_page > 1 && (
                                    <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">

                                        <p className="text-sm text-slate-500">
                                            Showing {pagination.from ?? 0} to {pagination.to ?? 0} of {pagination.total} posts
                                        </p>

                                        <div className="flex items-center gap-3">

                                            <button
                                                type="button"
                                                onClick={() => setPage(page - 1)}
                                                disabled={page <= 1}
                                                className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                                            >
                                                <ChevronLeft size={18} />
                                                Previous
                                            </button>

                                            <span className="text-sm font-medium text-slate-600">
                                                Page {pagination.current_page} of {pagination.last_page}
                                            </span>

                                            <button
                                                type="button"
                                                onClick={() => setPage(page + 1)}
                                                disabled={page >= pagination.last_page}
                                                className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                                            >
                                                Next
                                                <ChevronRight size={18} />
                                            </button>

                                        </div>

                                    </div>
                                )}
                            </>
                        )}

                    </section>

                </div>

            )}

        </Layout>
    );
}
