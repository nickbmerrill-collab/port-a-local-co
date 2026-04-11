import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import CategoryCard from "@/components/CategoryCard";
import FeaturedSpots from "@/components/FeaturedSpots";
import Footer from "@/components/Footer";
import { categories } from "@/data/categories";

export default function Home() {
  return (
    <main className="min-h-screen bg-sand-50">
      <Navigation />
      <Hero />

      {/* Category Grid */}
      <section className="py-28 bg-sand-50 relative" id="explore">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6">
            <div className="max-w-xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="block w-8 h-px bg-coral-600" />
                <span className="eyebrow text-coral-600">Chapter Index</span>
              </div>
              <h2 className="headline-serif text-4xl sm:text-5xl text-navy-900 mb-4">
                The Island, by Chapter
              </h2>
              <p className="text-lg text-navy-900/65 font-light leading-relaxed">
                Five chapters, one island. Every listing is vetted by locals
                &mdash; browse the chapter that matches whatever the day asks
                for.
              </p>
            </div>
            <div className="hidden md:block text-right text-navy-900/50">
              <span className="eyebrow">Volume I</span>
              <p className="headline-serif text-2xl text-navy-900/70">
                {categories.length} Chapters
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 md:gap-6">
            {categories.map((cat, i) => (
              <CategoryCard key={cat.slug} category={cat} index={i} />
            ))}
          </div>
        </div>
      </section>

      <FeaturedSpots />

      {/* About / Why section */}
      <section className="py-28 bg-sand-50 relative" id="about">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5">
              <div className="flex items-center gap-3 mb-4">
                <span className="block w-8 h-px bg-coral-600" />
                <span className="eyebrow text-coral-600">The Local Manifesto</span>
              </div>
              <h2 className="headline-serif text-4xl sm:text-5xl text-navy-900 mb-6">
                Why we built Port A Local&nbsp;Co.
              </h2>
              <p className="text-lg text-navy-900/70 font-light leading-relaxed mb-6">
                Port Aransas is one of the most beloved beach towns on the
                Texas coast, but finding the real gems has always been
                word-of-mouth. We built this as a single place where visitors
                and residents can discover businesses that are genuinely local,
                genuinely good, and genuinely cared about by the community.
              </p>
              <p className="text-lg text-navy-900/70 font-light leading-relaxed mb-8">
                No paid placements. No algorithms. No out-of-town
                advertisers ranking their own businesses to the top. Just
                honest neighbor-to-neighbor recommendations, printed like an
                editorial field guide.
              </p>
              <div className="rule-terracotta max-w-xs" />
              <p className="mt-6 headline-serif text-navy-900 text-xl">
                &mdash; Winston &amp; the Port A crew
              </p>
            </div>

            <div className="lg:col-span-7 grid sm:grid-cols-2 gap-6">
              <div className="p-8 rounded-sm bg-sand-100 border border-navy-900/10">
                <span className="eyebrow text-coral-600 text-[0.65rem]">
                  Tenet 01
                </span>
                <h3 className="headline-serif text-2xl text-navy-900 mt-3 mb-3">
                  Island Curated
                </h3>
                <p className="text-sm text-navy-900/65 font-light leading-relaxed">
                  Every business is reviewed and approved by people who live
                  and work on the island.
                </p>
              </div>
              <div className="p-8 rounded-sm bg-sand-100 border border-navy-900/10 sm:mt-12">
                <span className="eyebrow text-coral-600 text-[0.65rem]">
                  Tenet 02
                </span>
                <h3 className="headline-serif text-2xl text-navy-900 mt-3 mb-3">
                  Community First
                </h3>
                <p className="text-sm text-navy-900/65 font-light leading-relaxed">
                  We exist to serve Port Aransas &mdash; connecting visitors
                  with the businesses that make this town great.
                </p>
              </div>
              <div className="p-8 rounded-sm bg-sand-100 border border-navy-900/10">
                <span className="eyebrow text-coral-600 text-[0.65rem]">
                  Tenet 03
                </span>
                <h3 className="headline-serif text-2xl text-navy-900 mt-3 mb-3">
                  No Pay-to-Play
                </h3>
                <p className="text-sm text-navy-900/65 font-light leading-relaxed">
                  Listings aren&rsquo;t for sale. You earn your spot by being
                  great at what you do, not by writing a check.
                </p>
              </div>
              <div className="p-8 rounded-sm bg-navy-900 text-sand-50 sm:mt-12">
                <span className="eyebrow text-coral-300 text-[0.65rem]">
                  Tenet 04
                </span>
                <h3 className="headline-serif text-2xl text-sand-50 mt-3 mb-3">
                  Printed on the Island
                </h3>
                <p className="text-sm text-sand-50/75 font-light leading-relaxed">
                  Built in Port A by people who call the jetties home. This is
                  a local project, through and through.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 editorial-surface relative border-y border-navy-900/10">
        <div className="absolute inset-0 letterpress opacity-30 pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-5 sm:px-8 text-center">
          <div className="flex items-center gap-3 justify-center mb-6">
            <span className="block w-8 h-px bg-coral-600" />
            <span className="eyebrow text-coral-600">Join the Guide</span>
            <span className="block w-8 h-px bg-coral-600" />
          </div>
          <h2 className="headline-serif text-4xl sm:text-5xl text-navy-900 mb-6">
            Own a business on Port A?
          </h2>
          <p className="text-lg text-navy-900/70 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
            If you run a local business and want to be featured in the guide,
            we&rsquo;d love to hear from you. Our vetting process is simple,
            free, and run by actual neighbors.
          </p>
          <a
            href="#"
            className="inline-flex items-center gap-2 btn-terracotta px-8 py-4 rounded-full text-xs"
          >
            Apply To Be Listed
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
