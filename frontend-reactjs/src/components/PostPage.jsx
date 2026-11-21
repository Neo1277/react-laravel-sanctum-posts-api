import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import postService from "../services/postService";

export default function PostPage() {

    const { id } = useParams();

    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        const fetchPost = async () => {

            try {
                setLoading(true);
                setError(null);

                const response = await postService.getById(id);

                setPost(response.data);
                
            } catch (err) {

                console.error("Error fetching post:", err);

                setError(
                    err.response?.data?.message ||
                    "Unable to load post."
                );

            } finally {
                setLoading(false);
            }
        };

        fetchPost();

    }, [id]);

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                Loading post...
            </div>
        );
    }

    if (error || !post) {
        return (
            <div className="p-10 text-center">
                <h2 className="text-xl font-semibold text-slate-700">
                    {error || "Post not found"}
                </h2>

                <Link
                    to="/"
                    className="inline-block mt-6 text-indigo-600 hover:underline"
                >
                    ← Back
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br
                        from-slate-100 via-gray-200 to-slate-300 p-6">

            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">

                <img
                    src={post.post.image || "/images/default-post.jpg"}
                    alt={post.title}
                    className="w-full h-[400px] object-cover"
                />

                <div className="p-8">

                    <h1 className="text-4xl font-bold mb-4">
                        {post.post.title}
                    </h1>

                    <p className="text-gray-700 leading-7 text-lg whitespace-pre-line">
                        {post.post.large_text}
                    </p>

                    <Link
                        to="/"
                        className="inline-block mt-6 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
                    >
                        ← Back
                    </Link>

                </div>
            </div>
        </div>
    );
}
