import Link from "next/link";
import type { Category } from "@/data/categories";

export default function CategoryCard({
  category,
  index = 0,
}: {
  category: Category;
  index?: number;
}) {
  // Alternate vertical offset for editorial stagger (even cards drop down)
  const stagger = index % 2 === 1 ? "md:mt-12" : "";

  return (
    <Link
      href={`/${category.slug}`}
      className={`group block card-hover ${stagger}`}
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-sm image-well">
        {/* Decorative oversized emoji as a hand-set ornament */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-[7rem] opacity-35 grayscale transition-all duration-700 group-hover:opacity-50 group-hover:scale-105">
            {category.icon}
          </span>
        </div>

        {/* Bottom gradient for label legibility */}
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-navy-900/85 via-navy-900/40 to-transparent" />

        {/* Volume number in top-left like a chapter mark */}
        <div className="absolute top-5 left-5 text-sand-50">
          <span className="eyebrow text-[0.6rem] text-sand-50/80">
            Chapter {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {/* Label block */}
        <div className="absolute inset-x-0 bottom-0 p-6">
          <h3 className="headline-serif text-3xl text-sand-50 mb-2">
            {category.name}
          </h3>
          <p className="text-sm text-sand-50/75 leading-snug font-light mb-3 line-clamp-2">
            {category.description}
          </p>
          <span className="eyebrow text-[0.65rem] text-coral-300 inline-flex items-center gap-2 group-hover:text-coral-200 transition-colors">
            Browse
            <svg
              className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
