/* ==========================================================================
   Oʻahu Thanksgiving Week Trip Data (Nov 24 – Nov 30, 2026)
   ========================================================================== */

const TRIP_DATA = {
  homeBase: {
    name: 'Hotel Renew',
    address: '129 Paoakalani Ave, Honolulu, HI 96815',
    lat: 21.2736,
    lng: -157.8226,
    note: '1 block from Waikiki Beach (Diamond Head / Honolulu Zoo end).'
  },

  days: [
    {
      day: 1,
      date: 'Tue, Nov 24',
      shortLabel: 'Day 1 · 11/24',
      theme: 'Drive to SFO, Flight to HNL & Waikiki Check-In',
      color: '#3b6e8c',
      summary: 'Drive to SFO for Southwest WN3882, land at HNL in the evening, head to Hotel Renew, and settle in for the week.',
      holidayNote: 'Morning reminder: Book Hanauma Bay snorkeling for Thanksgiving Day (Thu 11/26) right at 7:00 AM HST (9:00 AM PST) today — slots sell out in ~5 minutes!',
      stops: [
        {
          id: 'd1-sfo',
          name: 'Drive to San Francisco Intl Airport (SFO)',
          time: 'Afternoon PST',
          category: 'transit',
          lat: 37.6213,
          lng: -122.3790,
          offIsland: true,
          duration: 'Airport',
          driveFromPrev: 'Departure · WN3882',
          description: 'Drive to SFO, park/drop off, and clear security for Southwest WN3882 (SFO → HNL). Allow extra holiday-week buffer for Thanksgiving Tuesday airport traffic.',
          tip: 'Check in 24 hours prior on Mon 11/23 and confirm your exact terminal & gate in the Southwest app.'
        },
        {
          id: 'd1-hnl',
          name: 'Arrive Honolulu Intl Airport (HNL)',
          time: 'Evening HST',
          category: 'transit',
          lat: 21.3187,
          lng: -157.9225,
          duration: '30 min',
          driveFromPrev: 'Flight WN3882 (SFO → HNL)',
          description: 'Land at Daniel K. Inouye Intl Airport (HNL), grab bags, and head to Waikiki.',
          tip: 'HNL to Hotel Renew takes ~20–25 min in the evening.'
        },
        {
          id: 'd1-hotel',
          name: 'Hotel Renew Check-In & Waikiki Stroll',
          time: 'Late Evening',
          category: 'beach',
          lat: 21.2736,
          lng: -157.8226,
          duration: 'Evening',
          driveFromPrev: '25 min from HNL',
          description: 'Check in at Hotel Renew (129 Paoakalani Ave). Take a quick 2-minute walk down to Kuhio Beach for warm Pacific air and grab a late-night snack (salmon/tuna/avocado musubi or fresh fruit) from ABC Store or Musubi Cafe Iyasume.',
          tip: 'Unpack and get a good night’s rest before tomorrow’s relaxed 9:30 AM start at Diamond Head.'
        }
      ]
    },
    {
      day: 2,
      date: 'Wed, Nov 25',
      shortLabel: 'Day 2 · 11/25',
      theme: 'Diamond Head, Kapahulu Eats & Waikiki Beach',
      color: '#0d6e6e',
      carInSplitMode: false,
      summary: 'Relaxed 9:30 AM start with zero car needed: crater hike, Kapahulu Ave food crawl, Waikiki Beach swim, and evening Kalakaua Ave dining.',
      holidayNote: 'Everything today is walkable or a 5-min Uber from Hotel Renew — no rental car or parking fees needed.',
      stops: [
        {
          id: 'd2-diamond',
          name: 'Diamond Head Crater Hike',
          time: '9:30 AM',
          category: 'hike',
          lat: 21.2619,
          lng: -157.8056,
          duration: '1.5–2 hrs',
          driveFromPrev: '8 min Uber / 30 min walk',
          description: 'Iconic 1.6-mile round-trip summit hike inside a volcanic tuff cone with panoramic 360° views of Waikiki and the south shore.',
          reservationRequired: 'Book online ($5 entry · 9–10 AM slot)',
          tip: 'Bring plenty of water, sunscreen, and a hat since the trail gets sunny by late morning.'
        },
        {
          id: 'd2-kapahulu',
          name: 'Kapahulu Ave Food Crawl',
          time: '12:00 PM',
          category: 'food',
          lat: 21.2816,
          lng: -157.8141,
          duration: '1.5 hrs',
          driveFromPrev: '6 min Uber / 18 min walk',
          description: 'Post-hike lunch along Honolulu’s best local food street: fresh ahi poke at Ono Seafood, mahi-mahi or boneless chicken plates at Rainbow Drive-In, and warm semi-sweet malasadas at Leonard’s Bakery.',
          tip: 'Midday is ideal for Ono Seafood before they sell out of spicy ahi & shoyu poke.'
        },
        {
          id: 'd2-waikiki',
          name: 'Waikiki Beach Swim, Sunset & Night Stroll',
          time: '2:00 PM – 10:30 PM',
          category: 'beach',
          lat: 21.2752,
          lng: -157.8261,
          duration: 'Afternoon & Evening',
          driveFromPrev: '1 block from Hotel Renew',
          description: 'Unwind and swim at Waikiki Beach right outside Hotel Renew, catch the ~5:50 PM sunset, then enjoy dinner (Marugame Udon w/ shrimp & veggie tempura, or fresh island fish at Duke’s / Monkeypod) and evening strolling along Kalakaua Ave.',
          tip: 'Swing by Kona Coffee Purveyors (International Market Place) in the morning or afternoon for 100% Kona coffee and savory croissants.'
        }
      ]
    },
    {
      day: 3,
      date: 'Thu, Nov 26 · Thanksgiving',
      shortLabel: 'Day 3 · 11/26',
      theme: 'East Shore Snorkeling, Makapuʻu & Koko Crater Sunset',
      color: '#c85a32',
      carInSplitMode: true,
      summary: '9:30 AM scenic southeast coast loop: Hanauma Bay snorkeling, cliffside Makapuʻu Lighthouse Trail, Koko Crater Stairs for sunset, and Thanksgiving dinner.',
      holidayNote: 'Thanksgiving Day: Hanauma Bay, Makapuʻu, and Koko Crater are all OPEN today (PCC & Hoʻomaluhia are closed Thursdays). Bring a headlamp/phone flashlight for walking down Koko Crater at dusk!',
      stops: [
        {
          id: 'd3-hanauma',
          name: 'Hanauma Bay Nature Preserve',
          time: '10:00 AM',
          category: 'beach',
          lat: 21.2690,
          lng: -157.6938,
          duration: '2.5–3 hrs',
          driveFromPrev: '25 min drive from Waikiki (9:30 AM depart)',
          description: 'Protected marine sanctuary inside a flooded volcanic crater teeming with tropical reef fish and sea turtles. Snorkel gear can be rented on-site.',
          reservationRequired: 'Book Tue 11/24 at 7:00 AM HST ($25 · 10 AM slot)',
          tip: 'Last entry is 1:30 PM. Bring $3 cash for parking and reef-safe sunscreen. If reservations sell out, stop at the lookout and head to Sandy Beach / Makapuʻu!'
        },
        {
          id: 'd3-blowhole',
          name: 'Halona Blowhole & Makapuʻu Lighthouse Trail',
          time: '1:15 PM',
          category: 'hike',
          lat: 21.3106,
          lng: -157.6499,
          duration: '1.5 hrs',
          driveFromPrev: '15 min scenic drive',
          description: 'Drive Kalanianaʻole Hwy past Halona Blowhole and Sandy Beach to the paved 2-mile Makapuʻu Lighthouse Trail for dramatic cliffside ocean views (early whale-spotting season!).',
          tip: 'Fully paved, windy, and exposed — wear a hat and sunglasses. Grab a quick rest/snack at Koko Marina Center afterward.'
        },
        {
          id: 'd3-kokocrater',
          name: 'Koko Crater Railway Trail (Stairs) — Sunset',
          time: '4:15 PM – 6:30 PM',
          category: 'hike',
          lat: 21.2806,
          lng: -157.6844,
          duration: '1.5–2 hrs',
          driveFromPrev: '12 min back toward Hawaii Kai',
          description: 'Climb 1,048 historic railroad-tie steps straight up Koko Crater (~1.8 mi RT, ~1,000 ft gain) to reach the summit right around ~5:50 PM sunset with sweeping views over Hanauma Bay, Diamond Head, and Waikiki.',
          tip: 'Bring plenty of water, grippy shoes, and a headlamp or phone flashlight for the descent at dusk.'
        },
        {
          id: 'd3-dinner',
          name: 'Thanksgiving Dinner (Waikiki / Honolulu)',
          time: '7:30 PM – 10:00 PM',
          category: 'food',
          lat: 21.2768,
          lng: -157.8286,
          duration: '2 hrs+',
          driveFromPrev: '25 min drive back to Waikiki',
          description: 'Celebrate with a well-earned reserved Thanksgiving dinner back in Waikiki or Honolulu after conquering Koko Crater.',
          reservationRequired: 'Reserve ASAP for 11/26',
          tip: 'Shower/freshen up at Hotel Renew first if your dinner reservation is around 8:00 PM.'
        }
      ]
    },
    {
      day: 4,
      date: 'Fri, Nov 27',
      shortLabel: 'Day 4 · 11/27',
      theme: 'Windward Coast & Polynesian Cultural Center',
      color: '#7c4d8a',
      carInSplitMode: true,
      summary: '9:30 AM scenic Windward drive (Pali Lookout, Byodo-In Temple, Kualoa), followed by a full afternoon & evening at the Polynesian Cultural Center.',
      holidayNote: 'Confirmed Booking (2 Adults · Aliʻi Lūʻau Package): Islands of Polynesia → Aliʻi Lūʻau at Hale ʻOhana (4:30 PM) → Hā: Breath of Life at Pacific Theater (7:15 PM, Lower Section 4, Seats J-81 & J-82).',
      stops: [
        {
          id: 'd4-pali',
          name: 'Nuʻuanu Pali Lookout',
          time: '9:50 AM',
          category: 'hike',
          lat: 21.3669,
          lng: -157.7931,
          duration: '25 min',
          driveFromPrev: '20 min from Waikiki (9:30 AM depart)',
          description: 'Sweeping, windswept cliff overlook of the lush Koʻolau Mountains and Windward coast — site of King Kamehameha I’s pivotal 1795 battle.',
          tip: 'Parking is $7 (non-residents) via kiosk; hold onto your hat!'
        },
        {
          id: 'd4-byodoin',
          name: 'Byodo-In Temple (Valley of the Temples)',
          time: '10:30 AM',
          category: 'culture',
          lat: 21.4309,
          lng: -157.8321,
          duration: '45 min',
          driveFromPrev: '15 min drive',
          description: 'Serene Japanese replica temple tucked beneath sheer emerald Koʻolau cliffs, complete with koi ponds, black swans, and a sacred brass bell.',
          tip: 'Entry ~$5–$7. Open daily 8:30 AM – 4:30 PM.'
        },
        {
          id: 'd4-kualoa',
          name: 'Kualoa Regional Park & Chinaman’s Hat',
          time: '11:30 AM',
          category: 'beach',
          lat: 21.5125,
          lng: -157.8364,
          duration: '45 min',
          driveFromPrev: '15 min coastal drive',
          description: 'Stop at Kualoa Regional Park for dramatic views of Mokoliʻi Island (Chinaman’s Hat) and the Jurassic-Park mountain ridges across the highway.',
          tip: 'Grab a quick snack at Hukilau Marketplace right outside PCC before entering the villages (save appetite for the 4:30 PM lūʻau!).'
        },
        {
          id: 'd4-pcc',
          name: 'Polynesian Cultural Center (Lāʻie)',
          time: '12:45 PM – 9:00 PM',
          category: 'culture',
          lat: 21.6391,
          lng: -157.9218,
          duration: '8 hrs',
          driveFromPrev: '25 min north along Kamehameha Hwy',
          description: 'Explore the 6 Islands of Polynesia villages & Canoe Pageant, then head to the Aliʻi Lūʻau at Hale ʻOhana (4:30 PM HST) followed by Hā: Breath of Life at Pacific Theater (7:15 PM HST · Lower Section 4, Seats J-81 & J-82).',
          reservationRequired: '✓ Booked · 2 Adults (Seats J-81, J-82)',
          tip: 'Arrive at Hale ʻOhana ~15 min before 4:30 PM and head to Pacific Theater Lower Section 4 around 6:50 PM. ~1 hr drive back to Waikiki after the show.'
        }
      ]
    },
    {
      day: 5,
      date: 'Sat, Nov 28',
      shortLabel: 'Day 5 · 11/28',
      theme: 'North Shore Shark Cage Dive, Big Waves & Haleʻiwa',
      color: '#2e7d5b',
      carInSplitMode: true,
      summary: '9:30 AM head north for a 2-hour North Shore shark cage dive, Waimea Valley waterfall, winter big-wave beaches, garlic shrimp, and Haleʻiwa Town.',
      holidayNote: 'Late November = prime North Shore winter swell! Take motion-sickness meds 45 min before the shark boat if prone to seasickness, and watch Pipeline/Sunset waves from the sand.',
      stops: [
        {
          id: 'd5-coffee',
          name: 'Green World Coffee Farm (or Dole Plantation)',
          time: '10:10 AM',
          category: 'food',
          lat: 21.5223,
          lng: -158.0372,
          duration: '20 min',
          driveFromPrev: '40 min drive via H-2 (9:30 AM depart)',
          description: 'Quick pit stop in central Oʻahu for locally roasted Hawaiian espresso and fresh pastries on the way up to Haleʻiwa.',
          tip: 'Dole Plantation is 3 minutes further north if you want a quick Dole Whip.'
        },
        {
          id: 'd5-shark',
          name: 'North Shore Shark Cage Dive (Haleʻiwa Harbor)',
          time: '11:00 AM – 1:00 PM',
          category: 'adventure',
          lat: 21.5947,
          lng: -158.1059,
          duration: '2 hrs',
          driveFromPrev: '15 min north to Haleʻiwa Boat Harbor',
          description: 'Board a boat from Haleʻiwa Small Boat Harbor (~3 miles offshore) to observe wild Galapagos and sandbar sharks up close from a safe floating underwater cage. Mask & snorkel provided — no scuba experience needed.',
          reservationRequired: 'Book online (~$100–$120/person)',
          tip: 'Check in 15–20 min early at Haleʻiwa Small Boat Harbor. Bring swimwear, towel, and reef-safe sunscreen.'
        },
        {
          id: 'd5-waimea',
          name: 'Waimea Valley & Waimea Bay',
          time: '1:20 PM',
          category: 'hike',
          lat: 21.6368,
          lng: -158.0539,
          duration: '2 hrs',
          driveFromPrev: '12 min north (pass Laniakea on the way)',
          description: 'Easy, shaded 1.5-mile paved walk through lush Hawaiian botanical gardens to Waimea Falls (lifeguarded swimming when conditions permit), right across from iconic Waimea Bay.',
          tip: 'Waimea Valley closes at 4:00 PM (last waterfall swim ~3:30 PM), so going right after the shark dive gives you plenty of time!'
        },
        {
          id: 'd5-pipeline',
          name: 'Banzai Pipeline, Sunset Beach & Shrimp Trucks',
          time: '3:30 PM',
          category: 'beach',
          lat: 21.6649,
          lng: -158.0531,
          duration: '1.5 hrs',
          driveFromPrev: '8 min along Kam Hwy',
          description: 'Watch pro surfers tackle massive winter barrels in golden-hour light at Ehukai Beach (Banzai Pipeline) and Sunset Beach, and refuel at Giovanni’s Shrimp Truck or Ted’s Bakery (chocolate haupia pie!).',
          tip: 'Bring small cash for food trucks and roadside fruit stands.'
        },
        {
          id: 'd5-haleiwa',
          name: 'Haleʻiwa Town & Laniakea Turtle Beach',
          time: '5:15 PM – 8:00 PM',
          category: 'food',
          lat: 21.5928,
          lng: -158.1034,
          duration: '2.5 hrs',
          driveFromPrev: '15 min south',
          description: 'Spot basking green sea turtles at Laniakea Beach right before sunset, then stroll surf boutiques, grab Matsumoto Shave Ice (closes ~6 PM), and have a relaxed North Shore dinner before driving back to Waikiki.',
          tip: 'Drive back to Waikiki ~8:30–9:30 PM after dinner (~50 min via H-2).'
        }
      ]
    },
    {
      day: 6,
      date: 'Sun, Nov 29',
      shortLabel: 'Day 6 · 11/29',
      theme: 'Hoʻomaluhia Garden, Lanikai, Kakaʻako & Farewell Sunset',
      color: '#b06c19',
      carInSplitMode: true,
      summary: '9:30 AM drive over the Pali to Hoʻomaluhia Botanical Garden and Lanikai Beach & Pillbox, then return to Honolulu for ʻIolani Palace, Kakaʻako murals, and Ala Moana sunset.',
      holidayNote: 'Hoʻomaluhia Botanical Garden is OPEN Sundays 9:00 AM – 4:00 PM (free admission; closed Thursdays). Pearl Harbor remains on Day 7 as an optional flex stop.',
      stops: [
        {
          id: 'd6-hoomaluhia',
          name: 'Hoʻomaluhia Botanical Garden (Kāneʻohe)',
          time: '9:55 AM',
          category: 'hike',
          lat: 21.3879,
          lng: -157.8075,
          duration: '1 hr',
          driveFromPrev: '25 min from Waikiki via Pali Hwy (9:30 AM depart)',
          description: '400-acre tropical botanical garden framed by sheer Koʻolau cliffs — drive the iconic palm-lined entrance road and stroll the lush lakeside paths.',
          tip: 'Free entry (open 9 AM – 4 PM). No stopping on the main entrance road for photos — use the designated pull-outs and parking lots.'
        },
        {
          id: 'd6-lanikai',
          name: 'Kailua Sunday Farmers Market, Lanikai Beach & Pillbox',
          time: '11:00 AM',
          category: 'beach',
          lat: 21.3924,
          lng: -157.7152,
          duration: '2.75 hrs',
          driveFromPrev: '15 min east to Kailua / Lanikai',
          description: 'Stop by KailuaTown Farmers Market (Sundays 8 AM–12 PM) for fresh tropical fruit (apple bananas, Sunrise papaya, Sugarloaf pineapple, young coconut) & warm baked pastries, then enjoy Lanikai Beach and the scenic Pillbox ridge hike.',
          tip: 'Park at Kailua Beach Park if Lanikai residential street parking is full (easy 10-min walk).'
        },
        {
          id: 'd6-iolani',
          name: 'ʻIolani Palace Grounds & Chinatown Fruit Stalls',
          time: '2:30 PM',
          category: 'culture',
          lat: 21.3068,
          lng: -157.8588,
          duration: '1 hr',
          driveFromPrev: '25 min back over Pali Hwy',
          description: 'See the King Kamehameha Statue and walk the grounds of ʻIolani Palace — the only official royal residence in the U.S. (grounds open Sundays), with an optional 5-min walk to Chinatown’s Maunakea fruit stalls for local tropical produce.',
          tip: '5-minute drive over to SALT at Our Kakaʻako right afterward.'
        },
        {
          id: 'd6-kakaako',
          name: 'SALT at Our Kakaʻako & Street Murals',
          time: '3:45 PM',
          category: 'food',
          lat: 21.2983,
          lng: -157.8606,
          duration: '1.5 hrs',
          driveFromPrev: '5 min drive',
          description: 'Explore Honolulu’s creative neighborhood: colorful POW! WOW! murals, Moku Kitchen (fresh fish tacos, jidori chicken, wood-fired veggie pizza), Arvo Café for Aussie-style coffee & savory toasts, and local boutiques.',
          tip: 'Great spot for local gifts, craft shops, and Hawaiian coffee beans.'
        },
        {
          id: 'd6-alamoana',
          name: 'Ala Moana Beach Park Sunset & Farewell Dinner',
          time: '5:15 PM – 10:30 PM',
          category: 'beach',
          lat: 21.2889,
          lng: -157.8484,
          duration: 'Evening',
          driveFromPrev: '5 min drive',
          description: 'Catch your final Oʻahu sunset (~5:50 PM) from Magic Island at Ala Moana Beach Park with a classic Diamond Head backdrop, then head back to Waikiki for a farewell dinner and nightcap.',
          tip: 'Try House Without a Key (live Hawaiian music + hula at sunset) or Monkeypod Kitchen Waikiki.'
        }
      ]
    },
    {
      day: 7,
      date: 'Mon, Nov 30',
      shortLabel: 'Day 7 · 11/30',
      theme: 'Slow Waikiki Morning, Optional Flex Stops & Flight Home',
      color: '#4f6d7a',
      carInSplitMode: false,
      summary: 'Relaxed final Waikiki morning plus optional flex stops (Pearl Harbor or Catamaran Sail) if you’ve covered everything else before your afternoon flight WN2026.',
      holidayNote: 'Leave Hotel Renew by 12:45–1:00 PM for WN2026 (~3:15–3:40 PM departure). Pearl Harbor and the Catamaran Sail are kept here as optional add-ons if you have extra time/energy.',
      stops: [
        {
          id: 'd7-morning',
          name: 'Final Waikiki Swim & Kona Coffee',
          time: '9:30 AM',
          category: 'beach',
          lat: 21.2741,
          lng: -157.8245,
          duration: '2 hrs',
          driveFromPrev: 'Steps from Hotel Renew',
          description: 'Take a relaxed morning dip at Waikiki Beach, grab Kona coffee & pastries at Kai Coffee or an açaí bowl at Tropical Tribe / Sunrise Shack, and pick up Honolulu Cookie Company or macadamia nut gifts.',
          tip: 'Hotel Renew can hold your luggage if you check out at 11 AM and want a final lunch on Kalakaua Ave.'
        },
        {
          id: 'd7-catamaran-opt',
          name: 'Optional: Waikiki Catamaran Sail',
          time: 'Flex · Morning (10:00–11:30 AM)',
          category: 'adventure',
          lat: 21.2768,
          lng: -157.8294,
          duration: '1–1.5 hrs',
          driveFromPrev: '8 min beach walk from Hotel Renew',
          description: 'Optional flex activity if you feel like one last ride on the water: a breezy morning sail directly off Waikiki Beach (Maitaʻi or Kepoikai) with Diamond Head views.',
          tip: 'Easy to skip if you prefer a slow beach morning — or book a day ahead if you decide to go.'
        },
        {
          id: 'd7-pearl-opt',
          name: 'Optional: Pearl Harbor & USS Arizona Memorial',
          time: 'Flex · 9:30 AM – 12:00 PM',
          category: 'culture',
          lat: 21.3679,
          lng: -157.9383,
          duration: '2.5 hrs',
          driveFromPrev: '20 min Uber (right on the way to HNL!)',
          description: 'Optional flex stop if you’ve covered everything else: Pearl Harbor Visitor Center and the Navy boat out to the USS Arizona Memorial. Conveniently located 10 min from HNL airport.',
          reservationRequired: 'Optional · Recreation.gov ($1 fee)',
          tip: 'No bags/backpacks allowed inside (on-site bag storage is $7/bag, or leave suitcases at Hotel Renew and swing back). Only do this if you start by ~9:30 AM to make your 3:15 PM flight comfortably.'
        },
        {
          id: 'd7-hnl',
          name: 'Depart HNL — Southwest WN2026',
          time: '3:15–3:40 PM HST',
          category: 'transit',
          lat: 21.3187,
          lng: -157.9225,
          duration: 'Airport',
          driveFromPrev: '25–30 min Uber from Waikiki (depart ~12:45 PM)',
          description: 'Check in at HNL Terminal 2 (remember to pass checked bags through the USDA Agricultural Inspection scanner before dropping them!) for your Southwest WN2026 flight home.',
          tip: 'Aloha & safe travels!'
        }
      ]
    }
  ],

  foodSpots: [
    {
      id: 'food-kcp',
      name: 'Kona Coffee Purveyors | b. patisserie',
      area: 'Waikiki · Intl Market Place',
      tag: 'bakery',
      price: '$$',
      dish: 'Savory Veggie/Cheese Croissant, Tartines (9:30–2) & Black Sesame Kouign-Amann',
      notes: '100% single-origin Kona coffee paired with San Francisco’s b. patisserie — flaky savory croissants (ricotta, basil, seasonal veggies, cheeses) and semi-sweet caramelized pastries.',
      access: '10 min walk from Hotel Renew · Open 7 AM–4 PM',
      lat: 21.2782,
      lng: -157.8260
    },
    {
      id: 'food-brug',
      name: 'BRUG Bakery',
      area: 'Ala Moana · Honolulu',
      tag: 'bakery',
      price: '$',
      dish: 'Garlic Cheese Bread, Tuna/Egg Savory Buns & Semi-Sweet Matcha/Melon Pan',
      notes: 'Beloved Hokkaido-style Japanese bakery with shelves of soft, fresh-baked savory buns (no beef/pork options clearly labeled) and lightly sweet Japanese pastries.',
      access: 'Day 6 (near Ala Moana) · 10 min drive from Waikiki',
      lat: 21.2912,
      lng: -157.8435
    },
    {
      id: 'food-leonards',
      name: 'Leonard’s Bakery',
      area: 'Kapahulu · Near Waikiki',
      tag: 'bakery',
      price: '$',
      dish: 'Original, Cinnamon & Haupia Malasadas',
      notes: 'Oʻahu’s iconic Portuguese-Hawaiian bakery since 1952. Served piping hot — the original and cinnamon are light and semi-sweet.',
      access: '18 min walk / 5 min Uber from Hotel Renew',
      lat: 21.2849,
      lng: -157.8132
    },
    {
      id: 'food-teds',
      name: 'Ted’s Bakery',
      area: 'North Shore · Sunset Beach',
      tag: 'bakery',
      price: '$$',
      dish: 'Chocolate Haupia Cream Pie, Garlic Shrimp & Chicken Katsu',
      notes: 'Legendary North Shore bakery near Sunset Beach — grab a slice of semi-sweet chocolate haupia pie plus a fresh shrimp or crispy chicken katsu plate.',
      access: 'Day 5 (North Shore)',
      lat: 21.6736,
      lng: -158.0379
    },
    {
      id: 'food-kailua-market',
      name: 'KailuaTown Farmers Market (Sun 8 AM–12 PM)',
      area: 'Kailua · East Shore',
      tag: 'fruit',
      price: '$',
      dish: 'Apple Bananas, Sunrise Papaya, Sugarloaf Pineapple & Fresh Young Coconut',
      notes: 'Runs Sunday mornings right on your Day 6 route between Hoʻomaluhia and Lanikai — local island tropical fruits, warm oven-fresh pastries, and Hawaiʻi-grown coffee.',
      access: 'Day 6 (Sun 11/29 · 640 Ulukahiki St, Kailua)',
      lat: 21.3868,
      lng: -157.7568
    },
    {
      id: 'food-kahuku-farms',
      name: 'Kahuku Farms & Kuilima Farm Stand',
      area: 'Kahuku · North Shore',
      tag: 'fruit',
      price: '$',
      dish: 'Fresh Chilled Coconut, Papaya, Apple Bananas & Lilikoi Smoothies',
      notes: 'Kuilima Farm Stand (open daily 9 AM–5 PM) and Kahuku Farms Café (open Fri/Sat 11 AM–4 PM) offer farm-picked tropical fruit, lilikoi smoothies, and savory veggie paninis.',
      access: 'Day 4 (near PCC) or Day 5 (North Shore)',
      lat: 21.6939,
      lng: -157.9772
    },
    {
      id: 'food-chinatown-fruit',
      name: 'Chinatown / Maunakea Tropical Fruit Stalls',
      area: 'Downtown Honolulu',
      tag: 'fruit',
      price: '$',
      dish: 'Dragonfruit, Starfruit, Apple Bananas, Papaya & Seasonal Rambutan/Longan',
      notes: 'Open-air local produce stalls 5 minutes from ʻIolani Palace — unbeatable local prices on ripe tropical fruit you won’t easily find on the mainland.',
      access: 'Day 6 (5 min walk from ʻIolani Palace)',
      lat: 21.3125,
      lng: -157.8628
    },
    {
      id: 'food-kai',
      name: 'Kai Coffee Hawaii & Knots Coffee Roasters',
      area: 'Waikiki',
      tag: 'coffee',
      price: '$',
      dish: 'Macadamia Nut Kai Latte, Cold Brew & Tropical Açaí Bowl',
      notes: 'Steps from Hotel Renew for easy morning espresso or iced lattes (Knots is 3 min away at Queen Kapiʻolani Hotel with Diamond Head views).',
      access: '3–5 min walk from Hotel Renew',
      lat: 21.2759,
      lng: -157.8266
    },
    {
      id: 'food-arvo',
      name: 'Arvo Café',
      area: 'Kakaʻako · SALT',
      tag: 'coffee',
      price: '$$',
      dish: 'Flat White, Matcha Latte & Savory Avocado / Smoked Salmon Toast',
      notes: 'Bright Australian-style coffee bar inside SALT at Our Kakaʻako — great espresso, savory open-faced toasts, and semi-sweet ricotta/fig or chia bowls.',
      access: 'Day 6 (SALT at Our Kakaʻako)',
      lat: 21.2986,
      lng: -157.8609
    },
    {
      id: 'food-ono',
      name: 'Ono Seafood',
      area: 'Kapahulu · Near Waikiki',
      tag: 'seafood',
      price: '$$',
      dish: 'Shoyu Ahi, Spicy Ahi & Miso Ahi Poke Bowls',
      notes: 'No-frills counter serving arguably the freshest, cleanest fresh-fish poke bowls near Waikiki. Goes fast in the afternoon.',
      access: '15 min walk / 5 min Uber from Hotel Renew',
      lat: 21.2816,
      lng: -157.8141
    },
    {
      id: 'food-giovannis',
      name: 'Giovanni’s Shrimp Truck (Kahuku & Haleʻiwa)',
      area: 'Windward / North Shore',
      tag: 'seafood',
      price: '$$',
      dish: 'Shrimp Scampi Plate (extra garlic butter) or Hot & Spicy Shrimp',
      notes: 'The original North Shore garlic shrimp truck. Kahuku location is near PCC (Day 4); Haleʻiwa is right on Day 5.',
      access: 'Day 4 or Day 5',
      lat: 21.6798,
      lng: -157.9499
    },
    {
      id: 'food-dukes',
      name: 'Duke’s Waikiki / Monkeypod Kitchen',
      area: 'Waikiki Beachfront',
      tag: 'seafood',
      price: '$$$',
      dish: 'Macadamia Nut Crusted Fresh Catch (Mahi/Ono) & Lilikoi Mai Tai',
      notes: 'Classic oceanfront dining with live music and fresh island-caught fish (mahi-mahi, ono, monchong) plus wood-fired veggie/chicken options.',
      access: '12 min walk from Hotel Renew',
      lat: 21.2768,
      lng: -157.8286
    },
    {
      id: 'food-marugame',
      name: 'Marugame Udon',
      area: 'Waikiki',
      tag: 'chicken',
      price: '$',
      dish: 'Kake / Kitsune Udon + Crispy Shrimp, Chicken & Veggie Tempura',
      notes: 'Hand-pulled Sanuki udon made fresh in front of you — skip the beef bowl and load up on crispy shrimp, chicken, and sweet potato tempura.',
      access: '10 min walk from Hotel Renew',
      lat: 21.2797,
      lng: -157.8257
    },
    {
      id: 'food-rainbow',
      name: 'Rainbow Drive-In',
      area: 'Kapahulu · Near Waikiki',
      tag: 'chicken',
      price: '$',
      dish: 'Mahi-Mahi Plate or Boneless Crispy Chicken Plate w/ Mac Salad',
      notes: 'Historic 1961 Honolulu plate-lunch institution — their breaded mahi-mahi and boneless chicken plates are local classics right after Diamond Head.',
      access: '15 min walk from Hotel Renew',
      lat: 21.2762,
      lng: -157.8143
    },
    {
      id: 'food-moku',
      name: 'Moku Kitchen',
      area: 'Kakaʻako · SALT',
      tag: 'chicken',
      price: '$$',
      dish: 'Fresh Island Fish Tacos, Rotisserie Jidori Chicken & Roasted Squash Ravioli',
      notes: 'Upbeat island-craft kitchen at SALT Kakaʻako with great fresh-catch fish tacos, rotisserie chicken, and wood-fired vegetarian pizzas.',
      access: 'Day 6 (SALT at Our Kakaʻako)',
      lat: 21.2983,
      lng: -157.8606
    },
    {
      id: 'food-matsumoto',
      name: 'Matsumoto Shave Ice',
      area: 'Haleʻiwa · North Shore',
      tag: 'shave-ice',
      price: '$',
      dish: 'Tropical Combo (Lilikoi, Guava, Pineapple) — Semi-Sweet',
      notes: 'Iconic family-run shave ice shop since 1951. Ask for tropical fruit syrups (lilikoi, guava, mango) for a bright, not-too-sweet refresh.',
      access: 'Day 5 (Haleʻiwa Town)',
      lat: 21.5912,
      lng: -158.1032
    }
  ],

  checklistGroups: [
    {
      id: 'asap',
      title: 'Book Right Away (Thanksgiving Week)',
      urgent: true,
      items: [
        {
          id: 'chk-pcc',
          title: 'Polynesian Cultural Center Tickets (Booked)',
          detail: 'Fri 11/27 · 2 Adults (Aliʻi Lūʻau Package · $197.95 ea). Villages → Aliʻi Lūʻau at Hale ʻOhana (4:30 PM) → Hā: Breath of Life at Pacific Theater (7:15 PM, Lower Section 4, Seats J-81 & J-82).',
          when: '✓ Confirmed',
          defaultChecked: true
        },
        {
          id: 'chk-shark',
          title: 'North Shore Shark Cage Dive (Sat 11/28 · 11:00 AM)',
          detail: 'Book a 2-hour shark cage tour departing Haleʻiwa Small Boat Harbor (e.g., North Shore Shark Adventures or Haleiwa Shark Tours, ~$100–$120/person).',
          when: 'Book ASAP — Saturday slots fill fast'
        },
        {
          id: 'chk-diamond',
          title: 'Diamond Head State Monument Reservation',
          detail: 'Reserve entry ($5/person) for Wed 11/25 at 9:00–10:00 AM via gostateparks.hawaii.gov. No parking pass needed if walking/Ubering.',
          when: 'Book ASAP (up to 30 days ahead)'
        },
        {
          id: 'chk-thanksgiving',
          title: 'Thanksgiving Dinner Reservation (Thu 11/26)',
          detail: 'Holiday tables in Waikiki/Honolulu fill up fast. Lock in a spot for Thursday evening (~7:30–8:00 PM after Koko Crater sunset).',
          when: 'Book ASAP'
        }
      ]
    },
    {
      id: 'timed',
      title: 'Time-Sensitive & Optional Bookings',
      urgent: true,
      items: [
        {
          id: 'chk-hanauma',
          title: 'Hanauma Bay Snorkeling Reservation (10:00 AM slot)',
          detail: 'Opens strictly 2 days ahead at 7:00 AM HST (9:00 AM PST) on pros.hnl.info ($25/person). Sells out in ~5 minutes!',
          when: 'Alarm: Tue 11/24 at 7:00 AM HST (9:00 AM PST) for Thu 11/26'
        },
        {
          id: 'chk-pearl',
          title: 'Optional (Day 7 Flex): Pearl Harbor — USS Arizona Ticket',
          detail: 'Only if you decide to fit it in on Mon 11/30 morning before your flight. Day-before tickets drop Sun 11/29 at 3:00 PM HST on Recreation.gov ($1 fee).',
          when: 'Optional · decide on-island'
        },
        {
          id: 'chk-catamaran',
          title: 'Optional (Day 7 Flex): Waikiki Catamaran Sail',
          detail: 'Only if you want a final morning sail on Mon 11/30 (Maitaʻi Catamaran or Kepoikai).',
          when: 'Optional · book 1 day ahead if interested'
        }
      ]
    },
    {
      id: 'packing',
      title: 'Oʻahu Packing Essentials',
      urgent: false,
      items: [
        {
          id: 'chk-sunscreen',
          title: 'Reef-Safe Mineral Sunscreen (Zinc / Titanium)',
          detail: 'Required by Hawaiʻi law — oxybenzone/octinoxate sunscreens are banned and checked at Hanauma Bay.',
          when: 'Before departure'
        },
        {
          id: 'chk-gear',
          title: 'Grippy Shoes, Swimwear, Headlamp & Light Rain Shell',
          detail: 'Sneakers for Diamond Head / Koko Crater / Pillbox, a small headlamp or charged phone flashlight for Koko Crater dusk descent, and a light layer for windy Pali Lookout.',
          when: 'Before departure'
        },
        {
          id: 'chk-cash',
          title: 'Small Cash ($40–$60 in $1s & $5s)',
          detail: 'Hanauma Bay parking is $3 cash-only, and several North Shore shrimp trucks & fruit stands prefer cash.',
          when: 'Before departure'
        }
      ]
    },
    {
      id: 'logistics',
      title: 'Hotel & Flight Reminders',
      urgent: false,
      items: [
        {
          id: 'chk-checkin',
          title: 'Southwest Check-In (24 Hours Prior)',
          detail: 'Check in 24 hours before your SFO departure on Mon 11/23 for WN3882, and Sun 11/29 (~3:15 PM HST) for WN2026.',
          when: '24 hrs before each flight'
        },
        {
          id: 'chk-hotel-note',
          title: 'Confirm Hotel Renew Evening Check-In',
          detail: 'Give Hotel Renew a quick heads-up on Tue 11/24 about your evening arrival time so your room is held smoothly.',
          when: 'Morning of Tue 11/24'
        },
        {
          id: 'chk-offline-maps',
          title: 'Download Oʻahu Offline Map in Google Maps',
          detail: 'In Google Maps app → Profile → Offline Maps → Select your own map → cover all of Oʻahu (~120 MB). Ensures every Directions ↗ link routes even in dead zones on Windward/North Shore.',
          when: 'On Wi-Fi before departure'
        },
        {
          id: 'chk-usda',
          title: 'HNL USDA Agricultural Inspection on Return',
          detail: 'All luggage leaving Hawaiʻi for the mainland goes through USDA x-ray before airline bag drop (don’t pack fresh fruit!).',
          when: 'Mon 11/30 at HNL'
        }
      ]
    }
  ]
};
