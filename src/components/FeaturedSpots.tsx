import BusinessCard from "./BusinessCard";
import { getFeaturedBusinesses } from "@/data/businesses";

export default function FeaturedSpots() {
  const featured = getFeaturedBusinesses();

  return (
    <section className="py-20 bg-sand-50/50" id="featured">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Featured Spots
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Hand-picked favorites from locals who know Port A inside and out
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((biz) => (
            <BusinessCard key={biz.slug} business={biz} />
          ))}
        </div>
      </div>
    </section>
  );
}
