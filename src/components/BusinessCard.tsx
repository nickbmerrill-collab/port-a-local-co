import Link from "next/link";
import Badge from "./Badge";
import type { Business } from "@/data/businesses";

export default function BusinessCard({ business }: { business: Business }) {
  return (
    <Link
      href={`/${business.category}/${business.slug}`}
      className="group block rounded-2xl bg-white border border-sand-200 overflow-hidden card-hover"
    >
      {/* Color bar */}
      <div className="h-2 bg-gradient-to-r from-ocean-400 to-seafoam-400" />

      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-bold text-slate-800 group-hover:text-ocean-600 transition-colors leading-tight">
            {business.name}
          </h3>
          <Badge />
        </div>

        <p className="text-sm text-slate-500 mb-4 leading-relaxed">
          {business.tagline}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {business.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-full bg-sand-100 text-sand-700 text-xs font-medium"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-4 text-xs text-slate-400">
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Port Aransas
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {business.hours.split(",")[0]}
          </span>
        </div>
      </div>
    </Link>
  );
}
