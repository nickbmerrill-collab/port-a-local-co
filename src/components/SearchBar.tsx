"use client";

import { useState } from "react";

export default function SearchBar({
  onSearch,
  placeholder = "Search businesses, activities, restaurants...",
}: {
  onSearch?: (query: string) => void;
  placeholder?: string;
}) {
  const [query, setQuery] = useState("");

  return (
    <div className="relative w-full max-w-xl">
      <div className="flex items-center gap-2 bg-sand-50 border border-navy-900/15 rounded-full shadow-[0_18px_44px_-22px_rgba(2,25,54,0.3)] pl-6 pr-2 py-1.5">
        <svg
          className="w-5 h-5 text-navy-900/50 shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.75}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            onSearch?.(e.target.value);
          }}
          placeholder={placeholder}
          className="flex-1 bg-transparent border-0 outline-none text-navy-900 placeholder:text-navy-900/40 py-3 text-sm sm:text-base"
        />
      </div>
    </div>
  );
}
