
import { useEffect, useState } from "react";
import {
    ArrowLeft,
    ImagePlus,
    X,
    Save
} from "lucide-react";

import { categories } from "../../data/categories";

export default function PostForm({
    post,
    onSave,
    onCancel
}) {
    const [formData, setFormData] = useState({
        title: "",
        category: categories[0] || "",
        slug: "",
        short_text: "",
        large_text: "",
        image: ""
    });

    const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (post) {
            setFormData({
                title: post.title || "",
                category: post.category || categories[0] || "",
                slug: post.slug || "",
                short_text: post.short_text || "",
                large_text: post.large_text || "",
                image: post.image || ""
            });

            setSlugManuallyEdited(true);
        }
    }, [post]);

    const generateSlug = (value) => {
        return value
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .trim()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "");
    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((current) => ({
            ...current,
            [name]: value,
            ...(name === "title" && !slugManuallyEdited
                ? { slug: generateSlug(value) }
                : {})
        }));

        setErrors((current) => ({
            ...current,
            [name]: ""
        }));
    };

    const handleSlugChange = (event) => {
        setSlugManuallyEdited(true);

        setFormData((current) => ({
            ...current,
            slug: generateSlug(event.target.value)
        }));

        setErrors((current) => ({
            ...current,
            slug: ""
        }));
    };

    const handleImageChange = (event) => {
        const file = event.target.files?.[0];

        if (!file) return;

        if (!file.type.startsWith("image/")) {
            setErrors((current) => ({
                ...current,
                image: "Please select a valid image."
            }));
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            setErrors((current) => ({
                ...current,
                image: "The image must not exceed 5 MB."
            }));
            return;
        }

        const reader = new FileReader();

        reader.onload = () => {
            setFormData((current) => ({
                ...current,
                image: reader.result
            }));

            setErrors((current) => ({
                ...current,
                image: ""
            }));
        };

        reader.readAsDataURL(file);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const newErrors = {};

        if (!formData.title.trim()) {
            newErrors.title = "Title is required.";
        }

        if (!formData.category) {
            newErrors.category = "Please select a category.";
        }

        if (!formData.slug.trim()) {
            newErrors.slug = "Slug is required.";
        }

        if (!formData.short_text.trim()) {
            newErrors.short_text = "Short description is required.";
        }

        if (!formData.large_text.trim()) {
            newErrors.large_text = "Content is required.";
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            return;
        }

        onSave({
            ...formData,
            title: formData.title.trim(),
            slug: formData.slug.trim(),
            short_text: formData.short_text.trim(),
            large_text: formData.large_text.trim()
        });
    };

    const inputClass = (field) => `
        w-full rounded-xl border bg-white px-4 py-3
        text-sm text-slate-700 outline-none transition
        focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100
        ${errors[field] ? "border-red-400" : "border-slate-200"}
    `;

    return (
        <div className="mx-auto max-w-4xl space-y-6">

            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <div>
                    <button
                        type="button"
                        onClick={onCancel}
                        className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-indigo-600"
                    >
                        <ArrowLeft size={17} />
                        Back to posts
                    </button>

                    <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl">
                        {post ? "Edit Post" : "Create New Post"}
                    </h1>

                    <p className="mt-2 text-sm text-slate-500">
                        {post
                            ? "Update your publication information."
                            : "Fill in the information to create a new publication."}
                    </p>
                </div>

            </div>

            {/* Form */}
            <form
                onSubmit={handleSubmit}
                className="space-y-6"
            >

                {/* Basic information */}
                <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">

                    <h2 className="mb-6 text-lg font-bold text-slate-800">
                        Basic Information
                    </h2>

                    <div className="space-y-5">

                        {/* Title */}
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Post Title *
                            </label>

                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Enter post title"
                                maxLength={150}
                                className={inputClass("title")}
                            />

                            {errors.title && (
                                <p className="mt-1 text-xs text-red-500">
                                    {errors.title}
                                </p>
                            )}
                        </div>

                        {/* Category and Slug */}
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                            <div>
                                <label className="mb-2 block text-sm font-semibold text-slate-700">
                                    Category *
                                </label>

                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className={inputClass("category")}
                                >
                                    <option value="">
                                        Select a category
                                    </option>

                                    {categories.map((category) => (
                                        <option
                                            key={category}
                                            value={category}
                                        >
                                            {category}
                                        </option>
                                    ))}
                                </select>

                                {errors.category && (
                                    <p className="mt-1 text-xs text-red-500">
                                        {errors.category}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-semibold text-slate-700">
                                    Slug *
                                </label>

                                <input
                                    type="text"
                                    name="slug"
                                    value={formData.slug}
                                    onChange={handleSlugChange}
                                    placeholder="post-url-slug"
                                    className={inputClass("slug")}
                                />

                                {errors.slug && (
                                    <p className="mt-1 text-xs text-red-500">
                                        {errors.slug}
                                    </p>
                                )}

                                <p className="mt-1 text-xs text-slate-400">
                                    Used in the post URL.
                                </p>
                            </div>

                        </div>

                        {/* Short description */}
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Short Description *
                            </label>

                            <textarea
                                name="short_text"
                                value={formData.short_text}
                                onChange={handleChange}
                                rows={3}
                                maxLength={300}
                                placeholder="Write a short description..."
                                className={inputClass("short_text")}
                            />

                            {errors.short_text && (
                                <p className="mt-1 text-xs text-red-500">
                                    {errors.short_text}
                                </p>
                            )}
                        </div>

                        {/* Full content */}
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Full Content *
                            </label>

                            <textarea
                                name="large_text"
                                value={formData.large_text}
                                onChange={handleChange}
                                rows={8}
                                placeholder="Write your post content..."
                                className={inputClass("large_text")}
                            />

                            {errors.large_text && (
                                <p className="mt-1 text-xs text-red-500">
                                    {errors.large_text}
                                </p>
                            )}
                        </div>

                    </div>

                </section>

                {/* Featured image */}
                <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">

                    <h2 className="mb-2 text-lg font-bold text-slate-800">
                        Featured Image
                    </h2>

                    <p className="mb-5 text-sm text-slate-500">
                        Upload an image for your publication.
                        Maximum size: 5 MB.
                    </p>

                    {formData.image ? (
                        <div className="relative overflow-hidden rounded-xl border border-slate-200">

                            <img
                                src={formData.image}
                                alt="Post preview"
                                className="h-56 w-full object-cover sm:h-72"
                            />

                            <button
                                type="button"
                                onClick={() => setFormData((current) => ({
                                    ...current,
                                    image: ""
                                }))}
                                aria-label="Remove image"
                                className="absolute right-3 top-3 rounded-full bg-white p-2 text-red-500 shadow-md transition hover:bg-red-50"
                            >
                                <X size={18} />
                            </button>

                        </div>
                    ) : (
                        <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 px-5 py-10 text-center transition hover:border-indigo-400 hover:bg-indigo-50">

                            <ImagePlus
                                size={36}
                                className="mb-3 text-slate-400"
                            />

                            <span className="text-sm font-semibold text-slate-700">
                                Click to upload an image
                            </span>

                            <span className="mt-1 text-xs text-slate-400">
                                PNG, JPG, WEBP (Max. 5 MB)
                            </span>

                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                            />

                        </label>
                    )}

                    {errors.image && (
                        <p className="mt-2 text-xs text-red-500">
                            {errors.image}
                        </p>
                    )}

                </section>

                {/* Actions */}
                <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

                    <button
                        type="button"
                        onClick={onCancel}
                        className="rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700"
                    >
                        <Save size={18} />
                        {post ? "Update Post" : "Create Post"}
                    </button>

                </div>

            </form>

        </div>
    );
}
