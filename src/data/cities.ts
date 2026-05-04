// Curated city data for /radius-map/[city] landing pages.
// All coordinates are real (decimal degrees, WGS 84). Distances in coverage
// descriptions are great-circle distances (Haversine), rounded.

export type CoverageEntry = {
  radius: number;
  unit: 'miles' | 'kilometers';
  label: string;
  description: string;
  includes: string[];
  excludes: string[];
};

export type UseCase = {
  title: string;
  description: string;
  recommendedRadius: string;
};

export type Quirk = {
  title: string;
  description: string;
};

export type FAQ = {
  question: string;
  answer: string;
};

export type City = {
  slug: string;
  name: string;
  country: string;
  countryCode: string;
  region: string;
  lat: number;
  lng: number;
  defaultRadius: number;
  defaultUnit: 'miles' | 'kilometers';
  population: number;
  populationLabel: string;
  timezone: string;
  fact: string;
  intro: string;

  alternateNames: string[];
  centralLandmark: string;
  coverage: CoverageEntry[];
  useCases: UseCase[];
  quirks: Quirk[];
  faqs: FAQ[];
  lastUpdated: string;
};

export const CITIES: City[] = [
  {
    slug: 'new-york-city',
    name: 'New York City',
    country: 'United States',
    countryCode: 'US',
    region: 'North America',
    lat: 40.758,
    lng: -73.9855,
    defaultRadius: 5,
    defaultUnit: 'miles',
    population: 8_300_000,
    populationLabel: '8.3 million',
    timezone: 'America/New_York',
    fact: 'Manhattan is roughly 13 miles long but only about 2.3 miles wide at its broadest, so any radius drawn from midtown crosses water on at least two sides before it grows past 1 mile.',
    intro:
      'A 5-mile radius from Times Square reaches all of Manhattan south of about 116th Street, plus parts of Brooklyn (Williamsburg, DUMBO, Brooklyn Heights), Queens (Long Island City, Astoria), and across the Hudson into Hoboken and Jersey City. NYC is the densest market in the United States, so radius queries here matter for real-estate comps, restaurant catchment, and trade-area planning where every block changes the math.',
    alternateNames: ['NYC', 'New York', 'The Big Apple', 'Manhattan'],
    centralLandmark: 'Times Square',
    coverage: [
      {
        radius: 1,
        unit: 'miles',
        label: '1 mile',
        description:
          'A 1-mile radius from Times Square covers most of midtown Manhattan — Theater District, Hell\'s Kitchen, Bryant Park, the Garment District, and the southern edge of Central Park. The standard NYC appraiser radius for foot-traffic businesses.',
        includes: [
          'Theater District',
          'Bryant Park & New York Public Library',
          'Hell\'s Kitchen',
          'Penn Station & Madison Square Garden',
          'Empire State Building',
          'Rockefeller Center',
        ],
        excludes: [
          'Wall Street and the Financial District',
          'Central Park north of 65th Street',
          'Brooklyn (the closest waterfront is ~1.7 mi southeast)',
        ],
      },
      {
        radius: 5,
        unit: 'miles',
        label: '5 miles',
        description:
          'A 5-mile radius from Times Square covers nearly all of Manhattan from Battery Park to about 116th Street, plus the closest parts of Brooklyn, Queens, and New Jersey. About 30% of the area is water (Hudson, East River, Upper Bay).',
        includes: [
          'All Manhattan from Battery Park to ~116th Street',
          'Williamsburg, DUMBO, and Brooklyn Heights',
          'Long Island City and Astoria',
          'Hoboken and downtown Jersey City',
          'South Bronx (Mott Haven)',
          'Greenpoint',
        ],
        excludes: [
          'JFK and Newark Liberty airports',
          'Most of Brooklyn south of Prospect Park',
          'Coney Island and the Rockaways',
        ],
      },
      {
        radius: 10,
        unit: 'miles',
        label: '10 miles',
        description:
          'A 10-mile radius covers all of Manhattan and the Bronx, most of Brooklyn and Queens, the north tip of Staten Island, and the inner New Jersey ring (Newark, Jersey City, Bayonne).',
        includes: [
          'All five boroughs except southern Staten Island and far Queens',
          'Newark and Newark Liberty Airport',
          'LaGuardia Airport',
          'Yonkers (just inside)',
          'Most of Hudson County, NJ',
        ],
        excludes: [
          'JFK Airport (~13 mi southeast)',
          'Hempstead and central Long Island',
          'White Plains',
          'Stamford, CT',
        ],
      },
      {
        radius: 25,
        unit: 'miles',
        label: '25 miles',
        description:
          'A 25-mile radius pulls in all five boroughs, JFK, central Long Island out to Hempstead and Mineola, Westchester (White Plains, Yonkers), and most of Northern New Jersey. Just nicks Stamford, Connecticut.',
        includes: [
          'All NYC airports (JFK, LaGuardia, Newark)',
          'Hempstead, Mineola, Levittown',
          'White Plains and Yonkers',
          'Stamford, CT (just inside the eastern edge)',
          'Most of Northern New Jersey including Paterson and Morristown',
          'North Shore Long Island to Glen Cove',
        ],
        excludes: [
          'New Haven, CT',
          'The Hamptons',
          'Princeton, NJ',
          'Poughkeepsie',
        ],
      },
      {
        radius: 50,
        unit: 'miles',
        label: '50 miles',
        description:
          'A 50-mile radius reaches all of Long Island except the East End, central New Jersey down to Trenton\'s outskirts, southern Connecticut to Bridgeport, and the Hudson Valley up to Newburgh. The Hamptons, New Haven, and Philadelphia stay just outside.',
        includes: [
          'Most of Long Island west of Riverhead',
          'Trenton, NJ approaches and Princeton',
          'Bridgeport, CT and most of Fairfield County',
          'Newburgh and the lower Hudson Valley',
          'Eastern Pennsylvania near Easton',
        ],
        excludes: [
          'The Hamptons (Southampton is ~85 mi)',
          'New Haven, CT (~75 mi)',
          'Philadelphia (~95 mi)',
          'Hartford, CT (~110 mi)',
        ],
      },
    ],
    useCases: [
      {
        title: 'Real-estate appraisal comps',
        description:
          'NYC appraisers typically pull comparable sales from a 0.5–1 mile radius in Manhattan and 1–3 miles in the outer boroughs. A radius pinned to the subject property is the fastest way to draw the comp universe before exporting to MLS or Redfin.',
        recommendedRadius: '0.5–1 mi (Manhattan), 1–3 mi (Brooklyn, Queens, Bronx)',
      },
      {
        title: 'Restaurant and bar catchment',
        description:
          'Manhattan foot-traffic businesses draw most customers from a 0.25–0.5 mile radius (a 10-minute walk). Bike and scooter delivery extends the practical zone to 1–3 miles. Use the walking radius map for honest catchment planning since the Manhattan grid makes walking distance close to straight-line.',
        recommendedRadius: '0.25–0.5 mi (foot traffic), 1–3 mi (bike delivery)',
      },
      {
        title: 'Apartment search by commute',
        description:
          'A direct radius around an office is misleading in NYC because the subway dramatically beats driving and bus routes are slow. For apartment hunting, draw the radius to define the "no further than this" zone, then validate with a drive-time map for accuracy.',
        recommendedRadius: '3–5 mi for under-30-minute subway commutes',
      },
      {
        title: 'Trade-area planning for retail',
        description:
          'NYC retail trade areas are unusually small because of density. A neighborhood store often draws 70% of customers from inside 0.5 miles. A regional destination retailer (a furniture warehouse, a Costco) pulls from 5–10 miles. Always validate with foot traffic data, not just radius.',
        recommendedRadius: '0.5 mi (neighborhood), 5–10 mi (destination)',
      },
    ],
    quirks: [
      {
        title: 'Water eats the radius',
        description:
          'Manhattan is a narrow island bounded by the Hudson on the west, East River on the east, and Upper Bay to the south. Any radius drawn from midtown loses 25–35% of its land area to water. The only direction the radius reaches mostly-land is straight north into the Bronx.',
      },
      {
        title: 'Distance is not transit time',
        description:
          'A 5-mile radius from midtown is a 25-minute subway ride to Williamsburg but a 90-minute bus-plus-transfer trip to parts of Queens. The radius defines maximum reach; the drive-time and walking radius maps tell you which fraction of that reach is practical.',
      },
      {
        title: 'Bridge and tunnel chokepoints',
        description:
          'Manhattan connects to the rest of the region through about 20 bridges and tunnels, and most are congested at peak hours. A straight-line 10-mile radius reaching Newark hides the fact that the Holland or Lincoln Tunnel can add 30–60 minutes during rush hour.',
      },
    ],
    faqs: [
      {
        question: 'How big is a 5-mile radius in New York City?',
        answer:
          'A 5-mile radius from Times Square covers nearly all of Manhattan from Battery Park to 116th Street, plus the closest parts of Brooklyn (Williamsburg, DUMBO), Queens (Long Island City, Astoria), and across the Hudson to Hoboken and Jersey City. About a third of the area inside the circle is water.',
      },
      {
        question: 'What\'s within 10 miles of NYC?',
        answer:
          'A 10-mile radius from midtown captures all of Manhattan and the Bronx, most of Brooklyn and Queens, the north tip of Staten Island, and the inner New Jersey ring including Newark, Jersey City, and Bayonne. Newark Airport and LaGuardia are inside; JFK, at about 13 miles southeast, is just outside.',
      },
      {
        question: 'What\'s the standard radius for NYC real-estate comps?',
        answer:
          'Most Manhattan appraisers use a 0.5- to 1-mile radius for comparable sales, where dense supply means even a 0.25-mile difference matters. Outer boroughs typically use 1–3 miles. The radius is a starting filter — block, building type, and unit features narrow it further.',
      },
      {
        question: 'Does a NYC radius cover all five boroughs?',
        answer:
          'A 10-mile radius from Times Square reaches all of the Bronx and most of Brooklyn and Queens but misses southern Staten Island. A 15-mile radius captures essentially all of NYC except the Rockaways. From a Lower Manhattan center, a 12-mile radius covers all five boroughs.',
      },
      {
        question: 'What ZIP codes are within 5 miles of Times Square?',
        answer:
          'Roughly the Manhattan ZIPs from 10001 (Chelsea) to 10026 (Central Harlem), plus Long Island City (11101), Astoria (11102, 11103, 11106), Williamsburg (11211, 11249), Brooklyn Heights/DUMBO (11201), Hoboken (07030), and downtown Jersey City (07302). Use the Zip Code Radius tool for the full machine-readable export.',
      },
      {
        question: 'Why does a NYC radius look smaller than the same radius in another city?',
        answer:
          'Because Manhattan is so narrow — about 2.3 miles wide at its broadest — any radius drawn from a Manhattan center quickly hits water and crosses into other boroughs or New Jersey. The same 5-mile radius drawn in Phoenix or Houston covers a single homogeneous suburban area; in NYC it crosses three states (NY, NJ, technically the airspace of CT-bound waters) and changes character every half mile.',
      },
      {
        question: 'How do I draw a 30-minute commute radius in New York?',
        answer:
          'Use the Drive Time Map for car commutes. For subway and bus, the straight-line radius is misleading — the subway lets a 5-mile radius become a 20-minute commute, while bus-only routes can stretch a 2-mile radius into 45 minutes. Most apartment seekers draw the radius as a "no further" filter and then verify with a transit map.',
      },
    ],
    lastUpdated: '2026-05-04',
  },
  {
    slug: 'los-angeles',
    name: 'Los Angeles',
    country: 'United States',
    countryCode: 'US',
    region: 'North America',
    lat: 34.0522,
    lng: -118.2437,
    defaultRadius: 10,
    defaultUnit: 'miles',
    population: 3_900_000,
    populationLabel: '3.9 million city / 12.4 million metro',
    timezone: 'America/Los_Angeles',
    fact: 'Greater Los Angeles spans roughly 500 square miles of basin and valley, so a 10-mile radius from downtown is genuinely "central LA" — Hollywood is in, but Santa Monica and Long Beach are not.',
    intro:
      'A 10-mile radius from downtown Los Angeles reaches Hollywood, Culver City, Glendale, and East LA, but Santa Monica (~14 mi west) and Long Beach (~23 mi south) sit outside. LA is one of the most spread-out cities in the world, which makes drive time matter far more than straight-line distance. Use this page for radius work; for honest commute or service planning, switch to the Drive Time Map.',
    alternateNames: ['LA', 'L.A.', 'City of Angels'],
    centralLandmark: 'downtown Los Angeles',
    coverage: [
      {
        radius: 1,
        unit: 'miles',
        label: '1 mile',
        description:
          'A 1-mile radius from downtown LA covers the historic Civic Center, the Arts District, Little Tokyo, parts of Chinatown, and the financial core around Bunker Hill.',
        includes: [
          'Civic Center and City Hall',
          'Arts District',
          'Little Tokyo',
          'Bunker Hill',
          'Chinatown (south end)',
          'Crypto.com Arena vicinity',
        ],
        excludes: [
          'Hollywood (~7 mi northwest)',
          'Echo Park',
          'University of Southern California',
        ],
      },
      {
        radius: 5,
        unit: 'miles',
        label: '5 miles',
        description:
          'A 5-mile radius reaches Echo Park, Silver Lake (just barely), Boyle Heights, USC, Exposition Park, and the eastern edge of Koreatown. Hollywood is still about 2 miles outside.',
        includes: [
          'Echo Park',
          'Boyle Heights',
          'USC and Exposition Park',
          'Koreatown (east half)',
          'Silver Lake (just inside)',
          'East Los Angeles',
        ],
        excludes: [
          'Hollywood',
          'Beverly Hills',
          'Santa Monica',
          'Pasadena',
        ],
      },
      {
        radius: 10,
        unit: 'miles',
        label: '10 miles',
        description:
          'A 10-mile radius from downtown captures most of central LA — Hollywood, West Hollywood, Culver City, Glendale, Pasadena (just barely), and Inglewood. Santa Monica and the South Bay sit outside.',
        includes: [
          'Hollywood and West Hollywood',
          'Culver City',
          'Glendale',
          'Pasadena (just inside)',
          'Inglewood',
          'Beverly Hills',
        ],
        excludes: [
          'Santa Monica (~14 mi west)',
          'Burbank Bob Hope Airport (just outside)',
          'Long Beach (~23 mi south)',
          'San Fernando Valley north of Burbank',
        ],
      },
      {
        radius: 25,
        unit: 'miles',
        label: '25 miles',
        description:
          'A 25-mile radius covers most of LA County\'s urban basin — from Santa Monica and Marina del Rey on the west, to Long Beach in the south, and the San Fernando Valley to the north. The South Bay and most of LAX-adjacent neighborhoods are inside.',
        includes: [
          'Santa Monica and Venice',
          'LAX and the South Bay',
          'Long Beach',
          'Most of the San Fernando Valley',
          'Anaheim (just inside the southern edge)',
          'Burbank and Glendale',
        ],
        excludes: [
          'Malibu (~30 mi west)',
          'Irvine (~40 mi south)',
          'Riverside (~60 mi east)',
          'Lancaster (~75 mi north)',
        ],
      },
      {
        radius: 50,
        unit: 'miles',
        label: '50 miles',
        description:
          'A 50-mile radius from downtown LA pulls in most of Orange County, the Inland Empire as far as Riverside, the high desert just past Lancaster, and Malibu and the Channel Islands coast. The full Greater LA + OC + IE megalopolis fits inside.',
        includes: [
          'All of Orange County including Irvine',
          'Riverside and parts of San Bernardino',
          'Lancaster and Palmdale',
          'Malibu and the Pacific Coast',
          'Disneyland and Anaheim',
        ],
        excludes: [
          'San Diego (~120 mi south)',
          'Bakersfield (~110 mi north)',
          'Palm Springs (~110 mi east)',
          'Santa Barbara (~95 mi northwest)',
        ],
      },
    ],
    useCases: [
      {
        title: 'Drive-time-corrected real estate search',
        description:
          'A 15-mile straight-line radius from a downtown office can mean a 25-minute drive or a 90-minute crawl, depending on direction and time of day. LA buyers should always validate radius results against the drive-time map before committing.',
        recommendedRadius: '10–20 mi straight-line, then narrow with drive-time',
      },
      {
        title: 'Trade area for destination retail',
        description:
          'LA destination retail (think Costco, IKEA, Sephora flagship) draws from a 10–20 mile primary trade area — much wider than NYC equivalents. The dispersed population and car-centric design mean customers will drive further.',
        recommendedRadius: '10–20 mi (primary), 25 mi (secondary)',
      },
      {
        title: 'Film-location scouting',
        description:
          'Studios use a 30-mile radius from downtown LA — known as the "studio zone" or "TMZ" — for union no-travel-pay rules. Crews working inside the zone get standard rates; outside requires per-diems and travel pay.',
        recommendedRadius: '30 mi (the canonical "studio zone")',
      },
      {
        title: 'Delivery zone planning',
        description:
          'LA restaurant delivery rarely exceeds 5 miles because of traffic; most apps default to 3–5 mile zones. Couriers on bikes are practical only in dense pockets like Downtown, Westwood, or Santa Monica because of arterials and freeways.',
        recommendedRadius: '3–5 mi (driver), 1 mi (bike)',
      },
    ],
    quirks: [
      {
        title: 'Distance lies, drive time tells the truth',
        description:
          'Nowhere is the gap between radius and reality bigger than LA. A 10-mile radius from downtown covers Hollywood (a 20-minute drive at 10 PM but 50 minutes at 5 PM) and Pasadena (15 minutes via 110, an hour during rush). Always pair the radius map with the drive-time map for LA.',
      },
      {
        title: 'The "studio zone" is exactly 30 miles',
        description:
          'The film industry uses a precise 30-mile radius from the intersection of Beverly and La Cienega as its no-travel-pay zone. Productions inside the zone pay standard crew rates; outside requires per-diems and travel time. It is one of the few places where a radius is literally encoded in labor law.',
      },
      {
        title: 'The Pacific Ocean caps western reach',
        description:
          'Any radius from central LA bigger than ~12 miles starts losing its western half to ocean. Santa Monica Bay caps coastal reach, and the Channel Islands (Catalina, Anacapa) are well outside even a 50-mile circle from downtown.',
      },
    ],
    faqs: [
      {
        question: 'How big is a 10-mile radius in Los Angeles?',
        answer:
          'A 10-mile radius from downtown LA covers Hollywood, West Hollywood, Beverly Hills, Culver City, Glendale, and parts of Pasadena and Inglewood. Santa Monica (about 14 miles west), the South Bay, and the San Fernando Valley sit outside the circle.',
      },
      {
        question: 'What\'s within 25 miles of downtown LA?',
        answer:
          'A 25-mile radius captures essentially all of central LA County — Santa Monica, the South Bay, LAX, Long Beach, most of the San Fernando Valley, plus the inner edge of Orange County. Malibu, Irvine, and Riverside are still outside.',
      },
      {
        question: 'What is the LA "studio zone" or "30-mile zone"?',
        answer:
          'The studio zone is a precisely-defined 30-mile radius from the intersection of Beverly Boulevard and La Cienega Boulevard. Productions inside the zone pay union crew at standard rates; productions outside require per-diems, travel pay, and sometimes lodging. It is enforced in IATSE and DGA contracts.',
      },
      {
        question: 'Why is a 10-mile radius in LA different from a 10-mile radius in NYC?',
        answer:
          'Two reasons. First, LA is much more spread out — 10 miles barely covers central LA, where in NYC the same radius reaches all five boroughs. Second, LA traffic makes drive time wildly variable: 10 miles can be 15 minutes off-peak or an hour at rush hour. The radius is a coarse filter; the drive-time map tells the real story.',
      },
      {
        question: 'How do I find LA neighborhoods within driving distance of work?',
        answer:
          'Start with a 15-mile straight-line radius around the workplace using this tool, then validate with the Drive Time Map at a realistic commute time (try 8:30 AM if you commute morning). The drive-time isochrone usually shrinks the apparent reach by 30–50% at peak hours.',
      },
      {
        question: 'What\'s a typical delivery radius for an LA restaurant?',
        answer:
          'Most LA restaurants on delivery apps cap zones at 3–5 miles because of traffic. Bike couriers operate only in dense, walkable neighborhoods (Downtown, Santa Monica, Westwood). Suburban and freeway-bordered locations rarely accept orders past 4 miles.',
      },
    ],
    lastUpdated: '2026-05-04',
  },
  {
    slug: 'chicago',
    name: 'Chicago',
    country: 'United States',
    countryCode: 'US',
    region: 'North America',
    lat: 41.8781,
    lng: -87.6298,
    defaultRadius: 10,
    defaultUnit: 'miles',
    population: 2_700_000,
    populationLabel: '2.7 million city / 9.4 million metro',
    timezone: 'America/Chicago',
    fact: 'Chicago is laid out on a numbered grid centered at State and Madison. Every 8 city blocks equals roughly 1 mile, so a 5-mile radius covers about 40 blocks in every direction — a useful trick when sketching a service area without a tape measure.',
    intro:
      'A 10-mile radius from the Loop reaches O\'Hare-area suburbs to the north, Cicero and Berwyn to the west, and the South Side communities including Hyde Park and Bridgeport. Lake Michigan eats the entire eastern half of any radius drawn near downtown, which is a feature of every Chicago map you will ever see. Use the radius below for catchment, comp, and trade-area work; switch to the Drive Time Map for honest commute planning.',
    alternateNames: ['Chi-town', 'The Windy City', 'The Second City'],
    centralLandmark: 'the Loop',
    coverage: [
      {
        radius: 1,
        unit: 'miles',
        label: '1 mile',
        description:
          'A 1-mile radius from State and Madison covers the entire Loop, the Magnificent Mile up to about Chicago Avenue, the West Loop\'s east edge, and the Near South Side\'s north edge.',
        includes: [
          'The Loop (entire downtown)',
          'Magnificent Mile (south half)',
          'West Loop (east edge)',
          'Millennium Park and Grant Park',
          'River North (south half)',
          'Near South Side',
        ],
        excludes: [
          'Lincoln Park',
          'Wicker Park',
          'Lakeview',
          'United Center',
        ],
      },
      {
        radius: 5,
        unit: 'miles',
        label: '5 miles',
        description:
          'A 5-mile radius covers most of the North Side from Lakeview down through Lincoln Park, the West Loop and Pilsen, and the South Side from Bronzeville through Hyde Park\'s northern edge.',
        includes: [
          'Lakeview, Wrigleyville, Lincoln Park',
          'Wicker Park and Logan Square (just inside)',
          'Pilsen, Little Village (east half)',
          'Bronzeville and Bridgeport',
          'Hyde Park (just inside the south edge)',
          'United Center',
        ],
        excludes: [
          'Midway Airport (~7 mi southwest)',
          'O\'Hare (~17 mi northwest)',
          'Evanston',
          'Oak Park (just outside)',
        ],
      },
      {
        radius: 10,
        unit: 'miles',
        label: '10 miles',
        description:
          'A 10-mile radius from the Loop reaches Evanston (the inner suburbs), Oak Park, Cicero, Berwyn, and the South Side communities through Chatham. Midway Airport is comfortably inside.',
        includes: [
          'Evanston (just inside)',
          'Oak Park and Berwyn',
          'Cicero',
          'Midway Airport',
          'Chatham and Englewood',
          'Most of Chicago city limits except the far southwest',
        ],
        excludes: [
          'O\'Hare International',
          'Skokie',
          'Schaumburg',
          'Naperville and the western suburbs',
        ],
      },
      {
        radius: 25,
        unit: 'miles',
        label: '25 miles',
        description:
          'A 25-mile radius covers nearly all of Cook County and the inner collar counties — O\'Hare, Schaumburg, Naperville, Aurora\'s eastern edge, Joliet (just barely), and the southern Lake County suburbs.',
        includes: [
          'O\'Hare International Airport',
          'Schaumburg, Arlington Heights, Skokie',
          'Naperville and Wheaton',
          'Joliet (just inside)',
          'Most of DuPage County',
          'Northwest Indiana to Hammond',
        ],
        excludes: [
          'Aurora (just outside western edge)',
          'Waukegan (just outside northern edge)',
          'Gary, IN (just outside)',
          'Rockford (~80 mi west)',
        ],
      },
      {
        radius: 50,
        unit: 'miles',
        label: '50 miles',
        description:
          'A 50-mile radius from the Loop reaches the full collar-county ring — Waukegan, Elgin, Aurora, Joliet, Kankakee\'s northern edge — plus most of Northwest Indiana through Gary and Valparaiso. Almost half the area is over Lake Michigan.',
        includes: [
          'Aurora and Naperville fully',
          'Waukegan, Lake Forest, Highland Park',
          'Gary and Valparaiso, IN',
          'Kankakee\'s northern edge',
          'Wisconsin border at Kenosha (just inside)',
        ],
        excludes: [
          'Milwaukee (~90 mi north)',
          'Rockford (~80 mi west)',
          'Madison, WI',
          'Indianapolis',
        ],
      },
    ],
    useCases: [
      {
        title: 'Lake-corrected trade area',
        description:
          'Any retail trade-area study from a near-lake location must remember that Lake Michigan is not customer geography. Always reduce the population estimate to the land area inside the radius — typically 50–60% of the circle when the center is downtown.',
        recommendedRadius: '5–10 mi for primary retail trade',
      },
      {
        title: 'Grid-based service zones',
        description:
          'Chicago\'s strict grid (8 blocks = 1 mile) makes radius-to-blocks math easy for delivery and field-service teams. A "5-mile radius" maps to "40 blocks in any direction from State & Madison" — a quote dispatchers can give without looking at a map.',
        recommendedRadius: '3–5 mi (city), 10–15 mi (metro)',
      },
      {
        title: 'Commuter rail corridor planning',
        description:
          'Metra commuter lines fan out from downtown along ~6 spokes. A 25-mile radius captures most stations on every line. Property and retail decisions inside this ring should always be cross-referenced with rail station proximity, since transit access dominates outer-ring desirability.',
        recommendedRadius: '25 mi for the full Metra catchment',
      },
      {
        title: 'Two-state market analysis',
        description:
          'A 30-mile radius from downtown crosses into Indiana (Hammond, Gary) and includes Northwest Indiana\'s consumer market. This region uses Chicago media and shopping but has Indiana taxes — a frequent gotcha for retail tax modeling.',
        recommendedRadius: '25–35 mi to capture the IL/IN border markets',
      },
    ],
    quirks: [
      {
        title: 'Lake Michigan eats half the radius',
        description:
          'For radii drawn anywhere within ~5 miles of the lakefront, 40–60% of the circle is over water. Population, retail, and service-area calculations should use a land-only adjustment, not the raw circle area.',
      },
      {
        title: 'The grid makes radius math intuitive',
        description:
          'Chicago\'s strict numbered grid means 8 city blocks = 1 mile (north-south) and similar east-west. A 1-mile radius maps to 8 blocks; a 5-mile radius to 40. Few cities make this conversion so easy.',
      },
      {
        title: 'Two airports, two strategies',
        description:
          'Midway is about 7 miles southwest of the Loop; O\'Hare is about 17 miles northwest. A 10-mile radius from downtown captures Midway but misses O\'Hare entirely. Service-area pricing for ground transport should account for which airport the customer is actually flying into.',
      },
    ],
    faqs: [
      {
        question: 'How big is a 5-mile radius in Chicago?',
        answer:
          'A 5-mile radius from State and Madison covers most of the North Side from Lakeview to Bronzeville on the South Side, plus Lincoln Park, Wicker Park, the West Loop, Pilsen, and Bridgeport. About a third of the circle is over Lake Michigan.',
      },
      {
        question: 'What\'s within 10 miles of downtown Chicago?',
        answer:
          'A 10-mile radius reaches Evanston, Oak Park, Cicero, Midway Airport, and most of Chicago\'s city limits. O\'Hare is about 17 miles out — just past the radius. Schaumburg, Naperville, and the outer suburbs are all outside.',
      },
      {
        question: 'How does the Chicago grid help with radius math?',
        answer:
          'Chicago\'s street grid is numbered and spaced regularly: 8 blocks equal roughly 1 mile, so a 5-mile radius is 40 blocks. State and Madison is the zero point, and addresses count up by 100 per block from there. Few US cities make a radius-to-blocks estimate this clean.',
      },
      {
        question: 'Why does Lake Michigan affect Chicago radius maps?',
        answer:
          'Because the entire eastern half of any radius drawn from downtown is over open water. For trade-area or service-zone math, you must use the land-area inside the circle — typically 50–60% of the raw circle when the center is in the Loop or further north along the lake.',
      },
      {
        question: 'What\'s within 25 miles of Chicago?',
        answer:
          'A 25-mile radius captures O\'Hare, Schaumburg, Naperville, Wheaton, most of DuPage County, the south suburbs through Joliet\'s northern edge, and Northwest Indiana out to Hammond. Aurora and Gary are just outside; Waukegan, Rockford, and Milwaukee are well beyond.',
      },
      {
        question: 'Does a 50-mile radius from Chicago reach Milwaukee?',
        answer:
          'No. Milwaukee is about 90 miles north. A 50-mile radius from downtown Chicago does reach the Wisconsin border at Kenosha, plus most of the Chicago collar counties and Northwest Indiana to Valparaiso, but Milwaukee, Madison, and Rockford are all well outside.',
      },
    ],
    lastUpdated: '2026-05-04',
  },
  {
    slug: 'london',
    name: 'London',
    country: 'United Kingdom',
    countryCode: 'GB',
    region: 'Europe',
    lat: 51.5074,
    lng: -0.1278,
    defaultRadius: 10,
    defaultUnit: 'kilometers',
    population: 9_000_000,
    populationLabel: '9 million Greater London',
    timezone: 'Europe/London',
    fact: 'The Greater London boundary is roughly 32 km across at its widest. A 10 km radius from Charing Cross fits comfortably inside it — a 25 km radius reaches all the way out to the M25 in most directions.',
    intro:
      'A 10 km radius from Charing Cross covers all of Zone 1, most of Zone 2, and parts of Zone 3 — including Camden, Hackney, Brixton, and Battersea. London is one of the densest major cities in Europe, so radius queries here usually want kilometers and a small range. The Tube zone system is an informal radius measure: roughly Zone 1 ≈ 5 km, Zone 2 ≈ 10 km, Zone 3 ≈ 14 km. For commute work across the M25, switch to the Drive Time Map.',
    alternateNames: ['The Big Smoke', 'Greater London', 'The Square Mile (City of London only)'],
    centralLandmark: 'Charing Cross',
    coverage: [
      {
        radius: 1,
        unit: 'kilometers',
        label: '1 km',
        description:
          'A 1 km radius from Charing Cross covers the West End core — Trafalgar Square, the Strand, Covent Garden, parts of Soho, and the eastern edge of St James\'s Park.',
        includes: [
          'Trafalgar Square and the National Gallery',
          'Covent Garden',
          'Soho (south half)',
          'Embankment and the Thames north bank',
          'Whitehall',
          'St James\'s Park (east edge)',
        ],
        excludes: [
          'The City of London',
          'Westminster Abbey (just inside)',
          'Buckingham Palace (just outside)',
          'British Museum (just outside)',
        ],
      },
      {
        radius: 5,
        unit: 'kilometers',
        label: '5 km',
        description:
          'A 5 km radius covers all of Zone 1 and most of inner Zone 2 — the West End, City of London, South Bank, Camden, Islington, Hackney\'s western edge, Brixton (just barely), and the inner riverside south of the Thames.',
        includes: [
          'Entire Zone 1 (West End, City, South Bank)',
          'Camden Town and Islington',
          'Hackney (west half)',
          'Battersea and Vauxhall',
          'Notting Hill and Paddington',
          'Brixton (just inside the south edge)',
        ],
        excludes: [
          'Wembley',
          'Greenwich',
          'Hampstead Heath (just outside the north edge)',
          'Stratford and the Olympic Park (just outside)',
        ],
      },
      {
        radius: 10,
        unit: 'kilometers',
        label: '10 km',
        description:
          'A 10 km radius reaches most of the inner London boroughs — Camden up to Hampstead, Hackney through Stratford, Tooting and Streatham in the south, and Hammersmith in the west. Roughly Zone 1 + Zone 2 + most of Zone 3.',
        includes: [
          'Hampstead and Kentish Town',
          'Stratford and the Olympic Park',
          'Greenwich and Canary Wharf',
          'Wimbledon (just inside)',
          'Hammersmith and Chiswick',
          'Tooting, Streatham, Clapham',
        ],
        excludes: [
          'Heathrow (~22 km west)',
          'Wembley (just outside the northern edge)',
          'Croydon (~16 km south)',
          'Romford (~22 km east)',
        ],
      },
      {
        radius: 25,
        unit: 'kilometers',
        label: '25 km',
        description:
          'A 25 km radius covers all of Greater London inside and around the M25, plus the inner Home Counties — Heathrow, Wembley, Croydon, Romford, and most stations on the Tube and Overground.',
        includes: [
          'All Greater London boroughs',
          'Heathrow Airport',
          'Croydon, Bromley, Sutton',
          'Wembley and Harrow',
          'Most of the M25 ring',
          'Watford (just inside)',
        ],
        excludes: [
          'Reading (~65 km west)',
          'Brighton (~80 km south)',
          'Cambridge (~85 km north)',
          'Oxford (~90 km west)',
        ],
      },
      {
        radius: 50,
        unit: 'kilometers',
        label: '50 km',
        description:
          'A 50 km radius reaches deep into the Home Counties — Slough, Watford, Luton (just barely), Stevenage, Sevenoaks, and Guildford\'s northern edge. Reading, Brighton, and Cambridge stay just outside.',
        includes: [
          'Slough and Windsor',
          'Watford and St Albans',
          'Luton Airport (just inside)',
          'Stevenage and Hitchin',
          'Sevenoaks and Maidstone\'s western approach',
          'Guildford (just inside)',
        ],
        excludes: [
          'Reading (~65 km)',
          'Brighton (~80 km)',
          'Cambridge (~85 km)',
          'Oxford (~90 km)',
        ],
      },
    ],
    useCases: [
      {
        title: 'Property search by Tube zone',
        description:
          'London\'s Tube fare zones map roughly to radius — Zone 1 ≈ 5 km, Zone 2 ≈ 10 km, Zone 3 ≈ 14 km — so a "Zone 1–2 only" property filter is essentially a 10 km radius from central London. Useful as a starting filter, but always validate with a real Tube journey planner.',
        recommendedRadius: '5 km (Zone 1), 10 km (Zone 1–2), 14 km (Zone 1–3)',
      },
      {
        title: 'Office catchment for new HQs',
        description:
          'A 10 km radius from a London office captures roughly 70% of practical commuters by Tube and bus. Beyond 10 km, the catchment becomes train-dependent and Home-Counties-flavored — a different demographic profile and typically a longer commute.',
        recommendedRadius: '10 km for inner-London commuter catchment',
      },
      {
        title: 'Wedding venue and hotel block planning',
        description:
          'Central London weddings often want hotels within walking distance — a 1 km radius. For larger guest lists, a 5 km radius captures the main hotel concentrations across Zone 1. A 10 km radius opens up Greenwich, Hampstead, and Wimbledon as outlier options.',
        recommendedRadius: '1 km (walking), 5 km (Zone 1 hotels), 10 km (full London)',
      },
      {
        title: 'M25 and London-bound logistics',
        description:
          'A 25 km radius from central London roughly traces the M25, which is the practical boundary between London delivery and "Home Counties" delivery. Operations teams use this as a tier line for delivery rates and depot decisions.',
        recommendedRadius: '25 km for M25 alignment',
      },
    ],
    quirks: [
      {
        title: 'Tube zones are an informal radius',
        description:
          'London\'s fare zones 1–9 are concentric and roughly evenly spaced. Zone 1 fits inside about a 5 km radius from central London; Zone 2 inside 10 km; Zone 3 inside 14 km. This makes "5 km from central" and "Zones 1–2 only" almost interchangeable filters.',
      },
      {
        title: 'The Thames splits the radius into north and south',
        description:
          'Any radius drawn from Charing Cross is bisected by the Thames. North-south transit is harder than the radius implies — there are limited bridges in Zone 1 and parts of South London are notoriously poorly served by the Underground. South of the river, the picture changes: Overground and rail dominate.',
      },
      {
        title: 'The M25 is the practical edge of London',
        description:
          'The M25 motorway forms a roughly circular boundary around Greater London at distances of 25–40 km from the centre. It is the most common informal definition of "London" for delivery, telecoms, and political purposes — though the legal Greater London boundary sits about 5 km inside it.',
      },
    ],
    faqs: [
      {
        question: 'How big is a 5 km radius in London?',
        answer:
          'A 5 km radius from Charing Cross covers all of Zone 1 and most of inner Zone 2 — the West End, the City, South Bank, Camden, Islington, and Battersea. It just reaches Brixton and Hackney. Hampstead, Wembley, Greenwich, and the Olympic Park are all outside.',
      },
      {
        question: 'What\'s within 10 miles of London?',
        answer:
          'A 10-mile (≈16 km) radius from Charing Cross covers most Greater London boroughs — Hampstead and Highgate to the north, Wimbledon and Streatham to the south, Stratford and the Olympic Park to the east, Chiswick and Hammersmith to the west. Heathrow and Croydon are just outside.',
      },
      {
        question: 'Does a 25 km radius from London reach the M25?',
        answer:
          'In most directions, yes. The M25 sits between 25 and 40 km from central London depending on direction — closer in the south and west, further in the north and east. A 25 km radius from Charing Cross hits the M25 to the south (around Sutton) and lies just inside the M25 in most other directions.',
      },
      {
        question: 'What Tube zones does a 10 km radius cover?',
        answer:
          'About Zones 1, 2, and most of Zone 3. The Tube zone system is concentric and centered on Zone 1, so radius and zone roughly correspond — Zone 1 ≈ 5 km, Zone 2 ≈ 10 km, Zone 3 ≈ 14 km. There is no exact match because zones follow station boundaries, not circles.',
      },
      {
        question: 'How do I draw a Heathrow-inclusive radius from London?',
        answer:
          'Heathrow is about 22 km west of Charing Cross. A 25 km radius from central London comfortably includes it, as well as Wembley to the north and Croydon to the south. For 24-hour airport-adjacent service planning, a 25 km radius is the typical cut-off.',
      },
      {
        question: 'What\'s a typical delivery radius for central London restaurants?',
        answer:
          'Central London delivery is usually 1–3 km because of traffic and dense competition. Bike couriers cover Zone 1 effectively at 1.5–2 km radii; cars and scooters extend to 3–5 km but rarely beyond unless the cuisine is destination-quality.',
      },
    ],
    lastUpdated: '2026-05-04',
  },
  {
    slug: 'manchester',
    name: 'Manchester',
    country: 'United Kingdom',
    countryCode: 'GB',
    region: 'Europe',
    lat: 53.4808,
    lng: -2.2426,
    defaultRadius: 10,
    defaultUnit: 'kilometers',
    population: 2_900_000,
    populationLabel: '2.9 million Greater Manchester',
    timezone: 'Europe/London',
    fact: 'Greater Manchester contains 10 metropolitan boroughs across roughly 50 km × 30 km. A 15 km radius from Piccadilly reaches almost every one of them — a useful fact for catchment planning across the conurbation.',
    intro:
      'A 10 km radius from Manchester city centre covers Salford, Trafford, most of Stockport, and the inner edges of Tameside and Bury — useful for local-business catchment planning and commute analysis across Greater Manchester. The metropolitan area is genuinely conurbated: there are no rural gaps between Manchester and the surrounding boroughs, so radius work here behaves more like an extended city than a city plus suburbs.',
    alternateNames: ['Cottonopolis (historic)', 'Greater Manchester'],
    centralLandmark: 'Piccadilly Gardens',
    coverage: [
      {
        radius: 1,
        unit: 'kilometers',
        label: '1 km',
        description:
          'A 1 km radius from Piccadilly Gardens covers the city centre — the Northern Quarter, Chinatown, the Town Hall area, Spinningfields\' eastern edge, and most of the rail-station triangle (Piccadilly, Victoria, Oxford Road).',
        includes: [
          'Northern Quarter',
          'Chinatown',
          'Manchester Town Hall and Albert Square',
          'Manchester Piccadilly Station',
          'Manchester Victoria Station',
          'Spinningfields (east edge)',
        ],
        excludes: [
          'Old Trafford (~3 km west)',
          'Etihad Stadium',
          'University of Manchester campus south of Oxford Road',
          'Salford Quays',
        ],
      },
      {
        radius: 5,
        unit: 'kilometers',
        label: '5 km',
        description:
          'A 5 km radius reaches Salford Quays, Old Trafford, the Etihad Stadium, MediaCityUK, the universities, Withington, and the inner edge of Trafford. Most of central and inner-suburban Manchester is inside.',
        includes: [
          'Salford Quays and MediaCityUK',
          'Old Trafford and the Etihad',
          'University of Manchester',
          'Hulme, Moss Side, Rusholme',
          'Withington',
          'Cheetham Hill and Crumpsall',
        ],
        excludes: [
          'Manchester Airport (~12 km south)',
          'Stockport town centre',
          'Bury town centre',
          'Oldham town centre',
        ],
      },
      {
        radius: 10,
        unit: 'kilometers',
        label: '10 km',
        description:
          'A 10 km radius covers most of inner Greater Manchester — Salford fully, all of Trafford, most of Stockport (north of the M60), Bury\'s inner edge, and the western half of Tameside.',
        includes: [
          'All of Salford',
          'All of Trafford',
          'Stockport (north of the M60)',
          'Bury (inner edge)',
          'Inner Tameside (Audenshaw, Denton)',
          'Sale, Altrincham\'s northern edge',
        ],
        excludes: [
          'Manchester Airport (just outside southern edge)',
          'Bolton (~17 km northwest)',
          'Rochdale (~16 km north)',
          'Wigan (~28 km west)',
        ],
      },
      {
        radius: 25,
        unit: 'kilometers',
        label: '25 km',
        description:
          'A 25 km radius reaches all 10 boroughs of Greater Manchester comfortably — Bolton, Wigan\'s eastern edge, Rochdale, Oldham, Stockport, Manchester, Salford, Trafford, Bury, Tameside — plus parts of Cheshire and the Peak District foothills.',
        includes: [
          'All 10 Greater Manchester boroughs',
          'Manchester Airport',
          'Bolton, Rochdale, Oldham fully',
          'Wilmslow and Knutsford\'s northern edge',
          'The northern Peak District foothills',
          'Wigan (just inside the western edge)',
        ],
        excludes: [
          'Liverpool (~50 km west)',
          'Sheffield (~55 km southeast)',
          'Preston (~50 km north)',
          'Macclesfield (just outside southeast)',
        ],
      },
      {
        radius: 50,
        unit: 'kilometers',
        label: '50 km',
        description:
          'A 50 km radius from Manchester reaches Liverpool, Preston, Sheffield (just barely), the Peak District National Park, Crewe, and most of Cheshire. Encompasses much of the North West and the western edge of the Pennines.',
        includes: [
          'Liverpool and Merseyside',
          'Preston and most of Lancashire',
          'Sheffield (just inside)',
          'Most of the Peak District',
          'Crewe and central Cheshire',
          'Halifax and Bradford\'s western edge',
        ],
        excludes: [
          'Leeds (~60 km east)',
          'Hull',
          'Birmingham (~125 km south)',
          'Newcastle',
        ],
      },
    ],
    useCases: [
      {
        title: 'Conurbation-wide trade area',
        description:
          'Greater Manchester is one of the most urbanised regions in the UK with no rural gaps between boroughs. A 15 km radius from the centre captures roughly 2 million people — the practical "Greater Manchester market" for retail and service-area planning.',
        recommendedRadius: '15 km for the GM conurbation',
      },
      {
        title: 'Stadium event catchment',
        description:
          'Old Trafford, the Etihad, and the AO Arena draw heavily from a ~25 km radius for matchday and concert traffic. Bus and tram coverage inside this radius is dense; outside, car parking and rail capacity dominate planning.',
        recommendedRadius: '25 km for matchday and concert reach',
      },
      {
        title: 'Tram and rail catchment',
        description:
          'Metrolink (the tram) covers the inner ~12 km radius effectively, with park-and-ride extending it to about 15 km. Beyond, the Northern and Avanti rail networks become the dominant commute mode. A 12–15 km radius is the right tram-friendly zone.',
        recommendedRadius: '12–15 km for tram-aligned planning',
      },
      {
        title: 'Northern Powerhouse logistics',
        description:
          'A 50 km radius from Manchester reaches Liverpool and the western edge of Sheffield — the rough core of the "Northern Powerhouse" region. Logistics and distribution centres often use this radius to define overlap with the M62 corridor markets.',
        recommendedRadius: '50 km for North West + Pennine reach',
      },
    ],
    quirks: [
      {
        title: 'No rural gap between Manchester and its boroughs',
        description:
          'Unlike many large UK cities, Manchester is fully conurbated with its 9 surrounding boroughs — there are no green-belt gaps until you reach the edges of Greater Manchester. A 15 km radius is unbroken urban fabric.',
      },
      {
        title: 'The M60 ring road is an informal radius marker',
        description:
          'The M60 forms an orbital motorway at roughly 6–8 km from the city centre. It is the most common "central Manchester vs outer suburbs" dividing line for delivery zones, parking restrictions, and rate cards.',
      },
      {
        title: 'Manchester Airport pulls travel time south',
        description:
          'Manchester Airport sits about 12 km south of the centre — outside the 10 km radius but inside 15 km. Service planning for hotels and ground transport often uses the 15 km radius specifically to include the airport.',
      },
    ],
    faqs: [
      {
        question: 'How big is a 10 km radius in Manchester?',
        answer:
          'A 10 km radius from Piccadilly Gardens covers Salford, all of Trafford, most of Stockport north of the M60, the inner edge of Bury, and western Tameside. Manchester Airport is about 12 km south and sits just outside.',
      },
      {
        question: 'Does a 25 km radius cover all of Greater Manchester?',
        answer:
          'Yes, comfortably. A 25 km radius from the city centre includes all 10 metropolitan boroughs of Greater Manchester (Bolton, Bury, Manchester, Oldham, Rochdale, Salford, Stockport, Tameside, Trafford, Wigan), plus Manchester Airport and parts of Cheshire.',
      },
      {
        question: 'What\'s within 50 km of Manchester?',
        answer:
          'A 50 km radius reaches Liverpool to the west, Preston to the north, Sheffield to the southeast, most of the Peak District, and Crewe to the south. Leeds (60 km east) and Birmingham (125 km south) are outside.',
      },
      {
        question: 'How does the M60 relate to a Manchester radius?',
        answer:
          'The M60 is an orbital motorway around Manchester at roughly 6–8 km from the centre. A 10 km radius extends slightly beyond the M60 in most directions. The M60 is the most common dividing line for "central" versus "outer" Manchester in delivery rates and zone-based pricing.',
      },
      {
        question: 'What\'s the catchment radius for Old Trafford and the Etihad?',
        answer:
          'Both stadiums draw from roughly a 25 km radius for matchdays — most of Greater Manchester. Concert events typically pull from a wider 50 km radius because they include casual visitors from Liverpool, Sheffield, and Leeds-bound rail towns.',
      },
      {
        question: 'How is a Manchester radius different from a London radius?',
        answer:
          'Manchester is more uniformly conurbated — a 10 km radius is unbroken urban fabric, whereas a 10 km radius in London is heavily segmented by the Thames, parks, and green-belt land. Manchester radii are also better proxies for transit time because Metrolink and bus networks roughly follow concentric distance.',
      },
    ],
    lastUpdated: '2026-05-04',
  },
  {
    slug: 'paris',
    name: 'Paris',
    country: 'France',
    countryCode: 'FR',
    region: 'Europe',
    lat: 48.8566,
    lng: 2.3522,
    defaultRadius: 10,
    defaultUnit: 'kilometers',
    population: 2_100_000,
    populationLabel: '2.1 million city / 11 million metro',
    timezone: 'Europe/Paris',
    fact: 'The City of Paris (intramuros) is bounded by the Boulevard Périphérique, a near-circle with a diameter of about 10 km. A 5 km radius from Notre-Dame fits the entire 20 arrondissements inside.',
    intro:
      'A 10 km radius from the centre reaches La Défense, parts of Versailles\' approaches, and the inner banlieues including Saint-Denis, Vincennes, and Boulogne-Billancourt. Paris is unusually compact for a major capital — the entire City of Paris fits inside a 5 km radius. For the broader Île-de-France region, use a 25 km radius. For RER and Métro reach, the Drive Time Map is more useful than a circle.',
    alternateNames: ['Paname (slang)', 'La Ville Lumière', 'Paris intramuros'],
    centralLandmark: 'Île de la Cité (Notre-Dame)',
    coverage: [
      {
        radius: 1,
        unit: 'kilometers',
        label: '1 km',
        description:
          'A 1 km radius from Notre-Dame covers the historical core — the Île de la Cité, Île Saint-Louis, the Marais (south half), the Latin Quarter, and the eastern edge of the Louvre.',
        includes: [
          'Île de la Cité and Île Saint-Louis',
          'Latin Quarter (north half)',
          'The Marais (south half)',
          'Hôtel de Ville',
          'Louvre (east half)',
          'Pompidou Centre',
        ],
        excludes: [
          'Eiffel Tower (~3 km west)',
          'Montmartre (~4 km north)',
          'Père Lachaise',
          'Bastille (just outside)',
        ],
      },
      {
        radius: 5,
        unit: 'kilometers',
        label: '5 km',
        description:
          'A 5 km radius covers the entire City of Paris (all 20 arrondissements). Eiffel Tower, Montmartre, Bastille, Père Lachaise, and the inner boulevards are all inside the Périphérique.',
        includes: [
          'All 20 arrondissements (entire intramuros Paris)',
          'Eiffel Tower and Trocadéro',
          'Montmartre and Sacré-Cœur',
          'Père Lachaise',
          'Bastille',
          'Bois de Boulogne (east edge) and Bois de Vincennes (west edge)',
        ],
        excludes: [
          'La Défense (~7 km west)',
          'Saint-Denis (~7 km north)',
          'Versailles (~20 km southwest)',
          'Charles de Gaulle Airport',
        ],
      },
      {
        radius: 10,
        unit: 'kilometers',
        label: '10 km',
        description:
          'A 10 km radius covers all of Paris plus the inner banlieues — La Défense, Saint-Denis, Boulogne-Billancourt, Vincennes, Issy-les-Moulineaux, and most of the petite couronne (the inner suburban ring of Hauts-de-Seine, Seine-Saint-Denis, and Val-de-Marne).',
        includes: [
          'La Défense (Europe\'s largest business district)',
          'Saint-Denis (Stade de France)',
          'Boulogne-Billancourt and Issy-les-Moulineaux',
          'Vincennes and Bois de Vincennes',
          'Most of Hauts-de-Seine, Seine-Saint-Denis, Val-de-Marne (petite couronne)',
          'Versailles\' inner approaches',
        ],
        excludes: [
          'Charles de Gaulle Airport (~25 km northeast)',
          'Versailles château (~20 km southwest)',
          'Orly Airport (~14 km south)',
          'Disneyland Paris (~30 km east)',
        ],
      },
      {
        radius: 25,
        unit: 'kilometers',
        label: '25 km',
        description:
          'A 25 km radius covers most of Île-de-France\'s densely populated zone — Charles de Gaulle Airport (just inside the northeast edge), Orly, Versailles, Saint-Germain-en-Laye, Créteil, and most of the petite and moyenne couronne.',
        includes: [
          'Both Paris airports (CDG and Orly)',
          'Versailles',
          'Saint-Germain-en-Laye',
          'Créteil and Champigny-sur-Marne',
          'Cergy-Pontoise (just inside)',
          'Disneyland Paris (just inside the eastern edge)',
        ],
        excludes: [
          'Chartres (~80 km southwest)',
          'Reims (~140 km east)',
          'Beauvais (~80 km north)',
          'Fontainebleau (~60 km southeast)',
        ],
      },
      {
        radius: 50,
        unit: 'kilometers',
        label: '50 km',
        description:
          'A 50 km radius reaches deep into Île-de-France — Beauvais\' southern approach, Fontainebleau\'s northern edge, Chartres\' eastern approach. Covers most of the region\'s 12 million population.',
        includes: [
          'Almost all of Île-de-France',
          'Fontainebleau forest',
          'Chantilly',
          'Beauvais (just inside)',
          'Provins\' western approach',
          'Most of the grande couronne',
        ],
        excludes: [
          'Reims (~140 km)',
          'Rouen (~135 km)',
          'Orléans (~115 km)',
          'Le Havre',
        ],
      },
    ],
    useCases: [
      {
        title: 'Apartment search by Métro line',
        description:
          'Most Paris commuters target a 30-minute Métro ride from work, which roughly corresponds to a 5–7 km radius. A 5 km radius from a workplace in central Paris covers nearly every Métro station inside the Périphérique, making it a clean apartment-search filter.',
        recommendedRadius: '5–7 km for inner Paris commuting',
      },
      {
        title: 'Boutique catchment for retail',
        description:
          'Paris boutique retail draws heavily from a 1–2 km radius (a 15-minute walk) for daily shopping; tourist destinations pull from 5 km. This is a much tighter catchment than London or NYC because of dense Métro coverage and walkable streets.',
        recommendedRadius: '1–2 km for daily shopping, 5 km for destinations',
      },
      {
        title: 'Île-de-France logistics zones',
        description:
          'A 25 km radius from central Paris covers most of the petite and moyenne couronne — the dense suburban ring where most regional logistics centres sit. Operations teams use this as the boundary between "Paris delivery" and "regional Île-de-France delivery".',
        recommendedRadius: '25 km for IDF inner-region',
      },
      {
        title: 'Wedding venue selection',
        description:
          'Paris weddings often want a venue within walking distance of central guest hotels — a 1 km radius from a Saint-Germain or Marais hotel concentration. For château weddings, a 50 km radius captures the major options around Chantilly, Versailles, and Fontainebleau.',
        recommendedRadius: '1 km (city), 50 km (château ring)',
      },
    ],
    quirks: [
      {
        title: 'The Périphérique is the city limit',
        description:
          'Paris (intramuros) is precisely bounded by the Boulevard Périphérique — a 35 km ring road that traces the city\'s 1844 fortifications. The City of Paris fits inside a circle just under 10 km in diameter. Anything outside the Périphérique is technically banlieue, with different administration and tax rates.',
      },
      {
        title: 'The Seine splits the radius asymmetrically',
        description:
          'Because central Paris sits on the Seine and the river curves through the city, a radius from Notre-Dame reaches further into the Right Bank (north) than the Left Bank (south) before hitting the Périphérique. The Right Bank covers roughly 14 of 20 arrondissements; the Left Bank covers 6.',
      },
      {
        title: 'Métro density beats radius distance',
        description:
          'Paris has roughly 300 Métro stations across a small footprint, so almost any point inside a 5 km radius from the centre is within 500 m of a station. Drive-time and walking-radius work poorly here; the Métro rules journey time, and the radius is mostly a catchment shorthand.',
      },
    ],
    faqs: [
      {
        question: 'How big is a 5 km radius in Paris?',
        answer:
          'A 5 km radius from Notre-Dame covers the entire City of Paris — all 20 arrondissements, including the Eiffel Tower, Montmartre, Bastille, and Père Lachaise. The Boulevard Périphérique sits roughly on the edge of this circle on most sides.',
      },
      {
        question: 'What\'s within 10 km of central Paris?',
        answer:
          'A 10 km radius covers all of Paris plus the inner banlieues — La Défense (the Europe\'s largest business district), Saint-Denis (Stade de France), Boulogne-Billancourt, Vincennes, and most of the petite couronne. Charles de Gaulle Airport is 25 km out and outside the radius.',
      },
      {
        question: 'Does a Paris radius cover both airports?',
        answer:
          'Charles de Gaulle is about 25 km northeast of Notre-Dame, and Orly is about 14 km south. A 25 km radius covers both. A 15 km radius covers Orly comfortably but misses CDG.',
      },
      {
        question: 'What\'s the difference between Paris and the Paris metropolitan area?',
        answer:
          'The City of Paris (intramuros) is bounded by the Périphérique and fits inside a 5 km radius. The Paris metropolitan area (Île-de-France) is much larger, with about 12 million people across 12,000 square kilometres — roughly inside a 50 km radius from the centre.',
      },
      {
        question: 'How do I draw a 30-minute Métro commute radius from Paris?',
        answer:
          'A 5–7 km straight-line radius from a workplace in central Paris approximates a 30-minute Métro commute, because Métro density is high enough that any point inside is within 500 m of a station. For RER reach (the regional express network), expand to 15–20 km.',
      },
      {
        question: 'Why does Paris fit inside such a small radius?',
        answer:
          'Because Paris (intramuros) was bounded by the Thiers fortifications in 1844 and never expanded its city limits — the Périphérique still traces those walls. The legal city is one of the smallest of any major capital, at just 105 km². The metropolitan area, in contrast, is one of the largest in Europe.',
      },
    ],
    lastUpdated: '2026-05-04',
  },
  {
    slug: 'berlin',
    name: 'Berlin',
    country: 'Germany',
    countryCode: 'DE',
    region: 'Europe',
    lat: 52.52,
    lng: 13.405,
    defaultRadius: 10,
    defaultUnit: 'kilometers',
    population: 3_700_000,
    populationLabel: '3.7 million',
    timezone: 'Europe/Berlin',
    fact: 'Berlin covers roughly 891 km² — about the same area as New York City\'s five boroughs combined. A 10 km radius from Alexanderplatz roughly traces the S-Bahn Ringbahn, the inner ring line.',
    intro:
      'Berlin is geographically large for a European capital. A 10 km radius from Alexanderplatz roughly matches the S-Bahn Ringbahn — the orbital S41/S42 train line that traces the inner ring. This is a useful proxy for "central Berlin" in real-estate, retail, and event-planning work. Beyond the ring, the city continues for another 5–10 km in most directions before reaching the Brandenburg green belt.',
    alternateNames: ['Berlin-Mitte (centre)', 'Hauptstadt'],
    centralLandmark: 'Alexanderplatz',
    coverage: [
      {
        radius: 1,
        unit: 'kilometers',
        label: '1 km',
        description:
          'A 1 km radius from Alexanderplatz covers Mitte\'s eastern half — the TV Tower, the Berliner Dom, Museum Island, and most of the Nikolaiviertel.',
        includes: [
          'Alexanderplatz and the TV Tower',
          'Berliner Dom and Museum Island',
          'Nikolaiviertel',
          'Hackescher Markt',
          'Rotes Rathaus',
          'Eastern half of Mitte',
        ],
        excludes: [
          'Brandenburg Gate (~2.5 km west)',
          'Reichstag',
          'Checkpoint Charlie',
          'Friedrichstraße station (just outside)',
        ],
      },
      {
        radius: 5,
        unit: 'kilometers',
        label: '5 km',
        description:
          'A 5 km radius reaches Brandenburg Gate, the Reichstag, Tiergarten\'s eastern half, Kreuzberg, Friedrichshain, Prenzlauer Berg, Wedding\'s southern half, and Charlottenburg\'s eastern edge.',
        includes: [
          'Brandenburg Gate, Reichstag, Government quarter',
          'Kreuzberg and Friedrichshain (most)',
          'Prenzlauer Berg',
          'Wedding (south half)',
          'Tiergarten',
          'Charlottenburg (east edge)',
        ],
        excludes: [
          'Tegel Airport site (~8 km northwest)',
          'Tempelhof Airport site (just outside)',
          'Olympiastadion',
          'Schöneberg (just inside southern edge)',
        ],
      },
      {
        radius: 10,
        unit: 'kilometers',
        label: '10 km',
        description:
          'A 10 km radius from Alexanderplatz roughly matches the S-Bahn Ringbahn (S41/S42) — the orbital ring that defines "inner Berlin". Includes most of Charlottenburg, Schöneberg, Tempelhof-Schöneberg, Neukölln (north), Treptow (north), and Pankow (south).',
        includes: [
          'Most of inner Berlin inside the Ringbahn',
          'Charlottenburg and Wilmersdorf (east half)',
          'Schöneberg and Tempelhof',
          'Neukölln (north half)',
          'Tempelhof Field (former airport)',
          'Olympiastadion (just inside)',
        ],
        excludes: [
          'BER Airport (~25 km southeast)',
          'Spandau (~12 km west)',
          'Köpenick (~15 km southeast)',
          'Tegel airport site (just outside northwest)',
        ],
      },
      {
        radius: 25,
        unit: 'kilometers',
        label: '25 km',
        description:
          'A 25 km radius covers all of Berlin (the city extends ~45 km east-west and ~38 km north-south, so a 25 km radius from the centre captures most outlying districts) plus BER Airport and the inner Brandenburg ring.',
        includes: [
          'All Berlin districts',
          'BER Airport (Brandenburg)',
          'Spandau and Köpenick fully',
          'Potsdam (just inside western edge)',
          'Inner Brandenburg green belt',
          'Bernau and Oranienburg approaches',
        ],
        excludes: [
          'Brandenburg an der Havel (~80 km west)',
          'Frankfurt (Oder) (~85 km east)',
          'Cottbus (~125 km southeast)',
          'Magdeburg (~130 km southwest)',
        ],
      },
      {
        radius: 50,
        unit: 'kilometers',
        label: '50 km',
        description:
          'A 50 km radius reaches well into rural Brandenburg — Oranienburg fully, Bernau, Fürstenwalde\'s western edge, Potsdam fully, and the lake districts of Spree-Neiße. Covers most of the Berlin commuter belt.',
        includes: [
          'All of Berlin and the inner Brandenburg belt',
          'Oranienburg, Bernau, Fürstenwalde',
          'Potsdam fully',
          'Beelitz and the Mark Brandenburg lakes',
          'Eberswalde (just inside)',
          'Frankfurt (Oder) (just outside)',
        ],
        excludes: [
          'Brandenburg an der Havel (~80 km)',
          'Cottbus (~125 km)',
          'Magdeburg (~130 km)',
          'Dresden (~190 km)',
        ],
      },
    ],
    useCases: [
      {
        title: 'Ringbahn-aligned real estate filter',
        description:
          'Berliners often filter property by "innerhalb des Rings" (inside the Ringbahn) — a status-laden 10 km radius from the centre. This roughly corresponds to walkable Berlin and rules out the suburban GDR-era housing estates.',
        recommendedRadius: '10 km (inside the Ringbahn)',
      },
      {
        title: 'Bezirk-level catchment',
        description:
          'Berlin\'s 12 Bezirke (districts) are administratively important but unevenly sized. A 5 km radius from any inner-city centre typically covers 3–5 Bezirke — useful for retail trade-area work that crosses administrative boundaries.',
        recommendedRadius: '5 km for inner-city Bezirk catchment',
      },
      {
        title: 'BER Airport reach planning',
        description:
          'BER Airport sits about 25 km southeast of Alexanderplatz, on the city\'s outer edge. Hotel and ground-transport operators use a 25 km radius as the airport-inclusive zone for shuttle and tariff planning.',
        recommendedRadius: '25 km for airport-aligned service zones',
      },
      {
        title: 'Brandenburg commuter analysis',
        description:
          'Berlin\'s commuter belt extends 30–60 km into Brandenburg via S-Bahn and regional rail. A 50 km radius captures most weekday commuter traffic and the second-home market around Potsdam, Oranienburg, and the lake districts.',
        recommendedRadius: '50 km for Brandenburg commuter belt',
      },
    ],
    quirks: [
      {
        title: 'Berlin is bigger than most cities its rank',
        description:
          'Berlin\'s 891 km² is roughly the same area as New York City\'s five boroughs (789 km²) and substantially larger than Paris intramuros (105 km²). A 10 km radius from the centre is genuinely "inner Berlin", not "all of Berlin".',
      },
      {
        title: 'The Ringbahn defines inner Berlin',
        description:
          'The S-Bahn Ringbahn (S41 and S42) is a 37 km circular railway around inner Berlin. A 10 km radius from Alexanderplatz roughly traces this ring. Berliners use the Ringbahn as the dividing line between dense inner districts and outer ones — much like London uses Zone 1, but on a single train line.',
      },
      {
        title: 'Lakes and forests, not water and traffic',
        description:
          'Unlike most major cities, Berlin\'s radius math is not significantly affected by water or traffic — the city is on a glacial plain with scattered lakes (Wannsee, Müggelsee) but no big river or harbour bisecting it. Distance is a reasonable proxy for travel time, especially via S-Bahn and U-Bahn.',
      },
    ],
    faqs: [
      {
        question: 'How big is a 10 km radius in Berlin?',
        answer:
          'A 10 km radius from Alexanderplatz roughly matches the S-Bahn Ringbahn — the orbital S41/S42 train line that traces inner Berlin. It covers most of Mitte, Kreuzberg, Friedrichshain, Prenzlauer Berg, Charlottenburg, Schöneberg, and Neukölln.',
      },
      {
        question: 'What\'s within 5 km of central Berlin?',
        answer:
          'A 5 km radius from Alexanderplatz covers the Brandenburg Gate, Reichstag, Tiergarten, Kreuzberg, Friedrichshain, Prenzlauer Berg, and the eastern edge of Charlottenburg. Tempelhof Field and the Olympiastadion are outside.',
      },
      {
        question: 'How does Berlin compare to Paris on a radius map?',
        answer:
          'Berlin is much larger by area. The City of Paris fits inside a 5 km radius, while inner Berlin (the Ringbahn) requires a 10 km radius. Berlin\'s 12 Bezirke spread across 891 km², compared to Paris\'s 20 arrondissements in just 105 km².',
      },
      {
        question: 'Does a 25 km radius from Berlin cover BER Airport?',
        answer:
          'Yes. BER Airport sits about 25 km southeast of Alexanderplatz, just inside a 25 km radius. A 20 km radius would miss it. For airport-inclusive shuttle and ground-transport zones, 25 km is the standard.',
      },
      {
        question: 'What does "innerhalb des Rings" mean in Berlin?',
        answer:
          'It means "inside the S-Bahn Ringbahn" — the orbital S41/S42 train line at roughly a 10 km radius from the centre. Berliners use it as a status-laden divider between walkable inner districts and the outer ones. Real-estate listings and lifestyle articles use the phrase frequently.',
      },
      {
        question: 'How does Berlin\'s commuter belt extend beyond a city radius?',
        answer:
          'Berlin\'s commuter belt extends 30–60 km into Brandenburg via S-Bahn (S1, S5, S7) and regional rail. A 50 km radius from Alexanderplatz captures Oranienburg, Bernau, Fürstenwalde, and most of Potsdam — the practical commute zone.',
      },
    ],
    lastUpdated: '2026-05-04',
  },
  {
    slug: 'madrid',
    name: 'Madrid',
    country: 'Spain',
    countryCode: 'ES',
    region: 'Europe',
    lat: 40.4168,
    lng: -3.7038,
    defaultRadius: 10,
    defaultUnit: 'kilometers',
    population: 3_300_000,
    populationLabel: '3.3 million city / 6.7 million metro',
    timezone: 'Europe/Madrid',
    fact: 'Madrid is encircled by four orbital motorways — M-30, M-40, M-45, M-50 — at roughly 7 km, 14 km, 19 km, and 25 km from the centre. Each ring marks a real shift in urban character.',
    intro:
      'A 10 km radius from Puerta del Sol roughly matches the M-40 motorway, capturing all of central Madrid plus inner suburbs like Pozuelo de Alarcón. The M-30 (about 7 km from the centre) is the practical "inner Madrid" boundary; the M-40 (14 km) catches most of the city; the M-45 and M-50 reach outer suburbs and beyond. Drive time inside the M-30 is heavily traffic-dependent — pair the radius map with the Drive Time Map for honest commute work.',
    alternateNames: ['Madriz (colloquial)', 'La Capital'],
    centralLandmark: 'Puerta del Sol',
    coverage: [
      {
        radius: 1,
        unit: 'kilometers',
        label: '1 km',
        description:
          'A 1 km radius from Puerta del Sol covers the historical core of Madrid — the Palacio Real, Plaza Mayor, the Gran Vía, the Prado Museum (just inside), and most of the central tourist quarter.',
        includes: [
          'Plaza Mayor and Puerta del Sol',
          'Palacio Real (Royal Palace)',
          'Gran Vía',
          'Prado Museum (just inside)',
          'Plaza de España',
          'Atocha Station (just outside)',
        ],
        excludes: [
          'Santiago Bernabéu Stadium',
          'Atocha Station (about 1.2 km south)',
          'Retiro Park (most of)',
          'Salamanca neighbourhood',
        ],
      },
      {
        radius: 5,
        unit: 'kilometers',
        label: '5 km',
        description:
          'A 5 km radius covers all of central Madrid inside the M-30 — Salamanca, Chamberí, Retiro, Arganzuela, Tetuán, Chamartín, Moncloa\'s eastern half, plus the inner edges of the southern districts.',
        includes: [
          'Salamanca and Chamberí',
          'Retiro Park and the Retiro neighbourhood',
          'Chamartín (Bernabéu)',
          'Atocha Station',
          'Most of Madrid\'s historical centre and inner-ring districts',
          'Casa de Campo (east edge)',
        ],
        excludes: [
          'Madrid-Barajas Airport (~13 km northeast)',
          'Pozuelo de Alarcón',
          'Las Rozas',
          'Getafe (just outside)',
        ],
      },
      {
        radius: 10,
        unit: 'kilometers',
        label: '10 km',
        description:
          'A 10 km radius reaches the M-40 ring road in most directions, capturing all of the City of Madrid plus the inner suburbs — Pozuelo, Boadilla del Monte\'s eastern edge, Alcobendas, San Sebastián de los Reyes\' southern edge, Getafe, and Leganés.',
        includes: [
          'All City of Madrid (21 districts)',
          'Pozuelo de Alarcón',
          'Alcobendas (just inside)',
          'Getafe and Leganés',
          'M-40 motorway ring',
          'Casa de Campo fully',
        ],
        excludes: [
          'Madrid-Barajas Airport (~13 km, just outside)',
          'Las Rozas (just outside)',
          'San Sebastián de los Reyes (most of)',
          'Alcalá de Henares (~30 km east)',
        ],
      },
      {
        radius: 25,
        unit: 'kilometers',
        label: '25 km',
        description:
          'A 25 km radius covers all of metropolitan Madrid out to the M-50 — Madrid-Barajas Airport, Las Rozas, Majadahonda, Alcorcón, Móstoles, Fuenlabrada, Parla, San Sebastián de los Reyes, Tres Cantos, Coslada, San Fernando de Henares, and most of the Comunidad de Madrid\'s dense suburban ring.',
        includes: [
          'Madrid-Barajas Airport',
          'Las Rozas, Majadahonda, Boadilla del Monte',
          'Alcorcón, Móstoles, Fuenlabrada, Parla',
          'San Sebastián de los Reyes, Tres Cantos',
          'Alcalá de Henares (just inside eastern edge)',
          'M-50 motorway',
        ],
        excludes: [
          'Toledo (~70 km south)',
          'Segovia (~85 km north)',
          'Ávila (~95 km west)',
          'Aranjuez (~50 km south)',
        ],
      },
      {
        radius: 50,
        unit: 'kilometers',
        label: '50 km',
        description:
          'A 50 km radius from Puerta del Sol reaches Aranjuez (just inside the southern edge), the Sierra de Guadarrama foothills, Talavera de la Reina\'s approach, and most of the Comunidad de Madrid plus parts of Toledo and Guadalajara provinces.',
        includes: [
          'Most of the Comunidad de Madrid',
          'Aranjuez',
          'Sierra de Guadarrama foothills',
          'Guadalajara (just inside)',
          'Toledo\'s northern approach',
          'Most of the AVE high-speed-rail commuter range',
        ],
        excludes: [
          'Toledo city (~70 km)',
          'Segovia (~85 km)',
          'Ávila (~95 km)',
          'Cuenca (~165 km)',
        ],
      },
    ],
    useCases: [
      {
        title: 'M-30 vs M-40 segmentation',
        description:
          'Madrid retail and real estate often segment by ring road. Inside the M-30 is "central Madrid" — high density, walkable. Between M-30 and M-40 is "inner suburbs" — denser than typical European suburbs, mixed-use. Outside M-40 starts feeling distinctly suburban. A 7 km / 14 km dual-radius captures this segmentation cleanly.',
        recommendedRadius: '7 km (M-30), 14 km (M-40)',
      },
      {
        title: 'Metro-aligned property search',
        description:
          'The Madrid Metro covers everything inside the M-40 well, plus the major northern and southern suburbs out to about 20 km. A 10 km straight-line radius from a workplace in central Madrid approximates a 30-minute Metro commute for most central-to-suburb routes.',
        recommendedRadius: '10 km for inner Metro commuting',
      },
      {
        title: 'Hot-summer ground-transport service planning',
        description:
          'Madrid\'s summer heat (often 35–40°C) makes pedestrian outdoor service unattractive past about 0.5–1 km in midday hours. Restaurant and hotel operators plan summer delivery and shuttle radii smaller than they would in cooler months.',
        recommendedRadius: '0.5–1 km (summer pedestrian), 3–5 km (year-round)',
      },
      {
        title: 'AVE commuter belt analysis',
        description:
          'Madrid\'s AVE high-speed rail commuter belt extends well beyond the 50 km circle — to Segovia (28 minutes), Toledo (33 minutes), Guadalajara (25 minutes). Real-estate analysis of Madrid commuter towns should treat AVE-served cities as effectively inside the 25 km drive-time isochrone, even if they are 70+ km away.',
        recommendedRadius: '50 km (driving), much further with AVE',
      },
    ],
    quirks: [
      {
        title: 'Madrid is built on rings',
        description:
          'Few cities are as cleanly ringed as Madrid: M-30 (7 km), M-40 (14 km), M-45 (19 km), M-50 (25 km). Each ring marks a real shift in urban character — central, inner-suburb, outer-suburb, ex-urban. Most service-area and trade-area work in Madrid uses the rings as natural radii.',
      },
      {
        title: 'The radius is uniform — Madrid has no major water or hills',
        description:
          'Madrid sits on the Castilian plateau with no significant water bodies and only the distant Sierra de Guadarrama to the northwest. Unlike Berlin, London, or NYC, a Madrid radius drawn from the centre reaches similar character in every direction — a useful property for symmetric trade-area work.',
      },
      {
        title: 'AVE rail collapses distance for commuter analysis',
        description:
          'Spain\'s high-speed rail network from Madrid is dense — Segovia is 28 minutes, Toledo 33 minutes, Guadalajara 25 minutes. Some cities 80 km away are reachable faster than driving 25 km. Radius analysis of the Madrid commuter belt should account for AVE wherever the destination is on the network.',
      },
    ],
    faqs: [
      {
        question: 'How big is a 10 km radius in Madrid?',
        answer:
          'A 10 km radius from Puerta del Sol roughly matches the M-40 motorway ring, capturing all of the City of Madrid plus the inner suburbs (Pozuelo, Alcobendas\' inner edge, Getafe, Leganés). Madrid-Barajas Airport, at 13 km, is just outside.',
      },
      {
        question: 'What is the M-30, M-40, M-45, and M-50 in Madrid?',
        answer:
          'Four orbital motorways encircling Madrid. The M-30 sits at about 7 km from the centre and marks the boundary of central Madrid. The M-40 (14 km) marks the city limits in most directions. The M-45 (19 km) catches inner-outer suburbs. The M-50 (25 km) defines the outer metropolitan ring. Each is a useful informal radius.',
      },
      {
        question: 'Does a 25 km radius cover Madrid-Barajas Airport?',
        answer:
          'Yes, comfortably. Barajas is about 13 km northeast of Puerta del Sol, well inside a 25 km radius. A 15 km radius also captures it.',
      },
      {
        question: 'What\'s within 5 km of central Madrid?',
        answer:
          'A 5 km radius covers all of central Madrid inside the M-30 — Salamanca, Chamberí, Retiro, Chamartín (Bernabéu), Atocha, plus the historical centre. Most of the city\'s tourist and business areas fit inside this circle.',
      },
      {
        question: 'How does Madrid compare to Paris on a radius map?',
        answer:
          'Madrid is geographically larger and less dense than Paris. The City of Paris fits inside a 5 km radius; the City of Madrid requires a 10 km radius to cover. Both have well-defined inner-ring boundaries (Périphérique for Paris, M-30 for Madrid) at similar distances from their centres.',
      },
      {
        question: 'Why does Madrid have such even rings on a radius map?',
        answer:
          'Because Madrid sits on a flat Castilian plateau with no major rivers, harbours, or hills constraining its growth. The city has expanded outward in concentric circles for centuries, and the four orbital motorways were built to formalise that pattern. The result is one of the most radially symmetric major cities in Europe.',
      },
    ],
    lastUpdated: '2026-05-04',
  },
  {
    slug: 'rome',
    name: 'Rome',
    country: 'Italy',
    countryCode: 'IT',
    region: 'Europe',
    lat: 41.9028,
    lng: 12.4964,
    defaultRadius: 10,
    defaultUnit: 'kilometers',
    population: 2_800_000,
    populationLabel: '2.8 million',
    timezone: 'Europe/Rome',
    fact: 'Rome is encircled by the Grande Raccordo Anulare (GRA), an orbital motorway that sits about 11 km from the centre. A 10 km radius from the historical core lands just inside the GRA on most sides — a clean proxy for "inside the ring".',
    intro:
      'A 10 km radius from central Rome roughly matches the Grande Raccordo Anulare (GRA) — the ring road that marks the practical boundary between the city and its outer suburbs. Inside the GRA is dense Rome (1.3 million people, the historical centre, the major basilicas); outside is the comune\'s outer half (mostly suburban). For trade-area, accommodation, and event planning where guests are spread across the metropolitan area, the GRA is the natural reference.',
    alternateNames: ['Roma', 'The Eternal City', 'Caput Mundi'],
    centralLandmark: 'the Pantheon',
    coverage: [
      {
        radius: 1,
        unit: 'kilometers',
        label: '1 km',
        description:
          'A 1 km radius from the Pantheon covers the historical core of Rome — the Trevi Fountain, Piazza Navona, Campo de\' Fiori, Piazza Venezia, and the western half of the Roman Forum.',
        includes: [
          'Pantheon and Piazza della Rotonda',
          'Trevi Fountain',
          'Piazza Navona',
          'Campo de\' Fiori',
          'Piazza Venezia and the Vittoriano',
          'Roman Forum (west half)',
        ],
        excludes: [
          'Vatican City (~1.3 km west)',
          'Colosseum (~1.4 km southeast)',
          'Termini Station (~1.7 km east)',
          'Trastevere (most of)',
        ],
      },
      {
        radius: 5,
        unit: 'kilometers',
        label: '5 km',
        description:
          'A 5 km radius covers the entire centro storico, Vatican City, the Colosseum, Termini Station, Trastevere, the Borghese Gardens, EUR\'s northern edge, and the Aurelian Walls (mostly).',
        includes: [
          'Vatican City and St. Peter\'s Basilica',
          'Colosseum and Roman Forum',
          'Termini Station',
          'Trastevere',
          'Borghese Gardens',
          'Most of the Aurelian Walls',
        ],
        excludes: [
          'EUR (south, just outside)',
          'Olympic Stadium (just outside northern edge)',
          'Fiumicino Airport (~25 km southwest)',
          'Castel Gandolfo (~24 km southeast)',
        ],
      },
      {
        radius: 10,
        unit: 'kilometers',
        label: '10 km',
        description:
          'A 10 km radius from the centre approaches the Grande Raccordo Anulare (GRA) on most sides. Includes EUR, the Olympic Stadium, Tivoli\'s western approach, Centocelle, and most of the dense inner suburbs.',
        includes: [
          'EUR (Esposizione Universale Roma)',
          'Olympic Stadium and Foro Italico',
          'Tor Vergata\'s western edge',
          'Centocelle',
          'Most of the dense inner Rome suburbs',
          'GRA in the south and southwest',
        ],
        excludes: [
          'Fiumicino Airport (~25 km)',
          'Ciampino Airport (~14 km southeast)',
          'Castel Gandolfo',
          'Tivoli town',
        ],
      },
      {
        radius: 25,
        unit: 'kilometers',
        label: '25 km',
        description:
          'A 25 km radius reaches Fiumicino Airport (just inside), Ciampino, Tivoli, Castel Gandolfo, the Castelli Romani towns of Frascati and Albano, and most of the Comune di Roma\'s outer area plus the inner Lazio suburbs.',
        includes: [
          'Fiumicino Airport (just inside)',
          'Ciampino Airport',
          'Tivoli and Villa d\'Este',
          'Castelli Romani (Frascati, Castel Gandolfo, Albano)',
          'Lake Albano and the Alban Hills',
          'Most of the comune of Rome',
        ],
        excludes: [
          'Anzio (~50 km south)',
          'Civitavecchia (~70 km northwest)',
          'Viterbo (~80 km north)',
          'Naples (~225 km south)',
        ],
      },
      {
        radius: 50,
        unit: 'kilometers',
        label: '50 km',
        description:
          'A 50 km radius from central Rome reaches the Tyrrhenian coast at Anzio (just inside), the foothills of the Apennines, Civitavecchia\'s southern edge, Viterbo\'s southern approach, and the Sabine Hills.',
        includes: [
          'Anzio and Nettuno',
          'Civitavecchia\'s southern approach',
          'Viterbo\'s southern edge',
          'The Sabine Hills',
          'Lake Bracciano',
          'Most of the dense Lazio commuter belt',
        ],
        excludes: [
          'Naples (~225 km)',
          'Florence (~280 km)',
          'Pescara (~210 km)',
          'Perugia (~170 km)',
        ],
      },
    ],
    useCases: [
      {
        title: 'GRA-aligned delivery and service',
        description:
          'Roman businesses commonly tier their service area inside vs outside the GRA. Inside the GRA (10 km radius) is "Rome proper" — dense, connected by Metro and bus. Outside is suburban and rural Lazio, with a different rate card and longer SLAs.',
        recommendedRadius: '10 km (inside GRA), 25 km (Castelli + airports)',
      },
      {
        title: 'Tourist itinerary radius',
        description:
          'Most major Roman tourist sites — the Vatican, Colosseum, Pantheon, Piazza Navona, Trevi, Borghese — fit inside a 3 km radius. Wider 5 km radii capture Trastevere and the Aurelian Walls. For day trips, a 25 km radius captures the Castelli Romani and the airports.',
        recommendedRadius: '3 km (centro storico), 25 km (day-trip Castelli)',
      },
      {
        title: 'Wedding venue selection',
        description:
          'Rome weddings often want the ceremony inside a 1 km radius (walking access from central hotels) but the reception in the Castelli Romani — typically a 25 km radius. The Castelli (Frascati, Albano, Castel Gandolfo) are the dominant Roman wedding-venue cluster.',
        recommendedRadius: '1 km (ceremony), 25 km (Castelli reception)',
      },
      {
        title: 'Airport-inclusive service planning',
        description:
          'Fiumicino Airport sits just inside a 25 km radius from central Rome; Ciampino at about 14 km. A 25 km radius captures both, plus the dense Lazio commuter belt — a clean radius for hotel and ground-transport service zones.',
        recommendedRadius: '25 km for both airports + Castelli',
      },
    ],
    quirks: [
      {
        title: 'The GRA is the practical city limit',
        description:
          'The Grande Raccordo Anulare (GRA) is a 68 km orbital motorway encircling Rome at roughly 10–11 km from the centre. Inside the GRA is dense urban Rome; outside is suburban or rural Lazio. The GRA is so iconic it has been the subject of an award-winning documentary (Sacro GRA, Golden Lion 2013).',
      },
      {
        title: 'Seven hills, but no major water inside the radius',
        description:
          'Rome\'s seven hills add elevation variation but no water-cutout problem inside the GRA — the Tiber is narrow and crossed by many bridges. Unlike NYC or London, a Roman radius is mostly land, simplifying trade-area math.',
      },
      {
        title: 'Two airports, two tariff zones',
        description:
          'Fiumicino (international) is 25 km southwest; Ciampino (low-cost European) is 14 km southeast. A 25 km radius from central Rome captures both. A 15 km radius captures only Ciampino — useful for ground-transport tariff design.',
      },
    ],
    faqs: [
      {
        question: 'How big is a 10 km radius in Rome?',
        answer:
          'A 10 km radius from the Pantheon roughly matches the Grande Raccordo Anulare (GRA) — the orbital motorway that marks Rome\'s practical city boundary. Inside is dense urban Rome (the centro storico, EUR, the major basilicas); outside is suburban or rural Lazio.',
      },
      {
        question: 'What\'s the GRA in Rome?',
        answer:
          'The Grande Raccordo Anulare is a 68 km orbital motorway encircling Rome at roughly 10–11 km from the centre. It is the practical boundary between dense Rome and the outer suburbs, and is the most common informal "inside the ring" reference for Roman service-area planning.',
      },
      {
        question: 'Does a 25 km radius cover Fiumicino Airport?',
        answer:
          'Just barely. Fiumicino sits about 25 km southwest of the centro storico — inside a 25 km radius but outside a 20 km one. Ciampino, at 14 km southeast, is comfortably inside any radius from 15 km up.',
      },
      {
        question: 'What\'s within 5 km of central Rome?',
        answer:
          'A 5 km radius from the Pantheon covers the entire centro storico, Vatican City, the Colosseum, Termini Station, Trastevere, and the Borghese Gardens — most of tourist Rome plus its main rail station.',
      },
      {
        question: 'How does Rome compare to Paris on a radius map?',
        answer:
          'Rome\'s historical centre fits inside a 5 km radius (similar to all of Paris intramuros), but Rome\'s outer city extends much further — the GRA at 10 km marks the practical city edge, while Paris\'s Périphérique is at 5 km. Roman radii tend to need 2× the kilometres of Parisian ones to capture comparable urban scope.',
      },
      {
        question: 'How do I plan a Roman wedding with a venue in the Castelli?',
        answer:
          'Most Castelli Romani towns (Frascati, Albano, Castel Gandolfo) sit between 18 and 25 km southeast of central Rome — inside a 25 km radius. For guests staying in the centro storico, a 25 km radius from the hotel concentration covers the entire Castelli wedding-venue cluster.',
      },
    ],
    lastUpdated: '2026-05-04',
  },
  {
    slug: 'tokyo',
    name: 'Tokyo',
    country: 'Japan',
    countryCode: 'JP',
    region: 'Asia',
    lat: 35.6762,
    lng: 139.6503,
    defaultRadius: 10,
    defaultUnit: 'kilometers',
    population: 13_900_000,
    populationLabel: '13.9 million / 37 million metro',
    timezone: 'Asia/Tokyo',
    fact: 'The Yamanote Line forms a 34.5 km loop around central Tokyo and serves 30 stations — one of the densest and most-used rail loops on Earth. A 5 km radius from Shinjuku covers most of the Yamanote interior.',
    intro:
      'Tokyo is the most populous metropolitan area on Earth, with about 37 million people in Greater Tokyo. The Yamanote Line — a 34.5 km loop around central Tokyo — is the city\'s informal radius marker. A 5 km radius from Shinjuku Station covers most of the Yamanote interior; a 10 km radius extends well past it into Setagaya, Ota, and Sumida wards. For commute and travel-time analysis, the train network rules — distance is a poor proxy for journey time without rail-aware tools.',
    alternateNames: ['Tōkyō', '東京', 'Edo (historical)'],
    centralLandmark: 'Shinjuku Station',
    coverage: [
      {
        radius: 1,
        unit: 'kilometers',
        label: '1 km',
        description:
          'A 1 km radius from Shinjuku Station covers most of central Shinjuku ward — Kabukicho, Shinjuku Gyoen\'s western edge, the skyscraper district (Nishi-Shinjuku), and most of Shinjuku\'s entertainment, retail, and office concentrations.',
        includes: [
          'Kabukicho',
          'Nishi-Shinjuku skyscraper district',
          'Shinjuku Gyoen (west edge)',
          'Tokyo Metropolitan Government Building',
          'Most of central Shinjuku ward',
          'Shinjuku Station (the busiest rail station on Earth)',
        ],
        excludes: [
          'Shibuya (~3 km south)',
          'Harajuku (~2.5 km southeast)',
          'Tokyo Station (~6 km east)',
          'Imperial Palace',
        ],
      },
      {
        radius: 5,
        unit: 'kilometers',
        label: '5 km',
        description:
          'A 5 km radius from Shinjuku covers most of the Yamanote interior — Shibuya, Harajuku, Roppongi, Akasaka, the Imperial Palace, Akihabara, and the western edge of Tokyo Station\'s neighbourhood. Encompasses much of central Tokyo\'s political, commercial, and entertainment cores.',
        includes: [
          'Shibuya and Harajuku',
          'Roppongi and Akasaka',
          'Imperial Palace and Marunouchi',
          'Akihabara',
          'Most of the Yamanote interior',
          'Tokyo Tower',
        ],
        excludes: [
          'Tokyo Skytree (~7 km east)',
          'Haneda Airport (~14 km south)',
          'Disneyland Tokyo (~18 km east)',
          'Setagaya residential west (mostly outside)',
        ],
      },
      {
        radius: 10,
        unit: 'kilometers',
        label: '10 km',
        description:
          'A 10 km radius from Shinjuku extends well past the Yamanote Line into Setagaya, Ota, Sumida, Edogawa\'s western edge, and Suginami. Tokyo Skytree is inside; Haneda Airport sits just outside the southern edge.',
        includes: [
          'All Yamanote-bounded central Tokyo',
          'Setagaya, Suginami, Nakano',
          'Tokyo Skytree and Asakusa',
          'Ota ward (most of)',
          'Sumida and Koto wards',
          'Most of the 23 special wards',
        ],
        excludes: [
          'Haneda Airport (~14 km, just outside)',
          'Disneyland Tokyo (~18 km east)',
          'Yokohama (~28 km south)',
          'Narita Airport (~60 km east)',
        ],
      },
      {
        radius: 25,
        unit: 'kilometers',
        label: '25 km',
        description:
          'A 25 km radius from Shinjuku covers all 23 special wards of Tokyo plus inner Yokohama, Kawasaki, most of western Tokyo (Tama region inner edge), Saitama\'s southern edge, and Chiba\'s western edge including Disneyland.',
        includes: [
          'All 23 special wards of Tokyo',
          'Haneda Airport',
          'Disneyland Tokyo and Maihama',
          'Inner Yokohama and Kawasaki',
          'Saitama\'s southern cities (Kawaguchi, Toda)',
          'Funabashi and Chiba\'s western edge',
        ],
        excludes: [
          'Narita Airport (~60 km)',
          'Mt Fuji (~100 km southwest)',
          'Hakone (~80 km)',
          'Tsukuba (~70 km northeast)',
        ],
      },
      {
        radius: 50,
        unit: 'kilometers',
        label: '50 km',
        description:
          'A 50 km radius reaches deep into the Tokyo metropolitan area — most of Saitama, Chiba (excluding the eastern peninsula), Kanagawa to the southern edge of Yokohama, and parts of Tama and Tochigi. Captures most of the 37 million-person Greater Tokyo region except Narita Airport and the outer reaches.',
        includes: [
          'Most of Greater Tokyo (about 30 million people)',
          'All Yokohama, Kawasaki, Yokosuka',
          'Most of Saitama prefecture',
          'Most of Chiba prefecture (west of Narita)',
          'Western Tama (Hachioji area)',
        ],
        excludes: [
          'Narita Airport (~60 km)',
          'Mt Fuji and the Five Lakes',
          'Hakone',
          'Tsukuba',
        ],
      },
    ],
    useCases: [
      {
        title: 'Yamanote-aligned commute filter',
        description:
          'A 5 km radius from any major Tokyo workplace approximates a 30-minute Yamanote-line commute, because the Yamanote interior is uniformly served by dense JR and Metro networks. Outside the Yamanote, train commutes branch onto private lines and journey time depends sharply on which line, not just distance.',
        recommendedRadius: '5 km for Yamanote-aligned commute',
      },
      {
        title: 'Konbini and depachika catchment',
        description:
          'Tokyo\'s convenience stores (konbini) and department-store food halls (depachika) draw from extremely tight catchments — typically 200–500 m. A 1 km radius captures most overlapping foot traffic; competition is fierce inside this circle.',
        recommendedRadius: '0.2–0.5 km for ultra-local retail',
      },
      {
        title: 'Disney and Skytree day-trip planning',
        description:
          'Tokyo Skytree (~7 km from Shinjuku) and Tokyo Disneyland (~18 km east in Chiba) sit inside a 25 km radius from central Tokyo. Hotel and tour operators use a 25 km radius to define "Tokyo-area attraction reach" for one-day itineraries.',
        recommendedRadius: '25 km for Tokyo attraction-area itineraries',
      },
      {
        title: 'Greater Tokyo enterprise market sizing',
        description:
          'A 50 km radius captures roughly 30 million people — most of Greater Tokyo. This is the natural radius for enterprise-software TAM, retail chain expansion plans, and B2B addressable-market estimates in the Kanto region.',
        recommendedRadius: '50 km for Greater Tokyo enterprise',
      },
    ],
    quirks: [
      {
        title: 'The Yamanote Line is a literal radius',
        description:
          'The Yamanote Line is a 34.5 km circular train route around central Tokyo, with 30 stations spaced about 1 km apart. It is one of the densest and busiest rail loops on Earth, and Tokyoites use it as the city\'s informal centre marker — "inside the Yamanote" means central Tokyo.',
      },
      {
        title: 'Distance is a poor proxy for journey time',
        description:
          'Tokyo has the world\'s most efficient urban rail. A 10 km journey on the Yamanote Line takes about 18 minutes; the same 10 km between two private lines that don\'t connect can take 60 minutes with two transfers. For Tokyo work, rail-aware journey planners beat radius maps after the first 2–3 km.',
      },
      {
        title: 'Bay water bites only on the south and east',
        description:
          'Tokyo Bay sits to the south and east of the city. A radius drawn from Shinjuku reaches mostly land in three directions (north, west, central), with only the southern and eastern arcs cut by water. This makes Tokyo radii feel "fuller" than NYC or San Francisco radii of the same size.',
      },
    ],
    faqs: [
      {
        question: 'How big is a 5 km radius in Tokyo?',
        answer:
          'A 5 km radius from Shinjuku Station covers most of the Yamanote Line interior — Shibuya, Harajuku, Roppongi, Akasaka, the Imperial Palace, Akihabara, and Tokyo Tower. It captures the political, commercial, and entertainment cores of central Tokyo.',
      },
      {
        question: 'What\'s within 10 km of Tokyo?',
        answer:
          'A 10 km radius from Shinjuku extends well past the Yamanote Line into Setagaya, Suginami, Sumida, Koto, and most of the 23 special wards. Tokyo Skytree is inside; Haneda Airport is about 14 km south, just outside.',
      },
      {
        question: 'What is the Yamanote Line and how does it relate to a Tokyo radius?',
        answer:
          'The Yamanote is a 34.5 km circular train route around central Tokyo with 30 stations. It traces what Tokyoites consider "central Tokyo" and serves as the city\'s informal radius marker — about 5 km in radius from any of its central stations like Shinjuku or Shibuya.',
      },
      {
        question: 'Does a 25 km radius cover Tokyo Disneyland?',
        answer:
          'Yes. Tokyo Disneyland sits in Maihama (Chiba prefecture) about 18 km east of Shinjuku, comfortably inside a 25 km radius. Haneda Airport (14 km south) and the inner edges of Yokohama and Kawasaki are also inside.',
      },
      {
        question: 'How much of Greater Tokyo fits inside a 50 km radius?',
        answer:
          'About 30 million people — roughly 80% of Greater Tokyo\'s 37 million-person metropolitan population. The 50 km radius covers all 23 special wards plus most of Yokohama, Kawasaki, Saitama, and west-Chiba. Narita Airport (60 km east) and Mt Fuji (100 km southwest) are outside.',
      },
      {
        question: 'Why is distance a poor proxy for travel time in Tokyo?',
        answer:
          'Because Tokyo\'s rail network is so dense and fast that direct lines collapse distance, while indirect routes balloon it. A 10 km journey on the Yamanote takes about 18 minutes, but a 10 km journey across two unconnected private lines can take an hour with transfers. Always pair radius with a rail-aware journey planner for Tokyo.',
      },
    ],
    lastUpdated: '2026-05-04',
  },
  {
    slug: 'sydney',
    name: 'Sydney',
    country: 'Australia',
    countryCode: 'AU',
    region: 'Oceania',
    lat: -33.8688,
    lng: 151.2093,
    defaultRadius: 15,
    defaultUnit: 'kilometers',
    population: 5_400_000,
    populationLabel: '5.4 million',
    timezone: 'Australia/Sydney',
    fact: 'Sydney spans more than 70 km from the Pacific coast to the Blue Mountains foothills and covers over 12,000 km². A 15 km radius from the CBD covers the inner suburbs but stops well short of Parramatta — the metro\'s second CBD — at 23 km.',
    intro:
      'Sydney sprawls — the metropolitan area extends over 12,000 km², and a 15 km radius from the CBD covers the inner suburbs out to Bondi, Burwood, and Manly. Parramatta, the metro\'s second CBD, sits at 23 km. The city is shaped by water on three sides (the harbour, the Pacific, the Parramatta River) and the Blue Mountains to the west, so radii are heavily constrained by geography. Use the Drive Time Map for honest commute planning across this geography.',
    alternateNames: ['Greater Sydney', 'Eora Country (Aboriginal name)'],
    centralLandmark: 'Sydney Town Hall',
    coverage: [
      {
        radius: 1,
        unit: 'kilometers',
        label: '1 km',
        description:
          'A 1 km radius from the Town Hall covers Sydney CBD — the historic core, Circular Quay\'s southern edge, Hyde Park, the QVB, Town Hall Station, and the eastern half of Darling Harbour.',
        includes: [
          'Sydney CBD',
          'Town Hall Station and the QVB',
          'Hyde Park',
          'Circular Quay (south edge)',
          'Darling Harbour (east half)',
          'Pitt Street Mall',
        ],
        excludes: [
          'The Rocks',
          'Sydney Opera House (~1.5 km north)',
          'Sydney Harbour Bridge',
          'Surry Hills (most of)',
        ],
      },
      {
        radius: 5,
        unit: 'kilometers',
        label: '5 km',
        description:
          'A 5 km radius from Town Hall covers the entire CBD, the inner east (Surry Hills, Paddington, Woollahra), inner west (Glebe, Newtown), and Lower North Shore (North Sydney, Kirribilli). Captures most of Sydney\'s walkable, transit-rich inner ring.',
        includes: [
          'CBD entire and the harbour foreshore',
          'Surry Hills, Paddington, Woollahra',
          'Glebe and Newtown',
          'North Sydney and Kirribilli',
          'Centennial Park',
          'Bondi Junction (just inside)',
        ],
        excludes: [
          'Bondi Beach (~7 km east)',
          'Manly (across the harbour, ~10 km north)',
          'Parramatta (~23 km west)',
          'Sydney Airport (~9 km south)',
        ],
      },
      {
        radius: 10,
        unit: 'kilometers',
        label: '10 km',
        description:
          'A 10 km radius from the Town Hall covers most of inner and middle Sydney — Bondi, Coogee, Maroubra (just inside), Mascot, Sydney Airport, Marrickville, Burwood (just inside), and Manly across the harbour.',
        includes: [
          'Bondi, Coogee, and most beach suburbs',
          'Sydney Airport',
          'Marrickville, Newtown, Glebe',
          'Manly and Mosman (Lower North Shore)',
          'Burwood (just inside)',
          'Centennial Park',
        ],
        excludes: [
          'Parramatta (~23 km)',
          'Cronulla (~18 km south)',
          'Hornsby (~22 km north)',
          'Penrith (~50 km west)',
        ],
      },
      {
        radius: 25,
        unit: 'kilometers',
        label: '25 km',
        description:
          'A 25 km radius covers most of Sydney\'s urban basin — Parramatta (just inside), Hornsby, Cronulla, Manly, the Northern Beaches inner edge, and most of the Inner West. Penrith and the Blue Mountains are still outside.',
        includes: [
          'Parramatta (the metro\'s second CBD)',
          'Hornsby (just inside northern edge)',
          'Cronulla',
          'The Northern Beaches inner edge (Dee Why, Curl Curl)',
          'Most of the Inner West',
          'Bankstown',
        ],
        excludes: [
          'Penrith (~50 km west)',
          'Wollongong (~70 km south)',
          'Newcastle (~120 km north)',
          'The Blue Mountains main range (~70+ km)',
        ],
      },
      {
        radius: 50,
        unit: 'kilometers',
        label: '50 km',
        description:
          'A 50 km radius from Sydney CBD reaches Penrith\'s eastern edge, the lower Blue Mountains foothills, the Royal National Park, the Central Coast\'s southern edge (Gosford), and parts of the Sutherland Shire and Hawkesbury.',
        includes: [
          'All Greater Sydney except the Blue Mountains main range',
          'Penrith\'s eastern edge',
          'The Royal National Park',
          'Gosford (just inside northern edge)',
          'Liverpool and Campbelltown',
          'Most of the Hawkesbury',
        ],
        excludes: [
          'Blue Mountains main range (~70 km)',
          'Wollongong (~70 km)',
          'Newcastle (~120 km)',
          'Central Coast main strip (Avoca, Terrigal)',
        ],
      },
    ],
    useCases: [
      {
        title: 'Inner-ring rental and lifestyle search',
        description:
          'Sydney renters who want walkable, transit-rich, café-lined neighbourhoods typically target the 10 km radius from the CBD — Bondi, Surry Hills, Newtown, Manly, North Sydney. Beyond, neighbourhoods become more car-dependent.',
        recommendedRadius: '10 km for inner-ring lifestyle filter',
      },
      {
        title: 'Beach catchment',
        description:
          'Eastern beach suburbs (Bondi, Coogee, Bronte, Tamarama) sit within 7–10 km of the CBD. The Northern Beaches require the harbour crossing and stretch from 10 km (Manly) to 30 km (Palm Beach). Tourism and real-estate catchment work uses these distances as a quick filter.',
        recommendedRadius: '10 km (eastern beaches), 30 km (Northern Beaches)',
      },
      {
        title: 'Two-CBD market analysis',
        description:
          'Sydney has a polycentric economy: the CBD and Parramatta. Real-estate and retail planning often uses dual radii — 10 km from each CBD — to capture distinct catchments. Some western Sydney residents work in Parramatta and never go to the city CBD.',
        recommendedRadius: '10 km each CBD (overlap acknowledged)',
      },
      {
        title: 'Northern Beaches access planning',
        description:
          'The Northern Beaches sit across the harbour and are accessible via a few key crossings (Spit Bridge, Roseville Bridge, Sydney Harbour Bridge). A straight-line radius of 15 km reaches Manly but hides the fact that the actual journey can be 40 minutes via Spit Bridge.',
        recommendedRadius: '15 km straight-line, but always validate with drive-time',
      },
    ],
    quirks: [
      {
        title: 'Water on three sides',
        description:
          'Sydney Harbour cuts the city in two from north to south; the Pacific Ocean closes the eastern edge; the Parramatta River cuts west. Any radius drawn from the CBD loses 30–40% to water, particularly on the east and north arcs.',
      },
      {
        title: 'The Blue Mountains cap western reach',
        description:
          'About 50–70 km west of the CBD, the Blue Mountains rise abruptly. The escarpment is a natural city boundary — beyond it the metropolitan area thins out rapidly. A 50 km radius reaches the foothills but not the main mountain towns.',
      },
      {
        title: 'Parramatta is far enough to be its own market',
        description:
          'Parramatta sits 23 km west of the CBD — outside a 20 km radius. Western Sydney residents often work, shop, and socialise in Parramatta and rarely go to the harbour CBD. Treating Sydney as a single radius market underestimates the western half.',
      },
    ],
    faqs: [
      {
        question: 'How big is a 10 km radius in Sydney?',
        answer:
          'A 10 km radius from Sydney Town Hall covers the CBD, Bondi, Coogee, Surry Hills, Newtown, Marrickville, Mosman, Manly (across the harbour), and Sydney Airport. Parramatta, Cronulla, and the Northern Beaches main strip are outside.',
      },
      {
        question: 'What\'s within 25 km of Sydney CBD?',
        answer:
          'A 25 km radius covers Parramatta (just inside), Hornsby, Cronulla, Manly and the inner Northern Beaches, most of the Inner West and Bankstown, and Sydney\'s middle-ring suburbs. Penrith, Wollongong, and the Blue Mountains main range are outside.',
      },
      {
        question: 'How far is Parramatta from the Sydney CBD?',
        answer:
          'About 23 km west — outside a 20 km radius but inside 25 km. Parramatta is Sydney\'s second CBD and a substantial market on its own; many western Sydney residents work and shop there without commuting to the harbour CBD.',
      },
      {
        question: 'Why does Sydney have such a constrained radius footprint?',
        answer:
          'Three reasons. First, the harbour cuts the city in two and limits north-south distance with few crossings. Second, the Pacific Ocean caps eastern reach. Third, the Blue Mountains escarpment 50–70 km west creates a hard boundary. Sydney radii lose more area to water and terrain than most major cities.',
      },
      {
        question: 'How do I plan a Sydney commute filter with a radius?',
        answer:
          'A 15 km straight-line radius around your workplace is a reasonable first cut for "under-30-minute commute" — but always validate with the Drive Time Map. The Spit Bridge and Sydney Harbour Bridge are major time-of-day chokepoints that radius doesn\'t see.',
      },
      {
        question: 'Does a 50 km radius reach the Blue Mountains or Wollongong?',
        answer:
          'Neither, fully. A 50 km radius reaches the lower foothills of the Blue Mountains (around Penrith\'s western edge) but not Katoomba (~95 km) or the main mountain towns. Wollongong is 70 km south and outside. The Royal National Park and Gosford\'s southern edge sit just inside.',
      },
    ],
    lastUpdated: '2026-05-04',
  },
  {
    slug: 'toronto',
    name: 'Toronto',
    country: 'Canada',
    countryCode: 'CA',
    region: 'North America',
    lat: 43.6532,
    lng: -79.3832,
    defaultRadius: 15,
    defaultUnit: 'kilometers',
    population: 2_900_000,
    populationLabel: '2.9 million city / 6.4 million GTA',
    timezone: 'America/Toronto',
    fact: 'The Greater Toronto Area stretches roughly 100 km along Lake Ontario\'s north shore — Burlington in the west to Oshawa in the east. A 15 km radius from Yonge & Bloor reaches the inner GTA but stops short of Mississauga or Markham.',
    intro:
      'Toronto is the dense core of a long, linear metropolitan area along Lake Ontario\'s north shore. A 15 km radius from Yonge and Bloor reaches the inner GTA — Etobicoke, North York, Scarborough — but stops short of Mississauga (the second city of the GTA), Markham, or Brampton. For full GTA reach, use 25–35 km radii. Lake Ontario eats the entire southern arc of any Toronto radius.',
    alternateNames: ['T.O.', 'The 6ix', 'Hogtown (historical)'],
    centralLandmark: 'Yonge & Bloor',
    coverage: [
      {
        radius: 1,
        unit: 'kilometers',
        label: '1 km',
        description:
          'A 1 km radius from Yonge and Bloor covers Yorkville, the Annex (east edge), the University of Toronto, Queen\'s Park, and the Bloor-Yonge corridor — much of midtown Toronto.',
        includes: [
          'Yorkville',
          'University of Toronto (most of St. George campus)',
          'Queen\'s Park',
          'The Annex (east half)',
          'Rosedale (south edge)',
          'Yonge-Dundas (just outside south)',
        ],
        excludes: [
          'CN Tower (~2.5 km south)',
          'Toronto Eaton Centre (just outside)',
          'Distillery District',
          'Kensington Market (just outside)',
        ],
      },
      {
        radius: 5,
        unit: 'kilometers',
        label: '5 km',
        description:
          'A 5 km radius covers all of downtown Toronto, the harbour, CN Tower, Distillery District, Kensington Market, Little Italy, Liberty Village, Cabbagetown, Rosedale, and parts of Forest Hill, Greektown, and the Annex.',
        includes: [
          'All downtown Toronto and the waterfront',
          'CN Tower and Rogers Centre',
          'Distillery District',
          'Kensington Market and Chinatown',
          'Liberty Village',
          'Greektown and Cabbagetown',
        ],
        excludes: [
          'Pearson Airport (~22 km west)',
          'High Park (mostly outside western edge)',
          'The Beaches (just outside east)',
          'Scarborough Bluffs',
        ],
      },
      {
        radius: 10,
        unit: 'kilometers',
        label: '10 km',
        description:
          'A 10 km radius covers most of the old City of Toronto pre-amalgamation — High Park, the Beaches, Leslieville, Junction, Forest Hill fully, Lawrence Park, and the inner edges of Etobicoke, North York, and East York.',
        includes: [
          'High Park and the Junction',
          'The Beaches and Leslieville',
          'Forest Hill and Lawrence Park',
          'Inner Etobicoke (Mimico, Long Branch)',
          'Inner North York (Yonge & Eglinton)',
          'East York',
        ],
        excludes: [
          'Pearson Airport (~22 km)',
          'Scarborough city centre',
          'Mississauga',
          'Vaughan',
        ],
      },
      {
        radius: 25,
        unit: 'kilometers',
        label: '25 km',
        description:
          'A 25 km radius covers most of the City of Toronto fully (post-amalgamation) plus Mississauga\'s eastern edge, Pearson Airport, Vaughan and Markham\'s southern edges, and Scarborough fully.',
        includes: [
          'All of the City of Toronto (post-amalgamation)',
          'Pearson Airport',
          'Mississauga (east half)',
          'Vaughan and Markham (south halves)',
          'Brampton (just inside southeast edge)',
          'Pickering (just inside)',
        ],
        excludes: [
          'Hamilton (~60 km west)',
          'Oshawa (~55 km east)',
          'Burlington (~50 km west)',
          'Niagara Falls (~115 km southwest)',
        ],
      },
      {
        radius: 50,
        unit: 'kilometers',
        label: '50 km',
        description:
          'A 50 km radius from Yonge & Bloor reaches Burlington (just inside), Oshawa (just inside east edge), Newmarket, the southern edge of the Greenbelt, and most of the GTA outside Hamilton and Niagara.',
        includes: [
          'Most of the Greater Toronto Area',
          'Burlington (just inside)',
          'Oshawa (just inside)',
          'Newmarket and Aurora',
          'Most of the southern Greenbelt',
          'Hamilton\'s eastern edge (just outside main city)',
        ],
        excludes: [
          'Hamilton city centre (~60 km west)',
          'Niagara Falls (~115 km)',
          'London, ON (~190 km)',
          'Kingston, ON (~260 km)',
        ],
      },
    ],
    useCases: [
      {
        title: 'Inner GTA condo search',
        description:
          'Toronto condo hunters often use a 10 km radius from Yonge and Bloor or another central node to filter for transit-rich, walkable inner-city units. Beyond 10 km, the GTA becomes more car-dependent and the condo market gives way to townhouses and detached homes.',
        recommendedRadius: '10 km for transit-rich inner Toronto',
      },
      {
        title: 'Pearson Airport service planning',
        description:
          'Pearson sits about 22 km west of Yonge and Bloor — outside a 20 km radius but inside 25 km. Hotel and ground-transport operators use a 25 km radius as the airport-inclusive zone for shuttles and tariff cards.',
        recommendedRadius: '25 km for Pearson-inclusive zones',
      },
      {
        title: 'GTA-wide retail trade area',
        description:
          'Big-box retail in Toronto routinely defines a 25–35 km primary trade area to capture the dense suburban GTA — Mississauga, Brampton, Vaughan, Markham, and Scarborough collectively house more than 4 million people. A 35 km radius covers most of them.',
        recommendedRadius: '25–35 km for full GTA retail catchment',
      },
      {
        title: 'Hamilton and Greenbelt commuter analysis',
        description:
          'Hamilton (60 km southwest) and Oshawa (55 km east) are GO Transit commuter towns but sit at or beyond the edge of a 50 km radius. Real-estate analysis of these towns should account for GO Train travel time (typically 60–80 minutes) rather than driving distance alone.',
        recommendedRadius: '50 km plus GO Train awareness',
      },
    ],
    quirks: [
      {
        title: 'Lake Ontario eats the southern arc',
        description:
          'Lake Ontario sits directly south of Toronto, so the southern half of any radius drawn from the CBD is over water. For population, retail, and service-area math, always use the land-area inside the circle — typically 50–60% of the raw circle.',
      },
      {
        title: 'The GTA is linear, not circular',
        description:
          'The Greater Toronto Area extends roughly 100 km east-west along Lake Ontario but only 30–40 km north before hitting the Greenbelt. A circular radius distorts this — a 50 km radius covers the western and eastern GTA fine but reaches well beyond the typical northern commuter limit.',
      },
      {
        title: 'Highway 401 is the GTA\'s spine',
        description:
          'Ontario Highway 401, running east-west across the top of Toronto, is the busiest highway in North America and the practical axis of the GTA. Service-area planning often uses "north of the 401" or "south of the 401" as a divider — a useful binary that radius alone doesn\'t capture.',
      },
    ],
    faqs: [
      {
        question: 'How big is a 15 km radius in Toronto?',
        answer:
          'A 15 km radius from Yonge and Bloor covers most of the City of Toronto post-amalgamation — Etobicoke, North York, East York, and Scarborough\'s western half — but stops short of Mississauga (~22 km), Markham (~18 km city centre), and Vaughan main.',
      },
      {
        question: 'What\'s within 25 km of Toronto?',
        answer:
          'A 25 km radius covers all of the City of Toronto plus Pearson Airport, the eastern half of Mississauga, the southern halves of Vaughan and Markham, Pickering, and most of Scarborough. Hamilton, Oshawa, and Niagara are well outside.',
      },
      {
        question: 'Does a 25 km radius cover Pearson International Airport?',
        answer:
          'Yes. Pearson sits about 22 km west of Yonge and Bloor — comfortably inside a 25 km radius but outside a 20 km one. A 25 km radius is the standard airport-inclusive zone for hotels and ground transport.',
      },
      {
        question: 'How does the GTA differ from the City of Toronto on a radius map?',
        answer:
          'The City of Toronto fits inside roughly a 15 km radius; the Greater Toronto Area extends to 50+ km in the east-west axis (Burlington to Oshawa is about 100 km). A 25 km radius captures the dense inner GTA; a 50 km radius captures most of the GTA except the Hamilton and Niagara extensions.',
      },
      {
        question: 'Why does a Toronto radius feel half the size of a Chicago radius?',
        answer:
          'Largely because Lake Ontario takes the entire southern half. Toronto and Chicago are both lakefront cities, but Toronto\'s downtown sits right on the lake while Chicago\'s Loop is set back slightly. A radius from each city loses roughly 50% to water on average, but Toronto\'s loss is more concentrated on one side.',
      },
      {
        question: 'How do I plan a GTA-wide retail catchment?',
        answer:
          'Use a 25–35 km radius from your store location, then use the Drive Time Map to validate the catchment given Highway 401 and 400-series traffic at peak hours. Mississauga, Brampton, Vaughan, Markham, and Scarborough collectively house most of the GTA\'s 6.4 million people; a 30 km radius from central Toronto reaches all five.',
      },
    ],
    lastUpdated: '2026-05-04',
  },
];

export const CITIES_BY_SLUG = CITIES.reduce<Record<string, City>>((acc, c) => {
  acc[c.slug] = c;
  return acc;
}, {});

export function getCityBySlug(slug: string): City | undefined {
  return CITIES_BY_SLUG[slug];
}

export function getNearbyCitiesByRegion(slug: string, limit = 4): City[] {
  const city = CITIES_BY_SLUG[slug];
  if (!city) return [];
  return CITIES.filter((c) => c.slug !== slug && c.region === city.region).slice(0, limit);
}
