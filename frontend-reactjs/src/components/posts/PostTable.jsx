import { Eye, Pencil, Trash2 } from "lucide-react";

export default function PostTable({
  posts,
  onView,
  onEdit,
  onDelete,
}) {
  if (posts.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center">
        <h3 className="text-lg font-semibold text-slate-700">
          No posts found
        </h3>

        <p className="mt-2 text-sm text-slate-500">
          Try another search term.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px] text-left">
          <thead className="border-b border-slate-200 bg-slate-50">
            <tr>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Image
              </th>

              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Title
              </th>

              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Category
              </th>

              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Slug
              </th>

              <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {posts.map((post) => (
              <tr
                key={post.id}
                className="transition hover:bg-slate-50"
              >
                <td className="px-6 py-4">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="h-14 w-20 rounded-lg object-cover"
                  />
                </td>

                <td className="px-6 py-4">
                  <p className="font-semibold text-slate-800">
                    {post.title}
                  </p>

                  <p className="mt-1 max-w-xs truncate text-xs text-slate-500">
                    {post.short_text}
                  </p>
                </td>

                <td className="px-6 py-4">
                  <span className="inline-flex rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">
                    {post.category}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <span className="text-sm text-slate-500">
                    {post.slug}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => onView(post)}
                      title="View post"
                      aria-label={`View ${post.title}`}
                      className="rounded-lg p-2 text-slate-500 transition hover:bg-blue-50 hover:text-blue-600"
                    >
                      <Eye size={18} />
                    </button>

                    <button
                      type="button"
                      onClick={() => onEdit(post)}
                      title="Edit post"
                      aria-label={`Edit ${post.title}`}
                      className="rounded-lg p-2 text-slate-500 transition hover:bg-amber-50 hover:text-amber-600"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      type="button"
                      onClick={() => onDelete(post)}
                      title="Delete post"
                      aria-label={`Delete ${post.title}`}
                      className="rounded-lg p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-600"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="border-t border-slate-100 px-6 py-4 text-sm text-slate-500">
        Showing {posts.length} {posts.length === 1 ? "post" : "posts"}
      </div>
    </div>
  );
}