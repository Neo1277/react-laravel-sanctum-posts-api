// components/Navbar.jsx
import { useState } from "react";
import { User, LogOut, ChevronDown } from "lucide-react";

export default function Navbar({ onLogout }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full mb-6 relative z-50">
      <div className="flex items-center justify-between 
                      bg-white/60 backdrop-blur-xl border border-white/20 
                      shadow-md rounded-2xl px-6 py-3">

        {/* Logo / Title */}
        <h1 className="text-xl font-bold text-gray-800">
          MyApp
        </h1>

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 
                       px-4 py-2 rounded-lg transition"
          >
            <User size={18} />
            <span>Profile</span>
            <ChevronDown size={16} />
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-40 
                            bg-white rounded-xl shadow-lg border 
                            overflow-hidden z-50">

              <button
                className="w-full flex items-center gap-2 px-4 py-2 
                           hover:bg-gray-100 text-sm"
              >
                <User size={16} />
                Profile
              </button>

              <button
                onClick={onLogout}
                className="w-full flex items-center gap-2 px-4 py-2 
                           hover:bg-red-100 text-red-600 text-sm"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}