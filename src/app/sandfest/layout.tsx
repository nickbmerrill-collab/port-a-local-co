import Navigation from "@/components/Navigation";
import Link from "next/link";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Texas SandFest 2026 — Port A Local Co",
  description:
    "Live crowd counter, AI photo booth, and local business guide for Texas SandFest 2026 in Port Aransas.",
};

export default function SandfestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navigation />
      <div className="fixed top-18 left-0 right-0 z-40 bg-gradient-to-r from-amber-600 via-orange-500 to-coral-500 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-10">
            <div className="flex items-center gap-1">
              <Link
                href="/sandfest"
                className="px-3 py-1 text-xs font-semibold text-white/90 hover:text-white tracking-wide uppercase transition-colors"
              >
                Schedule
              </Link>
              <span className="text-white/30">|</span>
              <Link
                href="/sandfest/live"
                className="px-3 py-1 text-xs font-semibold text-white/90 hover:text-white tracking-wide uppercase transition-colors flex items-center gap-1.5"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
                </span>
                Live Crowd
              </Link>
              <span className="text-white/30">|</span>
              <Link
                href="/sandfest/photobooth"
                className="px-3 py-1 text-xs font-semibold text-white/90 hover:text-white tracking-wide uppercase transition-colors"
              >
                Photo Booth
              </Link>
            </div>
            <span className="text-[10px] text-white/50 tracking-widest uppercase hidden sm:inline">
              Port A Local Co × SandFest
            </span>
          </div>
        </div>
      </div>
      <div className="pt-28">{children}</div>
      <Footer />
    </>
  );
}
