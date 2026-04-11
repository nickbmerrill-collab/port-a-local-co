import BusinessCard from "./BusinessCard";
import { getFeaturedBusinesses } from "@/data/businesses";

export default function FeaturedSpots() {
  const featured = getFeaturedBusinesses();
  const [spotlight, ...rest] = featured;
  const secondary = rest.slice(0, 2);
  const remainder = rest.slice(2, 5);

  return (
    <section className="py-24 bg-sand-100 relative" id="featured">
      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="block w-8 h-px bg-coral-600" />
              <span className="eyebrow text-coral-600">Volume II &middot; Hand-Picked</span>
            </div>
            <h2 className="headline-serif text-4xl sm:text-5xl text-navy-900 mb-4">
              Featured Local Gems
            </h2>
            <p className="text-lg text-navy-900/65 font-light max-w-xl leading-relaxed">
              The spots the island itself would recommend &mdash; chosen by
              people who actually eat, stay and cast a line here.
            </p>
          </div>
          <a
            href="#explore"
            className="btn-navy-ghost inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs self-start md:self-end"
          >
            Browse The Atlas
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>

        {/* Bento grid */}
        {spotlight && (
          <div className="grid grid-cols-1 md:grid-cols-12 md:grid-rows-2 gap-6 md:gap-8 md:auto-rows-fr">
            {/* Large spotlight */}
            <div className="md:col-span-8 md:row-span-2">
              <BusinessCard business={spotlight} variant="spotlight" />
            </div>

            {/* Two stacked secondary cards */}
            {secondary.map((biz) => (
              <div key={biz.slug} className="md:col-span-4">
                <BusinessCard business={biz} />
              </div>
            ))}
          </div>
        )}

        {/* Remainder row */}
        {remainder.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-8">
            {remainder.map((biz) => (
              <BusinessCard key={biz.slug} business={biz} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
