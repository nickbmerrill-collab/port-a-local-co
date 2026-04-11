import Link from "next/link";
import { categories } from "@/data/categories";

export default function Footer() {
  return (
    <footer className="bg-sand-50 text-navy-900 relative border-t border-navy-900/10">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-20 pb-10">
        {/* Top wordmark row */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-14">
          <div>
            <span className="eyebrow text-coral-600">Volume I &middot; Port Aransas, TX</span>
            <h3 className="headline-serif text-5xl sm:text-6xl text-navy-900 mt-3">
              Port A Local{" "}
              <span className="text-coral-600">Co.</span>
            </h3>
            <p className="text-navy-900/65 font-light mt-4 max-w-md leading-relaxed">
              A community-driven field guide to every restaurant, rental, shop
              and charter on the island &mdash; vetted by the people who live
              here and built for everyone who loves the place.
            </p>
          </div>

          <form className="flex items-center gap-2 bg-sand-100 border border-navy-900/15 rounded-full pl-5 pr-1.5 py-1.5 w-full md:w-auto md:min-w-[22rem]">
            <input
              type="email"
              placeholder="Your email for the weekly dispatch"
              className="flex-1 bg-transparent border-0 outline-none text-sm text-navy-900 placeholder:text-navy-900/45 py-2"
            />
            <button
              type="submit"
              className="btn-terracotta text-[0.65rem] px-5 py-2.5 rounded-full"
            >
              Subscribe
            </button>
          </form>
        </div>

        <div className="rule-terracotta mb-14" />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-14">
          {/* Explore */}
          <div>
            <h4 className="eyebrow text-navy-900 mb-5">Explore</h4>
            <ul className="space-y-3">
              {categories.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/${cat.slug}`}
                    className="text-sm text-navy-900/70 hover:text-coral-600 transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For Businesses */}
          <div>
            <h4 className="eyebrow text-navy-900 mb-5">For Businesses</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="#" className="text-navy-900/70 hover:text-coral-600 transition-colors">
                  Get Listed
                </Link>
              </li>
              <li>
                <Link href="#" className="text-navy-900/70 hover:text-coral-600 transition-colors">
                  Claim Your Business
                </Link>
              </li>
              <li>
                <Link href="#" className="text-navy-900/70 hover:text-coral-600 transition-colors">
                  Local Approval
                </Link>
              </li>
              <li>
                <Link href="#about" className="text-navy-900/70 hover:text-coral-600 transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Island */}
          <div>
            <h4 className="eyebrow text-navy-900 mb-5">The Island</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="#" className="text-navy-900/70 hover:text-coral-600 transition-colors">
                  Events
                </Link>
              </li>
              <li>
                <Link href="#" className="text-navy-900/70 hover:text-coral-600 transition-colors">
                  Community
                </Link>
              </li>
              <li>
                <Link href="#" className="text-navy-900/70 hover:text-coral-600 transition-colors">
                  Map
                </Link>
              </li>
              <li>
                <Link href="#" className="text-navy-900/70 hover:text-coral-600 transition-colors">
                  Storm Updates
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="eyebrow text-navy-900 mb-5">Find Us</h4>
            <ul className="space-y-3 text-sm text-navy-900/70">
              <li>Port Aransas, TX 78373</li>
              <li>
                <Link href="#" className="hover:text-coral-600 transition-colors">
                  hello@portalocal.co
                </Link>
              </li>
              <li className="flex items-center gap-3 pt-2">
                <Link href="#" className="hover:text-coral-600 transition-colors" aria-label="Instagram">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                </Link>
                <Link href="#" className="hover:text-coral-600 transition-colors" aria-label="Facebook">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-navy-900/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-navy-900/50">
          <p>
            &copy; {new Date().getFullYear()} Port A Local Co. Printed on the island.
          </p>
          <div className="flex items-center gap-6">
            <Link href="#" className="hover:text-coral-600 transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-coral-600 transition-colors">Terms</Link>
            <Link href="#" className="hover:text-coral-600 transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
