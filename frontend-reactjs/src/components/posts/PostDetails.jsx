
import {
  ArrowLeft,
  CalendarDays,
  FolderOpen,
  Pencil,
  FileText,
} from "lucide-react";

export default function PostDetails({ post, onBack, onEdit }) {
  if (!post) return null;

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <button
            type="button"
            onClick={onBack}
            className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-indigo-600"
          >
            <ArrowLeft size={18} />
            Back to posts
          </button>

          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            Post Details
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            View the complete information of this publication.
          </p>
        </div>

        <button
          type="button"
          onClick={() => onEdit(post)}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
        >
          <Pencil size={17} />
          Edit Post
        </button>
      </div>

      {/* Content */}
      <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {post.image && (
          <img
            src={post.image}
            alt={post.title}
            className="h-56 w-full object-cover sm:h-80"
          />
        )}

        <div className="space-y-6 p-5 sm:p-8">
          {/* Category and metadata */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-700">
              <FolderOpen size={14} />
              {post.category}
            </span>

            <span className="inline-flex items-center gap-2 text-xs text-slate-500">
              <FileText size={14} />
              Publication #{post.id}
            </span>
          </div>

          {/* Title */}
          <div>
            <h2 className="text-2xl font-bold leading-tight text-slate-900 sm:text-3xl">
              {post.title}
            </h2>

            <p className="mt-3 break-all text-sm text-slate-400">
              Slug: {post.slug}
            </p>
          </div>

          {/* Short description */}
          <section className="border-t border-slate-100 pt-6">
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
              Short Description
            </h3>

            <p className="text-base leading-7 text-slate-600">
              {post.short_text}
            </p>
          </section>

          {/* Full content */}
          <section className="border-t border-slate-100 pt-6">
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
              Full Content
            </h3>

            <div className="whitespace-pre-wrap break-words text-base leading-8 text-slate-700">
              {post.large_text}
            </div>
          </section>
        </div>
      </article>
    </div>
  );
}
