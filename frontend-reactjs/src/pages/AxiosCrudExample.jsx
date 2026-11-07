
import { useState } from "react";

import {
    createPost,
    updatePost,
    updatePostTitle,
    deletePost
} from "../services/postService";
import ThemeButton from "../components/ThemeButton";
import AuthInfo from "../components/AuthInfo";

export default function AxiosCrudExample() {

    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    // Create a post (POST)
    const handleCreate = async () => {

        setLoading(true);
        setError(null);
        setResult(null);

        try {

            const response = await createPost({
                title: "My new post",
                body: "Learning Axios with React",
                userId: 1
            });

            setResult(response);

        } catch (error) {

            setError("Error creating post.");

        } finally {

            setLoading(false);

        }
    };

    // Update a post (PUT)
    const handleUpdate = async () => {

        setLoading(true);
        setError(null);
        setResult(null);

        try {

            const response = await updatePost(1, {
                id: 1,
                title: "Updated post title",
                body: "This post was updated using PUT.",
                userId: 1
            });

            setResult(response);

        } catch (error) {

            setError("Error updating post.");

        } finally {

            setLoading(false);

        }
    };

    // Update title only (PATCH)
    const handlePatch = async () => {

        setLoading(true);
        setError(null);
        setResult(null);

        try {

            const response = await updatePostTitle(
                1,
                "Title changed using PATCH"
            );

            setResult(response);

        } catch (error) {

            setError("Error updating post title.");

        } finally {

            setLoading(false);

        }
    };

    // Delete a post (DELETE)
    const handleDelete = async () => {

        setLoading(true);
        setError(null);
        setResult(null);

        try {

            const response = await deletePost(1);

            setResult({
                message: "Post deleted successfully.",
                response
            });

        } catch (error) {

            setError("Error deleting post.");

        } finally {

            setLoading(false);

        }
    };

    return (

        <div className="mx-auto max-w-4xl space-y-8 p-8">
            
            <div>
                <h1 className="text-3xl font-bold text-slate-800">
                    Axios CRUD Example
                </h1>

                <ThemeButton />

                <AuthInfo />
                
                <p className="mt-2 text-slate-500">
                    Practice HTTP requests using Axios.
                </p>
            </div>

            {/* Action buttons */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                <button
                    onClick={handleCreate}
                    disabled={loading}
                    className="rounded-xl bg-indigo-600 px-5 py-4
                               font-semibold text-white transition
                               hover:bg-indigo-700 disabled:opacity-50"
                >
                    Create Post (POST)
                </button>

                <button
                    onClick={handleUpdate}
                    disabled={loading}
                    className="rounded-xl bg-emerald-600 px-5 py-4
                               font-semibold text-white transition
                               hover:bg-emerald-700 disabled:opacity-50"
                >
                    Update Post (PUT)
                </button>

                <button
                    onClick={handlePatch}
                    disabled={loading}
                    className="rounded-xl bg-amber-500 px-5 py-4
                               font-semibold text-white transition
                               hover:bg-amber-600 disabled:opacity-50"
                >
                    Update Title (PATCH)
                </button>

                <button
                    onClick={handleDelete}
                    disabled={loading}
                    className="rounded-xl bg-red-600 px-5 py-4
                               font-semibold text-white transition
                               hover:bg-red-700 disabled:opacity-50"
                >
                    Delete Post (DELETE)
                </button>

            </div>

            {/* Loading */}
            {loading && (
                <p className="text-sm font-medium text-indigo-600">
                    Processing request...
                </p>
            )}

            {/* Error */}
            {error && (
                <div className="rounded-xl border border-red-200
                                bg-red-50 p-4 text-red-700">
                    {error}
                </div>
            )}

            {/* API response */}
            {result && (
                <div className="space-y-3 rounded-xl border
                                border-slate-200 bg-white p-5 shadow-sm">

                    <h2 className="font-bold text-slate-800">
                        API Response
                    </h2>

                    <pre className="overflow-x-auto rounded-lg
                                    bg-slate-900 p-4 text-sm text-green-400">
                        {JSON.stringify(result, null, 2)}
                    </pre>

                </div>
            )}

        </div>
    );
}
