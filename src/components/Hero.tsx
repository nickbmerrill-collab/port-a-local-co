import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-[85vh] flex items-center wave-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-16">
        <div className="max-w-3xl animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-ocean-100 text-ocean-700 text-sm font-medium mb-6">
            <span>🌊</span>
            <span>Your Trusted Local Guide to Port Aransas, TX</span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 leading-tight mb-6">
            Discover{" "}
            <span className="text-ocean-600">Port Aransas</span>
            <br />
            Like a Local
          </h1>

          <p className="text-xl text-slate-600 leading-relaxed mb-10 max-w-2xl">
            Every business on Port A Local Co is vetted and approved by people who actually
            live here. No paid placements. No algorithms. Just honest recommendations
            from your neighbors on the island.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="#explore"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-ocean-600 text-white font-semibold text-lg hover:bg-ocean-700 transition-colors shadow-lg shadow-ocean-600/25"
            >
              Explore the Island
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="#about"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-white text-slate-700 font-semibold text-lg hover:bg-sand-50 transition-colors border border-sand-200"
            >
              Why Port A Local?
            </Link>
          </div>
        </div>

        {/* Stats bar */}
        <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg">
          <div>
            <div className="text-3xl font-bold text-ocean-600">50+</div>
            <div className="text-sm text-slate-500 mt-1">Vetted Businesses</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-seafoam-500">100%</div>
            <div className="text-sm text-slate-500 mt-1">Locally Approved</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-sunset-500">0</div>
            <div className="text-sm text-slate-500 mt-1">Paid Placements</div>
          </div>
        </div>
      </div>
    </section>
  );
}
