import { useMemo, useState } from "react";
import {
  Plus,
  FolderOpen,
  Search,
  Pencil,
  Trash2,
  FileText,
  X,
  Save,
} from "lucide-react";

import Layout from "../components/Layout";
import { categories as initialCategories } from "../data/categories";
import { posts } from "../data/posts_data";

export default function Categories() {
  const [categories, setCategories] = useState(
    initialCategories.map((category, index) => ({
      id: index + 1,
      name: category,
    }))
  );

  const [search, setSearch] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryName, setCategoryName] = useState("");
  const [error, setError] = useState("");

  const filteredCategories = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return categories;

    return categories.filter((category) =>
      category.name.toLowerCase().includes(query)
    );
  }, [categories, search]);

  const getPostCount = (categoryName) => {
    return posts.filter(
      (post) => post.category === categoryName
    ).length;
  };

  const openCreateForm = () => {
    setSelectedCategory(null);
    setCategoryName("");
    setError("");
    setIsFormOpen(true);
  };

  const openEditForm = (category) => {
    setSelectedCategory(category);
    setCategoryName(category.name);
    setError("");
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setSelectedCategory(null);
    setCategoryName("");
    setError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const name = categoryName.trim();

    if (!name) {
      setError("Category name is required.");
      return;
    }

    const alreadyExists = categories.some(
      (category) =>
        category.name.toLowerCase() === name.toLowerCase() &&
        category.id !== selectedCategory?.id
    );

    if (alreadyExists) {
      setError("This category already exists.");
      return;
    }

    if (selectedCategory) {
      setCategories((current) =>
        current.map((category) =>
          category.id === selectedCategory.id
            ? { ...category, name }
            : category
        )
      );
    } else {
      setCategories((current) => [
        ...current,
        { id: Date.now(), name },
      ]);
    }

    closeForm();
  };

  const handleDelete = (category) => {
    const postCount = getPostCount(category.name);

    if (postCount > 0) {
      window.alert(
        `This category is assigned to ${postCount} post(s). Reassign or remove those posts before deleting this category.`
      );
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to delete "${category.name}"?`
    );

    if (confirmed) {
      setCategories((current) =>
        current.filter((item) => item.id !== category.id)
      );
    }
  };

  return (
    <Layout>
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              Categories Management
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Organize and manage your blog categories.
            </p>
          </div>

          <button
            type="button"
            onClick={openCreateForm}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
          >
            <Plus size={18} />
            New Category
          </button>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Total Categories
                </p>

                <h2 className="mt-2 text-3xl font-bold text-slate-900">
                  {categories.length}
                </h2>
              </div>

              <div className="rounded-xl bg-indigo-50 p-3 text-indigo-600">
                <FolderOpen size={24} />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Total Posts
                </p>

                <h2 className="mt-2 text-3xl font-bold text-slate-900">
                  {posts.length}
                </h2>
              </div>

              <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600">
                <FileText size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="relative">
            <Search
              size={19}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search categories..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-12 pr-4 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </div>
        </div>

        {/* Categories table */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] text-left">
              <thead className="border-b border-slate-200 bg-slate-50">
                <tr>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Category
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Posts
                  </th>

                  <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {filteredCategories.map((category) => (
                  <tr
                    key={category.id}
                    className="transition hover:bg-slate-50"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-indigo-50 p-2 text-indigo-600">
                          <FolderOpen size={19} />
                        </div>

                        <span className="font-semibold text-slate-800">
                          {category.name}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                        {getPostCount(category.name)} posts
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => openEditForm(category)}
                          title="Edit category"
                          aria-label={`Edit ${category.name}`}
                          className="rounded-lg p-2 text-slate-500 transition hover:bg-amber-50 hover:text-amber-600"
                        >
                          <Pencil size={18} />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(category)}
                          title="Delete category"
                          aria-label={`Delete ${category.name}`}
                          className="rounded-lg p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-600"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {filteredCategories.length === 0 && (
                  <tr>
                    <td colSpan="3" className="px-6 py-12 text-center">
                      <p className="font-semibold text-slate-700">
                        No categories found
                      </p>

                      <p className="mt-2 text-sm text-slate-500">
                        Try another search term.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="border-t border-slate-100 px-6 py-4 text-sm text-slate-500">
            Showing {filteredCategories.length} of {categories.length} categories
          </div>
        </div>

        {/* Create / Edit modal */}
        {isFormOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-900/50 p-4">
            <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    {selectedCategory
                      ? "Edit Category"
                      : "Create Category"}
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Enter the category name below.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={closeForm}
                  className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                  aria-label="Close form"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label
                    htmlFor="categoryName"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Category Name
                  </label>

                  <input
                    id="categoryName"
                    type="text"
                    value={categoryName}
                    onChange={(event) => {
                      setCategoryName(event.target.value);
                      setError("");
                    }}
                    placeholder="e.g. React"
                    maxLength={60}
                    autoFocus
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  />

                  {error && (
                    <p className="mt-2 text-sm text-red-600">
                      {error}
                    </p>
                  )}
                </div>

                <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    onClick={closeForm}
                    className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
                  >
                    <Save size={17} />
                    {selectedCategory ? "Save Changes" : "Create Category"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
