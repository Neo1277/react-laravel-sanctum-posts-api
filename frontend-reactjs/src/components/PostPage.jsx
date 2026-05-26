import { useParams, Link } from "react-router-dom";
import { posts } from "../data/posts";

export default function PostPage() {
  const { id } = useParams();

  const post = posts.find((p) => p.id === Number(id));

  if (!post) {
    return (
      <div className="p-10 text-center">
        Post not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br 
                    from-slate-100 via-gray-200 to-slate-300 p-6">

      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">

        <img
          src={post.image}
          className="w-full h-[400px] object-cover"
        />

        <div className="p-8">
          <h1 className="text-4xl font-bold mb-4">
            {post.title}
          </h1>

          <p className="text-gray-700 leading-7 text-lg">
            {post.description}
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