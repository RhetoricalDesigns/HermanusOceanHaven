export interface MapLocationPOI {
  id: string;
  name: string;
  category: 'whale' | 'shark' | 'air' | 'surf' | 'wine' | 'transit';
  categoryLabel: string;
  subRegion: 'Hermanus Town' | 'Walker Bay' | 'Gansbaai / Dyer Island' | 'Hemel-en-Aarde' | 'Coastal Trails';
  lat: number;
  lng: number;
  description: string;
  highlight: string;
  bestTime: string;
  image: string;
  tourId?: string;
  telemetryNote?: string;
  accessibility: string;
}

export const MAP_LOCATIONS: MapLocationPOI[] = [
  // 1. WHALE WATCHING & CLIFF PATH
  {
    id: 'sievers-point',
    name: 'Sievers Point & Deep Coastal Shelf',
    category: 'whale',
    categoryLabel: 'Whale Vantage Point',
    subRegion: 'Hermanus Town',
    lat: -34.4167,
    lng: 19.2667,
    description: 'The single most famous land-based whale watching promontory in South Africa. The sandstone shelf drops directly into 14-meter deep water, allowing mother and calf Southern Right whales to swim within 15–20 meters of visitors on the cliffs.',
    highlight: 'Whales surface mere meters from hardwood viewing benches',
    bestTime: 'June – December (Peak 08:00 - 11:00 AM)',
    image: '/hero_hermanus_whale_real_1793002824898.jpg',
    tourId: 'catamaran-safari',
    telemetryNote: 'Sievers Vantage Station: 14 Whales Active Today',
    accessibility: 'Wheelchair Accessible Paved Trail'
  },
  {
    id: 'old-harbour-gearings',
    name: 'Old Harbour & Gearing’s Point',
    category: 'whale',
    categoryLabel: 'Heritage Whale Vantage',
    subRegion: 'Hermanus Town',
    lat: -34.4195,
    lng: 19.2458,
    description: 'The historic heart of Hermanus featuring stone viewing amphitheaters looking out across Walker Bay. Home to the world’s only official Whale Crier who patrols the cliffs sounding a kelp horn signal when whales are sighted.',
    highlight: 'Whale Crier kelp horn signals & heritage stone slipway',
    bestTime: 'Year-Round (Daily Crier Patrols 09:00 - 16:00)',
    image: '/cliff_path_viewpoint_1792562653990.jpg',
    tourId: 'catamaran-safari',
    telemetryNote: 'Kelp Horn Alert: 1 Blast (Inshore Nursery)',
    accessibility: 'Paved Terraces & Benches'
  },
  {
    id: 'dreunkrans-cave',
    name: 'Dreunkrans Blowhole & Sea Caves',
    category: 'whale',
    categoryLabel: 'Acoustic Marine Cave',
    subRegion: 'Hermanus Town',
    lat: -34.4258,
    lng: 19.2325,
    description: 'Dramatic Westcliff rock formation named for the subterranean acoustic boom ("dreun") created when South Atlantic ocean swells enter hollow sandstone underwater blowholes. Favorite resting cove for nursing whale mothers.',
    highlight: 'Acoustic blowhole surge & close-up cove nursing',
    bestTime: 'High Tide & Gentle South Swells',
    image: '/hero_hermanus_whale_real_1793002824898.jpg',
    telemetryNote: 'Subterranean Surge: 1.2m Swell Impact',
    accessibility: 'Natural Sandstone Path'
  },
  {
    id: 'de-kelders-cliffs',
    name: 'De Kelders Limestone Cliffs & Coves',
    category: 'whale',
    categoryLabel: 'Panoramic Bay Vantage',
    subRegion: 'Coastal Trails',
    lat: -34.5511,
    lng: 19.3567,
    description: 'Elevated limestone cliffs on the northern curve of Walker Bay across from Hermanus. Offers sweeping, unobstructed panoramic views back over the entire marine sanctuary with clear turquoise water in coves.',
    highlight: 'Elevated 30m cliff view down into crystal nursery coves',
    bestTime: 'Morning Light (Calm Sea Glass Surface)',
    image: '/hero_hermanus_whale_real_1793002824898.jpg',
    tourId: 'catamaran-safari',
    telemetryNote: 'Nursery Coves: 8 Mothers & Newborn Calves',
    accessibility: 'Clifftop Viewing Benches'
  },
  {
    id: 'walker-buoy-2',
    name: 'Walker Bay Deep Marine Waverider Buoy #2',
    category: 'whale',
    categoryLabel: 'Oceanographic Buoy',
    subRegion: 'Walker Bay',
    lat: -34.4694,
    lng: 19.2792,
    description: 'Deep-water research and wave telemetry buoy moored in the center of the Walker Bay Marine Protected Area. Feeds live swell height, wave period, sea surface temperature, and acoustic tracking data to SAWS and oceanographers.',
    highlight: 'Live 24/7 deepwater oceanographic telemetry stream',
    bestTime: 'Continuous 24/7 Live Monitoring',
    image: '/tour_catamaran_expedition_1792562652925.jpg',
    telemetryNote: 'Swell: 1.2m @ 11s (SW 220°) · Temp: 15.4°C',
    accessibility: 'Offshore Telemetry Marker'
  },

  // 2. SHARK CAGE DIVING & MARINE RESERVES
  {
    id: 'shark-alley',
    name: 'Shark Alley & Geyser Rock',
    category: 'shark',
    categoryLabel: 'Apex Predator Capital',
    subRegion: 'Gansbaai / Dyer Island',
    lat: -34.6883,
    lng: 19.3497,
    description: 'The world-famous narrow tidal channel between Dyer Island and Geyser Rock (home to 60,000 Cape Fur Seals). The premier destination on Earth for surface cage diving with Great White Sharks and Bronze Whalers.',
    highlight: 'Face apex Great Whites & Bronze Whalers in galvanized surface cages',
    bestTime: 'Year-Round (Daily Expeditions Operating)',
    image: '/hero_shark_cage_real_1793002838731.jpg',
    tourId: 'shark-cage-dive',
    telemetryNote: 'Underwater Vis: 11m · 3 Apex Sharks Sighted',
    accessibility: 'Galvanized Surface Cage (No SCUBA Needed)'
  },
  {
    id: 'kleinbaai-harbour',
    name: 'Kleinbaai Expedition Slipway',
    category: 'shark',
    categoryLabel: 'Shark Expedition Base',
    subRegion: 'Gansbaai / Dyer Island',
    lat: -34.6158,
    lng: 19.3542,
    description: 'Protected natural slipway 30 minutes east of Hermanus where custom-built shark cage diving catamarans launch for Dyer Island and Shark Alley excursions. Equipped with marine conservation hubs.',
    highlight: 'Launch quay for certified Great White research & dive catamarans',
    bestTime: 'Morning Launches (06:30, 09:30, 12:30)',
    image: '/shark_cage_diving_expedition_1792564255886.jpg',
    tourId: 'shark-cage-dive',
    telemetryNote: 'Conservation Hub & Breakfast Base',
    accessibility: 'Direct Hotel Shuttle Pickup Hub'
  },
  {
    id: 'danger-point-lighthouse',
    name: 'Danger Point Lighthouse & Birkenhead Memorial',
    category: 'shark',
    categoryLabel: 'Historic Lighthouse & Reef',
    subRegion: 'Gansbaai / Dyer Island',
    lat: -34.6294,
    lng: 19.3025,
    description: 'Historic 1895 white octagonal lighthouse standing on the treacherous rocky point near Gansbaai. Site of the tragic 1852 sinking of HMS Birkenhead where the heroic "chivalry protocol" originated.',
    highlight: '1895 coastal lighthouse & maritime history museum',
    bestTime: 'Daily Visitors 09:00 - 16:00',
    image: '/shark_cage_diving_expedition_1792564255886.jpg',
    telemetryNote: 'Open Atlantic Reef Surge & Gale Warning Beacon',
    accessibility: 'Lighthouse Museum & Grounds'
  },
  {
    id: 'dyer-island-sanctuary',
    name: 'Dyer Island Nature Reserve',
    category: 'shark',
    categoryLabel: 'Penguin & Seabird Sanctuary',
    subRegion: 'Gansbaai / Dyer Island',
    lat: -34.6828,
    lng: 19.3403,
    description: 'Protected CapeNature island reserve 8km offshore from Gansbaai. Critical breeding sanctuary for endangered African Penguins, Bank Cormorants, and Roseate Terns, surrounded by rich kelp forest ecosystems.',
    highlight: 'African Penguin colony & pelagic seabird sanctuary',
    bestTime: 'Observation from Eco-Vessel Boundaries',
    image: '/tour_catamaran_expedition_1792562652925.jpg',
    tourId: 'shark-cage-dive',
    telemetryNote: 'Regional Conservation Research Station',
    accessibility: 'Boating Sanctuary Perimeter'
  },

  // 3. MOUNTAIN & AIR ADVENTURE
  {
    id: 'rotary-way-launch',
    name: 'Rotary Way Paragliding Launch Ramp',
    category: 'air',
    categoryLabel: 'Tandem Paragliding Launch',
    subRegion: 'Hermanus Town',
    lat: -34.3989,
    lng: 19.2392,
    description: 'Perched 280 meters above sea level on the Kleinrivier Mountain ridge overlooking Hermanus and Walker Bay. Official SAHPA launch site for smooth tandem paragliding flights over coastal ridges and ocean.',
    highlight: '280m altitude launch with 360° panoramas of Walker Bay & mountains',
    bestTime: '10:00 AM - 15:00 PM (Smooth Sea Thermal Lift)',
    image: '/hero_paraglide_real_1793002851758.jpg',
    tourId: 'tandem-paragliding',
    telemetryNote: 'Wind: 12 kts SSE · Tandem Master Onsite',
    accessibility: 'Ridge Lookout & Parking Area'
  },
  {
    id: 'fernkloof-reserve',
    name: 'Fernkloof Nature Reserve & Peak Trails',
    category: 'air',
    categoryLabel: 'Fynbos Reserve & Peaks',
    subRegion: 'Coastal Trails',
    lat: -34.3975,
    lng: 19.2650,
    description: 'A 1,800-hectare botanical paradise in the Kleinrivier Mountains harboring over 1,200 species of Cape Floral Kingdom fynbos. Features scenic hiking trails up to Galpin Peak (844m) with vistas across Walker Bay.',
    highlight: '1,200+ coastal fynbos species & panoramic Galpin Peak trails',
    bestTime: 'Early Morning (Spring Fynbos Bloom)',
    image: '/hermanus_paragliding_flight_1792841215668.jpg',
    telemetryNote: 'Botanical Center & Wild Fynbos Nursery',
    accessibility: 'Visitor Center Gardens & Mountain Paths'
  },

  // 4. SURFING & WATERSPORTS
  {
    id: 'grotto-beach',
    name: 'Grotto Blue Flag Beach & Surf Break',
    category: 'surf',
    categoryLabel: 'Surf & Beach Break',
    subRegion: 'Hermanus Town',
    lat: -34.4131,
    lng: 19.2942,
    description: 'Hermanus’ vast 18km Blue Flag sandy beach stretching from Voëlklip toward the lagoon mouth. Features clean, consistent shore-break waves perfect for beginner to intermediate surfing lessons and bodyboarding.',
    highlight: 'Clean 3-5ft sandy beach break & Blue Flag amenities',
    bestTime: 'October – April (Low to Medium Tide)',
    image: '/hero_surfkite_real_1793002865367.jpg',
    tourId: 'surf-lessons-camps',
    telemetryNote: 'Waves: 3-4ft Clean · Area Surf Coaching Hub',
    accessibility: 'Wheelchair Ramp to Sands & Lifeguard Station'
  },
  {
    id: 'klein-river-lagoon',
    name: 'Klein River Lagoon & Kitesurf Flat-Water',
    category: 'surf',
    categoryLabel: 'Kitesurf & Foil Lagoon',
    subRegion: 'Coastal Trails',
    lat: -34.4150,
    lng: 19.3100,
    description: 'Vast protected coastal estuary where the Klein River enters the sea at Grotto Beach. Renowned across South Africa as a top-tier flat-water kitesurfing, wing-foiling, and SUP location with reliable thermal winds.',
    highlight: 'Glass-smooth shallow water & 15-22 knot kite winds',
    bestTime: 'Afternoon Summer Thermal Breezes (13:00 - 18:00)',
    image: '/hermanus_surf_kitesurf_1792990215944.jpg',
    tourId: 'surf-lessons-camps',
    telemetryNote: 'Kite Wind: 15-18 kts SE · Certified Kite School',
    accessibility: 'Estuary Beach Access & Launch Point'
  },
  {
    id: 'voelklip-beach',
    name: 'Voëlklip Beach & Surfing Coves',
    category: 'surf',
    categoryLabel: 'Local Surf Coves',
    subRegion: 'Hermanus Town',
    lat: -34.4114,
    lng: 19.2817,
    description: 'Picturesque sheltered beach cove flanked by sandstone headlands and green lawns. Popular local surfing break with consistent A-frame peaks and family-friendly swimming coves.',
    highlight: 'A-frame wave peaks & sunbathing grass lawns',
    bestTime: 'Morning Off-Shore Winds',
    image: '/hero_surfkite_real_1793002865367.jpg',
    tourId: 'surf-lessons-camps',
    telemetryNote: 'Surf Academy Gear Rental & Lifeguard Tower',
    accessibility: 'Lawns, Terraces & Steps to Beach'
  },

  // 5. HEMEL-EN-AARDE WINE SAFARI
  {
    id: 'maritime-wine-estate',
    name: 'Maritime Boutique Wine Estate',
    category: 'wine',
    categoryLabel: 'Maritime Pinot Noir Estate',
    subRegion: 'Hemel-en-Aarde',
    lat: -34.3683,
    lng: 19.2389,
    description: 'Pioneer boutique winery at the entrance of Hemel-en-Aarde Valley. Famous worldwide for internationally acclaimed Pinot Noir and elegant cool-climate Chardonnays.',
    highlight: 'Award-winning Pinot Noir tasting room',
    bestTime: 'Daily Tastings 09:00 - 17:00',
    image: '/hermanus_coastal_shuttle_1792990229807.jpg',
    tourId: 'wine-tour',
    telemetryNote: 'Wine Safari Hop-On Stop #1',
    accessibility: 'Cellar Door Tasting Room & Gardens'
  },
  {
    id: 'culinary-ridge-estate',
    name: 'Culinary Ridge Wine Estate',
    category: 'wine',
    categoryLabel: 'Culinary Wine Ridge',
    subRegion: 'Hemel-en-Aarde',
    lat: -34.3217,
    lng: 19.3108,
    description: 'High up in the Hemel-en-Aarde Ridge, this estate offers multi-course wine and food pairing experiences surrounded by fynbos and mountain vineyards.',
    highlight: 'Famous multi-course wine & local ingredient pairings',
    bestTime: 'Lunch Tastings & Cellar Tours (11:30 - 15:30)',
    image: '/hermanus_coastal_shuttle_1792990229807.jpg',
    tourId: 'wine-tour',
    telemetryNote: 'Wine Safari Hop-On Stop #6',
    accessibility: 'Tasting Lounge & Vineyard Deck'
  },
  {
    id: 'valley-pioneer-vineyards',
    name: 'Valley Pioneer Vineyards',
    category: 'wine',
    categoryLabel: 'Historic Valley Pioneer',
    subRegion: 'Hemel-en-Aarde',
    lat: -34.3811,
    lng: 19.2272,
    description: 'The founding estate of the valley. Situated on shale-heavy slopes right near the sea, producing Pinot Noir and Chardonnay with distinct cool-climate minerality.',
    highlight: 'Lakeside tasting room & historic valley pioneer',
    bestTime: 'Monday – Saturday 09:00 - 17:00',
    image: '/hermanus_coastal_shuttle_1792990229807.jpg',
    tourId: 'wine-tour',
    telemetryNote: 'Lakeside Cellar Door & Regional Tasting',
    accessibility: 'Lakeside Tasting Building'
  },

  // 6. TRANSPORT & HUBS
  {
    id: 'hermanus-new-harbour',
    name: 'Hermanus New Harbour Charter Quay',
    category: 'transit',
    categoryLabel: 'Catamaran & Charter Port',
    subRegion: 'Hermanus Town',
    lat: -34.4317,
    lng: 19.2228,
    description: 'The main maritime breakwater and marina of Hermanus. Departure point for luxury eco-catamarans, sea kayaks, deep-sea fishing charters, and popular waterfront seafood restaurants.',
    highlight: 'Catamaran embarkation quay, kayak launches & harbour seafood',
    bestTime: '07:30 AM - 17:00 PM',
    image: '/tour_catamaran_expedition_1792562652925.jpg',
    tourId: 'catamaran-safari',
    telemetryNote: 'Breakwater Sensor: 1.2m Swell · Smooth Harbor Entry',
    accessibility: 'Paved Quay & Accessible Boarding Ramps'
  },
  {
    id: 'hermanus-transit-hub',
    name: 'Hermanus Town Transit & Shuttle Hub',
    category: 'transit',
    categoryLabel: 'Shuttle Concierge & E-Bikes',
    subRegion: 'Hermanus Town',
    lat: -34.4180,
    lng: 19.2430,
    description: 'Central transport and concierge hub in Hermanus town center. Pick-up location for private Cape Town Airport (CPT) shuttles, Gansbaai shark diver shuttles, Hemel-en-Aarde wine buses, and e-bike rentals.',
    highlight: 'Airport shuttles, Gansbaai shark transfers & fat-tire e-bike fleet',
    bestTime: 'Daily Service 06:00 - 20:00',
    image: '/hermanus_coastal_shuttle_1792990229807.jpg',
    telemetryNote: '24/7 CPT Airport Fleet & Hotel Concierge Pickups',
    accessibility: 'Accessible Loading Bay & Air-conditioned Vans'
  }
];
