export const SANDFEST_CONFIG = {
  name: "Texas SandFest 2026",
  dates: "April 17-19, 2026",
  location: "Port Aransas Beach, Mile Markers 13-17",
  address: "403 W Cotter Ave, Port Aransas, TX 78373",
  crowdServiceUrl:
    process.env.NEXT_PUBLIC_SANDFEST_API_URL || "http://localhost:8000",
  schedule: [
    {
      day: "Friday, April 17",
      events: [
        { time: "9:00 AM", name: "Gates Open" },
        { time: "10:00 AM", name: "Sand Sculpting Begins" },
        { time: "12:00 PM", name: "Live Music — Main Stage" },
        { time: "5:00 PM", name: "Beer Garden Opens" },
      ],
    },
    {
      day: "Saturday, April 18",
      events: [
        { time: "9:00 AM", name: "Gates Open" },
        { time: "10:00 AM", name: "Master Sculptors Competition" },
        { time: "11:00 AM", name: "Kids' Lesson Mountain" },
        { time: "12:00 PM", name: "Food Truck Alley Opens" },
        { time: "2:00 PM", name: "Live Music — Both Stages" },
        { time: "6:00 PM", name: "Sunset Sculpting" },
      ],
    },
    {
      day: "Sunday, April 19",
      events: [
        { time: "9:00 AM", name: "Gates Open" },
        { time: "10:00 AM", name: "Finals & Judging" },
        { time: "1:00 PM", name: "Awards Ceremony" },
        { time: "3:00 PM", name: "Josh Abbott Band" },
        { time: "5:00 PM", name: "Festival Closes" },
      ],
    },
  ],
  recommendedBusinessSlugs: [
    "venetian-hot-plate",
    "lisabellas-bistro",
    "fins-grill-icehouse",
    "crazy-cajun",
    "port-a-pizzeria",
    "tortugas-saltwater-grill",
    "lelos-island-bar",
    "bierhaus-port-aransas",
    "scarlet-lady-dolphin-cruises",
    "port-a-beach-buggies",
    "wintons-island-candy",
    "jetty-boat",
  ],
  crowdMultiplier: 150,
};
