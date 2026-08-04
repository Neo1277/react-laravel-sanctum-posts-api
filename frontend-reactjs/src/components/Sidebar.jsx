import {
    LayoutDashboard,
    FileText,
    FolderOpen,
    Users,
    UserCircle
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

export default function Sidebar() {

    return (

        <aside
            className="w-64 bg-slate-900 text-white
                       min-h-screen p-6"
        >

            <h2
                className="text-xl font-bold
                           mb-10"
            >
                MENU
            </h2>

            <nav className="space-y-2">

                {menus.map((item) => {

                    const Icon = item.icon;

                    return (

                        <NavLink
                            key={item.name}
                            to={item.path}
                            className={({ isActive }) =>
                                `flex items-center gap-3
                                 px-4 py-3 rounded-xl
                                 transition
                                 ${
                                     isActive
                                         ? "bg-indigo-600"
                                         : "hover:bg-slate-800"
                                 }`
                            }
                        >

                            <Icon size={20} />

                            {item.name}

                        </NavLink>

                    );

                })}

            </nav>

        </aside>

    );
}