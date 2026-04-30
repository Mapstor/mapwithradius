// Curated list of major cities for /radius-map/[city] landing pages.
// All coordinates are real (decimal degrees, WGS 84). Population and timezone
// values are accurate as of 2024-2025; populations are rounded to the nearest
// 100k for metro-area scope unless otherwise noted.

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
};

export const CITIES: City[] = [
  {
    slug: 'new-york-city',
    name: 'New York City',
    country: 'United States',
    countryCode: 'US',
    region: 'North America',
    lat: 40.7128,
    lng: -74.006,
    defaultRadius: 5,
    defaultUnit: 'miles',
    population: 8_300_000,
    populationLabel: '8.3 million',
    timezone: 'America/New_York',
    fact: 'New York is roughly 13 miles from end to end on Manhattan island alone, so a 5-mile radius from Times Square covers most of the borough plus parts of Brooklyn and Queens.',
    intro:
      'A 5-mile radius from midtown Manhattan reaches all of downtown, most of Brooklyn Heights, and Long Island City. Useful for restaurant catchment areas, real-estate comps in Manhattan, and trade-area planning for retail in the densest market in the United States.',
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
    fact: 'LA sprawls across 500 square miles of the LA basin. A 10-mile radius from downtown captures Hollywood, Culver City, Glendale, and East LA — but not Santa Monica or Long Beach.',
    intro:
      'Los Angeles is one of the most spread-out cities in the world, which makes radius questions especially tricky. Drive time matters far more than straight-line distance here. Use the radius below for a quick view of central LA reach, then switch to the drive-time map for accurate commute or service planning.',
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
    fact: 'Chicago is laid out on a strict grid centered at State and Madison. Every 8 city blocks equals roughly 1 mile, so a 5-mile radius covers about 40 blocks in every direction.',
    intro:
      'Chicago\'s grid layout makes radius math unusually intuitive — every 1 mile is roughly 8 blocks. A 10-mile radius from the Loop reaches O\'Hare suburbs to the north, Cicero to the west, and the South Side communities. Lake Michigan eats half of any radius drawn near downtown.',
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
    fact: 'The Greater London boundary is roughly 32 km across at its widest. A 10 km radius from Charing Cross reaches the M25 in only one direction (north), so most of the city fits inside.',
    intro:
      'London is one of the densest major cities in Europe, so radius queries here often want kilometers and a small range. A 5 km radius from Charing Cross covers Zone 1 and most of Zone 2; 10 km reaches the inner suburbs. For commute planning across the M25, switch to the drive-time map.',
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
    fact: 'Greater Manchester contains 10 metropolitan boroughs in roughly 50 km × 30 km. A 15 km radius from the city centre reaches almost all of them.',
    intro:
      'Manchester anchors the second-largest urban area in the UK. A 10 km radius from the city centre covers Salford, Trafford, and most of Stockport — useful for local-business catchment planning and commute analysis across Greater Manchester.',
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
    fact: 'The City of Paris (intramuros) is a near-circle bounded by the Boulevard Périphérique, with a diameter of about 10 km. A 5 km radius from Notre-Dame fits the entire city.',
    intro:
      'Paris is unusually compact for a major capital — the entire City of Paris fits inside a 5 km radius. Use a wider 10–15 km radius to capture La Défense, Versailles\' approaches, and the inner banlieues. For RER and Métro reach, the drive-time map is more useful than a circle.',
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
    fact: 'Berlin is roughly 45 km wide east-to-west — larger in area than New York City. A 10 km radius from Brandenburg Gate covers the inner ring (S-Bahn S41/S42 ring).',
    intro:
      'Berlin is geographically large for a European capital — about the same area as New York City. A 10 km radius from the Brandenburg Gate roughly matches the S-Bahn Ringbahn (the inner ring), a useful proxy for "central Berlin" in real-estate, retail, and event planning.',
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
    fact: 'Madrid is encircled by the M-30 ring (about 7 km from centre) and the M-40 (about 14 km). The M-30 is the rough boundary between dense city and outer districts.',
    intro:
      'Madrid\'s ring roads — M-30, M-40, M-50 — give natural radius reference points. A 10 km radius from Puerta del Sol roughly matches the M-40, capturing most of the city plus inner suburbs like Pozuelo. Drive time inside the M-30 is heavily traffic-dependent.',
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
    fact: 'Rome is encircled by the Grande Raccordo Anulare (GRA) ring road, about 11 km from the centre. A 10 km radius from the Colosseum is just inside the GRA on most sides.',
    intro:
      'A 10 km radius from central Rome roughly matches the GRA ring road, which marks the practical boundary between the city and its outer suburbs. Useful for trade-area work, accommodation searches, and event planning where guests are spread across the metropolitan area.',
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
    fact: 'The Yamanote Line forms a 34.5 km loop around central Tokyo. A 5 km radius from Tokyo Station fits comfortably inside it.',
    intro:
      'Tokyo is the most populous metropolitan area on Earth and has its own informal radius marker — the Yamanote Line, a 34.5 km train loop around central Tokyo. A 10 km radius from Tokyo Station extends well beyond the Yamanote loop into Shibuya, Shinjuku, and Sumida-ku.',
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
    fact: 'Sydney spans more than 60 km from the coast to the Blue Mountains foothills. A 15 km radius from the CBD captures most of the inner suburbs but stops well short of Parramatta.',
    intro:
      'Sydney sprawls — the metro area extends over 12,000 square kilometres. A 15 km radius from the CBD covers the inner suburbs out to Bondi, Burwood, and Manly, but Parramatta sits at 23 km. Use the drive-time map for honest commute planning across this geography.',
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
    fact: 'The Greater Toronto Area stretches from Burlington in the west to Oshawa in the east — roughly 100 km coast to coast on Lake Ontario.',
    intro:
      'Toronto is the dense core of a long, linear metro that runs along Lake Ontario\'s north shore. A 15 km radius from Yonge & Bloor reaches the inner GTA — Etobicoke, North York, Scarborough — but stops short of Mississauga or Markham. Use larger radii for full GTA reach.',
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
