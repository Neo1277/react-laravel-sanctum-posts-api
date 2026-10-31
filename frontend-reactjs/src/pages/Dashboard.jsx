import {
    FileText,
    FolderOpen,
    Users,
    Eye,
    Plus,
    ArrowUpRight,
    Clock,
    CheckCircle,
    Edit,
    MessageSquare
} from "lucide-react";

import Layout from "../components/Layout";

const statistics = [
    {
        title: "Total Posts",
        value: "128",
        change: "+12%",
        description: "Compared to last month",
        icon: FileText,
        iconColor: "text-indigo-600",
        iconBg: "bg-indigo-100"
    },
    {
        title: "Categories",
        value: "12",
        change: "+2",
        description: "New categories this month",
        icon: FolderOpen,
        iconColor: "text-blue-600",
        iconBg: "bg-blue-100"
    },
    {
        title: "Total Users",
        value: "1,254",
        change: "+8.5%",
        description: "Compared to last month",
        icon: Users,
        iconColor: "text-purple-600",
        iconBg: "bg-purple-100"
    },
    {
        title: "Total Views",
        value: "24,580",
        change: "+18%",
        description: "Compared to last month",
        icon: Eye,
        iconColor: "text-emerald-600",
        iconBg: "bg-emerald-100"
    }
];

const recentPosts = [
    {
        id: 1,
        title: "Getting Started with React",
        category: "React",
        date: "Oct 28, 2026",
        status: "Published"
    },
    {
        id: 2,
        title: "Laravel API Development",
        category: "Laravel",
        date: "Oct 27, 2026",
        status: "Published"
    },
    {
        id: 3,
        title: "Understanding JavaScript ES6",
        category: "JavaScript",
        date: "Oct 26, 2026",
        status: "Draft"
    },
    {
        id: 4,
        title: "Modern CSS Techniques",
        category: "CSS",
        date: "Oct 25, 2026",
        status: "Published"
    }
];

const recentActivity = [
    {
        id: 1,
        title: "New post published",
        description: "Getting Started with React",
        time: "10 minutes ago",
        icon: FileText,
        color: "bg-indigo-100 text-indigo-600"
    },
    {
        id: 2,
        title: "New user registered",
        description: "A new user joined the blog",
        time: "1 hour ago",
        icon: Users,
        color: "bg-purple-100 text-purple-600"
    },
    {
        id: 3,
        title: "Post updated",
        description: "Laravel API Development",
        time: "3 hours ago",
        icon: Edit,
        color: "bg-blue-100 text-blue-600"
    },
    {
        id: 4,
        title: "New comment received",
        description: "A reader commented on a post",
        time: "5 hours ago",
        icon: MessageSquare,
        color: "bg-emerald-100 text-emerald-600"
    }
];

export default function Dashboard() {
    return (
        <Layout>

            <div className="space-y-8">

                {/* Dashboard heading */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                    <div>
                        <h1 className="text-2xl font-bold text-gray-800 sm:text-3xl">
                            Dashboard
                        </h1>

                        <p className="mt-2 text-sm text-gray-500 sm:text-base">
                            Welcome back! Here's what's happening with your blog.
                        </p>
                    </div>

                    <button
                        type="button"
                        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-700 sm:w-auto"
                    >
                        <Plus size={18} />
                        New Post
                    </button>

                </div>

                {/* Statistics cards */}
                <section>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

                        {statistics.map((item) => {
                            const Icon = item.icon;

                            return (
                                <div
                                    key={item.title}
                                    className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:shadow-md sm:p-6"
                                >

                                    <div className="flex items-center justify-between">

                                        <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${item.iconBg}`}>
                                            <Icon
                                                size={24}
                                                className={item.iconColor}
                                            />
                                        </div>

                                        <span className="flex items-center gap-1 text-sm font-semibold text-emerald-600">
                                            <ArrowUpRight size={16} />
                                            {item.change}
                                        </span>

                                    </div>

                                    <div className="mt-5">

                                        <p className="text-sm font-medium text-gray-500">
                                            {item.title}
                                        </p>

                                        <h2 className="mt-1 text-2xl font-bold text-gray-800 sm:text-3xl">
                                            {item.value}
                                        </h2>

                                        <p className="mt-2 text-xs text-gray-400">
                                            {item.description}
                                        </p>

                                    </div>

                                </div>
                            );
                        })}

                    </div>

                </section>

                {/* Main dashboard content */}
                <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

                    {/* Recent posts */}
                    <section className="min-w-0 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm xl:col-span-2">

                        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-5 sm:px-6">

                            <div>
                                <h2 className="text-lg font-bold text-gray-800">
                                    Recent Posts
                                </h2>

                                <p className="mt-1 text-sm text-gray-500">
                                    Your latest blog publications
                                </p>
                            </div>

                            <button
                                type="button"
                                className="text-sm font-semibold text-indigo-600 transition hover:text-indigo-800"
                            >
                                View all
                            </button>

                        </div>

                        <div className="overflow-x-auto">

                            <table className="w-full min-w-[600px] text-left">

                                <thead className="bg-gray-50">

                                    <tr>
                                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                                            Post
                                        </th>

                                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                                            Category
                                        </th>

                                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                                            Date
                                        </th>

                                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                                            Status
                                        </th>
                                    </tr>

                                </thead>

                                <tbody className="divide-y divide-gray-100">

                                    {recentPosts.map((post) => (
                                        <tr
                                            key={post.id}
                                            className="transition hover:bg-gray-50"
                                        >

                                            <td className="px-6 py-4">
                                                <p className="whitespace-nowrap text-sm font-medium text-gray-800">
                                                    {post.title}
                                                </p>
                                            </td>

                                            <td className="px-6 py-4">
                                                <span className="rounded-lg bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-600">
                                                    {post.category}
                                                </span>
                                            </td>

                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                                {post.date}
                                            </td>

                                            <td className="px-6 py-4">

                                                {post.status === "Published" ? (
                                                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                                                        <CheckCircle size={13} />
                                                        Published
                                                    </span>
                                                ) : (
                                                    <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
                                                        Draft
                                                    </span>
                                                )}

                                            </td>

                                        </tr>
                                    ))}

                                </tbody>

                            </table>

                        </div>

                    </section>

                    {/* Recent activity */}
                    <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">

                        <div className="mb-6">

                            <h2 className="text-lg font-bold text-gray-800">
                                Recent Activity
                            </h2>

                            <p className="mt-1 text-sm text-gray-500">
                                Latest actions on your blog
                            </p>

                        </div>

                        <div className="space-y-6">

                            {recentActivity.map((activity) => {
                                const Icon = activity.icon;

                                return (
                                    <div
                                        key={activity.id}
                                        className="flex gap-3"
                                    >

                                        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${activity.color}`}>
                                            <Icon size={19} />
                                        </div>

                                        <div className="min-w-0 flex-1">

                                            <h3 className="text-sm font-semibold text-gray-800">
                                                {activity.title}
                                            </h3>

                                            <p className="mt-1 text-xs text-gray-500">
                                                {activity.description}
                                            </p>

                                            <div className="mt-2 flex items-center gap-1 text-xs text-gray-400">
                                                <Clock size={13} />
                                                {activity.time}
                                            </div>

                                        </div>

                                    </div>
                                );
                            })}

                        </div>

                    </section>

                </div>

            </div>

        </Layout>
    );
}