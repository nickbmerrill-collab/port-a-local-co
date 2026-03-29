import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import CategoryCard from "@/components/CategoryCard";
import FeaturedSpots from "@/components/FeaturedSpots";
import Footer from "@/components/Footer";
import { categories } from "@/data/categories";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />

      {/* Category Grid */}
      <section className="py-20" id="explore">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Explore Port Aransas
            </h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              Every listing is vetted by locals. Browse by category to find exactly what you need.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {categories.map((cat) => (
              <CategoryCard key={cat.slug} category={cat} />
            ))}
          </div>
        </div>
      </section>

      <FeaturedSpots />

      {/* About Section */}
      <section className="py-20" id="about">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">
              Why Port A Local Co?
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-8">
              Port Aransas is one of the most beloved beach towns on the Texas coast, but finding
              the real gems has always been word-of-mouth. We built Port A Local Co to change that —
              a single place where visitors and residents can discover businesses that are genuinely
              local, genuinely good, and genuinely cared about by the community.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-12">
              <div className="p-6 rounded-2xl bg-white border border-sand-200">
                <div className="text-3xl mb-3">🏝️</div>
                <h3 className="font-bold text-slate-800 mb-2">Island Curated</h3>
                <p className="text-sm text-slate-500">
                  Every business is reviewed and approved by people who live and work on the island.
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-white border border-sand-200">
                <div className="text-3xl mb-3">🤝</div>
                <h3 className="font-bold text-slate-800 mb-2">Community First</h3>
                <p className="text-sm text-slate-500">
                  We exist to serve Port Aransas — connecting visitors with businesses that make this town great.
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-white border border-sand-200">
                <div className="text-3xl mb-3">🚫</div>
                <h3 className="font-bold text-slate-800 mb-2">No Pay-to-Play</h3>
                <p className="text-sm text-slate-500">
                  Listings aren't for sale. You earn your spot by being great at what you do.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA for Businesses */}
      <section className="py-20 bg-ocean-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Own a Business in Port A?
          </h2>
          <p className="text-lg text-ocean-100 max-w-2xl mx-auto mb-8">
            If you run a local business and want to be featured on Port A Local Co,
            we'd love to hear from you. Our vetting process is simple and free.
          </p>
          <a
            href="#"
            className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-white text-ocean-700 font-semibold text-lg hover:bg-sand-50 transition-colors"
          >
            Get Listed
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
