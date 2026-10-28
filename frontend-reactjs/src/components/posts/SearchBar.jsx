import { Search, X } from "lucide-react";

export default function SearchBar({ search, onSearchChange }) {
  return (
    <div className="relative w-full md:max-w-md">
      <Search
        size={20}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
      />

      <input
        type="text"
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder="Search posts by title..."
        aria-label="Search posts by title"
        className="w-full rounded-xl border border-slate-200 bg-white
                   py-3 pl-12 pr-10 text-sm text-slate-700
                   outline-none transition
                   focus:border-indigo-500 focus:ring-4
                   focus:ring-indigo-100"
      />

      {search && (
        <button
          type="button"
          onClick={() => onSearchChange("")}
          aria-label="Clear search"
          className="absolute right-3 top-1/2 -translate-y-1/2
                     rounded-lg p-1 text-slate-400 hover:bg-slate-100
                     hover:text-slate-700"
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
}