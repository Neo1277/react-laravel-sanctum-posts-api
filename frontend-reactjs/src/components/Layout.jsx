import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function Layout({ children }) {

    return (

        <div className="bg-slate-100 min-h-screen">

            <Navbar />

            <div className="flex">

                <Sidebar />

                <main className="flex-1 p-8">

                    {children}

                </main>

            </div>

        </div>

    );

}