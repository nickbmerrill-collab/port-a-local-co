"use client";

import { useState } from "react";
import Navigation from "./Navigation";
import BusinessCard from "./BusinessCard";
import SearchBar from "./SearchBar";
import Footer from "./Footer";
import Badge from "./Badge";
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
    <main className="min-h-screen">
      <Navigation />

      {/* Header */}
      <section className="pt-28 pb-12 wave-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-4xl">{category.icon}</span>
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900">
              {category.name}
            </h1>
          </div>
          <p className="text-lg text-slate-500 mt-2 mb-8 max-w-2xl">
            {category.description}
          </p>

          <div className="flex items-center gap-4">
            <SearchBar
              onSearch={setQuery}
              placeholder={`Search ${category.name.toLowerCase()}...`}
            />
            <Badge size="lg" />
          </div>

          <p className="text-sm text-slate-400 mt-4">
            {filtered.length} vetted {filtered.length === 1 ? "business" : "businesses"}
          </p>
        </div>
      </section>

      {/* Listings */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((biz) => (
                <BusinessCard key={biz.slug} business={biz} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-lg text-slate-400">
                No businesses match &ldquo;{query}&rdquo;
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
