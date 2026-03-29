export interface HoursOfOperation {
  [day: string]: string; // e.g. "Monday": "11AM-9PM" or "Closed"
}

export interface MenuItem {
  name: string;
  description?: string;
  price?: string;
}

export interface MenuSection {
  section: string;
  items: MenuItem[];
}

export interface CharterOption {
  name: string;
  duration: string;
  price: string;
  description?: string;
}

export interface RentalOption {
  name: string;
  duration: string;
  price: string;
  description?: string;
}

export interface ScheduleEntry {
  name: string;
  times: string[];
  price?: string;
  description?: string;
}

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
  hoursOfOperation?: HoursOfOperation;
  featured: boolean;
  tags: string[];
  menu?: MenuSection[];
  charters?: CharterOption[];
  rentals?: RentalOption[];
  schedule?: ScheduleEntry[];
  priceRange?: string;
  amenities?: string[];
  verifiedPartner?: boolean;
}

export const businesses: Business[] = [
  // EAT
  {
    slug: "venetian-hot-plate",
    name: "Venetian Hot Plate",
    category: "eat",
    tagline: "Authentic Italian from a Venice native — a Port A institution since 1995",
    description:
      "Linda and Maurice Halioua brought the flavors of Venice, Italy to Port Aransas in 1995 and haven't looked back. The Venetian Hot Plate serves fresh, gourmet Italian fare with a hand-selected wine list like no other on the island. From crostini di granchio topped with jumbo lump crab to beef tenderloin medallions in Gorgonzola sauce, every dish is crafted with care. Reservations are highly recommended — this intimate spot fills up fast.",
    address: "232 Beach Ave, Port Aransas, TX 78373",
    phone: "(361) 749-7617",
    website: "https://venetianhotplate.com",
    hours: "Tue-Sat 5PM-10PM, Closed Sun-Mon",
    hoursOfOperation: {
      Monday: "Closed",
      Tuesday: "5:00 PM – 9:00 PM",
      Wednesday: "5:00 PM – 9:00 PM",
      Thursday: "5:00 PM – 10:00 PM",
      Friday: "5:00 PM – 10:00 PM",
      Saturday: "5:00 PM – 10:00 PM",
      Sunday: "Closed",
    },
    featured: true,
    tags: ["italian", "fine dining", "wine", "seafood", "date night"],
    priceRange: "$$$",
    menu: [
      {
        section: "Appetizers",
        items: [
          {
            name: "Crostini di Granchio",
            description:
              "Grilled ciabatta bread topped with jumbo lump crab meat sautéed in brown butter with lemon and sage",
          },
          {
            name: "Grilled Calamari Steak",
            description: "Tender calamari steak grilled to perfection",
          },
          {
            name: "Gamberetti al Limone",
            description: "Six shrimp tossed in garlic lemon butter sauce",
          },
        ],
      },
      {
        section: "Entrées",
        items: [
          {
            name: "Beef Tenderloin Medallions",
            description:
              "Smothered in rich Gorgonzola sauce, served with potatoes and spinach",
          },
          {
            name: "Veal Scallopine",
            description: "Classic Italian preparation with a house twist",
          },
          {
            name: "Lasagna",
            description: "House-made layered pasta with meat sauce and cheese",
          },
        ],
      },
      {
        section: "Desserts",
        items: [
          { name: "Tiramisu", description: "Classic Italian coffee-flavored dessert" },
          {
            name: "Death by Chocolate",
            description: "Flourless chocolate cake for the serious chocoholic",
          },
        ],
      },
    ],
  },
  {
    slug: "port-a-beachlodge",
    name: "Port A Beachlodge",
    category: "eat",
    tagline: "Beachfront bar & grill 200 feet from the Gulf — pet-friendly & laid-back",
    description:
      "Perched right on the sand at Beach Marker #9, Port A Beachlodge is as close to the water as you can dine on the island. This laid-back, pet-friendly spot serves fresh peel-and-eat shrimp, oyster po'boys, burgers, and cold beer just 200 feet from the ocean. The vibe is flip-flops-and-sunscreen casual, and the views are million-dollar. Over 226 Yelp reviews and counting.",
    address: "2016 On The Beach Dr, Port Aransas, TX 78373",
    phone: "(361) 749-5714",
    website: "https://www.portabeachlodge.com",
    hours: "Sun-Thu 8AM-9PM, Fri-Sat 8AM-10PM",
    hoursOfOperation: {
      Monday: "8:00 AM – 12:00 AM",
      Tuesday: "8:00 AM – 12:00 AM",
      Wednesday: "8:00 AM – 12:00 AM",
      Thursday: "8:00 AM – 12:00 AM",
      Friday: "8:00 AM – 1:00 AM",
      Saturday: "8:00 AM – 1:00 AM",
      Sunday: "8:00 AM – 12:00 AM",
    },
    featured: true,
    tags: ["beachfront", "bar & grill", "pet-friendly", "casual", "seafood"],
    priceRange: "$$",
    menu: [
      {
        section: "Favorites",
        items: [
          {
            name: "Peel & Eat Shrimp",
            description: "Fresh Gulf shrimp served by the pound",
          },
          {
            name: "Oyster Po'Boy",
            description: "Fried Gulf oysters on a toasted hoagie",
          },
          {
            name: "Beach Burger",
            description: "Half-pound patty with your choice of toppings",
          },
        ],
      },
    ],
  },
  {
    slug: "crazy-cajun",
    name: "Crazy Cajun Seafood Restaurant",
    category: "eat",
    tagline: "Boiled seafood dumped right on the table — no plates needed since 1987",
    description:
      "The Crazy Cajun is a Port A legend, serving the island for over 37 years. They dump your boiled shrimp, crab, and crawfish straight onto the butcher-paper-covered table, seasoned with their own special Cajun spices. Order the signature Hungry Cajun — a combination of fresh shrimp, crab, smoked sausage, corn on the cob, and new potatoes. Crawfish when in season. It's messy, loud, and absolutely perfect. A must-do for first-timers and a weekly ritual for regulars.",
    address: "303 Beach Ave, Port Aransas, TX 78373",
    phone: "(361) 749-5069",
    website: "https://crazycajun.top",
    hours: "Tue-Fri 5PM-9PM, Sat 12PM-9PM, Sun 5PM-8:30PM, Closed Mon",
    hoursOfOperation: {
      Monday: "Closed",
      Tuesday: "5:00 PM – 9:00 PM",
      Wednesday: "5:00 PM – 9:00 PM",
      Thursday: "5:00 PM – 9:00 PM",
      Friday: "5:00 PM – 9:00 PM",
      Saturday: "12:00 PM – 9:00 PM",
      Sunday: "5:00 PM – 8:30 PM",
    },
    featured: false,
    tags: ["cajun", "boiled seafood", "casual", "iconic", "family-friendly"],
    priceRange: "$$",
    menu: [
      {
        section: "Signature Dishes",
        items: [
          {
            name: "The Hungry Cajun",
            description:
              "Fresh shrimp, crab, smoked sausage, corn on the cob & new potatoes — boiled and seasoned with Cajun spices",
          },
          {
            name: "Kiddie Cajun",
            description:
              "Mild spices — corn on the cob, new potatoes, and sausage made just for kids",
          },
          {
            name: "Baby Back Ribs",
            description:
              "Tender baby backs served with corn, potatoes & house barbecue sauce",
          },
        ],
      },
      {
        section: "By the Pound",
        items: [
          {
            name: "Shrimp",
            description: "Fresh Gulf shrimp, half or full pound",
            price: "Market price",
          },
          {
            name: "Snow Crab",
            description: "Half or full pound",
            price: "Market price",
          },
          {
            name: "Crawfish",
            description: "When in season, half or full pound",
            price: "Market price",
          },
          {
            name: "Smoked Sausage",
            description: "Half or full pound",
            price: "Market price",
          },
        ],
      },
      {
        section: "Cajun Classics",
        items: [
          {
            name: "Gumbo",
            description: "Roux-based recipe served over rice",
          },
          {
            name: "Jambalaya",
            description:
              "Chicken, ham & smoked sausage topped with creole sauce",
          },
          {
            name: "Red Beans & Rice",
            description:
              "Three kinds of beans with smoked sausage, celery, bell pepper & onion",
          },
          {
            name: "Shrimp Remoulade",
            description:
              "Jumbo shrimp boiled, peeled & served with handmade creamy remoulade sauce",
          },
        ],
      },
      {
        section: "Desserts",
        items: [
          { name: "Key Lime Pie" },
          { name: "French Silk Pie" },
          {
            name: "Cheesecake",
            description: "Plain, cherry, or blueberry",
          },
        ],
      },
    ],
  },

  // STAY
  {
    slug: "port-royal-ocean-resort",
    name: "Port Royal Ocean Resort & Conference Center",
    category: "stay",
    tagline: "25-acre beachfront resort with the largest lagoon pool in Texas",
    description:
      "Port Royal is the premier resort on the island — a 25-acre beachfront property with 210 condo suites ranging from one to three bedrooms. All suites feature full kitchens, in-room laundry, and large patios or balconies with Gulf or pool views. The resort boasts the largest lagoon pool in Texas, four outdoor pools, three hot tubs, a waterslide, swim-up bar, and poolside cabanas. Just a 100-yard boardwalk through the dunes to miles of beach. Currently undergoing renovations with a full reopening expected for Summer 2026.",
    address: "6317 State Hwy 361, Port Aransas, TX 78373",
    phone: "(361) 749-5011",
    website: "https://port-royal.com",
    hours: "24/7 front desk",
    featured: true,
    tags: ["beachfront", "resort", "family-friendly", "pools", "restaurant"],
    priceRange: "$$$$",
    amenities: [
      "4 outdoor swimming pools",
      "Largest lagoon pool in Texas",
      "3 hot tubs",
      "Waterslide",
      "Swim-up bar",
      "Poolside cabanas",
      "Olympic-length lap pool",
      "Water volleyball pool",
      "100-yard boardwalk to beach",
      "361 Mobile Kitchen Restaurant",
      "Cabana Bar (swim-up)",
      "Full kitchens in all suites",
      "In-room laundry",
      "Free WiFi",
      "Free parking",
      "Fitness center",
      "Conference center",
    ],
  },
  {
    slug: "cinnamon-shore",
    name: "Cinnamon Shore",
    category: "stay",
    tagline: "Luxury beachfront vacation rentals — homes, condos & cottages on the Gulf",
    description:
      "Cinnamon Shore is Port Aransas's premier beachfront vacation rental community, offering luxury homes, condos, cottages, and townhomes right on the Gulf. A family-owned company serving the island since its founding, Cinnamon Shore features golf cart boardwalks to the beach, community pools, parks, lakes, and on-site dining. Book direct for the best rates and skip the booking fees from the big travel sites. From cozy cottages to spacious multi-bedroom beachfront homes, there's something for every group size and budget.",
    address: "5009 Highway 361, Port Aransas, TX 78373",
    phone: "(361) 749-0422",
    website: "https://www.cinnamonshore.com",
    hours: "Daily 7AM-7PM",
    hoursOfOperation: {
      Monday: "7:00 AM – 7:00 PM",
      Tuesday: "7:00 AM – 7:00 PM",
      Wednesday: "7:00 AM – 7:00 PM",
      Thursday: "7:00 AM – 7:00 PM",
      Friday: "7:00 AM – 7:00 PM",
      Saturday: "7:00 AM – 7:00 PM",
      Sunday: "7:00 AM – 7:00 PM",
    },
    featured: false,
    tags: ["vacation rentals", "beachfront", "luxury", "family", "condos"],
    priceRange: "$$$–$$$$",
    amenities: [
      "Beachfront homes & condos",
      "Golf cart boardwalk to beach",
      "Community pools",
      "On-site dining",
      "Parks & lakes",
      "Free WiFi",
      "Free parking",
      "Washer/dryer in units",
      "Pet-friendly options available",
    ],
  },

  // DO
  {
    slug: "neptunes-charters",
    name: "Neptune's Charters",
    category: "do",
    tagline: "Dolphin watch tours, sunset cruises & shrimp trawls since 1985",
    description:
      "Port Aransas is home to a resident pod of bottlenose dolphins, and Neptune's Charters has been taking visitors to see them since 1985. Board The Mustang — a spacious 65-foot vessel holding up to 85 passengers — for a 1.5-hour dolphin watch nature tour through the ship channel and bay. Every trip includes a live shrimp trawl with a touch tank full of crabs, fish, and shrimp. BYOB-friendly. They also run sunset cruises and special events like the 4th of July fireworks cruise.",
    address: "136 W Cotter Ave, Port Aransas, TX 78373",
    phone: "(361) 749-6969",
    website: "https://neptunescharters.com",
    hours: "Daily 10AM-7PM",
    hoursOfOperation: {
      Monday: "10:00 AM – 7:00 PM",
      Tuesday: "10:00 AM – 7:00 PM",
      Wednesday: "10:00 AM – 7:00 PM",
      Thursday: "10:00 AM – 7:00 PM",
      Friday: "10:00 AM – 7:00 PM",
      Saturday: "10:00 AM – 7:00 PM",
      Sunday: "10:00 AM – 7:00 PM",
    },
    featured: true,
    tags: ["dolphins", "boat tour", "family-friendly", "wildlife", "sunset cruise"],
    schedule: [
      {
        name: "Dolphin Watch Nature Tour & Shrimp Trawl",
        times: ["2:00 PM"],
        price: "$38/adult, half-price for children 12 & under",
        description:
          "1.5-hour cruise aboard The Mustang — see dolphins, birds, and marine life with a live shrimp trawl and touch tank",
      },
      {
        name: "Sunset Dolphin Watch & Shrimp Trawl",
        times: ["5:00 PM (varies seasonally)"],
        price: "$38/adult, half-price for children 12 & under",
        description:
          "Evening cruise with dolphins and a Gulf sunset — includes shrimp trawl",
      },
    ],
  },
  {
    slug: "jetty-boat",
    name: "The Jetty Boat at Fisherman's Wharf",
    category: "do",
    tagline: "Your ride to the North Jetty & untouched beaches of San Jose Island",
    description:
      "The Jetty Boat is the only way to access the North Jetty and the deserted beaches of San Jose Island from Port Aransas. Running daily from Fisherman's Wharf, the boat ferries anglers, beachcombers, birders, and families to a private dock at the base of the jetty. San Jose Island is completely undeveloped — pack everything you need including water, food, and a trash bag. Pet-friendly. No reservations needed, just show up and buy a ticket at the marina building.",
    address: "900 Tarpon St, Port Aransas, TX 78373",
    phone: "(361) 749-5448",
    website: "https://www.fishermanswharfporta.com/boats/jetty-boat/",
    hours: "Daily 6AM-7PM",
    hoursOfOperation: {
      Monday: "6:00 AM – 7:00 PM",
      Tuesday: "6:00 AM – 7:00 PM",
      Wednesday: "6:00 AM – 7:00 PM",
      Thursday: "6:00 AM – 7:00 PM",
      Friday: "6:00 AM – 7:00 PM",
      Saturday: "6:00 AM – 7:00 PM",
      Sunday: "6:00 AM – 7:00 PM",
    },
    featured: true,
    tags: ["fishing", "jetty", "san jose island", "beachcombing", "birding"],
    schedule: [
      {
        name: "Summer Departures (Port Aransas → San Jose Island)",
        times: [
          "6:30 AM",
          "7:00 AM",
          "8:00 AM",
          "9:00 AM",
          "10:00 AM",
          "11:00 AM",
          "12:00 PM",
          "2:00 PM",
          "4:00 PM",
        ],
        price: "$15/adult, $8/child, $10/person for groups of 10+",
        description:
          "Round-trip boat ride to the North Jetty on San Jose Island. 10-trip discount card available for $120.",
      },
      {
        name: "Summer Returns (San Jose Island → Port Aransas)",
        times: [
          "10:10 AM",
          "12:10 PM",
          "2:10 PM",
          "4:10 PM",
          "6:00 PM",
        ],
        description: "Guaranteed return trips from the island",
      },
    ],
  },
  {
    slug: "port-a-beach-buggies",
    name: "Port A Beach Buggies",
    category: "do",
    tagline: "Rent a golf cart and cruise the island like a local",
    description:
      "The best way to get around Port Aransas is on a golf cart, and Port A Beach Buggies has a fleet of custom carts in all sizes — 4-passenger, 6-passenger, and 8-passenger rigs. Every cart comes with underseat beverage coolers, Bluetooth speakers, full-length tops, extra-long seat belts, and comfy padded seats. They deliver to your rental, hotel, or campsite. Stop by in person to check out the gift shop featuring beach décor and gifts just footsteps from the beach.",
    address: "Port Aransas, TX 78373",
    phone: "(361) 749-2066",
    website: "https://portabeachbuggies.com",
    hours: "Daily 8AM-6PM",
    featured: false,
    tags: ["golf cart", "rentals", "transportation", "island cruising"],
    rentals: [
      {
        name: "3-Hour Rental",
        duration: "3 hours",
        price: "$58 (cash price)",
      },
      {
        name: "4-Hour Rental",
        duration: "4 hours",
        price: "$75 (cash price)",
      },
      {
        name: "6-Hour Rental",
        duration: "6 hours",
        price: "$85 (cash price)",
      },
      {
        name: "24-Hour Overnight Rental",
        duration: "24 hours",
        price: "$119 (cash price)",
      },
      {
        name: "Shibumi Shade Shelter — 1 Day",
        duration: "1 day",
        price: "$25",
      },
      {
        name: "Shibumi Shade Shelter — 2 Days",
        duration: "2 days",
        price: "$45",
      },
      {
        name: "Shibumi Shade Shelter — 3+ Days",
        duration: "3+ days",
        price: "$55",
      },
    ],
  },

  // SHOP
  {
    slug: "island-surf-rentals",
    name: "Island Surf Rentals",
    category: "shop",
    tagline: "Golf carts, surfboards, kayaks & beach cruisers since 2009",
    description:
      "Since 2009, Island Surf Rentals has been South Texas' premier choice for golf carts and surf rentals. Their fleet of Yamaha golf carts — four and six passengers in custom color combos — each comes with a beach permit and city license plate. They also stock surfboards, stand-up paddleboards, boogie boards, skim boards, kayaks, and aluminum beach cruiser bikes. Pick up goodr sunglasses, Dirty Hooker fishing apparel, and Port Aransas custom-designed tees while you're there.",
    address: "130 E Ave G, Port Aransas, TX 78373",
    phone: "(361) 749-0822",
    website: "https://islandsurfrentals.com",
    hours: "Daily 9AM-5PM",
    hoursOfOperation: {
      Monday: "9:00 AM – 5:00 PM",
      Tuesday: "9:00 AM – 5:00 PM",
      Wednesday: "9:00 AM – 5:00 PM",
      Thursday: "9:00 AM – 5:00 PM",
      Friday: "9:00 AM – 5:00 PM",
      Saturday: "9:00 AM – 5:00 PM",
      Sunday: "9:00 AM – 5:00 PM",
    },
    featured: true,
    tags: ["surf", "golf carts", "rentals", "kayaks", "bikes", "beach gear"],
  },
  {
    slug: "fly-it-port-a",
    name: "Fly It! Port A",
    category: "shop",
    tagline: "The island's only kite shop — 30+ years of wind-powered fun on Ave G",
    description:
      "Fly It! Port A has been a fixture on Avenue G for over 30 years, offering kites of every shape, size, and complexity — from beginner-friendly designs to elaborate stunt kites. Beyond kites, discover wind spinners, flags, windsocks, wind chimes, beach canopies, disc golf supplies, yard art, and unique wind-related gifts. The Pyle family has owned the shop since 1991 and keeps it stocked with everything you need for a perfect beach day. Ranked #2 of all shopping in Port Aransas on TripAdvisor.",
    address: "405 W Ave G, Port Aransas, TX 78373",
    phone: "(361) 749-4190",
    website: "https://flyitporta.com",
    hours: "Daily 9AM-6PM",
    hoursOfOperation: {
      Monday: "9:00 AM – 6:00 PM",
      Tuesday: "9:00 AM – 6:00 PM",
      Wednesday: "9:00 AM – 6:00 PM",
      Thursday: "9:00 AM – 6:00 PM",
      Friday: "9:00 AM – 6:00 PM",
      Saturday: "9:00 AM – 6:00 PM",
      Sunday: "9:00 AM – 6:00 PM",
    },
    featured: false,
    tags: ["kites", "beach gear", "gifts", "wind toys", "family-friendly"],
  },

  // SERVICES
  {
    slug: "the-cart-store",
    name: "The Cart Store",
    category: "services",
    tagline: "Factory-authorized Yamaha & ICON golf cart dealer — sales, service & rentals",
    description:
      "The Cart Store is the only Factory Authorized Yamaha, ICON, and EPIC dealership and service department serving Port Aransas and the Gulf Coast. Brand new 2026 lithium carts arriving daily. Whether you need a new cart for your beach property, a custom build, or a short-term rental, they've got you covered. Full service department handles maintenance, repairs, battery replacement, and customization. Financing available on new and used carts.",
    address: "219 N Alister St, Port Aransas, TX 78373",
    phone: "(361) 749-5560",
    website: "https://www.thecartstores.com",
    hours: "Wed-Sat 8AM-5PM",
    hoursOfOperation: {
      Monday: "Closed",
      Tuesday: "Closed",
      Wednesday: "8:00 AM – 5:00 PM",
      Thursday: "8:00 AM – 5:00 PM",
      Friday: "8:00 AM – 5:00 PM",
      Saturday: "8:00 AM – 5:00 PM",
      Sunday: "Closed",
    },
    featured: false,
    tags: ["golf carts", "Yamaha", "ICON", "sales", "service", "rentals"],
  },
  {
    slug: "port-plumbing-co",
    name: "Port Plumbing Co., Inc.",
    category: "services",
    tagline: "Family-owned island plumbing since 1950 — over 70 years on Mustang Island",
    description:
      "Port Plumbing is a family-owned and operated business that has been serving Port Aransas and Mustang Island since 1950. With over 70 years of experience, they handle everything from dripping sinks to large commercial projects — repairs, remodels, new installations, and gas lines. Licensed, bonded, and veteran-owned. Led by Mr. E. A. 'Scooter' Sain and Justin Sain, they understand salt-air corrosion and coastal building codes better than anyone on the island.",
    address: "202 W Oakes Ave, Unit B, Port Aransas, TX 78373",
    phone: "(361) 749-5252",
    website: "https://portplumbing.net",
    hours: "Mon-Fri 7AM-4PM",
    hoursOfOperation: {
      Monday: "7:00 AM – 4:00 PM",
      Tuesday: "7:00 AM – 4:00 PM",
      Wednesday: "7:00 AM – 4:00 PM",
      Thursday: "7:00 AM – 4:00 PM",
      Friday: "7:00 AM – 4:00 PM",
      Saturday: "Closed",
      Sunday: "Closed",
    },
    featured: false,
    tags: ["plumbing", "repairs", "remodels", "gas lines", "residential", "commercial"],
  },
  {
    slug: "joy-cart-rentals",
    name: "JOY Cart Rentals",
    category: "services",
    tagline: "Cruise Port A in comfort — free delivery, pickup & 24-hour maintenance",
    description:
      "JOY Cart Rentals offers four and six-seater golf carts equipped with extended roofs and windshields for comfortable island cruising. With free delivery and pickup, guaranteed 24-hour maintenance, and some of the most competitive rates in town, JOY makes it easy to explore Port Aransas's beaches, restaurants, and shops by cart. Formerly Silver Sands Golf Carts, JOY has deep roots on the island and partners with local vacation rental properties to provide seamless cart service for guests.",
    address: "307 Sea Isle Dr, Port Aransas, TX 78373",
    phone: "(361) 749-2278",
    website: "https://www.joycartrentals.com",
    hours: "Daily — call for current hours",
    featured: true,
    tags: ["golf carts", "rentals", "delivery", "island transportation"],
    verifiedPartner: true,
    rentals: [
      {
        name: "4-Seater Golf Cart",
        duration: "Daily & multi-day rates available",
        price: "Call for current rates",
        description: "Extended roof, windshield, comfortable seating",
      },
      {
        name: "6-Seater Golf Cart",
        duration: "Daily & multi-day rates available",
        price: "Call for current rates",
        description: "Extended roof, windshield, seats the whole family",
      },
    ],
    amenities: [
      "Free delivery & pickup",
      "24-hour maintenance guarantee",
      "Extended roofs & windshields",
      "4-seater and 6-seater options",
    ],
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
