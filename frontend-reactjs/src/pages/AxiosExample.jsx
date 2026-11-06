
import usePostsApi from "../hooks/usePostsApi";

export default function AxiosExample() {

    const {
        posts,
        loading,
        error,
        fetchPosts
    } = usePostsApi();

    if (loading) {
        return (
            <p className="p-8 text-indigo-600">
                Loading posts...
            </p>
        );
    }

    if (error) {
        return (
            <div className="space-y-4 p-8">
                <p className="text-red-600">{error}</p>

                <button
                    onClick={fetchPosts}
                    className="rounded-lg bg-indigo-600 px-4 py-2 text-white"
                >
                    Try again
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-6 p-8">

            <div className="flex flex-wrap items-center justify-between gap-4">
                <h1 className="text-2xl font-bold text-slate-800">
                    Posts from API
                </h1>

                <button
                    onClick={fetchPosts}
                    className="rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
                >
                    Reload Posts
                </button>
            </div>

            <div className="space-y-4">

                {posts.slice(0, 10).map((post) => (
                    <div
                        key={post.id}
                        className="rounded-xl border bg-white p-4 shadow-sm"
                    >
                        <h2 className="font-semibold text-slate-800">
                            {post.title}
                        </h2>

                        <p className="mt-2 text-sm text-slate-500">
                            {post.body}
                        </p>
                    </div>
                ))}

            </div>

        </div>
    );
}
