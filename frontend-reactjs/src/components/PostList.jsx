import { Link } from "react-router-dom";

export default function PostList({ posts }) {

    if (posts.length === 0) {
        return (
            <div className="mt-6 rounded-2xl bg-white p-12 text-center shadow-md">
                <h2 className="text-lg font-semibold text-slate-700">
                    No posts available
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                    There are no posts to display yet.
                </p>
            </div>
        );
    }

    return (
        <div className="grid gap-6 mt-6 md:grid-cols-3">

            {posts.map((post) => (
                <Link
                    key={post.id}
                    to={`/posts/${post.id}`}
                    className="block"
                >
                    <div
                        className="transform overflow-hidden rounded-2xl bg-white shadow-md
                                   transition duration-300 hover:scale-105 hover:shadow-xl"
                    >
                        <img
                            src={post.image || "/images/default-post.jpg"}
                            alt={post.title}
                            className="h-40 w-full object-cover"
                        />

                        <div className="p-4">

                            <h2 className="text-lg font-bold text-slate-800">
                                {post.title}
                            </h2>

                            <p className="mt-2 text-sm text-slate-600">
                                {post.short_text}
                            </p>

                        </div>
                    </div>
                </Link>
            ))}

        </div>
    );
}
