import { Search, Bell, UserCircle, ChevronDown } from "lucide-react";

export default function Navbar() {
    return (
        <header className="h-16 bg-white shadow-sm border-b flex items-center justify-between px-8">

            <h1 className="text-2xl font-bold text-indigo-600">
                MyBlog Admin
            </h1>

            <div className="flex items-center gap-4">

                <div className="relative">

                    <Search
                        size={18}
                        className="absolute left-3 top-3 text-gray-400"
                    />

                    <input
                        type="text"
                        placeholder="Search..."
                        className="pl-10 pr-4 py-2 rounded-xl border
                                   focus:ring-2 focus:ring-indigo-500
                                   outline-none"
                    />

                </div>

                <button className="relative">

                    <Bell size={22} />

                    <span
                        className="absolute -top-2 -right-2
                                   bg-red-500 text-white
                                   rounded-full w-5 h-5
                                   text-xs flex items-center justify-center"
                    >
                        3
                    </span>

                </button>

                <button
                    className="flex items-center gap-2
                               bg-gray-100 hover:bg-gray-200
                               px-3 py-2 rounded-xl transition"
                >

                    <UserCircle size={30} />

                    <span>Marlon</span>

                    <ChevronDown size={18} />

                </button>

            </div>

        </header>
    );
}