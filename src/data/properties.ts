import type { PropertyCategory } from "./categories";

export interface Property {
  id: string;
  title: string;
  category: PropertyCategory;
  rent: number; // KES / month
  deposit: number;
  county: string;
  subcounty: string;
  town: string;
  description: string;
  amenities: string[];
  images: string[];
  verified: boolean;
  featured: boolean;
  lat: number;
  lng: number;
  landlord: {
    name: string;
    phone: string;
    email: string;
    whatsapp: string;
  };
  postedAt: string;
  foodMenu?: { item: string; price: string }[];
  drinkMenu?: { item: string; price: string }[];
  upcomingEvents?: {
    title: string;
    date: string;
    price: string;
    description: string;
  }[];
}

// Real-estate stock imagery from Unsplash (no key required, hotlinkable).
const img = (id: string, n = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${n}&q=70`;

export const PROPERTIES: Property[] = [
  {
    id: "p-001",
    title: "Modern 2BR Apartment with Balcony — Kilimani",
    category: "Two Bedroom",
    rent: 65000,
    deposit: 130000,
    county: "Nairobi",
    subcounty: "Dagoretti North",
    town: "Kilimani",
    description:
      "Spacious two-bedroom apartment in a quiet gated community in Kilimani. Master en-suite, fitted kitchen, large balcony with city views. Walking distance to Yaya Centre, schools and major hospitals.",
    amenities: [
      "Furnished",
      "Parking",
      "Water",
      "Security",
      "WiFi",
      "Lift",
      "Backup Power",
      "CCTV",
    ],
    images: [
      img("photo-1502672260266-1c1ef2d93688"),
      img("photo-1560448204-e02f11c3d0e2"),
      img("photo-1505691938895-1758d7feb511"),
    ],
    verified: true,
    featured: true,
    lat: -1.2921,
    lng: 36.7836,
    landlord: {
      name: "Amina Hassan",
      phone: "+254712345678",
      email: "amina@example.com",
      whatsapp: "+254712345678",
    },
    postedAt: "2026-05-21",
  },
  {
    id: "p-002",
    title: "Cozy Bedsitter near JKUAT — Juja",
    category: "Bedsitter",
    rent: 8500,
    deposit: 17000,
    county: "Kiambu",
    subcounty: "Juja",
    town: "Juja",
    description:
      "Affordable bedsitter walking distance to JKUAT main gate. Tiled floor, water included, 24/7 security. Ideal for students and young professionals.",
    amenities: ["Water", "Security", "WiFi", "Garbage Collection"],
    images: [
      img("photo-1522708323590-d24dbb6b0267"),
      img("photo-1494203484021-3c454daf695d"),
    ],
    verified: true,
    featured: true,
    lat: -1.1018,
    lng: 37.0144,
    landlord: {
      name: "John Kamau",
      phone: "+254722111222",
      email: "kamau@example.com",
      whatsapp: "+254722111222",
    },
    postedAt: "2026-06-01",
  },
  {
    id: "p-003",
    title: "Beachfront 3BR Villa — Nyali",
    category: "Holiday Home",
    rent: 180000,
    deposit: 180000,
    county: "Mombasa",
    subcounty: "Nyali",
    town: "Nyali",
    description:
      "Stunning beachfront villa with private pool and direct beach access. Fully furnished, ideal for Airbnb operators or long-stay families. Includes housekeeping.",
    amenities: [
      "Furnished",
      "Parking",
      "Water",
      "Security",
      "WiFi",
      "Swimming Pool",
      "CCTV",
      "Backup Power",
    ],
    images: [
      img("photo-1613490493576-7fde63acd811"),
      img("photo-1564013799919-ab600027ffc6"),
      img("photo-1512917774080-9991f1c4c750"),
    ],
    verified: true,
    featured: true,
    lat: -4.0231,
    lng: 39.7167,
    landlord: {
      name: "Coast Holdings Ltd",
      phone: "+254733555666",
      email: "stay@coastholdings.example",
      whatsapp: "+254733555666",
    },
    postedAt: "2026-05-12",
  },
  {
    id: "p-004",
    title: "Spacious 4BR Maisonette — Runda",
    category: "Maisonette",
    rent: 220000,
    deposit: 440000,
    county: "Nairobi",
    subcounty: "Westlands",
    town: "Runda",
    description:
      "Family maisonette in a leafy gated estate. 4 bedrooms all en-suite, DSQ, double garage, large garden, borehole and standby generator.",
    amenities: [
      "Parking",
      "Water",
      "Security",
      "Borehole",
      "Backup Power",
      "CCTV",
      "Garbage Collection",
    ],
    images: [
      img("photo-1600596542815-ffad4c1539a9"),
      img("photo-1600585154340-be6161a56a0c"),
    ],
    verified: true,
    featured: false,
    lat: -1.2095,
    lng: 36.8141,
    landlord: {
      name: "Grace Wanjiku",
      phone: "+254700123456",
      email: "grace@example.com",
      whatsapp: "+254700123456",
    },
    postedAt: "2026-04-30",
  },
  {
    id: "p-005",
    title: "Lakeview Studio Apartment — Milimani, Kisumu",
    category: "Studio Apartment",
    rent: 22000,
    deposit: 22000,
    county: "Kisumu",
    subcounty: "Kisumu Central",
    town: "Milimani",
    description:
      "Bright studio with Lake Victoria views, fitted kitchenette, lift access. Perfect for professionals working in Kisumu CBD.",
    amenities: ["Furnished", "Water", "Security", "WiFi", "Lift", "Parking"],
    images: [
      img("photo-1554995207-c18c203602cb"),
      img("photo-1493809842364-78817add7ffb"),
    ],
    verified: true,
    featured: true,
    lat: -0.1022,
    lng: 34.7617,
    landlord: {
      name: "Brian Otieno",
      phone: "+254799887766",
      email: "brian@example.com",
      whatsapp: "+254799887766",
    },
    postedAt: "2026-05-28",
  },
  {
    id: "p-006",
    title: "Office Space 120sqm — Eldoret CBD",
    category: "Office Space",
    rent: 95000,
    deposit: 190000,
    county: "Uasin Gishu",
    subcounty: "Eldoret East",
    town: "Eldoret",
    description:
      "Open-plan office space on the 3rd floor with lift, fibre internet, ample parking. Ready to move in.",
    amenities: ["Parking", "Security", "WiFi", "Lift", "Backup Power", "CCTV"],
    images: [
      img("photo-1497366216548-37526070297c"),
      img("photo-1497366754035-f200968a6e72"),
    ],
    verified: false,
    featured: false,
    lat: 0.5143,
    lng: 35.2698,
    landlord: {
      name: "Highlands Realty",
      phone: "+254711000111",
      email: "lease@highlands.example",
      whatsapp: "+254711000111",
    },
    postedAt: "2026-06-02",
  },
  {
    id: "p-007",
    title: "3 Bedroom Apartment — Nakuru Milimani",
    category: "Three Bedroom",
    rent: 55000,
    deposit: 110000,
    county: "Nakuru",
    subcounty: "Nakuru Town East",
    town: "Milimani",
    description:
      "Modern three bedroom apartment with master en-suite, fitted wardrobes, balcony and parking. Quiet neighbourhood near schools.",
    amenities: ["Parking", "Water", "Security", "Backup Power", "Lift", "CCTV"],
    images: [
      img("photo-1493809842364-78817add7ffb"),
      img("photo-1600585154340-be6161a56a0c"),
    ],
    verified: true,
    featured: false,
    lat: -0.3031,
    lng: 36.08,
    landlord: {
      name: "Lakeview Properties",
      phone: "+254720333444",
      email: "info@lakeview.example",
      whatsapp: "+254720333444",
    },
    postedAt: "2026-05-18",
  },
  {
    id: "p-008",
    title: "Commercial Shop — Machakos Town",
    category: "Commercial Shop",
    rent: 35000,
    deposit: 70000,
    county: "Machakos",
    subcounty: "Machakos Town",
    town: "Machakos",
    description:
      "Strategic ground floor shop on a busy street. High foot traffic. Suitable for retail, salon or M-Pesa agency.",
    amenities: ["Water", "Security", "Garbage Collection"],
    images: [
      img("photo-1604328698692-f76ea9498e76"),
      img("photo-1567521464027-f127ff144326"),
    ],
    verified: false,
    featured: false,
    lat: -1.5177,
    lng: 37.2634,
    landlord: {
      name: "Mwanzo Estates",
      phone: "+254701234500",
      email: "info@mwanzo.example",
      whatsapp: "+254701234500",
    },
    postedAt: "2026-06-03",
  },
  {
    id: "p-009",
    title: "One Bedroom Furnished Airbnb — Kajiado",
    category: "Airbnb",
    rent: 45000,
    deposit: 0,
    county: "Kajiado",
    subcounty: "Kajiado North",
    town: "Ongata Rongai",
    description:
      "Fully furnished one bedroom unit available short-stay (per month rate shown). Netflix, fast WiFi, ensuite bath, secure compound.",
    amenities: [
      "Furnished",
      "Parking",
      "Water",
      "Security",
      "WiFi",
      "Backup Power",
    ],
    images: [
      img("photo-1502672260266-1c1ef2d93688"),
      img("photo-1505691938895-1758d7feb511"),
    ],
    verified: true,
    featured: false,
    lat: -1.3927,
    lng: 36.7444,
    landlord: {
      name: "StayKE Hosts",
      phone: "+254734222333",
      email: "hosts@stayke.example",
      whatsapp: "+254734222333",
    },
    postedAt: "2026-06-04",
  },
  {
    id: "p-010",
    title: "Single Room — Kakamega Town",
    category: "Single Room",
    rent: 4500,
    deposit: 4500,
    county: "Kakamega",
    subcounty: "Lurambi",
    town: "Kakamega",
    description:
      "Clean single room with shared bathroom. Water and electricity included. Walking distance to MMUST.",
    amenities: ["Water", "Security"],
    images: [img("photo-1505691938895-1758d7feb511")],
    verified: false,
    featured: false,
    lat: 0.2827,
    lng: 34.7519,
    landlord: {
      name: "Mama Joy Apartments",
      phone: "+254712999888",
      email: "joy@example.com",
      whatsapp: "+254712999888",
    },
    postedAt: "2026-06-05",
  },
  {
    id: "p-011",
    title: "Land for Lease 2 Acres — Kiambu",
    category: "Land for Lease",
    rent: 80000,
    deposit: 80000,
    county: "Kiambu",
    subcounty: "Kikuyu",
    town: "Kikuyu",
    description:
      "2-acre fenced plot available for long-term lease. Suitable for greenhouse farming or warehousing. Tarmac access.",
    amenities: ["Water", "Security"],
    images: [img("photo-1500076656116-558758c991c1")],
    verified: false,
    featured: false,
    lat: -1.247,
    lng: 36.668,
    landlord: {
      name: "Greenfields Ltd",
      phone: "+254799112233",
      email: "land@greenfields.example",
      whatsapp: "+254799112233",
    },
    postedAt: "2026-05-25",
  },
  {
    id: "p-012",
    title: "Event Venue with Gardens — Karen",
    category: "Event Venue",
    rent: 250000,
    deposit: 0,
    county: "Nairobi",
    subcounty: "Langata",
    town: "Karen",
    description:
      "Lush garden event venue suitable for weddings up to 300 guests. Per-event rate shown as monthly indicative.",
    amenities: ["Parking", "Water", "Security", "Backup Power", "CCTV"],
    images: [
      img("photo-1519167758481-83f550bb49b3"),
      img("photo-1464366400600-7168b8af9bc3"),
    ],
    verified: true,
    featured: true,
    lat: -1.3194,
    lng: 36.7077,
    landlord: {
      name: "Karen Gardens Events",
      phone: "+254720777999",
      email: "events@karengardens.example",
      whatsapp: "+254720777999",
    },
    postedAt: "2026-05-15",
    upcomingEvents: [
      {
        title: "Garden Wedding Showcase",
        date: "2026-07-10",
        price: "KES 250,000",
        description:
          "A curated showcase for couples planning a wedding, including venue walkthroughs, catering tastings and decor inspiration.",
      },
      {
        title: "Corporate Retreat Experience",
        date: "2026-07-25",
        price: "KES 180,000",
        description:
          "A one-day showcase of meeting spaces, team-building setups, and audio-visual support for corporate planners.",
      },
    ],
  },
  {
    id: "p-013",
    title: "Skyline Lounge & Bar — Westlands",
    category: "Lounge",
    rent: 120000,
    deposit: 0,
    county: "Nairobi",
    subcounty: "Westlands",
    town: "Westlands",
    description:
      "Stylish rooftop lounge bar with panoramic Nairobi views. Perfect for after-work drinks, date nights and private group bookings. Includes indoor seating and an outdoor terrace.",
    amenities: [
      "Live Music",
      "Cocktail Bar",
      "Terrace Seating",
      "WiFi",
      "Private Booths",
      "Security",
    ],
    images: [
      img("photo-1542314831-068cd1dbfeeb"),
      img("photo-1492562080023-ab3db95bfbce"),
      img("photo-1500534314209-a25ddb2bd429"),
    ],
    verified: true,
    featured: true,
    lat: -1.2672,
    lng: 36.807,
    landlord: {
      name: "LoungeLink Hospitality",
      phone: "+254701234567",
      email: "info@loungelink.example",
      whatsapp: "+254701234567",
    },
    postedAt: "2026-06-05",
    foodMenu: [
      { item: "Truffle Fries", price: "KES 950" },
      { item: "Grilled Chicken Skewers", price: "KES 1,400" },
      { item: "Avocado Toast", price: "KES 1,150" },
    ],
    drinkMenu: [
      { item: "Signature Margarita", price: "KES 850" },
      { item: "Craft Gin & Tonic", price: "KES 900" },
      { item: "Sparkling Wine", price: "KES 1,200" },
    ],
    upcomingEvents: [
      {
        title: "Friday Live Jazz Night",
        date: "2026-06-14",
        price: "KES 1,500 cover",
        description:
          "Enjoy live jazz, house cocktails and a relaxed rooftop vibe.",
      },
      {
        title: "Sunday Brunch Feast",
        date: "2026-06-16",
        price: "KES 2,200 per person",
        description:
          "Bottomless mimosas, breakfast boards and all-day lounge access.",
      },
    ],
  },
];

export function getProperty(id: string) {
  return PROPERTIES.find((p) => p.id === id);
}
