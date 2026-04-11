"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { categories } from "@/data/categories";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass-nav" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Wordmark */}
          <Link href="/" className="flex items-baseline gap-2 group">
            <span className="headline-serif text-2xl sm:text-[1.65rem] text-navy-900">
              Port A Local
            </span>
            <span className="eyebrow text-coral-600 text-[0.65rem] pb-0.5">
              Co.
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/${cat.slug}`}
                className="group relative text-sm font-medium tracking-wide text-navy-900/80 hover:text-coral-600 transition-colors"
              >
                {cat.name}
                <span className="absolute left-0 -bottom-1.5 h-px w-0 bg-coral-600 transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
            <Link
              href="#explore"
              className="ml-2 inline-flex items-center gap-2 btn-terracotta px-5 py-2.5 rounded-full text-xs"
            >
              Explore
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg text-navy-900 hover:text-coral-600 transition-colors"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden pb-6 pt-2 border-t border-navy-900/10">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/${cat.slug}`}
                onClick={() => setMobileOpen(false)}
                className="block px-2 py-3 text-base font-medium text-navy-900 hover:text-coral-600 border-b border-navy-900/5 last:border-0 transition-colors"
              >
                <span className="headline-serif text-xl mr-3">{cat.name}</span>
                <span className="text-xs text-navy-900/50 tracking-wide">
                  {cat.description}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
