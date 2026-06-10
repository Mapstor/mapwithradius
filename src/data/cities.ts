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
          'Newark (right at the 10-mile edge)',
          'LaGuardia Airport',
          'Most of Hudson County, NJ',
        ],
        excludes: [
          'Newark Liberty Airport (~11 mi southwest — just past the edge)',
          'Yonkers (~13 mi north)',
          'JFK Airport (~13 mi southeast)',
        ],
      },
      {
        radius: 25,
        unit: 'miles',
        label: '25 miles',
        description:
          'A 25-mile radius pulls in all five boroughs, JFK, central Long Island out to Hempstead and Mineola, Westchester (White Plains, Yonkers), and most of Northern New Jersey. Stamford, CT and Morristown, NJ sit just past the edge.',
        includes: [
          'All NYC airports (JFK, LaGuardia, Newark)',
          'Hempstead, Mineola, Levittown',
          'White Plains and Yonkers',
          'Most of Northern New Jersey including Paterson',
          'North Shore Long Island to Glen Cove',
        ],
        excludes: [
          'Stamford, CT (~31 mi northeast — past the edge)',
          'Morristown, NJ (~26 mi west — just past the edge)',
          'New Haven, CT (~75 mi northeast)',
          'The Hamptons (~85+ mi east)',
          'Princeton, NJ (~45 mi southwest)',
          'Poughkeepsie (~75 mi north)',
        ],
      },
      {
        radius: 50,
        unit: 'miles',
        label: '50 miles',
        description:
          'A 50-mile radius reaches all of Long Island except the East End, central New Jersey down to Princeton, most of Fairfield County up to the Bridgeport approaches, and the lower Hudson Valley to about Beacon. Bridgeport, Newburgh, Trenton, and Easton sit just past the edge.',
        includes: [
          'Most of Long Island west of Riverhead',
          'Princeton, NJ (~45 mi southwest)',
          'Most of Fairfield County, CT (Stamford, Norwalk, Westport)',
          'The lower Hudson Valley up to about Beacon',
        ],
        excludes: [
          'Bridgeport, CT (~51 mi northeast — just past the edge)',
          'Newburgh, NY (~52 mi north — just past the edge)',
          'Trenton, NJ (~55 mi southwest)',
          'Easton, PA (~65 mi west)',
          'The Hamptons (Southampton ~85 mi)',
          'New Haven, CT (~75 mi)',
          'Philadelphia (~95 mi)',
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
          'A 5-mile radius from Times Square covers nearly all of Manhattan from Battery Park to about 116th Street, plus the closest parts of Brooklyn (Williamsburg, DUMBO), Queens (Long Island City, Astoria), and across the Hudson to Hoboken and Jersey City. About a third of the area inside the circle is water.',
      },
      {
        question: 'What\'s within 10 miles of NYC?',
        answer:
          'A 10-mile radius from midtown captures all of Manhattan and the Bronx, most of Brooklyn and Queens, the north tip of Staten Island, and the inner New Jersey ring including Newark, Jersey City, and Bayonne. LaGuardia is inside; Newark Liberty Airport at ~11 miles and JFK at ~13 miles both fall just past the edge.',
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
    lastUpdated: '2026-06-10',
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
    lastUpdated: '2026-06-10',
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
          'United Center',
        ],
        excludes: [
          'Hyde Park (~6 mi south — just past the edge)',
          'Oak Park (~8 mi west)',
          'Midway Airport (~9 mi southwest)',
          'Evanston (~12 mi north)',
          'O\'Hare (~16 mi northwest)',
        ],
      },
      {
        radius: 10,
        unit: 'miles',
        label: '10 miles',
        description:
          'A 10-mile radius from the Loop reaches Oak Park, Cicero, Berwyn, the inner South Side communities through Chatham, and just covers Midway Airport. Evanston sits a couple of miles past the northern edge.',
        includes: [
          'Oak Park and Berwyn',
          'Cicero',
          'Midway Airport (~9 mi southwest)',
          'Chatham and Englewood',
          'Most of Chicago city limits except the far southwest',
        ],
        excludes: [
          'Evanston (~12 mi north — just past the edge)',
          'Skokie (~12 mi north)',
          'O\'Hare International (~16 mi northwest)',
          'Schaumburg (~26 mi northwest)',
          'Naperville and the western suburbs',
        ],
      },
      {
        radius: 25,
        unit: 'miles',
        label: '25 miles',
        description:
          'A 25-mile radius covers nearly all of Cook County and the inner collar counties — O\'Hare, Arlington Heights, Wheaton, Gary, Hammond, and the southern Lake County suburbs. Schaumburg and Naperville sit just past the western edge; Joliet and Aurora are well past it.',
        includes: [
          'O\'Hare International Airport',
          'Arlington Heights and Skokie',
          'Wheaton (~25 mi west — just inside)',
          'Most of DuPage County (eastern half)',
          'Northwest Indiana to Hammond and Gary',
        ],
        excludes: [
          'Schaumburg (~26 mi northwest — just past the edge)',
          'Naperville (~28 mi west — just past the edge)',
          'Joliet (~34 mi southwest)',
          'Waukegan (~35 mi north)',
          'Aurora (~36 mi west)',
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
          'Aurora, Naperville, and Joliet (all comfortably inside)',
          'Waukegan, Lake Forest, Highland Park',
          'Gary and Valparaiso, IN',
          'Kankakee\'s northern edge',
          'Wisconsin border at Kenosha (just inside)',
        ],
        excludes: [
          'Rockford (~80 mi west)',
          'Milwaukee (~81 mi north)',
          'Madison, WI (~140 mi north)',
          'Indianapolis (~165 mi south)',
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
    lastUpdated: '2026-06-10',
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
    lastUpdated: '2026-06-10',
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
          'Inner Tameside (Audenshaw, Denton)',
          'Sale',
        ],
        excludes: [
          'Manchester Airport (just outside southern edge)',
          'Bury (~13 km north — just past the edge)',
          'Altrincham (~13 km southwest — just past the edge)',
          'Rochdale (~16 km north)',
          'Bolton (~17 km northwest)',
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
        ],
        excludes: [
          'Wigan (~27 km west — just past the edge)',
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
          'Most of the Peak District',
          'Crewe and central Cheshire',
          'Halifax and Bradford\'s western edge',
        ],
        excludes: [
          'Sheffield (~52 km southeast — just past the edge)',
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
    lastUpdated: '2026-06-10',
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
        ],
        excludes: [
          'Orly Airport (~14 km south)',
          'Versailles (~18 km southwest)',
          'Charles de Gaulle Airport (~23 km northeast)',
          'Disneyland Paris (~31 km east)',
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
        ],
        excludes: [
          'Cergy-Pontoise (~29 km northwest — just past the edge)',
          'Disneyland Paris (~31 km east — just past the eastern edge)',
          'Fontainebleau (~56 km southeast)',
          'Beauvais (~67 km north)',
          'Chartres (~80 km southwest)',
          'Reims (~140 km east)',
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
          'Chantilly',
          'Provins\' western approach',
          'Most of the grande couronne',
        ],
        excludes: [
          'Fontainebleau (~56 km southeast — just past the edge)',
          'Beauvais (~67 km north)',
          'Chartres (~85 km southwest)',
          'Orléans (~115 km)',
          'Rouen (~135 km)',
          'Reims (~140 km)',
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
    lastUpdated: '2026-06-10',
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
          'Schöneberg (just inside the southern edge)',
        ],
        excludes: [
          'Tempelhof Field (~5 km south — just past the edge)',
          'Tegel airport site (~8 km northwest)',
          'Olympiastadion (~11 km west)',
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
          'Tegel airport site (~9 km northwest — just inside)',
        ],
        excludes: [
          'Olympiastadion (~11 km west — just past the edge)',
          'Spandau (~12 km west)',
          'Köpenick (~15 km southeast)',
          'BER Airport (~25 km southeast)',
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
          'Inner Brandenburg green belt',
        ],
        excludes: [
          'Potsdam (~27 km southwest — just past the edge)',
          'Oranienburg (~29 km north — just past the edge)',
          'Brandenburg an der Havel (~60 km west)',
          'Frankfurt (Oder) (~80 km east)',
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
        ],
        excludes: [
          'Brandenburg an der Havel (~60 km west)',
          'Frankfurt (Oder) (~80 km east)',
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
    lastUpdated: '2026-06-10',
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
        ],
        excludes: [
          'Atocha Station (~1.2 km south — just past the edge)',
          'Santiago Bernabéu Stadium',
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
          'M-40 motorway ring',
          'Casa de Campo fully',
        ],
        excludes: [
          'Getafe (~12 km south — just past the edge)',
          'Madrid-Barajas Airport (~13 km, just outside)',
          'Alcobendas (~15 km north)',
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
          'Alcobendas',
          'M-50 motorway',
        ],
        excludes: [
          'Alcalá de Henares (~30 km east — just past the edge)',
          'Aranjuez (~50 km south)',
          'Toledo (~70 km south)',
          'Segovia (~85 km north)',
          'Ávila (~95 km west)',
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
          'Alcalá de Henares',
          'Toledo\'s northern approach',
          'Most of the AVE high-speed-rail commuter range',
        ],
        excludes: [
          'Guadalajara (~51 km northeast — just past the edge)',
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
    lastUpdated: '2026-06-10',
  },
  {
    slug: 'rome',
    name: 'Rome',
    country: 'Italy',
    countryCode: 'IT',
    region: 'Europe',
    lat: 41.8986,
    lng: 12.4769,
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
          'Olympic Stadium and Foro Italico',
          'Most of the Aurelian Walls',
        ],
        excludes: [
          'EUR (south, just outside)',
          'Castel Gandolfo (~24 km southeast)',
          'Fiumicino Airport (~25 km southwest)',
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
          'Castelli Romani (Frascati, Castel Gandolfo, Albano)',
          'Lake Albano and the Alban Hills',
          'Most of the comune of Rome',
        ],
        excludes: [
          'Tivoli (~27 km east — just past the edge)',
          'Anzio (~52 km south)',
          'Civitavecchia (~61 km northwest)',
          'Viterbo (~66 km north)',
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
          'The Sabine Hills',
          'Lake Bracciano',
          'Most of the dense Lazio commuter belt',
          'Nettuno (just inside)',
        ],
        excludes: [
          'Anzio (~52 km south — just past the edge)',
          'Civitavecchia (~61 km northwest)',
          'Viterbo (~66 km north)',
          'Perugia (~170 km)',
          'Pescara (~210 km)',
          'Naples (~225 km)',
          'Florence (~280 km)',
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
    lastUpdated: '2026-06-10',
  },
  {
    slug: 'tokyo',
    name: 'Tokyo',
    country: 'Japan',
    countryCode: 'JP',
    region: 'Asia',
    lat: 35.6896,
    lng: 139.7006,
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
          'Tokyo Skytree (~10 km east)',
          'Haneda Airport (~17 km south)',
          'Disneyland Tokyo (~18 km east)',
          'Setagaya residential west (mostly outside)',
        ],
      },
      {
        radius: 10,
        unit: 'kilometers',
        label: '10 km',
        description:
          'A 10 km radius from Shinjuku extends well past the Yamanote Line into Setagaya, Ota, Sumida, Edogawa\'s western edge, and Suginami. Tokyo Skytree sits right at the eastern edge (~10 km); Haneda Airport is about 17 km south, well outside.',
        includes: [
          'All Yamanote-bounded central Tokyo',
          'Setagaya, Suginami, Nakano',
          'Tokyo Skytree and Asakusa',
          'Ota ward (most of)',
          'Sumida and Koto wards',
          'Most of the 23 special wards',
        ],
        excludes: [
          'Haneda Airport (~17 km south)',
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
          'Tokyo Skytree (~10 km from Shinjuku) and Tokyo Disneyland (~18 km east in Chiba) sit inside a 25 km radius from central Tokyo. Hotel and tour operators use a 25 km radius to define "Tokyo-area attraction reach" for one-day itineraries.',
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
          'A 10 km radius from Shinjuku extends well past the Yamanote Line into Setagaya, Suginami, Sumida, Koto, and most of the 23 special wards. Tokyo Skytree sits right at the eastern edge (~10 km); Haneda Airport is about 17 km south, well outside.',
      },
      {
        question: 'What is the Yamanote Line and how does it relate to a Tokyo radius?',
        answer:
          'The Yamanote is a 34.5 km circular train route around central Tokyo with 30 stations. It traces what Tokyoites consider "central Tokyo" and serves as the city\'s informal radius marker — about 5 km in radius from any of its central stations like Shinjuku or Shibuya.',
      },
      {
        question: 'Does a 25 km radius cover Tokyo Disneyland?',
        answer:
          'Yes. Tokyo Disneyland sits in Maihama (Chiba prefecture) about 18 km east of Shinjuku, comfortably inside a 25 km radius. Haneda Airport (~17 km south) and the inner edges of Yokohama and Kawasaki are also inside.',
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
    lastUpdated: '2026-06-10',
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
          'Mosman (Lower North Shore)',
          'Burwood (just inside)',
          'Centennial Park',
        ],
        excludes: [
          'Manly (~11 km north — just past the edge, across the harbour)',
          'Cronulla (~18 km south)',
          'Hornsby (~22 km north)',
          'Parramatta (~23 km west)',
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
    lastUpdated: '2026-06-10',
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
        ],
        excludes: [
          'Pickering (~32 km east — just past the edge)',
          'Brampton (~32 km northwest — just past the edge)',
          'Burlington (~50 km west)',
          'Oshawa (~55 km east)',
          'Hamilton (~60 km west)',
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
    lastUpdated: '2026-06-10',
  },
  {
    slug: 'san-francisco',
    name: 'San Francisco',
    country: 'United States',
    countryCode: 'US',
    region: 'North America',
    lat: 37.7879,
    lng: -122.4075,
    defaultRadius: 10,
    defaultUnit: 'miles',
    population: 808437,
    populationLabel: 'San Francisco city proper',
    timezone: 'America/Los_Angeles',
    fact: 'San Francisco proper fits inside a 7-mile radius — the city limits stop at the peninsula tip, and most of any radius drawn from Union Square falls into San Francisco Bay or the Pacific Ocean.',
    intro:
      'San Francisco sits at the northern tip of a narrow peninsula, with the Pacific Ocean to the west, San Francisco Bay to the east, and the Golden Gate to the north. That peninsular geometry means a radius drawn from Union Square loses most of its area to water, and practical land coverage is concentrated on a thin strip running south through Daly City and San Mateo County. Distances on this page are measured from Union Square (37.788° N, 122.407° W).',
    alternateNames: ['SF', 'San Fran', 'The City', 'Frisco', 'Fog City', 'The City by the Bay'],
    centralLandmark: 'Union Square',
    coverage: [
      {
        radius: 5,
        unit: 'miles',
        label: '5 miles',
        description:
          'A 5-mile radius from Union Square covers all of San Francisco proper end-to-end — Mission, Castro, Sunset, Richmond, North Beach, the Marina, and out to the Golden Gate Bridge. It just clears the southern city limit at Daly City.',
        includes: [
          'All major SF neighborhoods (Mission, SoMa, Castro, Haight)',
          'Golden Gate Park and the Sunset',
          'The Marina, North Beach, Fisherman\'s Wharf',
          'Twin Peaks and Bernal Heights',
          'The Golden Gate Bridge (south side)',
          'Daly City\'s northern edge',
        ],
        excludes: [
          'Oakland (~10 mi east across the Bay)',
          'Sausalito (~6 mi north, but separated by the Bay)',
          'San Mateo (~17 mi south)',
          'Berkeley (~13 mi northeast)',
          'San Francisco International Airport (~12 mi south)',
        ],
      },
      {
        radius: 10,
        unit: 'miles',
        label: '10 miles',
        description:
          'A 10-mile radius from Union Square reaches Oakland, Berkeley, Sausalito, the southern half of San Mateo County to roughly Millbrae, and Treasure Island. SFO sits just outside at ~12 miles.',
        includes: [
          'All of San Francisco',
          'Oakland and downtown Berkeley',
          'Sausalito and Tiburon',
          'San Mateo County north of San Bruno',
          'Treasure Island and Yerba Buena',
          'Daly City, Brisbane, South San Francisco',
        ],
        excludes: [
          'San Francisco International Airport (~12 mi)',
          'Walnut Creek (~20 mi east)',
          'San Jose (~45 mi south)',
          'Palo Alto (~30 mi south)',
          'Napa (~45 mi north)',
        ],
      },
      {
        radius: 15,
        unit: 'miles',
        label: '15 miles',
        description:
          'A 15-mile radius covers the inner Bay Area — all of SF, the East Bay from Richmond through Oakland to San Leandro, the inner Peninsula to Burlingame and SFO, and Marin south of Mill Valley.',
        includes: [
          'San Francisco International Airport (SFO)',
          'Oakland, Alameda, San Leandro, Berkeley, Richmond',
          'Burlingame, Millbrae, San Bruno',
          'Mill Valley, Tiburon, Sausalito',
          'Most of the inner East Bay',
        ],
        excludes: [
          'San Jose (~45 mi)',
          'Palo Alto (~30 mi)',
          'Walnut Creek (~20 mi east)',
          'Napa (~45 mi)',
          'Half Moon Bay (~22 mi southwest by road)',
        ],
      },
      {
        radius: 25,
        unit: 'miles',
        label: '25 miles',
        description:
          'A 25-mile radius covers the inner and middle Bay Area — out to Walnut Creek, Hayward, Redwood City, San Rafael, and Half Moon Bay along the coast.',
        includes: [
          'All of the inner East Bay (Walnut Creek, Hayward, Concord)',
          'Most of San Mateo County (down to Redwood City)',
          'San Rafael and central Marin',
          'Half Moon Bay',
          'Most of the Bay shoreline',
        ],
        excludes: [
          'San Jose (~45 mi south)',
          'Santa Cruz (~65 mi south)',
          'Sonoma and Napa cities (~45+ mi north)',
          'Livermore (~37 mi east)',
          'Santa Rosa (~55 mi north)',
        ],
      },
      {
        radius: 50,
        unit: 'miles',
        label: '50 miles',
        description:
          'A 50-mile radius from Union Square reaches San Jose, Santa Rosa, Napa, Sacramento\'s western edge, and Santa Cruz\'s northern edge — covering most of the nine-county Bay Area.',
        includes: [
          'San Jose and most of Silicon Valley',
          'Napa and Sonoma valleys',
          'Santa Rosa',
          'Most of the nine-county Bay Area',
        ],
        excludes: [
          'Tracy (~54 mi east — just past the edge)',
          'Santa Cruz (~65 mi south)',
          'Stockton (~80 mi east)',
          'Sacramento city centre (~85 mi)',
          'Monterey (~110 mi)',
          'Santa Cruz city centre (~65 mi)',
          'Stockton city centre (~80 mi)',
          'Modesto (~95 mi)',
        ],
      },
    ],
    useCases: [
      {
        title: 'Inner-SF apartment search',
        description:
          'A 3–5 mile radius from Union Square covers every major SF neighborhood. Renters use this to filter for "anywhere in San Francisco" without spilling into Daly City or the East Bay, where commute patterns and rent dynamics differ.',
        recommendedRadius: '3–5 miles for SF-only',
      },
      {
        title: 'Bay Area tech commute zone',
        description:
          'A 25-mile radius from downtown SF captures the inner Bay Area but stops short of San Jose. For tech workers commuting to SF or the Peninsula, a 30-mile radius is more representative — but driving time, not distance, is the better filter on the 101 and 280 corridors.',
        recommendedRadius: '25–30 miles for inner Bay commute',
      },
      {
        title: 'SFO airport service zone',
        description:
          'SFO sits ~12 miles south of Union Square. A 15-mile radius covers SFO, OAK (Oakland Airport, ~9 miles), and the inner Peninsula — useful for hotel proximity, ride-share zones, and ground-transport tariffs.',
        recommendedRadius: '15 miles to include SFO and OAK',
      },
      {
        title: 'Bay-wide retail catchment',
        description:
          'A 50-mile radius captures most of the nine-county Bay Area\'s 7.7 million people, but Bay water and bridge bottlenecks mean drive time is closer to 90 minutes from corner to corner. Pair the radius with the Drive Time Map for realistic catchments.',
        recommendedRadius: '50 miles plus drive-time validation',
      },
    ],
    quirks: [
      {
        title: 'A radius is mostly water',
        description:
          'Union Square sits about 1.5 miles inland from the Bay and roughly 4 miles from the Pacific. Any radius beyond ~3 miles loses major area to water — a 10-mile circle is roughly 50% water, and a 25-mile circle is closer to 60%. Always interpret population figures inside an SF radius as land-only.',
      },
      {
        title: 'Bridges, not distance, define the East Bay',
        description:
          'Oakland is only 8 miles east as the crow flies, but the Bay Bridge is the only direct crossing, and BART under the Bay is the only fast transit. A 10-mile radius "covers" Oakland geographically but driving time at peak hours can be 30+ minutes due to bridge congestion.',
      },
      {
        title: 'The peninsula is linear',
        description:
          'San Francisco sits on a 7-mile-wide peninsula. A radius drawn from anywhere in the city only extends meaningfully south (down the Peninsula) and east (across the Bay) — north and west are bounded by water. For Peninsula-focused analyses, a north-south rectangle along US-101 or I-280 is often more useful than a circle.',
      },
    ],
    faqs: [
      {
        question: 'How big is a 10-mile radius in San Francisco?',
        answer:
          'A 10-mile radius from Union Square covers all of San Francisco, Oakland, Berkeley, Sausalito, and the inner Peninsula down to South San Francisco. SFO is just outside at ~12 miles, and the East Bay extends to about San Leandro.',
      },
      {
        question: 'What\'s within 25 miles of San Francisco?',
        answer:
          'A 25-mile radius reaches Walnut Creek and Concord in the East Bay, Redwood City on the Peninsula, San Rafael in Marin, and Half Moon Bay on the coast. San Jose, Santa Rosa, and Napa are all just outside.',
      },
      {
        question: 'Does a 15-mile radius cover San Francisco International Airport (SFO)?',
        answer:
          'Yes. SFO sits about 12 miles south of Union Square, comfortably inside a 15-mile radius and outside a 10-mile radius. A 15-mile radius is a common SFO-inclusive service zone for hotels and ground transport.',
      },
      {
        question: 'What\'s the difference between San Francisco proper and the Bay Area?',
        answer:
          'San Francisco proper is the city itself — about 47 square miles, 800,000 people, fitting easily inside a 7-mile radius. The Bay Area is the nine-county region around the Bay, home to 7.7 million people, and requires a 50-mile radius to cover.',
      },
      {
        question: 'How far is San Jose from San Francisco?',
        answer:
          'San Jose sits about 45 miles south of San Francisco — outside a 25-mile radius but inside a 50-mile one. Drive time is typically 50–90 minutes depending on US-101 congestion. Caltrain takes about 90 minutes.',
      },
      {
        question: 'Why does an SF radius look smaller than a similar-sized inland city?',
        answer:
          'Because so much of any SF radius is water. Union Square sits ~1.5 miles from the Bay; SF\'s Pacific coast is only ~4 miles west. A circle that covers 200 square miles geographically might only cover 90 square miles of land — always check population figures against the land area, not the raw circle.',
      },
    ],
    lastUpdated: '2026-06-10',
  },
  {
    slug: 'boston',
    name: 'Boston',
    country: 'United States',
    countryCode: 'US',
    region: 'North America',
    lat: 42.3554,
    lng: -71.0656,
    defaultRadius: 10,
    defaultUnit: 'miles',
    population: 675647,
    populationLabel: 'Boston city proper',
    timezone: 'America/New_York',
    fact: 'Boston proper is the third-densest US big city by area but one of the smallest by city limits — a 5-mile radius from Boston Common covers the whole city plus inner Cambridge, Brookline, and Somerville.',
    intro:
      'Boston is a small, dense city that punches well above its weight regionally. A radius drawn from Boston Common reaches the inner harbor and the Charles River fast, then crosses into the dense ring of Cambridge, Brookline, Somerville, and Chelsea — towns that look continuous with Boston but are politically separate. Distances here are measured from Boston Common (42.355° N, 71.066° W).',
    alternateNames: ['Beantown', 'The Hub', 'Hub of the Universe', 'Bean Town', 'The Cradle of Liberty'],
    centralLandmark: 'Boston Common',
    coverage: [
      {
        radius: 3,
        unit: 'miles',
        label: '3 miles',
        description:
          'A 3-mile radius from Boston Common covers downtown, Beacon Hill, Back Bay, the South End, the North End, Charlestown, East Boston, and most of Cambridge and Somerville inside Route 28.',
        includes: [
          'Downtown, Beacon Hill, Back Bay',
          'North End, South End, Chinatown',
          'Charlestown and East Boston',
          'Most of Cambridge (MIT, Harvard\'s southern edge)',
          'Inner Somerville, Brookline, Chelsea',
        ],
        excludes: [
          'Logan Airport tarmac (~4 mi)',
          'Newton (~7 mi west)',
          'Quincy (~7 mi south)',
          'Outer Cambridge / Arlington (~5+ mi)',
          'Most of Brookline beyond Coolidge Corner',
        ],
      },
      {
        radius: 5,
        unit: 'miles',
        label: '5 miles',
        description:
          'A 5-mile radius from Boston Common covers the city of Boston in full, all of Cambridge and Somerville, all of Brookline, Chelsea, Everett, and Logan Airport, and reaches into Watertown and Quincy.',
        includes: [
          'All of Boston city proper',
          'Cambridge, Somerville, Brookline (in full)',
          'Chelsea, Everett, Revere',
          'Logan International Airport (BOS)',
          'Watertown, Newton\'s eastern edge',
          'Quincy\'s northern edge',
        ],
        excludes: [
          'Newton city centre (~7 mi)',
          'Quincy city centre (~7 mi)',
          'Lexington (~10 mi)',
          'Waltham (~10 mi)',
          'Most of Quincy and Milton',
        ],
      },
      {
        radius: 10,
        unit: 'miles',
        label: '10 miles',
        description:
          'A 10-mile radius reaches Newton, Waltham, Lexington, Arlington, Belmont, Quincy, Milton, Lynn, and most of the Route 128 inner-suburban ring.',
        includes: [
          'Newton, Waltham, Watertown',
          'Lexington, Arlington, Belmont',
          'Quincy, Milton, Dedham',
          'Lynn, Saugus, Malden, Medford',
          'Most cities inside Route 128',
        ],
        excludes: [
          'Framingham (~20 mi west)',
          'Worcester (~45 mi)',
          'Providence, RI (~50 mi)',
          'Lowell (~25 mi north)',
          'Plymouth (~40 mi south)',
        ],
      },
      {
        radius: 25,
        unit: 'miles',
        label: '25 miles',
        description:
          'A 25-mile radius from Boston Common captures most of the inner I-495 ring — Framingham, Concord, Andover, Lawrence, Brockton, Plymouth\'s northern edge, and most of the inner MetroWest.',
        includes: [
          'Framingham, Natick, Wellesley',
          'Concord, Lexington, Bedford',
          'Andover, Lawrence, Lowell\'s southern edge',
          'Brockton, Stoughton',
          'Most of MetroWest and the North Shore',
        ],
        excludes: [
          'Worcester (~45 mi)',
          'Providence, RI (~50 mi)',
          'Lowell\'s northern edge (~28 mi)',
          'Cape Cod (~70 mi)',
          'Plymouth city centre (~40 mi)',
        ],
      },
      {
        radius: 50,
        unit: 'miles',
        label: '50 miles',
        description:
          'A 50-mile radius reaches Worcester, Providence (RI), Manchester (NH), Plymouth, and the start of Cape Cod near Sagamore Bridge — covering most of eastern Massachusetts and southern New Hampshire.',
        includes: [
          'Worcester (just inside)',
          'Providence, Rhode Island',
          'Manchester, New Hampshire',
          'Plymouth and the gateway to Cape Cod',
          'Most of eastern MA and southern NH',
        ],
        excludes: [
          'Hyannis on Cape Cod (~70 mi)',
          'Hartford, CT (~95 mi)',
          'Portland, ME (~95 mi)',
          'Springfield, MA (~85 mi)',
          'Provincetown (~110 mi by road)',
        ],
      },
    ],
    useCases: [
      {
        title: 'Inner-Boston rental search',
        description:
          'Boston, Cambridge, Somerville, and Brookline form a continuous urban core, but they\'re politically separate. A 3-mile radius from downtown Boston covers all four — the practical "inner Boston" rental market.',
        recommendedRadius: '3 miles for inner urban Boston',
      },
      {
        title: 'Route 128 inner-ring catchment',
        description:
          'Massachusetts Route 128 (the original inner beltway, now I-95) runs roughly 10 miles out from Boston. A 10-mile radius approximates the "inside 128" catchment — Newton, Lexington, Waltham, Quincy — historically the inner suburban ring.',
        recommendedRadius: '10 miles for inside Route 128',
      },
      {
        title: 'Greater Boston employer service area',
        description:
          'Greater Boston firms commonly define a 25-mile catchment for hiring and service delivery, which captures the inner I-495 ring plus the North and South Shore inner edges. This is the practical "Greater Boston" labour market.',
        recommendedRadius: '25 miles for Greater Boston',
      },
      {
        title: 'New England regional trade area',
        description:
          'A 50-mile radius reaches into Rhode Island, southern New Hampshire, and Worcester — useful for regional retail and distribution catchments. Note that I-93, I-95, and I-90 traffic significantly distort drive time vs distance.',
        recommendedRadius: '50 miles for regional New England',
      },
    ],
    quirks: [
      {
        title: 'Boston city limits are unusually small',
        description:
          'Boston is only 48 square miles — smaller than San Francisco. The metropolitan area, by contrast, holds about 4.9 million people. A 5-mile radius from downtown covers more of "metro Boston" than the city itself.',
      },
      {
        title: 'The harbor eats the eastern arc',
        description:
          'Boston Harbor sits directly east, with East Boston and Logan Airport the only land mass before the open Atlantic. A radius drawn from the Common loses 20–30% of its area to harbor on the eastern side.',
      },
      {
        title: 'I-495 vs I-95 (Route 128) — two rings',
        description:
          'Boston has two ring highways: I-95/Route 128 at roughly 10 miles, and I-495 at roughly 25 miles. Real-estate listings often distinguish "inside 128" from "between 128 and 495" — a 10-mile radius approximates the first; a 25-mile radius approximates the second.',
      },
    ],
    faqs: [
      {
        question: 'How big is a 5-mile radius in Boston?',
        answer:
          'A 5-mile radius from Boston Common covers all of Boston proper plus all of Cambridge, Somerville, Brookline, Chelsea, Everett, and Logan Airport, with the edges of Watertown, Newton, and Quincy.',
      },
      {
        question: 'What\'s within 10 miles of Boston?',
        answer:
          'A 10-mile radius reaches Newton, Waltham, Lexington, Arlington, Quincy, Milton, Lynn, and most of the inner Route 128 (I-95) ring of suburbs.',
      },
      {
        question: 'Does a 5-mile radius cover Boston Logan International Airport?',
        answer:
          'Yes. Logan sits about 4 miles northeast of Boston Common, comfortably inside a 5-mile radius. Most of East Boston and Logan are covered by a 4-mile radius from downtown.',
      },
      {
        question: 'What does "inside 128" mean and how does it relate to a radius?',
        answer:
          '"Inside 128" refers to the inner suburban ring of Greater Boston, bounded by Route 128 (I-95). A 10-mile radius from downtown Boston roughly approximates this zone — it\'s the standard Boston-area shorthand for inner suburbs.',
      },
      {
        question: 'How far is Providence from Boston?',
        answer:
          'Providence, Rhode Island sits about 50 miles southwest of Boston Common — at the edge of a 50-mile radius. Drive time on I-93 / I-95 is about 60–75 minutes outside rush hour.',
      },
      {
        question: 'Why do Boston, Cambridge, and Somerville feel like one city?',
        answer:
          'Because they functionally are: a continuous urban fabric runs across all three, separated only by the Charles River and political boundaries. A 3-mile radius from downtown Boston covers all of inner Cambridge and Somerville — what most visitors think of as "Boston" is actually three cities.',
      },
    ],
    lastUpdated: '2026-06-10',
  },
  {
    slug: 'seattle',
    name: 'Seattle',
    country: 'United States',
    countryCode: 'US',
    region: 'North America',
    lat: 47.6097,
    lng: -122.3422,
    defaultRadius: 10,
    defaultUnit: 'miles',
    population: 755078,
    populationLabel: 'Seattle city proper',
    timezone: 'America/Los_Angeles',
    fact: 'Seattle is squeezed between Puget Sound to the west and Lake Washington to the east — both bodies of water sit within 4 miles of downtown, so a radius drawn from Pike Place loses major area to water on both sides.',
    intro:
      'Seattle is built on a narrow north-south isthmus between Puget Sound and Lake Washington, which makes a radius from Pike Place feel smaller than its number suggests. To the east, Bellevue and the Eastside sit across the lake; to the west, Bainbridge Island and the Olympic Peninsula are reachable only by ferry. Distances here are measured from Pike Place Market (47.610° N, 122.342° W).',
    alternateNames: ['Emerald City', 'Jet City', 'Rain City', 'The 206', 'Sea-Town'],
    centralLandmark: 'Pike Place Market',
    coverage: [
      {
        radius: 5,
        unit: 'miles',
        label: '5 miles',
        description:
          'A 5-mile radius from Pike Place covers all of central Seattle — Capitol Hill, Queen Anne, Ballard, Fremont, Wallingford, the U District, Beacon Hill, the SoDo industrial belt, and reaches the western edge of Mercer Island and Bellevue across Lake Washington.',
        includes: [
          'Downtown, Belltown, SoDo',
          'Capitol Hill, First Hill, Central District',
          'Queen Anne, Magnolia',
          'Ballard, Fremont, Wallingford, U District',
          'Beacon Hill, Georgetown\'s northern edge',
          'Mercer Island\'s western edge',
        ],
        excludes: [
          'Sea-Tac Airport (~13 mi south)',
          'Bellevue city centre (~7 mi east)',
          'Redmond (~14 mi east)',
          'Bothell, Lynnwood (~12+ mi north)',
          'Renton (~12 mi south)',
        ],
      },
      {
        radius: 10,
        unit: 'miles',
        label: '10 miles',
        description:
          'A 10-mile radius covers all of Seattle proper, all of Bellevue, Mercer Island, Kirkland\'s southern edge, the inner Eastside, and the edge of Burien. Sea-Tac sits just outside.',
        includes: [
          'All of Seattle',
          'Bellevue and Mercer Island',
          'Kirkland (southern half)',
          'Burien, Tukwila',
          'Bainbridge Island (eastern edge)',
        ],
        excludes: [
          'Renton (~10 mi south — just past the edge)',
          'Sea-Tac International Airport (~13 mi)',
          'Issaquah (~13 mi)',
          'Redmond (~14 mi)',
          'Everett (~25 mi north)',
          'Tacoma (~30 mi south)',
        ],
      },
      {
        radius: 15,
        unit: 'miles',
        label: '15 miles',
        description:
          'A 15-mile radius reaches Sea-Tac Airport, Redmond, Issaquah, Bothell, Lynnwood\'s southern edge, and most of the inner Puget Sound region.',
        includes: [
          'Seattle-Tacoma International Airport (SEA)',
          'Redmond, Issaquah, Sammamish (western edge)',
          'Bothell, Lake Forest Park',
          'Bremerton (~14 mi west by direct line across the Sound)',
          'Most of the inner Eastside',
        ],
        excludes: [
          'Federal Way (~20 mi south — just past the edge)',
          'North Bend (~25 mi east)',
          'Everett (~25 mi north)',
          'Tacoma (~30 mi south)',
          'Olympia (~55 mi south)',
        ],
      },
      {
        radius: 25,
        unit: 'miles',
        label: '25 miles',
        description:
          'A 25-mile radius covers all of King County\'s populated west, plus Everett, Tacoma\'s northern edge, and most of the Puget Sound metropolitan core.',
        includes: [
          'All of populated King County (Seattle, Bellevue, Renton, Kent)',
          'Tacoma\'s northern suburbs (Auburn, Federal Way, Puyallup\'s edge)',
          'Bremerton and Bainbridge Island (across the Sound)',
          'Most of the inner Puget Sound metro',
        ],
        excludes: [
          'North Bend (~25 mi east at edge)',
          'Everett (~26 mi north — just past the edge)',
          'Tacoma city centre (~30 mi south)',
          'Mount Rainier National Park (~55 mi southeast)',
          'Olympia (~55 mi south)',
          'Bellingham (~85 mi north)',
        ],
      },
      {
        radius: 50,
        unit: 'miles',
        label: '50 miles',
        description:
          'A 50-mile radius reaches Tacoma, Olympia\'s northern edge, the Cascades foothills, the Olympic Peninsula\'s eastern coast, and most of the central Puget Sound region.',
        includes: [
          'Tacoma, Lakewood',
          'Olympia\'s northern edge',
          'Everett',
          'Most of the central Puget Sound region',
        ],
        excludes: [
          'Olympia city centre (~55 mi south)',
          'Mount Rainier (~59 mi southeast — just past the edge)',
          'Bellingham (~85 mi north)',
          'Vancouver, BC (~130 mi)',
          'Yakima (~135 mi)',
          'Portland, OR (~175 mi)',
        ],
      },
    ],
    useCases: [
      {
        title: 'Seattle vs Eastside rental search',
        description:
          'A 5-mile radius from Pike Place captures Seattle proper but doesn\'t cross Lake Washington — Bellevue and Redmond are outside. Renters who want "Seattle only" can use 5 miles; those open to the Eastside need 10–15 miles.',
        recommendedRadius: '5 miles for Seattle, 10+ for Eastside',
      },
      {
        title: 'Tech corridor commute zone',
        description:
          'A 15-mile radius covers Seattle, Bellevue, Redmond (Microsoft), and Issaquah — the classic Eastside tech corridor. Drive time east-bound on the 520 or I-90 across the lake is the binding constraint, not distance.',
        recommendedRadius: '15 miles for Seattle-Eastside tech',
      },
      {
        title: 'Sea-Tac Airport service zone',
        description:
          'Sea-Tac sits ~13 miles south of Pike Place. A 15-mile radius captures the airport, the Tukwila/SeaTac hotel cluster, and Renton — useful for ride-share zones and airport-hotel proximity.',
        recommendedRadius: '15 miles to include SEA',
      },
      {
        title: 'Puget Sound regional retail catchment',
        description:
          'A 50-mile radius covers most of the central Puget Sound region — Tacoma, Everett, Bremerton, Olympia\'s edge — home to ~4 million people. Ferry routes across the Sound mean drive time can vary wildly.',
        recommendedRadius: '50 miles for Puget Sound region',
      },
    ],
    quirks: [
      {
        title: 'Water on both sides',
        description:
          'Seattle sits on a narrow strip between Puget Sound (west) and Lake Washington (east), both of which are 1–4 miles from downtown. A 5-mile circle around Pike Place is roughly 35–40% water; a 10-mile circle is closer to 30%.',
      },
      {
        title: 'Bridges define the Eastside',
        description:
          'The only direct routes across Lake Washington are the I-90 and 520 floating bridges. A 10-mile radius covers Bellevue geographically, but at peak times the bridge crossing alone can take 25–35 minutes.',
      },
      {
        title: 'The isthmus is north-south',
        description:
          'Seattle\'s narrow north-south layout means a radius extends much further along the I-5 spine than across the city. A 5-mile radius reaches Northgate (north) and Georgetown (south) but barely covers Magnolia (west) before hitting the Sound.',
      },
    ],
    faqs: [
      {
        question: 'How big is a 5-mile radius in Seattle?',
        answer:
          'A 5-mile radius from Pike Place covers all of central Seattle — Capitol Hill, Queen Anne, Ballard, Fremont, U District, and Beacon Hill — and reaches Mercer Island\'s western edge across Lake Washington.',
      },
      {
        question: 'What\'s within 15 miles of Seattle?',
        answer:
          'A 15-mile radius covers Seattle, Bellevue, Redmond, Issaquah, Bothell, Sea-Tac Airport, and most of the inner Puget Sound region. It\'s the standard "Seattle metro" radius for hiring catchments and tech-corridor analysis.',
      },
      {
        question: 'Does a 15-mile radius cover Sea-Tac Airport?',
        answer:
          'Yes. Sea-Tac sits about 13 miles south of Pike Place, comfortably inside a 15-mile radius. A 10-mile radius doesn\'t reach the airport.',
      },
      {
        question: 'How far is Bellevue from Seattle?',
        answer:
          'Downtown Bellevue is about 7 miles east of Pike Place across Lake Washington. It\'s well inside a 10-mile radius. Drive time across the I-90 or 520 bridges is typically 15–25 minutes off-peak, much longer at rush hour.',
      },
      {
        question: 'Why does a Seattle radius look smaller than a Phoenix radius?',
        answer:
          'Because Seattle has water (Puget Sound, Lake Washington, Lake Union, Lake Sammamish) eating into the circle from multiple sides. A 10-mile radius around Pike Place includes about 30% water — a 10-mile radius around central Phoenix is essentially all land.',
      },
      {
        question: 'How do I plan for the Eastside tech corridor?',
        answer:
          'Use a 10–15 mile radius from Pike Place to capture Bellevue and Redmond, then validate with the Drive Time Map — the 520 and I-90 bridge crossings are the binding constraint on real commute time, often 20–40 minutes at rush hour.',
      },
    ],
    lastUpdated: '2026-06-10',
  },
  {
    slug: 'miami',
    name: 'Miami',
    country: 'United States',
    countryCode: 'US',
    region: 'North America',
    lat: 25.7741,
    lng: -80.1857,
    defaultRadius: 10,
    defaultUnit: 'miles',
    population: 467963,
    populationLabel: 'Miami city proper',
    timezone: 'America/New_York',
    fact: 'Miami metro is unusually linear — squeezed between the Atlantic Ocean and the Everglades, the urbanized strip is only 10–12 miles wide but stretches 100+ miles from Florida City to Palm Beach.',
    intro:
      'Miami\'s urban geography is dictated by the Atlantic Ocean to the east and the Everglades to the west. The metropolitan area is a long, narrow strip running roughly north-south along I-95 and the Florida Turnpike, so a circular radius is a poor fit — much of any wide circle ends up in either the ocean or protected wetlands. Distances here are measured from Bayfront Park (25.774° N, 80.186° W).',
    alternateNames: ['The Magic City', 'MIA', '305', 'Vice City', 'Capital of Latin America'],
    centralLandmark: 'Bayfront Park',
    coverage: [
      {
        radius: 5,
        unit: 'miles',
        label: '5 miles',
        description:
          'A 5-mile radius from Bayfront Park covers downtown Miami, Brickell, Wynwood, the Design District, Little Havana, Miami Beach, Coconut Grove\'s northern edge, and most of the urban core.',
        includes: [
          'Downtown Miami, Brickell, Edgewater',
          'Wynwood, Design District, Midtown',
          'Little Havana, Allapattah',
          'Miami Beach (south and mid)',
          'Key Biscayne (northern edge)',
          'Coconut Grove (northern edge)',
        ],
        excludes: [
          'Miami International Airport (~7 mi)',
          'Coral Gables city centre (~6 mi)',
          'Hialeah (~8 mi)',
          'North Miami Beach (~10 mi)',
          'Aventura (~15 mi)',
        ],
      },
      {
        radius: 10,
        unit: 'miles',
        label: '10 miles',
        description:
          'A 10-mile radius covers Miami International Airport (MIA), Coral Gables, Hialeah, North Miami Beach, Bal Harbour, and most of urban Miami-Dade north of Kendall.',
        includes: [
          'Miami International Airport (MIA)',
          'Coral Gables, Coconut Grove',
          'Hialeah, Miami Springs',
          'North Miami, North Miami Beach, Bal Harbour',
          'Key Biscayne, Virginia Key',
          'Surfside, Bay Harbor Islands',
        ],
        excludes: [
          'Aventura (~15 mi)',
          'Hollywood, FL (~17 mi)',
          'Kendall (~13 mi)',
          'Doral (~10 mi western edge — just inside)',
          'Homestead (~30 mi)',
        ],
      },
      {
        radius: 25,
        unit: 'miles',
        label: '25 miles',
        description:
          'A 25-mile radius from Bayfront Park reaches Hollywood, Fort Lauderdale\'s southern edge, Pembroke Pines, Kendall, Homestead\'s northern edge, and most of urban Miami-Dade and southern Broward.',
        includes: [
          'Hollywood, Pembroke Pines, Miramar',
          'Fort Lauderdale (southern edge, ~25 mi)',
          'Kendall, Pinecrest, Palmetto Bay',
          'Doral, Hialeah Gardens',
          'Most of urban Miami-Dade County',
        ],
        excludes: [
          'Fort Lauderdale city centre (~28 mi)',
          'Homestead city centre (~30 mi)',
          'Boca Raton (~45 mi)',
          'Florida Keys (Key Largo ~50 mi)',
          'Most of the Everglades (just outside the urbanized strip)',
        ],
      },
      {
        radius: 50,
        unit: 'miles',
        label: '50 miles',
        description:
          'A 50-mile radius covers all of Miami-Dade and Broward counties\' urbanized areas, Boca Raton, Homestead, the northern Florida Keys (Key Largo), and reaches Palm Beach County\'s southern edge.',
        includes: [
          'All of urban Miami-Dade and Broward counties',
          'Boca Raton, Delray Beach',
          'Homestead, Florida City',
          'Key Largo (~50 mi southwest)',
          'West Palm Beach\'s southern edge',
        ],
        excludes: [
          'West Palm Beach city centre (~65 mi)',
          'Marathon, FL Keys (~95 mi)',
          'Naples (~110 mi)',
          'Key West (~155 mi)',
          'Orlando (~225 mi)',
        ],
      },
      {
        radius: 100,
        unit: 'miles',
        label: '100 miles',
        description:
          'A 100-mile radius reaches Marathon (mid-Florida Keys), Palm Beach County\'s northern edge, and Naples on the Gulf coast — covering most of South Florida\'s populated area.',
        includes: [
          'All of South Florida (Miami-Dade, Broward, Palm Beach)',
          'Mid-Florida Keys (Marathon)',
          'Lake Okeechobee\'s southern edge',
          'Most of the Treasure Coast',
        ],
        excludes: [
          'Naples (~103 mi west — just past the edge)',
          'Key West (~155 mi)',
          'Orlando (~225 mi)',
          'Tampa (~280 mi)',
          'Jacksonville (~350 mi)',
          'Most of the central Florida peninsula',
        ],
      },
    ],
    useCases: [
      {
        title: 'Miami Beach hotel proximity',
        description:
          'A 3-mile radius from Bayfront Park covers most of South Beach and Mid-Beach. For a "near downtown and the beach" hotel filter, a 5-mile radius captures both the downtown business district and the entire developed Miami Beach strip.',
        recommendedRadius: '3–5 miles for downtown + the beach',
      },
      {
        title: 'Miami-Dade urban catchment',
        description:
          'Urban Miami-Dade County is roughly 25 miles north-south and only 10–12 miles east-west. A 25-mile radius captures most of its 2.7 million residents and reaches into southern Broward — a practical "South Florida" trade area.',
        recommendedRadius: '25 miles for urban Miami-Dade',
      },
      {
        title: 'South Florida tri-county regional',
        description:
          'For Miami–Fort Lauderdale–West Palm Beach (the South Florida combined statistical area, ~6.4 million people), a 50-mile radius captures the urbanized strip from Homestead to the southern edge of Palm Beach County.',
        recommendedRadius: '50 miles for tri-county South Florida',
      },
      {
        title: 'MIA airport service zone',
        description:
          'Miami International Airport sits ~7 miles west of Bayfront Park. A 10-mile radius covers MIA plus most of urban Miami — useful for hotel proximity and airport ground-transport zones.',
        recommendedRadius: '10 miles to include MIA',
      },
    ],
    quirks: [
      {
        title: 'The Everglades cap the western half',
        description:
          'Miami-Dade\'s urban edge runs roughly along the Florida Turnpike, only 10–15 miles inland. Beyond that, Everglades National Park and the Big Cypress National Preserve fill the western half of any radius — they\'re geographically inside the circle but contain almost no population or roads.',
      },
      {
        title: 'The metro is a long, thin strip',
        description:
          'Miami metro extends about 100 miles north-south (Florida City to Jupiter) but only 10–12 miles east-west. A circle is a poor fit — analysts often use a corridor along I-95 instead. A 50-mile circle from Miami includes more ocean and Everglades than urban land.',
      },
      {
        title: 'Hurricane evacuation zones',
        description:
          'Miami-Dade\'s evacuation zones (A through E) run roughly parallel to the coast. A radius from downtown crosses all five within ~10 miles. For hurricane-prep analysis, the zone-based polygons published by Miami-Dade Emergency Management are far more useful than a circular radius.',
      },
    ],
    faqs: [
      {
        question: 'How big is a 10-mile radius in Miami?',
        answer:
          'A 10-mile radius from Bayfront Park covers downtown Miami, Miami Beach, MIA airport, Coral Gables, Hialeah, Coconut Grove, and most of urban Miami-Dade north of Kendall. It just clears Aventura and Hollywood.',
      },
      {
        question: 'What\'s within 25 miles of Miami?',
        answer:
          'A 25-mile radius reaches Fort Lauderdale\'s southern edge, Hollywood, Pembroke Pines, Kendall, Doral, and most of urban Miami-Dade and southern Broward. Boca Raton is just outside; the Florida Keys begin around 50 miles.',
      },
      {
        question: 'Does a 10-mile radius cover Miami International Airport (MIA)?',
        answer:
          'Yes. MIA sits about 7 miles west of Bayfront Park, well inside a 10-mile radius. A 5-mile radius does not reach MIA.',
      },
      {
        question: 'How far is Fort Lauderdale from Miami?',
        answer:
          'Downtown Fort Lauderdale is about 28 miles north of Bayfront Park — just outside a 25-mile radius. The southern edge of Fort Lauderdale is about 25 miles. A 50-mile radius easily covers both cities and most of the South Florida urban strip.',
      },
      {
        question: 'Why does a Miami radius look misleading on a map?',
        answer:
          'Because so much of the western half is Everglades and the eastern half is Atlantic Ocean. A 25-mile circle from Bayfront Park covers ~1,960 square miles of geography but maybe 700 square miles of urbanized land. Always look at population inside the circle, not the raw area.',
      },
      {
        question: 'How do I plan a South Florida regional catchment?',
        answer:
          'Use a 50-mile radius from downtown Miami, or use a 100-mile north-south corridor along I-95 from Homestead to Palm Beach. The corridor approach is more accurate because the metro is linear, not radial — most population sits in a thin strip along the coast.',
      },
    ],
    lastUpdated: '2026-06-10',
  },
  {
    slug: 'washington-dc',
    name: 'Washington, D.C.',
    country: 'United States',
    countryCode: 'US',
    region: 'North America',
    lat: 38.8977,
    lng: -77.0365,
    defaultRadius: 10,
    defaultUnit: 'miles',
    population: 678972,
    populationLabel: 'District of Columbia',
    timezone: 'America/New_York',
    fact: 'The District of Columbia is only 68 square miles and fits inside a 5-mile radius — but the I-495 Capital Beltway, the practical edge of "DC", sits at roughly 10 miles from the White House.',
    intro:
      'Washington, D.C. is a deliberately small federal district carved from Maryland and Virginia, surrounded by the I-495 Capital Beltway. The Potomac River cuts the radius in half on the west, and major commuter cities — Arlington, Alexandria, Bethesda, Silver Spring — all sit just outside the District line. Distances here are measured from the White House (38.898° N, 77.036° W).',
    alternateNames: ['D.C.', 'The District', 'Washington', 'DMV', 'The Capital'],
    centralLandmark: 'The White House',
    coverage: [
      {
        radius: 3,
        unit: 'miles',
        label: '3 miles',
        description:
          'A 3-mile radius from the White House covers downtown DC, the National Mall, Capitol Hill, Foggy Bottom, Dupont Circle, Adams Morgan, Georgetown, and reaches the Pentagon and Arlington National Cemetery just across the Potomac.',
        includes: [
          'The National Mall, Capitol Hill',
          'Foggy Bottom, Dupont Circle, Adams Morgan',
          'Georgetown, U Street, Logan Circle',
          'The Pentagon and Arlington National Cemetery',
          'Crystal City, Pentagon City',
        ],
        excludes: [
          'Reagan National Airport (~4 mi)',
          'Rosslyn-Ballston corridor west of Clarendon (~4 mi)',
          'Bethesda, Silver Spring (~6 mi)',
          'Alexandria Old Town (~7 mi)',
          'Tysons Corner (~12 mi)',
        ],
      },
      {
        radius: 5,
        unit: 'miles',
        label: '5 miles',
        description:
          'A 5-mile radius covers nearly all of the District of Columbia plus inner Arlington, the Rosslyn-Ballston corridor, Reagan National Airport, Bethesda\'s southern edge, and Silver Spring\'s southern edge.',
        includes: [
          'Most of the District of Columbia',
          'Inner Arlington (Rosslyn, Clarendon, Ballston)',
          'Reagan National Airport (DCA)',
          'Bethesda and Chevy Chase (southern edges)',
          'Silver Spring (southern edge)',
          'Alexandria (Old Town northern edge)',
        ],
        excludes: [
          'Tysons Corner (~12 mi)',
          'Old Town Alexandria centre (~7 mi)',
          'Bethesda city centre (~6 mi)',
          'Silver Spring centre (~6 mi)',
          'Dulles Airport (~26 mi)',
        ],
      },
      {
        radius: 10,
        unit: 'miles',
        label: '10 miles',
        description:
          'A 10-mile radius from the White House reaches the Capital Beltway (I-495) on most arcs — Bethesda, Silver Spring, College Park, Hyattsville, Alexandria, Falls Church, Arlington in full.',
        includes: [
          'All of the District of Columbia',
          'All of Arlington, Falls Church, Alexandria',
          'Bethesda, Chevy Chase, Silver Spring',
          'College Park, Hyattsville, Takoma Park',
          'Most of the area inside I-495 (the Beltway)',
        ],
        excludes: [
          'Tysons Corner (~12 mi)',
          'Rockville (~15 mi)',
          'Reston (~20 mi)',
          'Fairfax (~17 mi)',
          'Dulles Airport (~26 mi)',
        ],
      },
      {
        radius: 25,
        unit: 'miles',
        label: '25 miles',
        description:
          'A 25-mile radius covers most of the inner DMV — Tysons, Reston, Rockville, Gaithersburg\'s southern edge, Fairfax, Springfield, Bowie, and Dulles Airport.',
        includes: [
          'Tysons Corner, Reston, Herndon',
          'Rockville, Gaithersburg (southern edge)',
          'Fairfax, Springfield, Burke',
          'Bowie, Greenbelt, Laurel',
          'Dulles International Airport (IAD)',
        ],
        excludes: [
          'Frederick, MD (~45 mi)',
          'Baltimore (~40 mi)',
          'Manassas (~30 mi)',
          'Annapolis (~30 mi)',
          'Leesburg (~32 mi)',
        ],
      },
      {
        radius: 50,
        unit: 'miles',
        label: '50 miles',
        description:
          'A 50-mile radius reaches Baltimore\'s southern edge, Frederick, Annapolis, Fredericksburg\'s northern edge, Leesburg, and most of the broader DMV region.',
        includes: [
          'Baltimore (southern edge, just inside)',
          'Frederick, Maryland',
          'Annapolis',
          'Fredericksburg (northern edge)',
          'Leesburg, Front Royal\'s edge',
          'Most of the DMV region',
        ],
        excludes: [
          'Baltimore city centre (~40 mi but Inner Harbor at ~38)',
          'Richmond (~95 mi)',
          'Hagerstown (~70 mi)',
          'Philadelphia (~140 mi)',
          'Charlottesville (~110 mi)',
        ],
      },
    ],
    useCases: [
      {
        title: 'Inside-the-Beltway housing search',
        description:
          'The Capital Beltway (I-495) is roughly 10 miles from the White House on most arcs. A 10-mile radius approximates "inside the Beltway" — the inner DC, Maryland, and Virginia core most associated with DC commuting and politics.',
        recommendedRadius: '10 miles for inside the Beltway',
      },
      {
        title: 'Federal-employee commute zone',
        description:
          'A 15–20 mile radius from the White House captures the bulk of federal-employee commute origins — Bethesda, Silver Spring, Arlington, Alexandria, Reston, Tysons. The Metro Red, Blue, Orange, and Silver lines are the binding constraint, not raw distance.',
        recommendedRadius: '15–20 miles for federal commute',
      },
      {
        title: 'Reagan National vs Dulles airport zone',
        description:
          'Reagan National (DCA) sits ~4 miles southwest of the White House — inside even a 5-mile radius. Dulles (IAD) is ~26 miles west — outside a 25-mile radius by a hair. A 25-mile radius covers DCA and IAD together.',
        recommendedRadius: '25 miles to include both DCA and IAD',
      },
      {
        title: 'DMV regional retail catchment',
        description:
          'The "DMV" (DC, Maryland, Virginia urbanized areas) covers roughly 6.3 million people. A 50-mile radius from the White House captures most of this, plus reaches Baltimore\'s southern edge — useful for regional retail and distribution catchments.',
        recommendedRadius: '50 miles for the DMV region',
      },
    ],
    quirks: [
      {
        title: 'The District is unusually small',
        description:
          'Washington, D.C. proper is only 68 square miles — about the size of Brooklyn. A 5-mile radius from the White House covers most of it. The "DC area" people refer to in casual conversation almost always includes inner Maryland and Virginia, not just the District.',
      },
      {
        title: 'The Potomac splits the radius',
        description:
          'The Potomac River runs roughly north-south just west of downtown, with limited bridge crossings (Key, Memorial, Roosevelt, 14th Street). A radius "covers" Arlington geographically but the bridge constraint means cross-river commute time is often double the straight-line equivalent.',
      },
      {
        title: 'Beltway = ~10 miles',
        description:
          'I-495 (the Capital Beltway) sits at roughly 10 miles from the White House on most points — though it bulges out to 15 miles in some segments. "Inside the Beltway" is the most common shorthand for inner DMV, and a 10-mile radius is a reasonable proxy.',
      },
    ],
    faqs: [
      {
        question: 'How big is a 10-mile radius in Washington, D.C.?',
        answer:
          'A 10-mile radius from the White House covers all of the District of Columbia, all of Arlington, Alexandria, Falls Church, Bethesda, Silver Spring, and most of the area inside the I-495 Capital Beltway.',
      },
      {
        question: 'What\'s within 25 miles of Washington, D.C.?',
        answer:
          'A 25-mile radius covers Tysons Corner, Reston, Rockville, Fairfax, Springfield, Bowie, Greenbelt, and Dulles International Airport. Frederick, Baltimore, and Annapolis are just outside.',
      },
      {
        question: 'Does a 5-mile radius cover Reagan National Airport (DCA)?',
        answer:
          'Yes. Reagan National sits about 4 miles southwest of the White House, just inside a 5-mile radius. Dulles (IAD) is ~26 miles west, requiring a 25–30 mile radius.',
      },
      {
        question: 'What does "inside the Beltway" mean and how does it map to a radius?',
        answer:
          '"Inside the Beltway" refers to the area enclosed by I-495, the Capital Beltway. The Beltway sits at roughly 10 miles from the White House on most arcs, so a 10-mile radius is a useful (if imperfect) approximation.',
      },
      {
        question: 'How far is Baltimore from Washington, D.C.?',
        answer:
          'Inner Harbor in Baltimore is about 38 miles north of the White House — just inside a 50-mile radius but well outside a 25-mile one. Drive time is typically 50–80 minutes on I-95 or the BW Parkway depending on traffic.',
      },
      {
        question: 'Why is the DC area called the DMV?',
        answer:
          '"DMV" stands for D.C., Maryland, and Virginia — the three jurisdictions that make up the Washington metropolitan area. The District is small, so most of the metro\'s population, jobs, and infrastructure spill into Maryland and Virginia. A 25-mile radius from the White House captures the urbanized core of all three.',
      },
    ],
    lastUpdated: '2026-06-10',
  },
  {
    slug: 'vancouver',
    name: 'Vancouver',
    country: 'Canada',
    countryCode: 'CA',
    region: 'North America',
    lat: 49.2890,
    lng: -123.1110,
    defaultRadius: 15,
    defaultUnit: 'kilometers',
    population: 675218,
    populationLabel: 'City of Vancouver proper',
    timezone: 'America/Vancouver',
    fact: 'Vancouver sits between the North Shore Mountains, the Strait of Georgia, and the US border — the urbanized strip is only about 30 km wide, and a 25 km radius from downtown reaches the US border at Blaine, Washington.',
    intro:
      'Vancouver is a coastal city wedged between mountains, ocean, and the Canada–US border. The North Shore Mountains rise sharply 5 km north of downtown; the Strait of Georgia limits the western arc; and the US border at Blaine sits just 22 km south of the city centre. Distances here are measured from Canada Place (49.289° N, 123.111° W) on the downtown waterfront.',
    alternateNames: ['Hollywood North', 'Van City', 'The Couv', 'Raincouver', 'Terminal City'],
    centralLandmark: 'Canada Place',
    coverage: [
      {
        radius: 5,
        unit: 'kilometers',
        label: '5 km',
        description:
          'A 5 km radius from Canada Place covers downtown Vancouver, the West End, Stanley Park, Kitsilano\'s eastern edge, Mount Pleasant, Strathcona, and reaches Granville Island and the inner edge of North Vancouver across Burrard Inlet.',
        includes: [
          'Downtown Vancouver, West End',
          'Stanley Park, Coal Harbour',
          'Kitsilano (eastern edge), Granville Island',
          'Mount Pleasant, Strathcona',
          'North Vancouver (inner waterfront)',
          'Lower Lonsdale',
        ],
        excludes: [
          'YVR airport (~12 km south)',
          'UBC campus (~10 km west)',
          'Burnaby city centre (~10 km east)',
          'Richmond (~10–15 km south)',
          'New Westminster (~17 km southeast)',
        ],
      },
      {
        radius: 10,
        unit: 'kilometers',
        label: '10 km',
        description:
          'A 10 km radius covers all of the City of Vancouver, UBC, North Vancouver, and reaches Burnaby\'s western edge and Richmond\'s northern edge.',
        includes: [
          'All of the City of Vancouver',
          'University of British Columbia (UBC)',
          'North Vancouver in full, West Vancouver\'s eastern edge',
          'Burnaby\'s western edge (Brentwood, Metrotown\'s edge)',
          'Richmond\'s northern edge',
        ],
        excludes: [
          'YVR (~12 km — just outside)',
          'Burnaby city centre (~10 km east)',
          'New Westminster (~17 km)',
          'Richmond city centre (~13 km)',
          'Surrey (~25 km southeast)',
        ],
      },
      {
        radius: 15,
        unit: 'kilometers',
        label: '15 km',
        description:
          'A 15 km radius from Canada Place covers all of Vancouver, UBC, the North Shore (in full), Burnaby, Richmond, YVR airport, and reaches New Westminster\'s western edge.',
        includes: [
          'Vancouver International Airport (YVR)',
          'All of Vancouver, UBC, the North Shore',
          'All of Burnaby and Richmond',
          'Most of the inner Lower Mainland',
        ],
        excludes: [
          'New Westminster (~17 km southeast — just past the edge)',
          'Coquitlam city centre (~22 km)',
          'White Rock and the US border (~22+ km)',
          'Surrey city centre (~25 km)',
          'Tsawwassen ferry terminal (~28 km)',
          'Langley (~40 km)',
        ],
      },
      {
        radius: 25,
        unit: 'kilometers',
        label: '25 km',
        description:
          'A 25 km radius covers most of Metro Vancouver — Surrey\'s northern edge, Coquitlam, Port Coquitlam, Delta, the US border at Peace Arch, and the Tsawwassen ferry terminal.',
        includes: [
          'Surrey (northern half), Delta',
          'Coquitlam, Port Coquitlam, Port Moody',
          'White Rock and the US border',
          'Tsawwassen ferry terminal',
          'Most of Metro Vancouver\'s populated core',
        ],
        excludes: [
          'Langley city centre (~40 km)',
          'Abbotsford (~65 km)',
          'Squamish (~55 km north)',
          'Bellingham, WA (~85 km)',
          'Whistler (~120 km)',
        ],
      },
      {
        radius: 50,
        unit: 'kilometers',
        label: '50 km',
        description:
          'A 50 km radius reaches Langley, Maple Ridge, the southern Sunshine Coast, Squamish (just inside), and the start of the Fraser Valley.',
        includes: [
          'Langley, Maple Ridge, Pitt Meadows',
          'Mission\'s western edge',
          'Squamish (just inside)',
          'Bowen Island, Sunshine Coast (Gibsons)',
          'Most of populated Metro Vancouver and the inner Fraser Valley',
        ],
        excludes: [
          'Abbotsford city centre (~65 km)',
          'Chilliwack (~95 km)',
          'Whistler (~120 km)',
          'Bellingham, WA (~85 km)',
          'Vancouver Island major cities (Victoria ~70 km direct, much further by ferry)',
        ],
      },
    ],
    useCases: [
      {
        title: 'Downtown Vancouver condo search',
        description:
          'A 5 km radius from Canada Place covers downtown, the West End, Yaletown, Coal Harbour, and the inner waterfront — the highest-density condo market in Canada. Outside this ring, the housing stock shifts toward townhouses and detached homes.',
        recommendedRadius: '5 km for downtown condos',
      },
      {
        title: 'Metro Vancouver commute zone',
        description:
          'A 25 km radius covers most of Metro Vancouver\'s 2.6 million people. The Fraser River and the SkyTrain network are the binding constraints — drive time across the river at peak hours can double the straight-line equivalent.',
        recommendedRadius: '25 km for Metro Vancouver',
      },
      {
        title: 'YVR airport proximity',
        description:
          'YVR sits 12 km south of Canada Place, on Sea Island in Richmond. A 15 km radius covers YVR plus most of Vancouver and Richmond — useful for hotel proximity and ground-transport zones. Canada Line SkyTrain runs from YVR to downtown in 26 minutes.',
        recommendedRadius: '15 km to include YVR',
      },
      {
        title: 'Cross-border catchment',
        description:
          'The US border at Peace Arch sits 22 km south of downtown. A 25 km radius captures the border crossing — useful for cross-border retail catchments (Bellingham, WA shopping draws Canadian shoppers when the exchange rate favors it).',
        recommendedRadius: '25 km to reach the US border',
      },
    ],
    quirks: [
      {
        title: 'Mountains cap the northern arc',
        description:
          'The North Shore Mountains rise sharply 5–8 km north of downtown — Cypress, Grouse, and Seymour all top 1,200 m. A radius drawn north from Vancouver reaches inhabited terrain only on the narrow North Shore strip; everything beyond is mountain wilderness with virtually no population.',
      },
      {
        title: 'Three water bodies, three bridges',
        description:
          'Vancouver is split by Burrard Inlet (north), False Creek (south of downtown), and the Fraser River (south of the city). The Lions Gate, Ironworkers Memorial, Burrard, Granville, Cambie, and Pattullo bridges are the practical constraints — drive time across them is often the binding factor in cross-region travel.',
      },
      {
        title: 'The US border is 22 km south',
        description:
          'Vancouver is one of the few major cities where a 25 km radius reaches another country. This matters for retail (Canadian shoppers crossing to Bellingham when CAD-USD is favourable) and for travel — Seattle, US-side, sits about 230 km south by road but only 195 km by direct line.',
      },
    ],
    faqs: [
      {
        question: 'How big is a 15 km radius in Vancouver?',
        answer:
          'A 15 km radius from Canada Place covers all of the City of Vancouver, the entire North Shore, all of Burnaby and Richmond, YVR airport, and reaches New Westminster\'s western edge — most of the inner Lower Mainland.',
      },
      {
        question: 'What\'s within 25 km of Vancouver?',
        answer:
          'A 25 km radius covers Surrey\'s northern half, Coquitlam, Port Coquitlam, Delta, White Rock, the US border at Peace Arch, and the Tsawwassen ferry terminal — most of Metro Vancouver\'s populated core.',
      },
      {
        question: 'Does a 15 km radius cover Vancouver International Airport (YVR)?',
        answer:
          'Yes. YVR sits about 12 km south of Canada Place on Sea Island in Richmond, comfortably inside a 15 km radius. A 10 km radius does not reach YVR.',
      },
      {
        question: 'How far is the US border from Vancouver?',
        answer:
          'The Peace Arch border crossing at Blaine, Washington sits about 22 km south of downtown Vancouver — just inside a 25 km radius. It\'s the closest international border to a major Canadian city.',
      },
      {
        question: 'Why does a Vancouver radius feel half the size?',
        answer:
          'Mountains, ocean, and the US border all eat into a Vancouver radius. The North Shore Mountains are wilderness north of about 8 km from downtown; the Strait of Georgia takes the western arc; and the US border closes the southern half at 22 km. Effective inhabited land inside a 25 km radius is closer to 35–40% of the raw circle.',
      },
      {
        question: 'How do I plan for the SkyTrain catchment?',
        answer:
          'SkyTrain stations are typically located in the densest parts of each city in Metro Vancouver. A 1 km radius from any SkyTrain station tends to capture the bulk of nearby walkable density. For broader analysis, use a 15–25 km radius from downtown plus the SkyTrain station overlay.',
      },
    ],
    lastUpdated: '2026-06-10',
  },
  {
    slug: 'dublin',
    name: 'Dublin',
    country: 'Ireland',
    countryCode: 'IE',
    region: 'Europe',
    lat: 53.3470,
    lng: -6.2598,
    defaultRadius: 15,
    defaultUnit: 'kilometers',
    population: 592713,
    populationLabel: 'Dublin city proper',
    timezone: 'Europe/Dublin',
    fact: 'Dublin\'s M50 ring road sits roughly 8–10 km from O\'Connell Bridge and forms the practical outer limit of the city — most of the Greater Dublin Area is within a 25 km radius of the centre.',
    intro:
      'Dublin sits on the east coast of Ireland, where the River Liffey meets the Irish Sea. The city is bounded sharply on the east by the sea (Dublin Bay) and rings outward through suburbs that follow the M50 motorway loop. Distances here are measured from O\'Connell Bridge (53.347° N, 6.260° W), the historic centre.',
    alternateNames: ['Baile Átha Cliath', 'The Pale', 'The Fair City', 'Dub'],
    centralLandmark: 'O\'Connell Bridge',
    coverage: [
      {
        radius: 3,
        unit: 'kilometers',
        label: '3 km',
        description:
          'A 3 km radius from O\'Connell Bridge covers the city centre — Temple Bar, St. Stephen\'s Green, Trinity College, Christ Church, the Liberties, Smithfield, and the inner docklands.',
        includes: [
          'City centre (north and south of the Liffey)',
          'Trinity College, St. Stephen\'s Green',
          'Temple Bar, Smithfield',
          'The Liberties, Phibsborough',
          'Docklands (Grand Canal, Spencer Dock)',
        ],
        excludes: [
          'Dublin Airport (~10 km north)',
          'Sandymount, Ballsbridge (~3+ km)',
          'Phoenix Park\'s western half',
          'Most of Dún Laoghaire-Rathdown',
          'Tallaght, Blanchardstown, Swords',
        ],
      },
      {
        radius: 5,
        unit: 'kilometers',
        label: '5 km',
        description:
          'A 5 km radius covers the central city plus inner suburbs — Ballsbridge, Sandymount, Drumcondra, Phibsborough, Phoenix Park, Inchicore, Rathmines, and Donnybrook.',
        includes: [
          'All of central Dublin',
          'Ballsbridge, Sandymount, Donnybrook',
          'Drumcondra, Phibsborough, Glasnevin',
          'Phoenix Park, Inchicore, Kilmainham',
          'Rathmines, Ranelagh',
        ],
        excludes: [
          'Dublin Airport (~10 km)',
          'Dún Laoghaire (~12 km southeast)',
          'Tallaght (~13 km southwest)',
          'Blanchardstown (~10 km west)',
          'Swords (~14 km north)',
        ],
      },
      {
        radius: 10,
        unit: 'kilometers',
        label: '10 km',
        description:
          'A 10 km radius covers all of Dublin city and most of the M50 ring — Tallaght\'s edge, Blanchardstown, Clontarf, Howth\'s western edge, and Dublin Airport (just inside).',
        includes: [
          'Dublin Airport (DUB) — just inside',
          'Most of the M50 ring',
          'Clontarf, Raheny, Sutton',
          'Tallaght (eastern edge), Blanchardstown',
          'Dún Laoghaire\'s northern edge',
        ],
        excludes: [
          'Tallaght town centre (~13 km)',
          'Bray (~22 km)',
          'Swords (~14 km)',
          'Maynooth (~24 km)',
          'Howth Head (~13 km)',
        ],
      },
      {
        radius: 25,
        unit: 'kilometers',
        label: '25 km',
        description:
          'A 25 km radius covers most of the Greater Dublin Area — Bray, Swords, Maynooth, Lucan, Tallaght, Dún Laoghaire, and the inner commuter belt.',
        includes: [
          'All of the M50 ring and most of the GDA',
          'Bray and Greystones (just inside)',
          'Swords, Malahide, Skerries\'s southern edge',
          'Maynooth, Celbridge, Leixlip',
          'Dún Laoghaire-Rathdown in full',
        ],
        excludes: [
          'Drogheda (~50 km north)',
          'Wicklow town (~50 km)',
          'Naas (~30 km)',
          'Navan (~50 km)',
          'Most of County Wicklow Mountains',
        ],
      },
      {
        radius: 50,
        unit: 'kilometers',
        label: '50 km',
        description:
          'A 50 km radius reaches Drogheda, Naas, Wicklow town, Navan\'s edge, and most of the Greater Dublin commuter belt — the practical outer limit of daily commuting.',
        includes: [
          'Drogheda, Wicklow town, Naas',
          'Navan, Trim',
          'Most of County Wicklow\'s east coast',
          'All of the GDA commuter belt',
          'Most of County Kildare\'s east',
        ],
        excludes: [
          'Galway (~190 km west)',
          'Cork (~250 km southwest)',
          'Belfast (~165 km north)',
          'Limerick (~200 km southwest)',
          'Most of the Wicklow Mountains interior',
        ],
      },
    ],
    useCases: [
      {
        title: 'Dublin city-centre rental search',
        description:
          'A 3–5 km radius from O\'Connell Bridge covers the central rental market — the highest-density area, where most apartments are located. Outside the M50 (10+ km), housing shifts toward semi-detached and detached homes typical of suburban Dublin.',
        recommendedRadius: '3–5 km for inner-city Dublin',
      },
      {
        title: 'M50 commuter zone',
        description:
          'The M50 motorway forms a roughly 8–10 km ring around Dublin and is the practical edge of "Dublin proper". A 10 km radius approximates this — useful for filtering jobs, services, or housing inside vs outside the M50.',
        recommendedRadius: '10 km for inside the M50',
      },
      {
        title: 'Greater Dublin Area catchment',
        description:
          'The Greater Dublin Area covers about 2 million people across Dublin, Meath, Kildare, and Wicklow. A 25 km radius from O\'Connell Bridge captures most of this and is the standard "GDA" service-area for retail and recruitment.',
        recommendedRadius: '25 km for the GDA',
      },
      {
        title: 'Dublin Airport service zone',
        description:
          'Dublin Airport (DUB) sits about 10 km north of O\'Connell Bridge. A 10 km radius reaches the airport just inside, but most airport hotel and ground-transport service zones use a 15 km radius for a comfortable buffer.',
        recommendedRadius: '15 km to comfortably include DUB',
      },
    ],
    quirks: [
      {
        title: 'The Irish Sea cuts the eastern arc',
        description:
          'O\'Connell Bridge sits about 3 km from Dublin Bay. A radius drawn east extends quickly into the sea — a 10 km radius is roughly 25–30% water on the east side, and beyond Howth Head (13 km) the entire eastern arc is open sea.',
      },
      {
        title: 'The M50 = 10 km',
        description:
          'Dublin\'s M50 motorway ring sits at roughly 8–10 km from the centre on most arcs. "Inside the M50" is the most common Dublin shorthand for the urban core, and a 10 km radius is a useful approximation. The N3, N4, N7, and M1 are the radial spokes.',
      },
      {
        title: 'The Wicklow Mountains cap the south',
        description:
          'About 25 km south of Dublin, the Wicklow Mountains rise sharply, with most of the upland area protected as Wicklow Mountains National Park. Beyond ~30 km south, terrain becomes largely uninhabited — a southward radius extends into wilderness rather than population.',
      },
    ],
    faqs: [
      {
        question: 'How big is a 10 km radius in Dublin?',
        answer:
          'A 10 km radius from O\'Connell Bridge covers all of Dublin city, most of the M50 ring, Clontarf, Raheny, Tallaght\'s eastern edge, Blanchardstown, and Dublin Airport. Bray, Swords, and Maynooth sit just outside.',
      },
      {
        question: 'What\'s within 25 km of Dublin?',
        answer:
          'A 25 km radius covers Bray, Swords, Maynooth, Lucan, Tallaght, Dún Laoghaire, Malahide, and most of the Greater Dublin Area. It\'s the standard "GDA" radius for retail catchments and labour markets.',
      },
      {
        question: 'Does a 10 km radius cover Dublin Airport?',
        answer:
          'Yes, just barely. Dublin Airport (DUB) sits about 10 km north of O\'Connell Bridge — comfortably inside a 12 km or 15 km radius, and at the edge of a 10 km circle.',
      },
      {
        question: 'What does "inside the M50" mean and how does it map to a radius?',
        answer:
          '"Inside the M50" refers to the area enclosed by the M50 motorway, Dublin\'s outer ring road. The M50 sits at roughly 8–10 km from O\'Connell Bridge on most arcs, so a 10 km radius is a useful approximation of the urban core.',
      },
      {
        question: 'How far is Bray from Dublin?',
        answer:
          'Bray, in County Wicklow, sits about 22 km south-east of O\'Connell Bridge — just inside a 25 km radius. The DART (Dublin\'s suburban rail) runs from Howth and Malahide through the city centre to Bray and Greystones.',
      },
      {
        question: 'How does Dublin\'s Greater Dublin Area compare to other capital regions?',
        answer:
          'The Greater Dublin Area holds about 2 million people across Dublin city and the surrounding counties of Meath, Kildare, and Wicklow. A 25 km radius captures most of this. By comparison, Greater London needs a 30 km radius and holds nearly 10 million.',
      },
    ],
    lastUpdated: '2026-06-10',
  },
  {
    slug: 'amsterdam',
    name: 'Amsterdam',
    country: 'Netherlands',
    countryCode: 'NL',
    region: 'Europe',
    lat: 52.3730,
    lng: 4.8924,
    defaultRadius: 10,
    defaultUnit: 'kilometers',
    population: 921468,
    populationLabel: 'Amsterdam city proper',
    timezone: 'Europe/Amsterdam',
    fact: 'Amsterdam is unusually compact — the entire city centre fits inside a 3 km radius from Dam Square, and a 10 km radius covers most of the city plus Schiphol Airport and the inner Amsterdam metropolitan ring.',
    intro:
      'Amsterdam is built on a series of concentric canal rings around Dam Square, with the IJ waterway to the north and Schiphol Airport to the southwest. The city is small and dense, so radii here behave very predictably — distance roughly equals walking or cycling time, the way the city is usually navigated. Distances are measured from Dam Square (52.373° N, 4.892° E).',
    alternateNames: ['Mokum', 'Venice of the North', 'A\'dam', 'AMS', 'The Dam'],
    centralLandmark: 'Dam Square',
    coverage: [
      {
        radius: 2,
        unit: 'kilometers',
        label: '2 km',
        description:
          'A 2 km radius from Dam Square covers the entire historic canal ring — the Grachtengordel — plus Jordaan, the museum quarter\'s northern edge, and most of the medieval city.',
        includes: [
          'The full canal ring (Grachtengordel)',
          'Jordaan, Centrum',
          'Red Light District (De Wallen)',
          'Plantage, Eastern Docklands\' western edge',
          'Vondelpark\'s eastern edge',
        ],
        excludes: [
          'Schiphol Airport (~12 km southwest)',
          'Amsterdam Zuid (Zuidas) (~5 km)',
          'Nieuw-West, Slotervaart',
          'Amsterdam Noord beyond the IJ',
          'Bijlmer, Amsterdam Zuidoost',
        ],
      },
      {
        radius: 5,
        unit: 'kilometers',
        label: '5 km',
        description:
          'A 5 km radius covers the canal ring, Vondelpark, the museum quarter, Zuidas (the financial district), Oost (East), Amsterdam Noord across the IJ, and most of inner Amsterdam.',
        includes: [
          'Vondelpark in full, museum quarter (Rijksmuseum, Van Gogh, Stedelijk)',
          'Zuidas (financial district)',
          'Oost, Plantage, Eastern Docklands',
          'Amsterdam Noord (NDSM Wharf area)',
          'Westerpark, Westergasfabriek',
        ],
        excludes: [
          'Schiphol Airport (~12 km)',
          'Amstelveen city centre (~9 km)',
          'Diemen (~7 km east)',
          'Zaandam (~12 km north)',
          'Most of Amsterdam Zuidoost (Bijlmer)',
        ],
      },
      {
        radius: 10,
        unit: 'kilometers',
        label: '10 km',
        description:
          'A 10 km radius covers all of the City of Amsterdam, Amstelveen, Diemen, and most of the inner metropolitan area. Schiphol Airport sits just outside at ~12 km.',
        includes: [
          'All of the City of Amsterdam',
          'Amstelveen, Diemen, Ouder-Amstel',
          'Amsterdam Zuidoost (Bijlmer)',
          'Most of Amsterdam Noord',
          'Westpoort and the inner harbour',
        ],
        excludes: [
          'Schiphol Airport (~12 km southwest)',
          'Zaandam (~12 km north)',
          'Haarlem (~20 km west)',
          'Hoofddorp (~17 km southwest)',
          'Almere (~28 km east)',
        ],
      },
      {
        radius: 25,
        unit: 'kilometers',
        label: '25 km',
        description:
          'A 25 km radius covers Schiphol, Haarlem, Hoofddorp, Zaandam, Hilversum\'s western edge, and most of the Amsterdam metropolitan area. Almere sits just outside.',
        includes: [
          'Schiphol Airport (AMS)',
          'Haarlem, Hoofddorp, Aalsmeer',
          'Zaandam, Purmerend (just inside)',
          'Most of the Amsterdam metropolitan region',
          'Hilversum\'s western edge',
        ],
        excludes: [
          'Almere city centre (~28 km)',
          'Utrecht (~40 km)',
          'Rotterdam (~60 km)',
          'The Hague (~55 km)',
          'Lelystad (~50 km)',
        ],
      },
      {
        radius: 50,
        unit: 'kilometers',
        label: '50 km',
        description:
          'A 50 km radius reaches Utrecht, Almere, Lelystad\'s western edge, Leiden, the IJsselmeer, and most of the Randstad\'s northern half.',
        includes: [
          'Utrecht, Almere, Leiden',
          'Lelystad\'s western edge',
          'IJsselmeer\'s western shore',
          'Most of North Holland and Flevoland',
          'Northern Randstad',
        ],
        excludes: [
          'Rotterdam (~60 km)',
          'The Hague (~55 km)',
          'Eindhoven (~115 km)',
          'Groningen (~180 km)',
          'Maastricht (~200 km)',
        ],
      },
    ],
    useCases: [
      {
        title: 'Inner-Amsterdam apartment search',
        description:
          'Amsterdam is exceptionally compact — a 3 km radius covers the canal ring plus the museum quarter, Vondelpark, and Jordaan. Most "I want to live in central Amsterdam" rental searches stay within this radius.',
        recommendedRadius: '3 km for the canal ring + museum quarter',
      },
      {
        title: 'Bicycle commute zone',
        description:
          'Amsterdam runs on bicycles, and a 5 km radius corresponds to roughly 15–20 minutes by bike — the practical commute distance. A 10 km radius covers everything reachable in 30 minutes by bike, including Amstelveen and most of Noord.',
        recommendedRadius: '5 km for typical bike commute',
      },
      {
        title: 'Schiphol airport service zone',
        description:
          'Schiphol sits ~12 km southwest of Dam Square. A 15 km radius covers the airport, Hoofddorp, and most of the inner southern metro — useful for hotel proximity, ground-transport zones, and corporate office service-area planning.',
        recommendedRadius: '15 km to include Schiphol',
      },
      {
        title: 'Randstad north regional catchment',
        description:
          'The Randstad — the urbanized horseshoe of Amsterdam, Utrecht, Rotterdam, and The Hague — holds about 8 million people. A 50 km radius from Amsterdam covers the northern half (Amsterdam, Utrecht, Leiden, Almere). For the full Randstad, a 65–70 km radius from a central point like Gouda is more appropriate.',
        recommendedRadius: '50 km for northern Randstad',
      },
    ],
    quirks: [
      {
        title: 'The IJ cuts the northern arc',
        description:
          'The IJ waterway runs east-west just north of central Amsterdam, separating the historic city from Amsterdam Noord. There are no road bridges — only ferries and tunnels (IJtunnel, Coentunnel). A radius "covers" Noord but practical travel time is shaped by ferry schedules.',
      },
      {
        title: 'Concentric canal rings are unique to Amsterdam',
        description:
          'Amsterdam\'s 17th-century canal ring is built as concentric semicircles around Dam Square. A radius drawn from the centre matches the city\'s natural geometry — a 1 km radius hits the Singel canal, 1.5 km the Herengracht, 2 km the Singelgracht — the historic outer ring.',
      },
      {
        title: 'Schiphol is unusually close',
        description:
          'Schiphol Airport sits just 12 km southwest of Dam Square — closer to its city centre than many major-city airports. A 15 km radius from Amsterdam covers both the airport and Hoofddorp, making it one of the easier major airports to integrate into urban radius planning.',
      },
    ],
    faqs: [
      {
        question: 'How big is a 5 km radius in Amsterdam?',
        answer:
          'A 5 km radius from Dam Square covers the entire canal ring, Vondelpark, museum quarter, Zuidas (financial district), Oost, and most of inner Amsterdam — including Amsterdam Noord across the IJ.',
      },
      {
        question: 'What\'s within 10 km of Amsterdam?',
        answer:
          'A 10 km radius covers all of the City of Amsterdam, Amstelveen, Diemen, Amsterdam Zuidoost, and the inner metropolitan area. Schiphol Airport sits just outside at ~12 km.',
      },
      {
        question: 'Does a 15 km radius cover Schiphol Airport?',
        answer:
          'Yes. Schiphol (AMS) sits about 12 km southwest of Dam Square, comfortably inside a 15 km radius. A 10 km radius does not reach the airport.',
      },
      {
        question: 'How far is Utrecht from Amsterdam?',
        answer:
          'Utrecht sits about 40 km south-east of Amsterdam — outside a 25 km radius but well inside a 50 km one. Drive time is typically 30–45 minutes; the train takes about 25 minutes.',
      },
      {
        question: 'Why is Amsterdam such a compact city?',
        answer:
          'Amsterdam was built around a 17th-century canal ring designed to be walkable, and modern density and bicycle infrastructure preserved that compactness. The entire historic centre fits inside a 2 km radius — by contrast, Manchester or Madrid require 4–5 km to cover their inner cores.',
      },
      {
        question: 'How do I plan a Randstad-wide catchment from Amsterdam?',
        answer:
          'A 50 km radius from Amsterdam captures the northern half of the Randstad (Amsterdam, Utrecht, Leiden, Almere, Haarlem). For the full Randstad including Rotterdam and The Hague, use a 65–70 km radius from a central point like Gouda, or use the Drive Time Map to validate via the A2 and A4 motorways.',
      },
    ],
    lastUpdated: '2026-06-10',
  },
  {
    slug: 'barcelona',
    name: 'Barcelona',
    country: 'Spain',
    countryCode: 'ES',
    region: 'Europe',
    lat: 41.3870,
    lng: 2.1700,
    defaultRadius: 10,
    defaultUnit: 'kilometers',
    population: 1660122,
    populationLabel: 'Barcelona city proper',
    timezone: 'Europe/Madrid',
    fact: 'Barcelona is wedged between the Mediterranean Sea and the Collserola hills, so its urban area is unusually narrow — the entire city fits inside a 7 km radius from Plaça de Catalunya, and the metro extends primarily north-east and south-west along the coast.',
    intro:
      'Barcelona sits on the Mediterranean coast, with the Collserola mountain range rising sharply 5 km inland. That narrow strip between sea and hills shapes everything: the city is dense and walkable, and a radius drawn from Plaça de Catalunya quickly hits sea or mountain. Distances here are measured from Plaça de Catalunya (41.387° N, 2.170° E).',
    alternateNames: ['Barna', 'BCN', 'Ciudad Condal', 'Comtal', 'La Ciutat'],
    centralLandmark: 'Plaça de Catalunya',
    coverage: [
      {
        radius: 3,
        unit: 'kilometers',
        label: '3 km',
        description:
          'A 3 km radius from Plaça de Catalunya covers the historic centre, the Eixample grid, El Raval, El Born, the Gothic Quarter, the Barceloneta beach, and reaches Sagrada Família and Park Güell\'s southern edge.',
        includes: [
          'Gothic Quarter, El Raval, El Born',
          'Most of the Eixample grid',
          'Sagrada Família, Hospital de Sant Pau',
          'Barceloneta beach and Port Vell',
          'Gràcia (southern half)',
        ],
        excludes: [
          'El Prat Airport (~13 km southwest)',
          'Camp Nou (~4 km west)',
          'Park Güell (~3.5 km north)',
          'Tibidabo (~7 km north)',
          'Most of Sant Andreu, Nou Barris',
        ],
      },
      {
        radius: 5,
        unit: 'kilometers',
        label: '5 km',
        description:
          'A 5 km radius covers the entire dense central city — Eixample, the Old Town, Gràcia, Sant Andreu\'s south, Sants, Camp Nou, and most of Barcelona\'s inner districts.',
        includes: [
          'All of central Barcelona (Eixample, Ciutat Vella, Gràcia)',
          'Sants, Les Corts, Camp Nou',
          'Sant Andreu (southern half), Sant Martí',
          'Park Güell, Montjuïc',
          'Most of the city\'s 10 districts',
        ],
        excludes: [
          'El Prat Airport (~13 km)',
          'Tibidabo summit (~7 km)',
          'L\'Hospitalet de Llobregat (mostly inside but western edge ~6 km)',
          'Badalona (~7 km)',
          'Esplugues de Llobregat',
        ],
      },
      {
        radius: 10,
        unit: 'kilometers',
        label: '10 km',
        description:
          'A 10 km radius covers all of Barcelona city, L\'Hospitalet, Badalona, Sant Adrià de Besòs, and reaches Esplugues, Cornellà, and Santa Coloma de Gramenet — the inner metropolitan ring.',
        includes: [
          'All of the City of Barcelona',
          'L\'Hospitalet de Llobregat in full',
          'Badalona, Sant Adrià de Besòs',
          'Esplugues, Cornellà, Sant Boi (eastern edge)',
          'Santa Coloma de Gramenet, Sant Joan Despí',
        ],
        excludes: [
          'El Prat Airport (~13 km)',
          'Sabadell (~22 km)',
          'Terrassa (~25 km)',
          'Mataró (~30 km)',
          'Sitges (~35 km)',
        ],
      },
      {
        radius: 25,
        unit: 'kilometers',
        label: '25 km',
        description:
          'A 25 km radius covers most of the AMB (Àrea Metropolitana de Barcelona) — Sabadell\'s southern edge, Terrassa\'s southern edge, El Prat Airport, Castelldefels, and the inner Maresme coast.',
        includes: [
          'All of the AMB inner ring',
          'El Prat Airport (BCN)',
          'Sabadell and Terrassa (southern edges)',
          'Castelldefels, Gavà, Viladecans',
          'Mataró\'s southern edge',
        ],
        excludes: [
          'Sabadell city centre (~22 km — just inside)',
          'Sitges (~35 km)',
          'Manresa (~55 km)',
          'Tarragona (~95 km)',
          'Girona (~95 km)',
        ],
      },
      {
        radius: 50,
        unit: 'kilometers',
        label: '50 km',
        description:
          'A 50 km radius reaches Sitges, Vilanova i la Geltrú, Manresa\'s southern edge, Granollers, Mataró, and most of the Barcelona metropolitan region.',
        includes: [
          'Sitges, Vilanova i la Geltrú',
          'Mataró, Premià de Mar',
          'Granollers, Mollet del Vallès',
          'Manresa\'s southern edge',
          'Most of the Barcelona metropolitan region',
        ],
        excludes: [
          'Tarragona (~95 km)',
          'Girona (~95 km)',
          'Lleida (~155 km)',
          'Andorra la Vella (~190 km)',
          'Most of the Pyrenees',
        ],
      },
    ],
    useCases: [
      {
        title: 'Inner-Barcelona apartment search',
        description:
          'A 3 km radius from Plaça de Catalunya covers the Gothic Quarter, El Born, El Raval, and most of the Eixample — the central rental market. A 5 km radius adds Gràcia, Sants, and the rest of the dense city.',
        recommendedRadius: '3–5 km for inner Barcelona',
      },
      {
        title: 'BCN airport service zone',
        description:
          'El Prat Airport sits ~13 km southwest of Plaça de Catalunya. A 15 km radius covers the airport plus the inner southern metro — useful for hotel proximity and ground-transport zones. The R2 train runs from Sants to the airport in 25 minutes.',
        recommendedRadius: '15 km to include El Prat',
      },
      {
        title: 'AMB metropolitan catchment',
        description:
          'The Àrea Metropolitana de Barcelona (AMB) covers about 3.3 million people across 36 municipalities. A 25 km radius from the centre captures most of the AMB — useful for retail and recruitment.',
        recommendedRadius: '25 km for the AMB',
      },
      {
        title: 'Coastal Maresme + Garraf catchment',
        description:
          'For the Catalan coast catchments either side of Barcelona — Maresme north (Mataró, Calella) and Garraf south (Sitges, Vilanova) — a 50 km radius captures both wings. The C-32 motorway is the connecting spine.',
        recommendedRadius: '50 km for Maresme + Garraf coast',
      },
    ],
    quirks: [
      {
        title: 'Mountains and sea cap the radius',
        description:
          'Barcelona is squeezed between the Mediterranean (south-east) and the Collserola hills (north-west) — the urbanized strip is only about 5 km wide. A radius drawn from the centre extends usefully along the coast (north-east and south-west) but quickly hits hills going inland or sea going seaward.',
      },
      {
        title: 'The metro extends along the coast',
        description:
          'The Barcelona metropolitan area follows the coast, with the AMB extending roughly 30 km north-east (toward Mataró) and 30 km south-west (toward Sitges) — but only ~10 km inland before hitting Collserola or the Llobregat valley. A circular radius is a poor fit; a coastal corridor is more accurate.',
      },
      {
        title: 'The Eixample is a perfect grid',
        description:
          'Barcelona\'s 19th-century Eixample district is a regular grid of 113 m × 113 m blocks, designed by Ildefons Cerdà. Inside the Eixample, distance equals roughly time-walked — a 1 km radius is about 9 blocks, a useful mental model for "everything within 12 minutes\' walk".',
      },
    ],
    faqs: [
      {
        question: 'How big is a 5 km radius in Barcelona?',
        answer:
          'A 5 km radius from Plaça de Catalunya covers the entire dense central city — Eixample, Old Town (Ciutat Vella), Gràcia, Sants, Camp Nou, Park Güell, Montjuïc, and most of Barcelona\'s 10 districts.',
      },
      {
        question: 'What\'s within 10 km of Barcelona?',
        answer:
          'A 10 km radius covers all of Barcelona city, plus L\'Hospitalet, Badalona, Sant Adrià, Esplugues, Cornellà, and Santa Coloma — the inner AMB ring of about 2.2 million people.',
      },
      {
        question: 'Does a 15 km radius cover Barcelona–El Prat Airport (BCN)?',
        answer:
          'Yes. El Prat sits about 13 km southwest of Plaça de Catalunya, comfortably inside a 15 km radius. A 10 km radius does not reach the airport.',
      },
      {
        question: 'How far is Sitges from Barcelona?',
        answer:
          'Sitges, the seaside town south of Barcelona, sits about 35 km away — outside a 25 km radius but well inside a 50 km one. The R2 Sud rodalies train takes about 35 minutes.',
      },
      {
        question: 'Why does a Barcelona radius extend along the coast?',
        answer:
          'Because Collserola hills 5 km inland block urbanization to the north-west, and the Mediterranean stops it to the south-east. The metropolitan area extends primarily north-east toward Mataró and south-west toward Sitges, following the C-32 coastal motorway. A circular radius is misleading — a coastal corridor is more useful.',
      },
      {
        question: 'How does the AMB compare to other European metros?',
        answer:
          'The Àrea Metropolitana de Barcelona holds 3.3 million people across 36 municipalities, all within a 20–25 km radius of central Barcelona. By comparison, Greater London (10 million) needs a 30 km radius; Greater Madrid (6.7 million) needs ~25 km. Barcelona is unusually dense for its land area.',
      },
    ],
    lastUpdated: '2026-06-10',
  },
  {
    slug: 'munich',
    name: 'Munich',
    country: 'Germany',
    countryCode: 'DE',
    region: 'Europe',
    lat: 48.1374,
    lng: 11.5755,
    defaultRadius: 15,
    defaultUnit: 'kilometers',
    population: 1488202,
    populationLabel: 'Munich city proper',
    timezone: 'Europe/Berlin',
    fact: 'Munich is one of the most circular major cities in Europe — its medieval centre, S-Bahn ring, and Mittlerer Ring autobahn all form near-perfect circles around Marienplatz, making radius-based analysis unusually clean.',
    intro:
      'Munich is built in concentric rings: the medieval core inside the old wall, the Mittlerer Ring road at roughly 4–5 km, the city limits at roughly 8 km, and the Bavarian commuter belt extending to about 50 km. Unlike coastal cities, Munich has no major water or sea boundary — radii here behave almost like textbook circles. Distances are measured from Marienplatz (48.137° N, 11.575° E).',
    alternateNames: ['München', 'Athens on the Isar', 'Weltstadt mit Herz'],
    centralLandmark: 'Marienplatz',
    coverage: [
      {
        radius: 2,
        unit: 'kilometers',
        label: '2 km',
        description:
          'A 2 km radius from Marienplatz covers the medieval Altstadt, the Hofgarten, the Englischer Garten\'s southern edge, the Hauptbahnhof (main station), and most of the Old Town within the former wall.',
        includes: [
          'Altstadt (medieval old town)',
          'Hofgarten, Residenz',
          'Hauptbahnhof (main station)',
          'Englischer Garten\'s southern edge',
          'Maxvorstadt, Glockenbachviertel',
        ],
        excludes: [
          'Munich Airport (~28 km northeast)',
          'Allianz Arena (~10 km north)',
          'Olympiapark (~4 km northwest)',
          'BMW Welt and Headquarters (~5 km north)',
          'Most of Schwabing\'s northern half',
        ],
      },
      {
        radius: 5,
        unit: 'kilometers',
        label: '5 km',
        description:
          'A 5 km radius covers the central city plus the Mittlerer Ring (middle ring road), Olympiapark, BMW Welt, the full Englischer Garten, Schwabing, Sendling, and Bogenhausen.',
        includes: [
          'All of central Munich and the Mittlerer Ring',
          'Olympiapark, BMW Welt',
          'Schwabing, Maxvorstadt, Bogenhausen',
          'Sendling, Westend',
          'Most of central districts',
        ],
        excludes: [
          'Munich Airport (~28 km)',
          'Allianz Arena (~10 km north)',
          'Garching and Forschungszentrum (~12 km north)',
          'Großhadern (~7 km southwest)',
          'Riem (~10 km east)',
        ],
      },
      {
        radius: 10,
        unit: 'kilometers',
        label: '10 km',
        description:
          'A 10 km radius covers all of the City of Munich within its administrative limits, plus the Allianz Arena, Garching\'s southern edge, and reaches the inner ring of suburbs (Unterhaching, Ottobrunn, Pullach).',
        includes: [
          'All of the City of Munich',
          'Allianz Arena (Fröttmaning)',
          'Garching (southern edge)',
          'Unterhaching, Ottobrunn, Pullach',
          'Riem, Trudering',
        ],
        excludes: [
          'Munich Airport (~28 km)',
          'Garching town centre (~12 km — just outside)',
          'Dachau (~18 km)',
          'Erding (~30 km)',
          'Starnberg (~25 km)',
        ],
      },
      {
        radius: 25,
        unit: 'kilometers',
        label: '25 km',
        description:
          'A 25 km radius covers most of the Munich metropolitan inner ring — Dachau, Starnberg, Wolfratshausen, Holzkirchen\'s northern edge, and Erding\'s western edge. Munich Airport sits just outside.',
        includes: [
          'Dachau, Garching, Oberschleißheim',
          'Starnberg, Tutzing\'s northern edge',
          'Wolfratshausen, Geretsried',
          'Erding\'s western edge',
          'Most of the inner Munich metro region',
        ],
        excludes: [
          'Munich Airport (~28 km)',
          'Erding city centre (~30 km)',
          'Augsburg (~65 km)',
          'Ingolstadt (~80 km)',
          'Garmisch-Partenkirchen (~85 km)',
        ],
      },
      {
        radius: 50,
        unit: 'kilometers',
        label: '50 km',
        description:
          'A 50 km radius covers Munich Airport, Augsburg\'s eastern edge, Ingolstadt\'s southern edge, Rosenheim\'s western edge, and most of the Bavarian commuter belt.',
        includes: [
          'Munich Airport (MUC)',
          'Augsburg\'s eastern edge',
          'Ingolstadt\'s southern edge',
          'Rosenheim\'s western edge',
          'Most of the Bavarian commuter belt',
        ],
        excludes: [
          'Augsburg city centre (~65 km)',
          'Nuremberg (~165 km)',
          'Garmisch-Partenkirchen (~85 km)',
          'Salzburg (~150 km)',
          'Innsbruck (~165 km)',
        ],
      },
    ],
    useCases: [
      {
        title: 'Inner-Munich rental search',
        description:
          'A 3 km radius from Marienplatz covers the Altstadt and most of the densely-built central districts where rentals concentrate. A 5 km radius adds the Mittlerer Ring and Schwabing — the practical "central Munich" rental market.',
        recommendedRadius: '3–5 km for central Munich',
      },
      {
        title: 'S-Bahn commuter zone',
        description:
          'Munich\'s S-Bahn network extends roughly 40 km from Marienplatz on most lines, with frequent service. A 25 km radius captures the inner S-Bahn ring (Dachau, Starnberg, Wolfratshausen); a 50 km radius captures the full S-Bahn area (Tutzing, Holzkirchen, Erding, Petershausen).',
        recommendedRadius: '25–50 km for S-Bahn commute',
      },
      {
        title: 'Munich Airport service zone',
        description:
          'Munich Airport (MUC, Franz Josef Strauß) sits ~28 km north-east of Marienplatz, just outside a 25 km radius. For airport-inclusive service zones, a 30 km radius is standard. The S1 and S8 S-Bahn lines connect MUC to Marienplatz in about 40 minutes.',
        recommendedRadius: '30 km to comfortably include MUC',
      },
      {
        title: 'Bavarian regional catchment',
        description:
          'A 50 km radius from Munich covers Augsburg, Ingolstadt, Rosenheim — the inner Bavarian catchment. For larger regional analysis, a 100 km radius reaches Nuremberg and Garmisch-Partenkirchen and covers most of southern Bavaria.',
        recommendedRadius: '50 km for inner Bavaria',
      },
    ],
    quirks: [
      {
        title: 'Concentric rings make radius easy',
        description:
          'Munich\'s Altstadtring (~1 km), Mittlerer Ring (~4 km), and city limit (~8 km) are all near-perfect circles around Marienplatz. Unlike coastal or peninsular cities, a Munich radius behaves like a textbook circle — making catchment math unusually clean.',
      },
      {
        title: 'The Alps cap southward expansion',
        description:
          'The Bavarian Alps rise about 80 km south of Munich, with terrain becoming hilly around 60–70 km. A southward radius beyond ~50 km extends into pre-alpine and alpine country with limited population — Garmisch-Partenkirchen sits at about 85 km, but the population density falls off sharply south of the A8 motorway.',
      },
      {
        title: 'The Isar cuts through, not around',
        description:
          'The Isar river runs north-south through the city but is small enough to not significantly distort a radius (unlike the Thames or Seine). It\'s crossable on dozens of bridges within central Munich, so a radius treats it as a minor feature, not a barrier.',
      },
    ],
    faqs: [
      {
        question: 'How big is a 5 km radius in Munich?',
        answer:
          'A 5 km radius from Marienplatz covers all of central Munich, the Mittlerer Ring (middle ring road), Olympiapark, BMW Welt, the full Englischer Garten, Schwabing, and most of the city\'s central districts.',
      },
      {
        question: 'What\'s within 25 km of Munich?',
        answer:
          'A 25 km radius covers Dachau, Garching, Starnberg, Wolfratshausen, Holzkirchen\'s edge, and most of the inner Munich metropolitan ring — about 2.5 million people. Munich Airport sits just outside at ~28 km.',
      },
      {
        question: 'Does a 25 km radius cover Munich Airport (MUC)?',
        answer:
          'No, just barely outside. Munich Airport sits about 28 km north-east of Marienplatz. A 30 km radius is the standard airport-inclusive zone for Munich.',
      },
      {
        question: 'How far is Augsburg from Munich?',
        answer:
          'Augsburg sits about 65 km west of Munich — outside a 50 km radius but well inside a 75 km one. The ICE and Regio trains connect Munich Hauptbahnhof to Augsburg in 30–45 minutes.',
      },
      {
        question: 'Why is Munich easier to map with a radius than other European cities?',
        answer:
          'Because Munich has no major water boundary and is built in concentric rings around Marienplatz. A radius drawn from the centre matches the city\'s natural geometry — unlike Hamburg (water), Lisbon (river + sea), or Naples (bay), where radius-based catchments lose major area to water.',
      },
      {
        question: 'How do I plan a Bavarian regional catchment from Munich?',
        answer:
          'Use a 50 km radius for the inner Bavarian catchment (Augsburg edge, Ingolstadt edge, Rosenheim edge — about 4 million people). A 100 km radius extends to Nuremberg and Garmisch-Partenkirchen, covering most of southern Bavaria. The A8, A9, A92, and A95 autobahns are the radial spokes.',
      },
    ],
    lastUpdated: '2026-06-10',
  },
  {
    slug: 'singapore',
    name: 'Singapore',
    country: 'Singapore',
    countryCode: 'SG',
    region: 'Asia',
    lat: 1.2868,
    lng: 103.8545,
    defaultRadius: 10,
    defaultUnit: 'kilometers',
    population: 5917648,
    populationLabel: 'Singapore (whole country)',
    timezone: 'Asia/Singapore',
    fact: 'Singapore is so small that a 25 km radius from Marina Bay covers the entire country plus parts of Malaysia (Johor Bahru) — it\'s the only major city where a single radius can cover the whole sovereign nation.',
    intro:
      'Singapore is a city-state — an island nation about 50 km east-west and 27 km north-south. The Johor Strait separates it from Malaysia to the north, the Singapore Strait from Indonesia to the south. Distances here are measured from Merlion Park / Marina Bay (1.287° N, 103.855° E), the symbolic centre.',
    alternateNames: ['SG', 'Lion City', 'Garden City', 'The Little Red Dot', 'Singapura', 'Sinkapor'],
    centralLandmark: 'Merlion Park (Marina Bay)',
    coverage: [
      {
        radius: 3,
        unit: 'kilometers',
        label: '3 km',
        description:
          'A 3 km radius from Marina Bay covers the Central Business District, Marina Bay Sands, the Civic District, Chinatown, Little India\'s southern edge, and the inner CBD waterfront.',
        includes: [
          'Marina Bay Sands, Gardens by the Bay',
          'Raffles Place CBD, Civic District',
          'Chinatown, Clarke Quay, Boat Quay',
          'Bras Basah, Bugis (southern edge)',
          'Tanjong Pagar',
        ],
        excludes: [
          'Changi Airport (~17 km east)',
          'Orchard Road most (~3.5 km)',
          'Sentosa southern half',
          'Most of Tiong Bahru',
          'Bishan, Toa Payoh',
        ],
      },
      {
        radius: 5,
        unit: 'kilometers',
        label: '5 km',
        description:
          'A 5 km radius covers the CBD, Orchard Road, Sentosa, Bugis, Little India, Tiong Bahru, and the inner heartland districts of Toa Payoh and Bishan\'s southern edge.',
        includes: [
          'Orchard Road shopping belt',
          'Sentosa Island in full',
          'Little India, Bugis, Bras Basah',
          'Tiong Bahru, Tanjong Pagar',
          'Toa Payoh\'s southern half',
        ],
        excludes: [
          'Changi Airport (~17 km)',
          'Jurong East (~14 km west)',
          'Woodlands and Johor Causeway (~20 km north)',
          'Tampines (~14 km east)',
          'Pasir Ris, Loyang',
        ],
      },
      {
        radius: 10,
        unit: 'kilometers',
        label: '10 km',
        description:
          'A 10 km radius from Marina Bay covers most of central Singapore — the CBD, Orchard, Bishan, Toa Payoh, Geylang, Bedok\'s western edge, and Bukit Timah.',
        includes: [
          'Most of central and central-east Singapore',
          'Bishan, Toa Payoh, Geylang',
          'Bedok (western edge), Tampines (just outside)',
          'Bukit Timah, Holland Village',
          'Most of the central catchment',
        ],
        excludes: [
          'Changi Airport (~17 km)',
          'Jurong East (~14 km)',
          'Woodlands (~20 km)',
          'Tampines town centre (~14 km)',
          'Tuas (~30 km)',
        ],
      },
      {
        radius: 25,
        unit: 'kilometers',
        label: '25 km',
        description:
          'A 25 km radius covers the entire island of Singapore — Changi Airport, Tuas, Woodlands, Jurong, Tampines, and Pasir Ris — plus most of Johor Bahru, Malaysia just across the Causeway.',
        includes: [
          'Entire island of Singapore (all districts)',
          'Changi International Airport (SIN)',
          'Jurong, Tuas (industrial west)',
          'Woodlands, Yishun, Sembawang',
          'Johor Bahru, Malaysia (across the Causeway)',
        ],
        excludes: [
          'Most of Johor state, Malaysia',
          'Batam, Indonesia (~30 km south)',
          'Bintan, Indonesia',
          'Kuala Lumpur (~330 km north)',
          'Most of the Riau Islands',
        ],
      },
      {
        radius: 50,
        unit: 'kilometers',
        label: '50 km',
        description:
          'A 50 km radius reaches into Johor state, Malaysia (Kulai, Senai International Airport, Pontian) and Batam Island, Indonesia — covering the entire SIJORI growth triangle\'s inner ring.',
        includes: [
          'All of Singapore',
          'Most of southern Johor state, Malaysia (Kulai, Senai)',
          'Batam Island, Indonesia',
          'Bintan Island\'s western edge',
          'Inner SIJORI (Singapore-Johor-Riau)',
        ],
        excludes: [
          'Kuala Lumpur (~330 km)',
          'Mersing (~110 km)',
          'Tanjung Pinang (~80 km)',
          'Most of mainland Indonesia',
          'Penang (~600 km)',
        ],
      },
    ],
    useCases: [
      {
        title: 'CBD condo and rental search',
        description:
          'A 3 km radius from Marina Bay covers the CBD, Orchard fringe, Bugis, Tanjong Pagar, and the central condo market — Singapore\'s most expensive and densest residential area. A 5 km radius adds the inner heartland districts.',
        recommendedRadius: '3 km for CBD condos',
      },
      {
        title: 'MRT-station catchment',
        description:
          'Singapore\'s MRT network covers virtually the entire island, with most residential areas within 1 km of a station. For property analysis, a 1 km radius from any MRT station is a strong walkability signal; a 10 km radius from Marina Bay covers most of the central MRT lines.',
        recommendedRadius: '1 km MRT-station walkability + 10 km central MRT',
      },
      {
        title: 'Changi Airport service zone',
        description:
          'Changi Airport sits ~17 km east of Marina Bay. A 20 km radius covers Changi plus the eastern heartland (Tampines, Bedok, Pasir Ris). The MRT East-West Line connects Changi to the CBD in about 35 minutes.',
        recommendedRadius: '20 km to include Changi and eastern districts',
      },
      {
        title: 'SIJORI cross-border catchment',
        description:
          'For analyses crossing into Johor (Malaysia) and Batam (Indonesia) — the SIJORI growth triangle — a 50 km radius from Singapore captures the inner ring: Johor Bahru, Senai, Kulai, Batam. Border crossings (Causeway and Tuas Second Link) are the binding constraints.',
        recommendedRadius: '50 km for inner SIJORI cross-border',
      },
    ],
    quirks: [
      {
        title: 'A 25 km radius covers an entire country',
        description:
          'Singapore\'s land area is about 735 km². A 25 km radius from Marina Bay covers the entire island and reaches into Malaysia. This is unique among major cities — Singapore is the only sovereign nation where a single 25 km circle from the centre captures every inhabitant.',
      },
      {
        title: 'Sea on three sides, but causeways to Malaysia',
        description:
          'Singapore Strait is south, Johor Strait is north, and the Singapore-Malaysia Causeway and the Tuas Second Link are the only road crossings. A radius "covers" Johor Bahru geographically but border-crossing time at peak (often 1–2 hours) is the real constraint.',
      },
      {
        title: 'The whole city is within 30 km',
        description:
          'No point on Singapore island is more than about 27 km from Marina Bay. This makes Singapore the most "scale-invariant" major city for radius analysis — unlike sprawling metros like Tokyo or LA, where you have to choose carefully which centre point to use.',
      },
    ],
    faqs: [
      {
        question: 'How big is a 10 km radius in Singapore?',
        answer:
          'A 10 km radius from Marina Bay covers most of central and central-east Singapore — the CBD, Orchard, Bishan, Toa Payoh, Geylang, Bedok\'s western edge, Bukit Timah, and Holland Village. Changi Airport, Jurong, and Woodlands are just outside.',
      },
      {
        question: 'What\'s within 25 km of Singapore?',
        answer:
          'A 25 km radius from Marina Bay covers the entire island of Singapore — every district, Changi Airport, Tuas, Woodlands, Jurong — plus most of Johor Bahru, Malaysia across the Causeway. It\'s the smallest single radius that captures all of Singapore.',
      },
      {
        question: 'Does a 20 km radius cover Singapore Changi Airport (SIN)?',
        answer:
          'Yes. Changi Airport sits about 17 km east of Marina Bay, comfortably inside a 20 km radius. A 15 km radius does not reach Changi.',
      },
      {
        question: 'How far is Johor Bahru from Singapore?',
        answer:
          'Johor Bahru, Malaysia sits about 22 km north of Marina Bay across the Causeway — just inside a 25 km radius. Border-crossing time at the Woodlands and Tuas checkpoints can range from 15 minutes off-peak to 2+ hours during weekend rush.',
      },
      {
        question: 'Why can a Singapore radius cover an entire country?',
        answer:
          'Because Singapore is a city-state — an island nation about 50 km east-west and 27 km north-south, with a total area of 735 km². No other sovereign country fits inside a 30 km radius. The next-smallest major countries (Vatican, Monaco, Liechtenstein) are city-sized too but lack a major metropolitan economy.',
      },
      {
        question: 'How do I plan an MRT-station catchment in Singapore?',
        answer:
          'Singapore\'s MRT network covers virtually all populated areas of the island. For property or retail analysis, a 1 km radius from any MRT station typically captures the walkable catchment. For broader analysis, a 10 km radius from Marina Bay covers most central MRT lines, and a 25 km radius covers all of Singapore including the most peripheral lines.',
      },
    ],
    lastUpdated: '2026-06-10',
  },
  {
    slug: 'hong-kong',
    name: 'Hong Kong',
    country: 'Hong Kong',
    countryCode: 'HK',
    region: 'Asia',
    lat: 22.2810,
    lng: 114.1593,
    defaultRadius: 10,
    defaultUnit: 'kilometers',
    population: 7448900,
    populationLabel: 'Hong Kong (whole SAR)',
    timezone: 'Asia/Hong_Kong',
    fact: 'Hong Kong is split across Hong Kong Island, Kowloon, and the New Territories — a 10 km radius from Statue Square covers most of the urban core, but mountainous terrain means the full SAR requires a 30+ km radius.',
    intro:
      'Hong Kong sits on a deepwater harbour on the south China coast, divided between Hong Kong Island (south of the harbour), Kowloon (north of the harbour), and the New Territories (further north, bordering mainland China). Mountainous terrain and water dominate the geometry — most of the SAR is parkland, and population concentrates on a thin urban strip. Distances here are measured from Statue Square in Central (22.281° N, 114.159° E).',
    alternateNames: ['HK', 'Fragrant Harbour', 'Pearl of the Orient', '香港', 'HKSAR', 'The 852'],
    centralLandmark: 'Statue Square (Central)',
    coverage: [
      {
        radius: 3,
        unit: 'kilometers',
        label: '3 km',
        description:
          'A 3 km radius from Statue Square covers Central, Wan Chai, Causeway Bay, the Mid-Levels, and reaches Tsim Sha Tsui across Victoria Harbour — the densest urban core of Hong Kong.',
        includes: [
          'Central, Sheung Wan, Admiralty',
          'Wan Chai, Causeway Bay',
          'Mid-Levels (lower half)',
          'Tsim Sha Tsui (across the harbour)',
          'Hung Hom\'s western edge',
        ],
        excludes: [
          'Hong Kong International Airport (~30 km west)',
          'Mong Kok (~4 km north)',
          'Kowloon Tong (~6 km north)',
          'Victoria Peak (~3.5 km southwest)',
          'Stanley, Repulse Bay',
        ],
      },
      {
        radius: 5,
        unit: 'kilometers',
        label: '5 km',
        description:
          'A 5 km radius covers all of central Hong Kong Island, all of Kowloon south of Boundary Street — Mong Kok, Yau Ma Tei, Hung Hom, To Kwa Wan — and the Peak.',
        includes: [
          'All central HK Island districts',
          'Mong Kok, Yau Ma Tei, Jordan',
          'Hung Hom, To Kwa Wan, Whampoa',
          'Victoria Peak',
          'North Point, Quarry Bay (western edge)',
        ],
        excludes: [
          'HK International Airport (~30 km)',
          'Sha Tin (~12 km north)',
          'Kowloon Bay (~8 km)',
          'Stanley, Repulse Bay',
          'Tseung Kwan O (~12 km east)',
        ],
      },
      {
        radius: 10,
        unit: 'kilometers',
        label: '10 km',
        description:
          'A 10 km radius covers most of urban Hong Kong — all of Hong Kong Island\'s north shore, all of Kowloon, Lai Chi Kok, Tsuen Wan\'s eastern edge, and the inner New Territories.',
        includes: [
          'All of urban Hong Kong Island and Kowloon',
          'Lai Chi Kok, Cheung Sha Wan',
          'Kowloon Bay, Kwun Tong',
          'Tsuen Wan (eastern edge), Lai King',
          'Most of urban-density Hong Kong',
        ],
        excludes: [
          'HK International Airport (~30 km)',
          'Sha Tin town centre (~12 km)',
          'Tseung Kwan O (~12 km)',
          'Yuen Long (~30 km)',
          'Tuen Mun (~25 km)',
        ],
      },
      {
        radius: 25,
        unit: 'kilometers',
        label: '25 km',
        description:
          'A 25 km radius covers all of urban Hong Kong, Sha Tin, Tseung Kwan O, Tuen Mun\'s eastern edge, and most of the densely populated New Territories.',
        includes: [
          'All of urban Hong Kong (Island, Kowloon, Sha Tin)',
          'Tseung Kwan O, Sai Kung\'s western edge',
          'Tsuen Wan, Tuen Mun (eastern edge)',
          'Yuen Long\'s southern edge',
          'Most of the developed New Territories',
        ],
        excludes: [
          'HK International Airport (~30 km)',
          'Yuen Long town centre (~30 km)',
          'Tuen Mun town centre (~25 km — just inside)',
          'Shenzhen, China (~35 km north)',
          'Lantau Island\'s western half',
        ],
      },
      {
        radius: 50,
        unit: 'kilometers',
        label: '50 km',
        description:
          'A 50 km radius covers all of the Hong Kong SAR, Hong Kong International Airport, Lantau Island, the Shenzhen border, and reaches into Shenzhen, China.',
        includes: [
          'All of the Hong Kong SAR',
          'HK International Airport (HKG) on Lantau',
          'Shenzhen, China (Luohu, Futian, Nanshan)',
          'Most of the Pearl River Delta\'s eastern edge',
          'Lantau Island in full',
        ],
        excludes: [
          'Guangzhou (~145 km)',
          'Macau (~65 km west)',
          'Dongguan (~80 km)',
          'Most of mainland Guangdong',
          'Zhuhai (~70 km)',
        ],
      },
    ],
    useCases: [
      {
        title: 'Central + Mid-Levels rental search',
        description:
          'A 3 km radius from Statue Square covers Central, Sheung Wan, Admiralty, Wan Chai, the Mid-Levels, and Tsim Sha Tsui — Hong Kong\'s most expensive rental market. A 5 km radius adds Mong Kok and Causeway Bay.',
        recommendedRadius: '3 km for central HK Island + TST',
      },
      {
        title: 'MTR catchment for property',
        description:
          'Hong Kong\'s MTR network is the spine of the city — most residential areas are within 1 km of an MTR station. For property analysis, use a 500 m radius for true station walkability; for area-wide analysis, a 10 km radius from Central covers all the Island, Tung Chung Line, and most Kowloon lines.',
        recommendedRadius: '500 m MTR-station + 10 km urban',
      },
      {
        title: 'HK Airport service zone',
        description:
          'Hong Kong International Airport sits on Lantau Island, ~30 km west of Statue Square. A 35 km radius is the standard airport-inclusive zone for hotel and ground-transport analysis. The Airport Express MTR connects HKG to Hong Kong Station in 24 minutes.',
        recommendedRadius: '35 km to include HKG',
      },
      {
        title: 'Cross-border Greater Bay Area catchment',
        description:
          'The Greater Bay Area (Hong Kong + Macau + 9 mainland Chinese cities) holds about 86 million people. A 50 km radius from Hong Kong reaches Shenzhen — the closest mainland Chinese megacity at ~35 km north. For full GBA analysis, a 150 km radius from a central point like Dongguan is more appropriate.',
        recommendedRadius: '50 km for HK + Shenzhen',
      },
    ],
    quirks: [
      {
        title: 'Mountains take 70% of the land',
        description:
          'About 75% of Hong Kong\'s territory is hillside, country park, or undeveloped. Population concentrates on a narrow strip of flat land along Victoria Harbour, the Sha Tin valley, and the western New Territories. A radius from Central looks generous on the map, but most of it is uninhabited park.',
      },
      {
        title: 'Victoria Harbour splits Island from Kowloon',
        description:
          'Victoria Harbour is only about 1–2 km wide between Central and Tsim Sha Tsui, but it\'s a major psychological and infrastructure boundary. Cross-harbour traffic via the Cross-Harbour Tunnel, Eastern, Western, and Tuen Mun-Chek Lap Kok tunnels is the binding constraint — drive time can be 30+ minutes at peak.',
      },
      {
        title: 'Three regions, one SAR',
        description:
          'Hong Kong is administratively one Special Administrative Region but functionally three: Hong Kong Island (south of harbour, 1.2 million people), Kowloon (north of harbour, 2.2 million), and the New Territories (north of Kowloon, 4 million plus). A radius drawn from Central doesn\'t reach the New Territories\' centre until ~10 km.',
      },
    ],
    faqs: [
      {
        question: 'How big is a 10 km radius in Hong Kong?',
        answer:
          'A 10 km radius from Statue Square covers all of urban Hong Kong Island\'s north shore, all of Kowloon, Lai Chi Kok, Kwun Tong, and the inner New Territories — roughly 5 million people.',
      },
      {
        question: 'What\'s within 25 km of Hong Kong\'s Central?',
        answer:
          'A 25 km radius covers all of urban Hong Kong, Sha Tin, Tseung Kwan O, Tsuen Wan, and most of the densely populated New Territories. Hong Kong International Airport sits just outside at ~30 km.',
      },
      {
        question: 'Does a 35 km radius cover Hong Kong International Airport (HKG)?',
        answer:
          'Yes. HKG sits on Lantau Island about 30 km west of Statue Square, comfortably inside a 35 km radius. A 25 km radius does not reach the airport.',
      },
      {
        question: 'How far is Shenzhen from Hong Kong?',
        answer:
          'The Lo Wu and Lok Ma Chau border crossings sit about 30 km north of Statue Square. Downtown Futian, Shenzhen is about 35–40 km away. A 50 km radius from Central covers most of urban Shenzhen.',
      },
      {
        question: 'Why is so much of a Hong Kong radius empty?',
        answer:
          'About 75% of Hong Kong\'s land is country park, hillside, or undeveloped. Population is squeezed onto narrow flat strips along the harbour and a few valleys. A 25 km radius looks like 1,960 km² of geography but the inhabited area inside is closer to 500 km².',
      },
      {
        question: 'How do I plan an MTR-station catchment in Hong Kong?',
        answer:
          'Hong Kong\'s MTR network is dense and most urban residents live within 1 km of a station. For property or retail analysis, a 500 m radius from any MTR station typically captures the immediate walkable catchment. For broader analysis, a 10 km radius from Central covers most of the urban MTR lines, and a 25 km radius covers the New Territories lines too.',
      },
    ],
    lastUpdated: '2026-06-10',
  },
  {
    slug: 'auckland',
    name: 'Auckland',
    country: 'New Zealand',
    countryCode: 'NZ',
    region: 'Oceania',
    lat: -36.8484,
    lng: 174.7621,
    defaultRadius: 15,
    defaultUnit: 'kilometers',
    population: 1656000,
    populationLabel: 'Auckland urban area',
    timezone: 'Pacific/Auckland',
    fact: 'Auckland is built on an isthmus less than 2 km wide at its narrowest, with the Waitematā Harbour to the east and the Manukau Harbour to the west — a radius drawn from the city centre crosses both harbours within 5 km.',
    intro:
      'Auckland is built on a narrow volcanic isthmus between two harbours: the Waitematā (Pacific-facing) and the Manukau (Tasman-facing). The city sprawls over 50+ extinct volcanic cones and out across the Hauraki Gulf islands. Distances here are measured from the Sky Tower in central Auckland (-36.848° S, 174.762° E).',
    alternateNames: ['Tāmaki Makaurau', 'City of Sails', 'Akarana', 'AKL', 'The Big Smoke'],
    centralLandmark: 'Sky Tower',
    coverage: [
      {
        radius: 5,
        unit: 'kilometers',
        label: '5 km',
        description:
          'A 5 km radius from the Sky Tower covers the CBD, Ponsonby, Parnell, Newmarket, Mount Eden, Grey Lynn, and reaches Devonport across the harbour by ferry distance, plus the inner Eden Park and Mount Albert.',
        includes: [
          'Auckland CBD, Viaduct, Wynyard Quarter',
          'Ponsonby, Grey Lynn, Westmere',
          'Parnell, Newmarket, Eden Terrace',
          'Mount Eden, Mount Albert (eastern edge)',
          'Devonport (across the harbour)',
        ],
        excludes: [
          'Auckland Airport (~21 km south)',
          'North Shore beyond Takapuna',
          'Manukau (~20 km south)',
          'Henderson, West Auckland',
          'Howick, East Auckland',
        ],
      },
      {
        radius: 10,
        unit: 'kilometers',
        label: '10 km',
        description:
          'A 10 km radius covers most of central and inner Auckland — the CBD, all Auckland inner suburbs, North Shore (Takapuna, Devonport, Birkenhead), and reaches Onehunga and Mount Wellington.',
        includes: [
          'Most of central and inner Auckland',
          'North Shore (Takapuna, Devonport, Birkenhead)',
          'Onehunga, Mount Wellington, Penrose',
          'Mount Albert, New Lynn (eastern edge)',
          'Glenfield, Northcote',
        ],
        excludes: [
          'Auckland Airport (~21 km)',
          'Manukau (~20 km)',
          'Henderson (~13 km)',
          'Howick (~17 km)',
          'Albany (~16 km)',
        ],
      },
      {
        radius: 15,
        unit: 'kilometers',
        label: '15 km',
        description:
          'A 15 km radius covers most of inner and middle Auckland — Henderson\'s eastern edge, Albany\'s southern edge, Howick\'s western edge, Manukau\'s northern edge, and the inner harbour suburbs.',
        includes: [
          'Most of inner and middle Auckland',
          'Henderson (eastern edge)',
          'Albany (southern edge), Glenfield',
          'Howick (western edge), Pakuranga',
          'Manukau\'s northern edge',
        ],
        excludes: [
          'Auckland Airport (~21 km)',
          'Manukau city centre (~20 km)',
          'Albany city centre (~16 km — just outside)',
          'Orewa (~30 km north)',
          'Papakura (~30 km south)',
        ],
      },
      {
        radius: 25,
        unit: 'kilometers',
        label: '25 km',
        description:
          'A 25 km radius covers most of urban Auckland — Auckland Airport, Manukau, Howick, Albany, Henderson, Whenuapai, the inner Hauraki Gulf islands, and reaches Papakura\'s northern edge.',
        includes: [
          'Auckland International Airport (AKL)',
          'Manukau, Howick, Pakuranga',
          'Albany, Whenuapai, Hobsonville',
          'Henderson, Te Atatū',
          'Waiheke Island (southern half)',
          'Most of urban Auckland',
        ],
        excludes: [
          'Papakura town centre (~30 km)',
          'Pukekohe (~50 km)',
          'Hibiscus Coast / Orewa (~30 km)',
          'Warkworth (~60 km)',
          'Hamilton (~120 km south)',
        ],
      },
      {
        radius: 50,
        unit: 'kilometers',
        label: '50 km',
        description:
          'A 50 km radius covers all of urban Auckland, Pukekohe, Orewa, Warkworth\'s southern edge, and most of the Auckland Region.',
        includes: [
          'All of urban Auckland',
          'Pukekohe, Drury',
          'Orewa, Hibiscus Coast',
          'Warkworth (southern edge)',
          'Most of the Auckland Region',
          'Most of the Hauraki Gulf inner islands',
        ],
        excludes: [
          'Hamilton (~120 km)',
          'Whangārei (~150 km)',
          'Tauranga (~200 km)',
          'Coromandel town (~85 km)',
          'Most of the Coromandel Peninsula',
        ],
      },
    ],
    useCases: [
      {
        title: 'Inner-Auckland rental search',
        description:
          'A 5 km radius from the Sky Tower covers the CBD, Ponsonby, Parnell, Newmarket, Mount Eden, Devonport, and the densest inner suburbs — Auckland\'s most expensive rental market.',
        recommendedRadius: '5 km for inner Auckland',
      },
      {
        title: 'Auckland-wide commute zone',
        description:
          'A 25 km radius captures most of urban Auckland\'s 1.5 million people. The motorway network (SH1, SH16, SH20) is the practical constraint — drive time can vary wildly with traffic, especially across the Auckland Harbour Bridge.',
        recommendedRadius: '25 km for greater Auckland',
      },
      {
        title: 'AKL airport service zone',
        description:
          'Auckland Airport sits ~21 km south of the Sky Tower, in Māngere. A 25 km radius covers AKL plus most of urban Auckland — useful for hotel proximity and ground-transport zones.',
        recommendedRadius: '25 km to include AKL',
      },
      {
        title: 'Auckland Region catchment',
        description:
          'The full Auckland Region — including Pukekohe, Orewa, and Warkworth — extends to about 50 km from the city centre. A 50 km radius captures the entire region (1.7 million people) but reaches into rural land and the Hauraki Gulf islands.',
        recommendedRadius: '50 km for Auckland Region',
      },
    ],
    quirks: [
      {
        title: 'Two harbours and an isthmus',
        description:
          'Auckland is built on the narrowest part of the North Island — about 2 km between the Waitematā Harbour (east) and the Manukau Harbour (west). A radius from the city centre loses major area to both harbours, plus the Hauraki Gulf to the north and east.',
      },
      {
        title: 'The Auckland Harbour Bridge is the only northern crossing',
        description:
          'The North Shore is reachable only via the Auckland Harbour Bridge (SH1) or by ferry. A 5 km radius "covers" Devonport geographically, but Devonport-to-CBD by road is 7 km via the bridge, and at peak congestion can take 30+ minutes.',
      },
      {
        title: 'Volcanic cones dot the city',
        description:
          'Auckland has 53 volcanic cones (Mount Eden, One Tree Hill, Rangitoto, etc.) — most are parks or reserves with no built population. A radius drawn from the centre passes through several cones, so apparent "uninhabited" patches inside the circle are usually parks or volcanic reserves, not undeveloped land.',
      },
    ],
    faqs: [
      {
        question: 'How big is a 15 km radius in Auckland?',
        answer:
          'A 15 km radius from the Sky Tower covers most of inner and middle Auckland — the CBD, North Shore as far as Albany, Henderson\'s eastern edge, Howick\'s western edge, and the inner harbour suburbs.',
      },
      {
        question: 'What\'s within 25 km of Auckland?',
        answer:
          'A 25 km radius covers most of urban Auckland — Auckland Airport, Manukau, Howick, Albany, Henderson, Whenuapai, and reaches the inner Hauraki Gulf islands. Papakura, Orewa, and Pukekohe are outside.',
      },
      {
        question: 'Does a 25 km radius cover Auckland International Airport (AKL)?',
        answer:
          'Yes. AKL sits about 21 km south of the Sky Tower in Māngere, comfortably inside a 25 km radius. A 20 km radius does not quite reach the airport.',
      },
      {
        question: 'How far is Hamilton from Auckland?',
        answer:
          'Hamilton sits about 120 km south of Auckland — well outside a 50 km radius. Drive time on SH1 is typically 90–120 minutes; the Te Huia regional train takes about 2.5 hours.',
      },
      {
        question: 'Why does an Auckland radius look smaller than a comparable inland city?',
        answer:
          'Because Auckland sits on an isthmus between two harbours, with the Hauraki Gulf to the north-east and the Tasman Sea reachable to the west. A 25 km radius from the Sky Tower covers about 1,960 km² geographically, but the inhabited land inside is closer to 800 km² — the rest is harbour, gulf, or the volcanic cones and parkland that characterise Auckland.',
      },
      {
        question: 'How do I plan a North Shore catchment from Auckland CBD?',
        answer:
          'Use a 10–15 km radius to cover the developed North Shore (Takapuna, Devonport, Birkenhead, Albany), then validate with the Drive Time Map — the Auckland Harbour Bridge bottleneck means drive time across the harbour can be 25–40 minutes at peak even though distance is short.',
      },
    ],
    lastUpdated: '2026-06-10',
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
