import { Search, Bell, UserCircle, ChevronDown, Menu } from "lucide-react";

export default function Navbar({ onMenuClick }) {
    return (
        <header className="relative z-30 flex h-16 items-center justify-between gap-3 border-b border-gray-200 bg-white px-4 shadow-sm sm:px-6 lg:px-8">

            {/* Left section */}
            <div className="flex min-w-0 items-center gap-3">

                {/* Mobile menu button */}
                <button
                    type="button"
                    onClick={onMenuClick}
                    aria-label="Open navigation menu"
                    className="inline-flex shrink-0 items-center justify-center rounded-lg p-2 text-gray-600 transition hover:bg-gray-100 hover:text-indigo-600 lg:hidden"
                >
                    <Menu size={24} />
                </button>

                {/* Brand */}
                <h1 className="truncate text-lg font-bold text-indigo-600 sm:text-2xl">
                    MyBlog Admin
                </h1>

            </div>

            {/* Right section */}
            <div className="flex shrink-0 items-center gap-2 sm:gap-4">

                {/* Search */}
                <div className="relative hidden md:block">

                    <Search
                        size={18}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                        type="search"
                        placeholder="Search..."
                        aria-label="Search"
                        className="w-40 rounded-xl border border-gray-200 py-2 pl-10 pr-4 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 lg:w-56"
                    />

                </div>

                {/* Notifications */}
                <button
                    type="button"
                    aria-label="Notifications, 3 unread"
                    className="relative inline-flex shrink-0 items-center justify-center rounded-xl p-2 text-gray-600 transition hover:bg-gray-100 hover:text-indigo-600"
                >
                    <Bell size={22} />

                    <span className="absolute right-0.5 top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-semibold text-white">
                        3
                    </span>
                </button>

                {/* Profile */}
                <button
                    type="button"
                    className="flex shrink-0 items-center gap-2 rounded-xl bg-gray-100 p-2 transition hover:bg-gray-200 sm:px-3"
                    aria-label="User profile"
                >
                    <UserCircle size={26} className="shrink-0 text-gray-700" />

                    <span className="hidden text-sm font-medium text-gray-700 sm:inline">
                        Marlon
                    </span>

                    <ChevronDown
                        size={16}
                        className="hidden text-gray-500 sm:block"
                    />
                </button>

            </div>

        </header>
    );
}