/* ==========================================================================
   Oʻahu Thanksgiving Week Trip Data (Nov 24 – Nov 30, 2026)
   ========================================================================== */

const TRIP_DATA = {
  homeBase: {
    name: 'Hotel Renew',
    address: '129 Paoakalani Ave, Honolulu, HI 96815',
    lat: 21.2736,
    lng: -157.8226,
    note: '1 block from Waikiki Beach (Diamond Head / Honolulu Zoo end). Valet parking is $60 + tax/night.'
  },

  waikikiBanyan: {
    name: 'Waikiki Banyan Parking Garage',
    address: '201 ʻŌhua Ave, Honolulu, HI 96815',
    lat: 21.2747,
    lng: -157.8235,
    note: '~3-min walk from Hotel Renew. ~$25–$30/day overnight with in/out privileges.'
  },

  days: [
    {
      day: 1,
      date: 'Tue, Nov 24',
      shortLabel: 'Day 1 · 11/24',
      theme: 'Arrival & Waikiki Check-In',
      color: '#3b6e8c',
      carInSplitMode: false,
      summary: 'Land on Southwest WN3882 late evening, head straight to Hotel Renew, and settle in for the week.',
      holidayNote: 'Reminder: Set an alarm for 7:00 AM HST today (or Mon 11/23 depending on your target day) if you want Hanauma Bay snorkeling reservations for Thanksgiving Day (Thu 11/26)!',
      stops: [
        {
          id: 'd1-hnl',
          name: 'Daniel K. Inouye Intl Airport (HNL)',
          time: '~9:10 PM HST',
          category: 'transit',
          lat: 21.3187,
          lng: -157.9225,
          duration: '30 min',
          driveFromPrev: 'Arrival · WN3882',
          description: 'Arrive on Southwest WN3882 (SJC → HNL). Grab bags and head to rideshare pickup (or Rental Car Center if doing the 6-day car plan).',
          tip: 'Uber/Lyft to Hotel Renew is ~$35–$45 and takes ~20–25 min at night.'
        },
        {
          id: 'd1-hotel',
          name: 'Hotel Renew Check-In & Waikiki Stroll',
          time: '~9:50 PM',
          category: 'beach',
          lat: 21.2736,
          lng: -157.8226,
          duration: 'Evening',
          driveFromPrev: '25 min from HNL',
          description: 'Check in at Hotel Renew (129 Paoakalani Ave). Take a quick 2-minute walk down to Kuhio Beach for warm Pacific air and grab a late-night musubi from ABC Store or Musubi Cafe Iyasume.',
          tip: 'Get to sleep early — the 2-hour time difference from California makes tomorrow’s sunrise Diamond Head hike effortless.'
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
          description: 'Post-hike lunch along Honolulu’s best local food street: hot malasadas at Leonard’s Bakery, fresh ahi poke at Ono Seafood, or plate lunch at Rainbow Drive-In.',
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
          description: 'Unwind and swim at Waikiki Beach right outside Hotel Renew, catch the ~5:50 PM sunset, then enjoy dinner (Marugame Udon, Steak Shack, or Duke’s) and late-evening strolling along Kalakaua Ave & International Market Place.',
          tip: 'Hotel Renew typically lends beach chairs and towels — ask the front desk before heading out.'
        }
      ]
    },
    {
      day: 3,
      date: 'Thu, Nov 26 · Thanksgiving',
      shortLabel: 'Day 3 · 11/26',
      theme: 'East Shore Snorkeling, Coastal Drive & Lanikai',
      color: '#c85a32',
      carInSplitMode: true,
      summary: '9:30 AM car pickup and scenic southeast coast loop: Hanauma Bay snorkeling, cliffside lighthouse hike, Lanikai Beach, and Thanksgiving dinner.',
      holidayNote: 'Thanksgiving Day: Polynesian Cultural Center and Pearl Harbor are CLOSED today, making this the ideal outdoor & scenic driving day. Reserve Thanksgiving dinner early!',
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
          tip: 'Last entry is 1:30 PM. Bring $3 cash for parking and reef-safe sunscreen. If reservations sell out, stop at the lookout and spend extra time at Lanikai!'
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
          tip: 'Fully paved, windy, and exposed — wear a hat and sunglasses.'
        },
        {
          id: 'd3-lanikai',
          name: 'Lanikai Beach & Pillbox Hike (Kailua)',
          time: '3:15 PM',
          category: 'beach',
          lat: 21.3924,
          lng: -157.7152,
          duration: '2.5 hrs',
          driveFromPrev: '25 min drive north',
          description: 'Powdery white sand and calm turquoise water overlooking the Mokulua Islands, plus the optional 1-hour Lanikai Pillbox hike for golden-hour coastal views.',
          tip: 'Street parking in Lanikai is tight on holidays — park at Kailua Beach Park and walk 10 min.'
        },
        {
          id: 'd3-dinner',
          name: 'Thanksgiving Dinner (Kailua or Waikiki)',
          time: '6:45 PM – 10:00 PM',
          category: 'food',
          lat: 21.3972,
          lng: -157.7418,
          duration: '2 hrs+',
          driveFromPrev: '10 min to Kailua Town',
          description: 'Enjoy a reserved Thanksgiving meal in Kailua (Buzz’s / Uahi Island Grill) or drive back over the Pali Hwy for a Waikiki holiday dinner and late-night stroll.',
          reservationRequired: 'Reserve ASAP for 11/26',
          tip: 'Overnight parking tonight: Waikiki Banyan (~$30) is a 3-min walk from Hotel Renew.'
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
      holidayNote: 'Polynesian Cultural Center is OPEN today (12:00 PM – 9:00 PM). Book your package (villages + Aliʻi Lūʻau + Hā: Breath of Life show) in advance.',
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
          tip: 'Grab a quick lunch at Hukilau Marketplace right outside PCC before entering the villages.'
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
          description: 'Explore 6 authentic Polynesian island villages (Hawaiʻi, Tahiti, Samoa, Tonga, Fiji, Aotearoa), watch the Canoe Pageant, feast at the Aliʻi Lūʻau, and finish with the fire-knife evening show Hā: Breath of Life.',
          reservationRequired: 'Book PCC package online',
          tip: '~1 hr drive back to Waikiki after the 9 PM finale (back around 10:15 PM; late-night spots in Waikiki stay open past 11 PM).'
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
          tip: 'Drive back ~8:30–9:30 PM. If doing the 3-day car split, check if your Waikiki branch has an after-hours key drop or return Sunday morning.'
        }
      ]
    },
    {
      day: 6,
      date: 'Sun, Nov 29',
      shortLabel: 'Day 6 · 11/29',
      theme: 'Honolulu Culture, Kakaʻako Murals & Farewell Sunset',
      color: '#b06c19',
      carInSplitMode: false,
      summary: 'Leisurely 10:00 AM start in urban Honolulu: ʻIolani Palace grounds, Kakaʻako street art & food hall, Magic Island sunset, and a late Waikiki farewell night.',
      holidayNote: 'No car needed today — short Ubers between Waikiki, Downtown, and Kakaʻako. Pearl Harbor has been moved to Day 7 as an optional flex stop.',
      stops: [
        {
          id: 'd6-iolani',
          name: 'ʻIolani Palace Grounds & Downtown Honolulu',
          time: '10:00 AM',
          category: 'culture',
          lat: 21.3068,
          lng: -157.8588,
          duration: '1.5 hrs',
          driveFromPrev: '15 min Uber from Waikiki (9:30 AM start)',
          description: 'See the King Kamehameha Statue and walk the grounds of ʻIolani Palace — the only official royal residence in the United States (note: interior tours are closed Sundays, grounds open for photos), plus a quick Chinatown stroll.',
          tip: 'Easy walk or 5-min Uber over to Kakaʻako for lunch.'
        },
        {
          id: 'd6-kakaako',
          name: 'SALT at Our Kakaʻako & Street Murals',
          time: '12:00 PM',
          category: 'food',
          lat: 21.2983,
          lng: -157.8606,
          duration: '2.5 hrs',
          driveFromPrev: '5 min Uber / 15 min walk',
          description: 'Explore Honolulu’s creative neighborhood: colorful POW! WOW! murals, Highway Inn (kalua pork & lau lau) or Moku Kitchen for lunch, and Arvo Café for Aussie-style coffee & toast.',
          tip: 'Great spot for local gifts, craft shops, and Hawaiian coffee beans.'
        },
        {
          id: 'd6-alamoana',
          name: 'Ala Moana Beach Park Sunset & Farewell Dinner',
          time: '3:30 PM – 10:30 PM',
          category: 'beach',
          lat: 21.2889,
          lng: -157.8484,
          duration: 'Afternoon & Late Evening',
          driveFromPrev: '5 min Uber',
          description: 'Relax at Ala Moana Beach Park and catch your final Oʻahu sunset from Magic Island (classic Diamond Head backdrop), then head back to Waikiki for a farewell dinner and nightcap.',
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
          description: 'Check in at HNL Terminal 2 (remember to pass checked bags through the USDA Agricultural Inspection scanner before dropping them!). Fly home to OAK.',
          tip: 'Aloha & safe travels!'
        }
      ]
    }
  ],

  foodSpots: [
    {
      id: 'food-leonards',
      name: 'Leonard’s Bakery',
      area: 'Kapahulu · Near Waikiki',
      tag: 'malasadas',
      price: '$',
      dish: 'Original, Cinnamon & Haupia Malasadas',
      notes: 'Oʻahu’s most famous Portuguese-Hawaiian doughnut bakery since 1952. Served piping hot — eat them immediately.',
      access: '18 min walk / 5 min Uber from Hotel Renew',
      lat: 21.2849,
      lng: -157.8132
    },
    {
      id: 'food-ono',
      name: 'Ono Seafood',
      area: 'Kapahulu · Near Waikiki',
      tag: 'poke',
      price: '$$',
      dish: 'Shoyu Ahi & Spicy Ahi Poke Bowl',
      notes: 'No-frills counter serving arguably the freshest, cleanest poke bowls near Waikiki. Goes fast in the afternoon.',
      access: '15 min walk / 5 min Uber from Hotel Renew',
      lat: 21.2816,
      lng: -157.8141
    },
    {
      id: 'food-marugame',
      name: 'Marugame Udon',
      area: 'Waikiki',
      tag: 'dinner',
      price: '$',
      dish: 'Nikutama Udon + Shrimp Tempura',
      notes: 'Hand-pulled Sanuki udon made fresh in front of you. The line moves surprisingly fast and it’s the best value meal in Waikiki.',
      access: '10 min walk from Hotel Renew',
      lat: 21.2797,
      lng: -157.8257
    },
    {
      id: 'food-steak',
      name: 'Steak Shack',
      area: 'Waikiki Beachfront',
      tag: 'plate-lunch',
      price: '$',
      dish: '6oz / 10oz Steak Plate on the Beach',
      notes: 'Beachfront walk-up window grilling tender sliced steak over rice and salad — unbeatable casual sunset dinner.',
      access: '15 min beach walk from Hotel Renew',
      lat: 21.2775,
      lng: -157.8339
    },
    {
      id: 'food-dukes',
      name: 'Duke’s Waikiki / Monkeypod Kitchen',
      area: 'Waikiki Beachfront',
      tag: 'dinner',
      price: '$$$',
      dish: 'Hula Pie (Duke’s) or Mai Tai w/ Lilikoi Foam (Monkeypod)',
      notes: 'Classic beachfront dining with live music and ocean views. Great for Day 2 or your farewell dinner on Day 6.',
      access: '12 min walk from Hotel Renew',
      lat: 21.2768,
      lng: -157.8286
    },
    {
      id: 'food-rainbow',
      name: 'Rainbow Drive-In',
      area: 'Kapahulu · Near Waikiki',
      tag: 'plate-lunch',
      price: '$',
      dish: 'Loco Moco or Mix Plate w/ Mac Salad',
      notes: 'Historic 1961 Honolulu plate-lunch institution. Massive portions of comfort food right after Diamond Head.',
      access: '15 min walk from Hotel Renew',
      lat: 21.2762,
      lng: -157.8143
    },
    {
      id: 'food-overeasy',
      name: 'Over Easy / Boots & Kimo’s',
      area: 'Kailua · East Shore',
      tag: 'coffee',
      price: '$$',
      dish: 'Macadamia Nut Pancakes or Kalua Pig Hash',
      notes: 'Beloved Kailua brunch & lunch spots — ideal to pair with Lanikai Beach on Day 3 (check Thanksgiving hours).',
      access: 'Car Day 3 (Kailua Town)',
      lat: 21.3972,
      lng: -157.7418
    },
    {
      id: 'food-giovannis',
      name: 'Giovanni’s Shrimp Truck (Kahuku & Haleʻiwa)',
      area: 'Windward / North Shore',
      tag: 'shrimp',
      price: '$$',
      dish: 'Shrimp Scampi Plate (extra garlic butter)',
      notes: 'The original North Shore garlic shrimp truck. Kahuku location is great before PCC (Day 4); Haleʻiwa is perfect on Day 5.',
      access: 'Car Day 4 or Day 5',
      lat: 21.6798,
      lng: -157.9499
    },
    {
      id: 'food-teds',
      name: 'Ted’s Bakery',
      area: 'North Shore · Sunset Beach',
      tag: 'plate-lunch',
      price: '$$',
      dish: 'Chocolate Haupia Cream Pie & Garlic Shrimp',
      notes: 'Legendary North Shore bakery right near Sunset Beach. Grab a slice of chocolate haupia pie for the beach.',
      access: 'Car Day 5',
      lat: 21.6736,
      lng: -158.0379
    },
    {
      id: 'food-matsumoto',
      name: 'Matsumoto Shave Ice',
      area: 'Haleʻiwa · North Shore',
      tag: 'shave-ice',
      price: '$',
      dish: 'Ichiban Special (Lilikoi, Guava, Li Hing Mui + Ice Cream)',
      notes: 'Iconic family-run shave ice shop since 1951. Always add vanilla ice cream at the bottom and condensed milk on top.',
      access: 'Car Day 5 (Haleʻiwa Town)',
      lat: 21.5912,
      lng: -158.1032
    },
    {
      id: 'food-moku',
      name: 'Moku Kitchen / Highway Inn',
      area: 'Kakaʻako · Honolulu',
      tag: 'dinner',
      price: '$$',
      dish: 'Kalua Pork, Lau Lau & Poi (Highway Inn) or Wood-Fired Pizza (Moku)',
      notes: 'Located at SALT at Our Kakaʻako — authentic Hawaiian comfort food or upbeat island-craft dining on Day 6.',
      access: '12 min Uber from Hotel Renew',
      lat: 21.2983,
      lng: -157.8606
    },
    {
      id: 'food-kai',
      name: 'Kai Coffee Hawaii / Sunrise Shack',
      area: 'Waikiki',
      tag: 'coffee',
      price: '$',
      dish: 'Kai Latte (Macadamia Nut) or Tropical Açaí Bowl',
      notes: 'Easy morning fuel steps from Hotel Renew before hikes or your Monday flight home.',
      access: '5 min walk from Hotel Renew',
      lat: 21.2759,
      lng: -157.8266
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
          title: 'Polynesian Cultural Center Tickets',
          detail: 'Book for Fri 11/27 (or Wed 11/25 / Sat 11/28). Closed Thu 11/26 & Sun 11/29. Choose Villages + Aliʻi Lūʻau + Hā evening show.',
          when: 'Book ASAP — holiday week sells out'
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
          detail: 'Holiday tables in Waikiki and Kailua fill up fast. Lock in a spot for Thursday evening (~6:45 PM).',
          when: 'Book ASAP'
        },
        {
          id: 'chk-car',
          title: 'Verify Employer Car Rate ($31.50/day) & Reserve',
          detail: 'Check if your employer code applies to Waikiki neighborhood branches (for the 3-day Thu–Sat plan) or HNL Airport only. Most rental bookings are free-cancellation!',
          when: 'Book ASAP — free to adjust later'
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
          when: 'Alarm: Tue 11/24 at 7:00 AM HST for Thu 11/26'
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
          title: 'Sneakers, Swimwear, Sunglasses & Light Rain Shell',
          detail: 'Grippy shoes for Diamond Head / Pillbox, water shoes or snorkel mask if you own one, and a light layer for windy Pali Lookout.',
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
          detail: 'Check in Mon 11/23 (~5:35 PM PST) for WN3882 and Sun 11/29 (~3:15 PM HST) for WN2026.',
          when: '24 hrs before each flight'
        },
        {
          id: 'chk-hotel-note',
          title: 'Confirm Hotel Renew Late Check-In',
          detail: 'Since WN3882 lands around 9:10 PM HST, give Hotel Renew a quick heads-up that you’re arriving ~10 PM.',
          when: 'Morning of Tue 11/24'
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
