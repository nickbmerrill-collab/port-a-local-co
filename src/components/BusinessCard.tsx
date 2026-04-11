import Link from "next/link";
import type { Business } from "@/data/businesses";
import { getCategoryBySlug } from "@/data/categories";

export default function BusinessCard({
  business,
  variant = "default",
}: {
  business: Business;
  variant?: "default" | "spotlight";
}) {
  const category = getCategoryBySlug(business.category);
  const isSpotlight = variant === "spotlight";

  return (
    <Link
      href={`/${business.category}/${business.slug}`}
      className={`group block card-hover ${isSpotlight ? "h-full" : ""}`}
    >
      <article
        className={`relative h-full flex flex-col bg-sand-50 border border-navy-900/10 rounded-sm overflow-hidden ${
          isSpotlight ? "" : ""
        }`}
      >
        {/* Image well */}
        <div
          className={`relative image-well overflow-hidden ${
            isSpotlight ? "aspect-[16/9] md:aspect-[16/10]" : "aspect-[16/10]"
          }`}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className={`opacity-40 grayscale transition-transform duration-700 group-hover:scale-105 ${
                isSpotlight ? "text-[8rem]" : "text-[5rem]"
              }`}
            >
              {category?.icon ?? "⚓"}
            </span>
          </div>

          {/* Local Approved pill */}
          <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sand-50/95 backdrop-blur-sm border border-coral-600/30">
            <svg
              className="w-3 h-3 text-coral-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-[0.65rem] font-semibold tracking-[0.18em] uppercase text-coral-700">
              Local Approved
            </span>
          </div>

          {/* Category kicker bottom-right */}
          {category && (
            <div className="absolute bottom-4 right-4">
              <span className="eyebrow text-[0.6rem] text-sand-50 px-2.5 py-1 bg-navy-900/80 rounded-full">
                {category.name}
              </span>
            </div>
          )}
        </div>

        {/* Body */}
        <div
          className={`flex flex-col flex-1 p-6 ${
            isSpotlight ? "md:p-8" : ""
          }`}
        >
          <h3
            className={`headline-serif text-navy-900 group-hover:text-coral-600 transition-colors mb-3 ${
              isSpotlight ? "text-3xl md:text-4xl" : "text-2xl"
            }`}
          >
            {business.name}
          </h3>

          <p
            className={`text-navy-900/65 font-light leading-relaxed mb-5 line-clamp-2 ${
              isSpotlight ? "text-base md:text-lg" : "text-sm"
            }`}
          >
            {business.tagline}
          </p>

          <div className="flex flex-wrap gap-2 mb-5">
            {business.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-full bg-sand-100 text-navy-900/70 text-[0.68rem] font-medium tracking-wide border border-navy-900/10"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-auto pt-4 border-t border-navy-900/10 flex items-center justify-between text-xs text-navy-900/55">
            <span className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Port Aransas
            </span>
            <span className="eyebrow text-[0.6rem] text-coral-600 inline-flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
              Read More
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
