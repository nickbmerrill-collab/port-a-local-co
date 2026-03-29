export interface Business {
  slug: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  address: string;
  phone: string;
  website?: string;
  hours: string;
  featured: boolean;
  tags: string[];
}

export const businesses: Business[] = [
  // EAT
  {
    slug: "shells-pasta-seafood",
    name: "Shells Pasta & Seafood",
    category: "eat",
    tagline: "Fresh Gulf seafood and handmade pasta since 1995",
    description:
      "A Port Aransas institution known for its fresh-catch specials and handmade pasta dishes. Family-owned and operated for nearly three decades, Shells sources directly from local fishermen and serves up some of the best seafood on the Texas coast. Whether you're craving blackened redfish or a classic shrimp scampi, this is where locals eat.",
    address: "522 E Ave G, Port Aransas, TX 78373",
    phone: "(361) 749-7621",
    hours: "Sun-Thu 11AM-9PM, Fri-Sat 11AM-10PM",
    featured: true,
    tags: ["seafood", "pasta", "family-friendly", "local favorite"],
  },
  {
    slug: "beach-lodge-restaurant",
    name: "Beach Lodge Restaurant",
    category: "eat",
    tagline: "Waterfront dining with the best sunset views on the island",
    description:
      "Perched right on the water, Beach Lodge serves elevated coastal cuisine with panoramic views of the ship channel. Known for their craft cocktails and fresh oyster bar, this is the spot for a memorable dinner. The outdoor deck is unbeatable during golden hour.",
    address: "1010 S Alister St, Port Aransas, TX 78373",
    phone: "(361) 749-6800",
    hours: "Daily 11AM-10PM",
    featured: true,
    tags: ["waterfront", "fine dining", "oysters", "cocktails", "sunset views"],
  },
  {
    slug: "crazy-cajun",
    name: "Crazy Cajun",
    category: "eat",
    tagline: "Boiled seafood dumped right on the table — no plates needed",
    description:
      "The Crazy Cajun is a Port A legend. They dump your boiled shrimp, crab, and crawfish straight onto the butcher-paper-covered table. It's messy, loud, and absolutely perfect. A must-do for first-timers and a weekly ritual for regulars.",
    address: "303 Beach Ave, Port Aransas, TX 78373",
    phone: "(361) 749-5069",
    hours: "Daily 11AM-9PM",
    featured: false,
    tags: ["cajun", "boiled seafood", "casual", "iconic"],
  },

  // STAY
  {
    slug: "port-royal-ocean-resort",
    name: "Port Royal Ocean Resort",
    category: "stay",
    tagline: "Full-service beachfront resort with pools, dining & ocean views",
    description:
      "Port Royal is the premier resort on the island, offering spacious condos right on the beach. With multiple pools, an on-site restaurant, fitness center, and direct beach access, it's the go-to for families and groups wanting a full-service experience without leaving the property.",
    address: "6317 State Hwy 361, Port Aransas, TX 78373",
    phone: "(361) 749-5011",
    website: "https://www.portroyalresort.com",
    hours: "24/7 front desk",
    featured: true,
    tags: ["beachfront", "resort", "family-friendly", "pools", "restaurant"],
  },
  {
    slug: "deep-blue-beach-house",
    name: "Deep Blue Beach House",
    category: "stay",
    tagline: "Boutique beach house rental steps from the sand",
    description:
      "A beautifully appointed 4-bedroom beach house just two blocks from the shore. Deep Blue features a private pool, outdoor kitchen, and rooftop deck with panoramic island views. Managed by a local family who keeps everything in top shape. Perfect for groups of 8-10.",
    address: "240 Beach Access Rd, Port Aransas, TX 78373",
    phone: "(361) 749-4200",
    hours: "Check-in 3PM, Check-out 11AM",
    featured: false,
    tags: ["beach house", "private pool", "rooftop deck", "family"],
  },

  // DO
  {
    slug: "dolphin-watch-cruises",
    name: "Dolphin Watch Cruises",
    category: "do",
    tagline: "See wild dolphins in the Aransas Pass — daily cruises year-round",
    description:
      "Port Aransas is home to a resident pod of bottlenose dolphins, and Dolphin Watch runs daily cruises through the ship channel and into the bay to see them up close. Captained by a marine biologist who's been on the water here for 20+ years, these tours are educational, family-friendly, and almost guaranteed to deliver sightings.",
    address: "136 W Cotter Ave, Port Aransas, TX 78373",
    phone: "(361) 749-6969",
    hours: "Cruises at 10AM, 1PM, 4PM daily",
    featured: true,
    tags: ["dolphins", "boat tour", "family-friendly", "wildlife"],
  },
  {
    slug: "jetty-boat-fishing",
    name: "Jetty Boat Fishing",
    category: "do",
    tagline: "Deep sea & bay fishing charters with 40+ years of Port A experience",
    description:
      "Whether you want to chase redfish in the flats or go offshore for tuna and kingfish, Jetty Boat has the captain and the rig for you. Running charters out of Port A for over four decades, they know every reef, channel, and honey hole within 50 miles. Half-day and full-day trips available, all gear provided.",
    address: "440 W Cotter Ave, Port Aransas, TX 78373",
    phone: "(361) 749-5252",
    hours: "Trips depart 6AM & 1PM",
    featured: true,
    tags: ["fishing", "charters", "deep sea", "bay fishing", "offshore"],
  },
  {
    slug: "port-a-beach-buggies",
    name: "Port A Beach Buggies",
    category: "do",
    tagline: "Rent a golf cart and cruise the island like a local",
    description:
      "The best way to get around Port Aransas is on a golf cart, and Port A Beach Buggies has the island's largest fleet. Street-legal carts in all sizes — from 2-seaters to 6-passenger rigs. They deliver to your rental, hotel, or campsite. Half-day, full-day, and weekly rentals.",
    address: "201 E Ave A, Port Aransas, TX 78373",
    phone: "(361) 749-4653",
    hours: "Daily 8AM-6PM",
    featured: false,
    tags: ["golf cart", "rentals", "transportation", "island cruising"],
  },

  // SHOP
  {
    slug: "island-surf-shop",
    name: "Island Surf Shop",
    category: "shop",
    tagline: "Boards, gear & local surf culture since 1988",
    description:
      "The original Port A surf shop, stocked with boards, wetsuits, beach gear, and apparel from local and national brands. The staff are all surfers who know the local breaks and can set you up with the right board for Texas Gulf conditions. They also rent boards and offer surf lessons.",
    address: "605 E Ave G, Port Aransas, TX 78373",
    phone: "(361) 749-0024",
    hours: "Daily 9AM-7PM",
    featured: true,
    tags: ["surf", "beach gear", "rentals", "lessons", "apparel"],
  },
  {
    slug: "port-a-general-store",
    name: "Port A General Store",
    category: "shop",
    tagline: "Island essentials, local goods & a cold drink for the road",
    description:
      "Part convenience store, part local gift shop, all Port A. Grab sunscreen, bait, snacks, souvenirs, and locally made goods under one roof. Known for their selection of Texas craft beer and their wall of Port Aransas stickers and hats. If you forgot it, they've got it.",
    address: "318 E Ave G, Port Aransas, TX 78373",
    phone: "(361) 749-3175",
    hours: "Daily 7AM-9PM",
    featured: false,
    tags: ["general store", "essentials", "gifts", "local goods", "beer"],
  },

  // SERVICES
  {
    slug: "island-electric-carts",
    name: "Island Electric Carts",
    category: "services",
    tagline: "Electric golf cart sales, service & rentals for island living",
    description:
      "Full-service electric cart dealer serving Port Aransas residents and visitors. Whether you need a long-term cart for your beach property or a weekend rental, Island Electric has you covered. They also handle maintenance, battery replacement, and custom builds. The only dedicated EV cart shop on the island.",
    address: "102 S Station St, Port Aransas, TX 78373",
    phone: "(361) 749-3300",
    hours: "Mon-Sat 8AM-5PM",
    featured: false,
    tags: ["golf carts", "electric vehicles", "sales", "service", "rentals"],
  },
  {
    slug: "port-a-plumbing",
    name: "Port A Plumbing & Mechanical",
    category: "services",
    tagline: "Licensed plumbing & HVAC for island homes and businesses",
    description:
      "Locally owned and operated, Port A Plumbing has been keeping the island's water flowing and AC running for over 15 years. Residential and commercial service, emergency repairs, and new construction. They understand salt-air corrosion and coastal building codes better than anyone.",
    address: "125 N Alister St, Port Aransas, TX 78373",
    phone: "(361) 749-4100",
    hours: "Mon-Fri 7AM-5PM, Emergency 24/7",
    featured: false,
    tags: ["plumbing", "HVAC", "emergency", "residential", "commercial"],
  },
];

export function getBusinessBySlug(slug: string): Business | undefined {
  return businesses.find((b) => b.slug === slug);
}

export function getBusinessesByCategory(category: string): Business[] {
  return businesses.filter((b) => b.category === category);
}

export function getFeaturedBusinesses(): Business[] {
  return businesses.filter((b) => b.featured);
}

export function getAllBusinessSlugs(): { category: string; slug: string }[] {
  return businesses.map((b) => ({ category: b.category, slug: b.slug }));
}
