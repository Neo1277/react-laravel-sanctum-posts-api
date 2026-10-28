import { useMemo, useState } from "react";
import { Plus, FileText } from "lucide-react";

import Layout from "../components/Layout";
import SearchBar from "../components/posts/SearchBar";
import PostTable from "../components/posts/PostTable";

import { posts as initialPosts } from "../data/posts_data";

export default function Posts() {
  const [posts, setPosts] = useState(initialPosts);
  const [search, setSearch] = useState("");

  const filteredPosts = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return posts;
    }

    return posts.filter((post) =>
      post.title.toLowerCase().includes(query)
    );
  }, [posts, search]);

  const handleView = (post) => {
    alert(`View post: ${post.title}`);
  };

  const handleEdit = (post) => {
    alert(`Edit post: ${post.title}`);
  };

  const handleDelete = (post) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${post.title}"?`
    );

    if (confirmed) {
      setPosts((currentPosts) =>
        currentPosts.filter((item) => item.id !== post.id)
      );
    }
  };

  const handleCreate = () => {
    alert("The Create Post form will be implemented in Part 3.");
  };

  return (
    <Layout>
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

        {/* Summary card */}
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
                {posts.length}
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

          <PostTable
            posts={filteredPosts}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </section>
      </div>
    </Layout>
  );
}