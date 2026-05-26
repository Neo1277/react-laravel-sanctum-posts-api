// components/PostList.jsx
import { Link } from "react-router-dom";

export default function PostList({ posts }) {
  return (
    <div className="grid md:grid-cols-3 gap-6 mt-6">
      {posts.map((post) => (
        <Link
          key={post.id}
          to={`/posts/${post.id}`}
          className="block"
        >
          <div
            className="bg-white rounded-2xl shadow-md overflow-hidden
                       hover:shadow-xl hover:scale-105
                       transform transition duration-300"
          >
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-40 object-cover"
            />

            <div className="p-4">
              <h2 className="text-lg font-bold">
                {post.title}
              </h2>

              <p className="text-gray-600 text-sm mt-2">
                {post.description}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}