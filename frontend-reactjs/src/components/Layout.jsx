import { useState } from "react";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function Layout({ children }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleOpenSidebar = () => {
        setIsSidebarOpen(true);
    };

    const handleCloseSidebar = () => {
        setIsSidebarOpen(false);
    };

    return (
        <div className="min-h-screen bg-slate-100">

            {/* Navbar */}
            <Navbar onMenuClick={handleOpenSidebar} />

            {/* Main layout */}
            <div className="flex min-h-[calc(100vh-4rem)]">

                {/* Sidebar */}
                <Sidebar
                    isOpen={isSidebarOpen}
                    onClose={handleCloseSidebar}
                />

                {/* Main content */}
                <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
                    {children}
                </main>

            </div>

        </div>
    );
}