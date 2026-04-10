import Link from "next/link";
import { SANDFEST_CONFIG } from "@/data/sandfest";
import { businesses } from "@/data/businesses";
import BusinessCard from "@/components/BusinessCard";

export default function SandfestPage() {
  const recommended = businesses.filter((b) =>
    SANDFEST_CONFIG.recommendedBusinessSlugs.includes(b.slug)
  );

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative py-20 sm:py-28 overflow-hidden bg-gradient-to-br from-amber-700 via-orange-600 to-coral-600">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M30 5 Q35 25 55 30 Q35 35 30 55 Q25 35 5 30 Q25 25 30 5Z\' fill=\'%23fff\' fill-opacity=\'0.1\'/%3E%3C/svg%3E")',
              backgroundSize: "60px 60px",
            }}
          />
        </div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/10 text-white/90 text-sm font-medium tracking-wide mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-300 animate-pulse" />
            April 17–19, 2026 • Port Aransas Beach
          </div>

          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-6">
            Texas{" "}
            <span className="text-amber-200 italic">SandFest</span>
            <br />
            2026
          </h1>

          <p className="text-xl text-white/80 leading-relaxed mb-10 max-w-2xl mx-auto font-light">
            The largest native-sand sculpture competition in the USA.
            World-class sculptors, live music, Gulf Coast eats, and three days
            of sun-soaked fun on the beach.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/sandfest/live"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-white text-orange-700 font-bold text-lg hover:bg-amber-50 transition-colors shadow-lg"
            >
              <span className="relative flex h-2.5 w-2.5 mr-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
              </span>
              Live Crowd Counter
            </Link>
            <Link
              href="/sandfest/photobooth"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl border-2 border-white/40 text-white font-bold text-lg hover:bg-white/10 transition-colors"
            >
              AI Photo Booth
            </Link>
          </div>

          <div className="mt-14 grid grid-cols-3 gap-6 max-w-md mx-auto">
            <div>
              <div className="text-3xl font-display font-bold text-amber-200">
                100K
              </div>
              <div className="text-xs text-white/60 mt-1 tracking-wide uppercase">
                Visitors
              </div>
            </div>
            <div>
              <div className="text-3xl font-display font-bold text-white">
                3
              </div>
              <div className="text-xs text-white/60 mt-1 tracking-wide uppercase">
                Days
              </div>
            </div>
            <div>
              <div className="text-3xl font-display font-bold text-amber-200">
                28th
              </div>
              <div className="text-xs text-white/60 mt-1 tracking-wide uppercase">
                Year
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Schedule */}
      <section className="py-20 bg-sand-50" id="schedule">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-orange-500 text-sm font-medium tracking-[0.2em] uppercase mb-3">
              Three Days of Fun
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-navy-900 mb-4">
              Festival Schedule
            </h2>
            <div className="h-1 w-16 bg-gradient-to-r from-amber-500 to-coral-500 rounded-full mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SANDFEST_CONFIG.schedule.map((day, i) => (
              <div
                key={day.day}
                className="rounded-2xl bg-white border border-sand-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div
                  className={`px-6 py-4 ${
                    i === 0
                      ? "bg-gradient-to-r from-amber-500 to-orange-500"
                      : i === 1
                        ? "bg-gradient-to-r from-orange-500 to-coral-500"
                        : "bg-gradient-to-r from-coral-500 to-rose-500"
                  }`}
                >
                  <h3 className="font-display font-bold text-white text-lg">
                    {day.day}
                  </h3>
                </div>
                <div className="p-6 space-y-4">
                  {day.events.map((event) => (
                    <div key={event.name} className="flex gap-4">
                      <span className="text-sm font-mono text-orange-600 whitespace-nowrap w-20 shrink-0">
                        {event.time}
                      </span>
                      <span className="text-sm text-navy-700 font-medium">
                        {event.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-navy-400">
              Mile Markers 13–17 • {SANDFEST_CONFIG.address}
            </p>
          </div>
        </div>
      </section>

      {/* Local Recommendations */}
      <section className="py-20 hero-gradient relative">
        <div className="absolute inset-0 palm-pattern opacity-20" />
        <div className="absolute top-0 left-0 right-0 gold-line" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="text-amber-400 text-sm font-medium tracking-[0.2em] uppercase mb-3">
              While You&apos;re Here
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-sand-50 mb-4">
              Local Spots for Festival-Goers
            </h2>
            <div className="h-1 w-16 bg-gradient-to-r from-amber-400 to-coral-400 rounded-full mx-auto mb-6" />
            <p className="text-lg text-navy-200 max-w-2xl mx-auto font-light">
              Hungry after the beach? Need a cold drink? These local favorites
              are open during SandFest and loved by the people who live here.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommended.map((biz) => (
              <BusinessCard key={biz.slug} business={biz} />
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/#explore"
              className="inline-flex items-center gap-2 text-coral-400 hover:text-coral-300 font-medium transition-colors"
            >
              Browse all Port A businesses
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Strip */}
      <section className="py-16 bg-sand-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Link
              href="/sandfest/live"
              className="group rounded-2xl bg-white border border-sand-200 p-8 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500" />
                </span>
                <h3 className="font-display font-bold text-navy-900 text-xl">
                  Live Crowd Counter
                </h3>
              </div>
              <p className="text-sm text-navy-400 mb-4">
                See real-time attendance powered by AI. Know when the festival
                is busy or the perfect time to go.
              </p>
              <span className="text-sm font-semibold text-orange-600 group-hover:text-orange-500 transition-colors">
                View live data &rarr;
              </span>
            </Link>

            <Link
              href="/sandfest/photobooth"
              className="group rounded-2xl bg-white border border-sand-200 p-8 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">📸</span>
                <h3 className="font-display font-bold text-navy-900 text-xl">
                  AI Photo Booth
                </h3>
              </div>
              <p className="text-sm text-navy-400 mb-4">
                Step up and become a sand sculpture! Our AI transforms your
                photo into SandFest-worthy art.
              </p>
              <span className="text-sm font-semibold text-orange-600 group-hover:text-orange-500 transition-colors">
                Try the booth &rarr;
              </span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
