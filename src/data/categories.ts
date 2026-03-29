export interface Category {
  slug: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}

export const categories: Category[] = [
  {
    slug: "eat",
    name: "Eat",
    description: "Restaurants, seafood shacks, cafes & bars vetted by locals",
    icon: "🍽️",
    color: "bg-sunset-500",
  },
  {
    slug: "stay",
    name: "Stay",
    description: "Beach houses, hotels & rentals you can actually trust",
    icon: "🏠",
    color: "bg-ocean-500",
  },
  {
    slug: "do",
    name: "Do",
    description: "Fishing, tours, beaches & experiences worth your time",
    icon: "🎣",
    color: "bg-seafoam-500",
  },
  {
    slug: "shop",
    name: "Shop",
    description: "Local boutiques, surf shops & markets run by real Port A people",
    icon: "🛍️",
    color: "bg-coral-500",
  },
  {
    slug: "services",
    name: "Services",
    description: "Charters, rentals, guides & pros who know the island",
    icon: "⚓",
    color: "bg-sand-600",
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
