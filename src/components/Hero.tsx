import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-[92vh] flex items-center editorial-surface overflow-hidden pt-28 pb-20">
      {/* Decorative letterpress dot grid */}
      <div className="absolute inset-0 letterpress opacity-40 pointer-events-none" />

      {/* Terracotta vignette */}
      <div className="absolute top-24 -right-40 w-[36rem] h-[36rem] rounded-full bg-coral-600/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-40 w-[36rem] h-[36rem] rounded-full bg-navy-900/10 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto w-full px-5 sm:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Copy column */}
          <div className="lg:col-span-7 animate-fade-in-up">
            <div className="flex items-center gap-3 mb-8">
              <span className="block w-8 h-px bg-coral-600" />
              <span className="eyebrow text-coral-600">
                The Local&rsquo;s Guide &middot; Est. Port Aransas
              </span>
            </div>

            <h1 className="headline-serif text-5xl sm:text-6xl lg:text-[5.25rem] text-navy-900 mb-8">
              Port Aransas,
              <br />
              as the{" "}
              <span className="text-coral-600">locals</span>
              {" "}live it.
            </h1>

            <p className="text-lg sm:text-xl text-navy-900/70 leading-relaxed mb-10 max-w-xl font-light">
              A hand-vetted field guide to every restaurant, rental, charter
              and shop on the island &mdash; curated by the people who actually
              live here. No paid placements, no algorithms, just honest
              neighbor-to-neighbor recommendations.
            </p>

            {/* Editorial search pill */}
            <form className="relative max-w-xl mb-10">
              <div className="flex items-center gap-2 bg-sand-50 border border-navy-900/15 rounded-full shadow-[0_24px_56px_-28px_rgba(2,25,54,0.35)] pl-6 pr-2 py-2">
                <svg
                  className="w-5 h-5 text-navy-900/50 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.75}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Search beach rentals, boat charters, taco spots&hellip;"
                  className="flex-1 bg-transparent border-0 outline-none text-navy-900 placeholder:text-navy-900/40 py-3 text-sm sm:text-base"
                />
                <Link
                  href="#explore"
                  className="btn-terracotta px-6 py-3 rounded-full text-xs"
                >
                  Explore
                </Link>
              </div>
            </form>

            <div className="flex items-center gap-6 text-xs text-navy-900/60">
              <span className="eyebrow">Trusted by locals</span>
              <span className="h-3 w-px bg-navy-900/20" />
              <span className="tracking-wide">
                50+ vetted businesses &middot; 100% locally approved
              </span>
            </div>
          </div>

          {/* Image well column */}
          <div className="lg:col-span-5 animate-fade-in-up">
            <div className="relative">
              <div className="aspect-[4/5] rounded-sm image-well-navy overflow-hidden relative shadow-[0_40px_80px_-40px_rgba(2,25,54,0.55)]">
                {/* Decorative compass rose */}
                <svg
                  className="absolute inset-0 w-full h-full opacity-25"
                  viewBox="0 0 200 200"
                  fill="none"
                  stroke="#fdf9f3"
                  strokeWidth="0.5"
                >
                  <circle cx="100" cy="100" r="85" />
                  <circle cx="100" cy="100" r="65" />
                  <circle cx="100" cy="100" r="45" />
                  <path d="M100 15 L100 185 M15 100 L185 100" />
                  <path d="M40 40 L160 160 M160 40 L40 160" strokeDasharray="2 3" />
                  <path d="M100 15 L108 100 L100 185 L92 100 Z" fill="#fdf9f3" fillOpacity="0.15" />
                </svg>

                {/* Caption overlay */}
                <div className="absolute inset-x-0 bottom-0 p-8 text-sand-50">
                  <span className="eyebrow text-coral-300">Featured Chapter</span>
                  <p className="headline-serif text-3xl mt-3 mb-2">
                    On the Jetty at First Light
                  </p>
                  <p className="text-sm text-sand-200/80 font-light leading-relaxed">
                    A quiet morning, a bait shop, and the best breakfast taco
                    you haven&rsquo;t heard of yet.
                  </p>
                </div>
              </div>

              {/* Floating kicker card */}
              <div className="hidden lg:block absolute -left-10 top-12 bg-sand-50 border border-navy-900/10 px-5 py-4 rounded-sm shadow-[0_24px_48px_-24px_rgba(2,25,54,0.25)] w-48">
                <span className="eyebrow text-coral-600 text-[0.65rem]">
                  Volume I
                </span>
                <p className="headline-serif text-navy-900 text-lg mt-1 leading-tight">
                  The Local&rsquo;s Atlas
                </p>
                <div className="rule-terracotta mt-3" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
