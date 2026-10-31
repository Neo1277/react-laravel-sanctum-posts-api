import {
    LayoutDashboard,
    FileText,
    FolderOpen,
    Users,
    UserCircle,
    X
} from "lucide-react";

import { NavLink } from "react-router-dom";

const menus = [
    {
        name: "Dashboard",
        icon: LayoutDashboard,
        path: "/dashboard"
    },
    {
        name: "Posts",
        icon: FileText,
        path: "/posts"
    },
    {
        name: "Categories",
        icon: FolderOpen,
        path: "/categories"
    },
    {
        name: "Users",
        icon: Users,
        path: "/users"
    },
    {
        name: "Profile",
        icon: UserCircle,
        path: "/profile"
    }
];

export default function Sidebar({ isOpen, onClose }) {
    return (
        <>
            {/* Mobile backdrop */}
            {isOpen && (
                <button
                    type="button"
                    aria-label="Close navigation menu"
                    onClick={onClose}
                    className="fixed inset-0 z-40 bg-black/50 lg:hidden"
                />
            )}

            {/* Sidebar */}
            <aside
                id="admin-sidebar"
                className={`
                    fixed inset-y-0 left-0 z-50
                    flex min-h-0 w-64 flex-col
                    bg-slate-900 p-6 text-white
                    transition-transform duration-300 ease-in-out
                    lg:sticky lg:top-0 lg:z-20
                    lg:min-h-screen lg:translate-x-0
                    ${
                        isOpen
                            ? "translate-x-0"
                            : "-translate-x-full"
                    }
                `}
                aria-label="Main navigation"
                aria-hidden={undefined}
            >
                {/* Sidebar heading */}
                <div className="mb-10 flex items-center justify-between">
                    <h2 className="text-xl font-bold">
                        MENU
                    </h2>

                    {/* Close button on mobile */}
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close navigation menu"
                        className="rounded-lg p-2 text-slate-300 transition hover:bg-slate-800 hover:text-white lg:hidden"
                    >
                        <X size={22} />
                    </button>
                </div>

                {/* Navigation links */}
                <nav className="flex-1 space-y-2">
                    {menus.map((item) => {
                        const Icon = item.icon;

                        return (
                            <NavLink
                                key={item.name}
                                to={item.path}
                                onClick={onClose}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 rounded-xl px-4 py-3 transition ${
                                        isActive
                                            ? "bg-indigo-600 text-white"
                                            : "text-slate-300 hover:bg-slate-800 hover:text-white"
                                    }`
                                }
                            >
                                <Icon size={20} />

                                <span>{item.name}</span>
                            </NavLink>
                        );
                    })}
                </nav>

                {/* Sidebar footer */}
                <div className="mt-8 border-t border-slate-700 pt-4">
                    <p className="text-xs text-slate-400">
                        MyBlog Admin
                    </p>
                </div>
            </aside>
        </>
    );
}