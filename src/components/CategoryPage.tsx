"use client";

import { useState } from "react";
import Navigation from "./Navigation";
import BusinessCard from "./BusinessCard";
import SearchBar from "./SearchBar";
import Footer from "./Footer";
import type { Category } from "@/data/categories";
import type { Business } from "@/data/businesses";

export default function CategoryPage({
  category,
  businesses,
}: {
  category: Category;
  businesses: Business[];
}) {
  const [query, setQuery] = useState("");

  const filtered = query
    ? businesses.filter(
        (b) =>
          b.name.toLowerCase().includes(query.toLowerCase()) ||
          b.tagline.toLowerCase().includes(query.toLowerCase()) ||
          b.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()))
      )
    : businesses;

  return (
    <main className="min-h-screen bg-sand-50">
      <Navigation />

      {/* Editorial chapter header */}
      <section className="pt-36 pb-20 editorial-surface relative">
        <div className="absolute inset-0 letterpress opacity-30 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
          <div className="flex items-center gap-3 mb-6">
            <span className="block w-8 h-px bg-coral-600" />
            <span className="eyebrow text-coral-600">
              Chapter &middot; {category.name}
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 mb-10">
            <div className="max-w-3xl">
              <h1 className="headline-serif text-5xl sm:text-6xl lg:text-7xl text-navy-900 mb-6">
                <span className="text-coral-600">{category.name}</span>{" "}
                <span className="text-navy-900/80">on the Island</span>
              </h1>
              <p className="text-lg sm:text-xl text-navy-900/65 font-light leading-relaxed max-w-2xl">
                {category.description}
              </p>
            </div>
            <div className="shrink-0">
              <span className="eyebrow text-navy-900/60">The Count</span>
              <p className="headline-serif text-navy-900 text-4xl mt-2">
                {filtered.length}
              </p>
              <p className="text-xs text-navy-900/50 tracking-wide uppercase">
                {filtered.length === 1 ? "Listing" : "Listings"}
              </p>
            </div>
          </div>

          <div className="rule-terracotta max-w-sm mb-8" />

          <div className="max-w-xl">
            <SearchBar
              onSearch={setQuery}
              placeholder={`Search ${category.name.toLowerCase()}...`}
            />
          </div>
        </div>
      </section>

      {/* Listings */}
      <section className="py-20 bg-sand-50">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filtered.map((biz) => (
                <BusinessCard key={biz.slug} business={biz} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="headline-serif text-2xl text-navy-900/70 mb-2">
                Nothing matches &ldquo;{query}&rdquo;
              </p>
              <p className="text-sm text-navy-900/50">
                Try a different search term or browse the full chapter.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
