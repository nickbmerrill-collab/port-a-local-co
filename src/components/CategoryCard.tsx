import Link from "next/link";
import type { Category } from "@/data/categories";

export default function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      href={`/${category.slug}`}
      className="group block p-6 rounded-2xl bg-white border border-sand-200 card-hover"
    >
      <div className="text-4xl mb-4">{category.icon}</div>
      <h3 className="text-xl font-bold text-slate-800 group-hover:text-ocean-600 transition-colors mb-2">
        {category.name}
      </h3>
      <p className="text-sm text-slate-500 leading-relaxed">
        {category.description}
      </p>
      <div className="mt-4 inline-flex items-center text-sm font-medium text-ocean-600 group-hover:gap-2 transition-all">
        Browse
        <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </Link>
  );
}
