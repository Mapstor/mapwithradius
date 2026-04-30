import Link from 'next/link';
import type { Metadata } from 'next';
import { OG_IMAGES } from '@/lib/og';

export const metadata: Metadata = {
  title: 'Map & Radius Glossary',
  description:
    'Plain-English definitions of common terms used in radius mapping, geocoding, and geospatial analysis — radius, isochrone, geofence, KML, and 40+ more.',
  alternates: {
    canonical: '/glossary',
  },
  keywords: [
    'map glossary',
    'gis glossary',
    'radius map terms',
    'isochrone definition',
    'geofence definition',
    'haversine formula',
  ],
  openGraph: {
    title: 'Map & Radius Glossary',
    description:
      'Plain-English definitions of common terms used in radius mapping, geocoding, and geospatial analysis.',
    url: 'https://mapwithradius.com/glossary',
    images: OG_IMAGES,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Map & Radius Glossary',
    description:
      'Plain-English definitions of common terms used in radius mapping, geocoding, and geospatial analysis.',
    images: OG_IMAGES,
  },
};

type Term = {
  term: string;
  anchor: string;
  letter: string;
  definition: string;
};

const terms: Term[] = [
  {
    term: 'Antipode',
    anchor: 'antipode',
    letter: 'A',
    definition:
      'The point on Earth diametrically opposite a given location. The antipode of London is in the Pacific Ocean southeast of New Zealand.',
  },
  {
    term: 'As the crow flies',
    anchor: 'as-the-crow-flies',
    letter: 'A',
    definition:
      'Straight-line distance between two points, ignoring roads, terrain, and obstacles. On Earth this is the great-circle distance, calculated with the Haversine formula.',
  },
  {
    term: 'Bounding box',
    anchor: 'bounding-box',
    letter: 'B',
    definition:
      'A rectangle defined by minimum and maximum latitude/longitude pairs that encloses a geographic region. Often abbreviated bbox and used to constrain map queries.',
  },
  {
    term: 'Buffer (GIS)',
    anchor: 'buffer-gis',
    letter: 'B',
    definition:
      'A zone of a given distance around a feature on a map. A radius circle around a point is a buffer; so is a corridor around a road.',
  },
  {
    term: 'Catchment area',
    anchor: 'catchment-area',
    letter: 'C',
    definition:
      'The geographic region from which a business, school, or service draws its customers or users. Often modeled as a radius or a drive-time isochrone.',
  },
  {
    term: 'Centroid',
    anchor: 'centroid',
    letter: 'C',
    definition:
      'The geometric center of a polygon — the point you would balance the shape on. For an irregular polygon it may fall outside the shape.',
  },
  {
    term: 'Choropleth map',
    anchor: 'choropleth',
    letter: 'C',
    definition:
      'A thematic map where regions are shaded by a data value, like population density per county or election results per state.',
  },
  {
    term: 'Coordinate system',
    anchor: 'coordinate-system',
    letter: 'C',
    definition:
      'A framework that assigns coordinates to every point on Earth. WGS 84 is the standard used by GPS and most consumer maps.',
  },
  {
    term: 'Decimal degrees',
    anchor: 'decimal-degrees',
    letter: 'D',
    definition:
      'A coordinate format using fractional degrees, like 51.5074, -0.1278 (London). The dominant format in modern web maps and APIs.',
  },
  {
    term: 'DMS coordinates',
    anchor: 'dms',
    letter: 'D',
    definition:
      'Degrees, minutes, seconds — the traditional notation for latitude and longitude, e.g. 51°30\'26"N 0°7\'40"W. One degree equals 60 minutes; one minute equals 60 seconds.',
  },
  {
    term: 'Driving distance',
    anchor: 'driving-distance',
    letter: 'D',
    definition:
      'The distance along the road network between two points, computed by a routing engine. Almost always longer than the straight-line distance because roads detour around obstacles.',
  },
  {
    term: 'EPSG code',
    anchor: 'epsg',
    letter: 'E',
    definition:
      'A numeric identifier from the EPSG registry of coordinate reference systems. EPSG:4326 is WGS 84 (lat/lng); EPSG:3857 is Web Mercator (the projection used by web maps).',
  },
  {
    term: 'Geocoding',
    anchor: 'geocoding',
    letter: 'G',
    definition:
      'Converting a human-readable address ("221B Baker Street, London") into latitude/longitude coordinates. The reverse — coordinates to address — is reverse geocoding.',
  },
  {
    term: 'GeoJSON',
    anchor: 'geojson',
    letter: 'G',
    definition:
      'An open JSON format for encoding geographic features — points, lines, and polygons — with properties. Widely supported by GIS tools and JavaScript map libraries.',
  },
  {
    term: 'Geofence',
    anchor: 'geofence',
    letter: 'G',
    definition:
      'A virtual boundary on a map, usually a circle or polygon. Geofences trigger location-based actions: a delivery driver entering a zone, a phone leaving a parent-defined area, an ad firing inside a stadium.',
  },
  {
    term: 'Great-circle distance',
    anchor: 'great-circle-distance',
    letter: 'G',
    definition:
      'The shortest distance between two points on a sphere, measured along the surface. On Earth it is what "as the crow flies" approximates and what the Haversine formula calculates.',
  },
  {
    term: 'Haversine formula',
    anchor: 'haversine',
    letter: 'H',
    definition:
      'The standard formula for computing great-circle distance between two latitude/longitude points on a sphere. Accurate to within a fraction of a percent for Earth-scale distances.',
  },
  {
    term: 'Heatmap',
    anchor: 'heatmap',
    letter: 'H',
    definition:
      'A map visualization that uses color intensity to show density of data points — for example, where Twitter mentions cluster, or where 911 calls originate.',
  },
  {
    term: 'Isochrone',
    anchor: 'isochrone',
    letter: 'I',
    definition:
      'A boundary enclosing every point reachable from a starting location within a given travel time. A 30-minute drive-time isochrone shows everywhere you can drive to in half an hour. Computed by routing engines like OSRM or Valhalla.',
  },
  {
    term: 'KML (Keyhole Markup Language)',
    anchor: 'kml',
    letter: 'K',
    definition:
      'An XML-based file format for geographic data, originally developed for Google Earth. Now an OGC standard, supported by Google My Maps, ArcGIS, QGIS, and most consumer mapping tools.',
  },
  {
    term: 'Latitude',
    anchor: 'latitude',
    letter: 'L',
    definition:
      'Angular distance north or south of the equator, ranging from -90 (South Pole) to +90 (North Pole). Often abbreviated "lat" and listed first in coordinate pairs.',
  },
  {
    term: 'Leaflet',
    anchor: 'leaflet',
    letter: 'L',
    definition:
      'An open-source JavaScript library for interactive maps in web browsers. Lightweight, mobile-friendly, and works with OpenStreetMap and most tile providers. Map With Radius is built on Leaflet.',
  },
  {
    term: 'Longitude',
    anchor: 'longitude',
    letter: 'L',
    definition:
      'Angular distance east or west of the prime meridian (Greenwich, London), ranging from -180 to +180. Often abbreviated "lng" or "lon" and listed second in coordinate pairs.',
  },
  {
    term: 'Map projection',
    anchor: 'map-projection',
    letter: 'M',
    definition:
      "A method of representing Earth's curved surface on a flat plane. Every projection distorts something — area, shape, or distance — so different projections suit different uses.",
  },
  {
    term: 'Map tile',
    anchor: 'map-tile',
    letter: 'M',
    definition:
      'A 256×256 image (or vector packet) at a specific zoom level and grid coordinate. Modern web maps stitch many tiles together as you pan and zoom.',
  },
  {
    term: 'Mercator projection',
    anchor: 'mercator',
    letter: 'M',
    definition:
      'A cylindrical map projection from 1569 that preserves shapes and angles but exaggerates area near the poles — the reason Greenland looks larger than Africa on most world maps.',
  },
  {
    term: 'Mile',
    anchor: 'mile',
    letter: 'M',
    definition:
      'Imperial unit of distance. 1 statute mile = 1.609 kilometers = 5,280 feet. A nautical mile (used in aviation and shipping) is slightly longer at 1.852 km.',
  },
  {
    term: 'Nominatim',
    anchor: 'nominatim',
    letter: 'N',
    definition:
      'An open-source geocoder built on OpenStreetMap data. Used by Map With Radius for address search; available as a free public service or self-hostable.',
  },
  {
    term: 'OpenStreetMap (OSM)',
    anchor: 'openstreetmap',
    letter: 'O',
    definition:
      'A free, editable map of the world built and maintained by a global community of volunteers since 2004. The data is openly licensed and powers many independent mapping tools, including this site.',
  },
  {
    term: 'OSRM',
    anchor: 'osrm',
    letter: 'O',
    definition:
      'Open Source Routing Machine — a fast routing engine optimized for OpenStreetMap road data. Used to compute driving, walking, and cycling routes and isochrones.',
  },
  {
    term: 'POI (Point of Interest)',
    anchor: 'poi',
    letter: 'P',
    definition:
      'Any named location of interest on a map: a restaurant, school, hospital, or landmark. POIs typically have a category, name, and coordinates.',
  },
  {
    term: 'Polygon',
    anchor: 'polygon',
    letter: 'P',
    definition:
      'A closed shape defined by an ordered ring of coordinates, used to represent areas like neighborhoods, parks, or country borders. A multipolygon represents a feature made of multiple disconnected pieces.',
  },
  {
    term: 'Polyline',
    anchor: 'polyline',
    letter: 'P',
    definition:
      'An open shape defined by a sequence of coordinates, used to draw routes, rivers, roads, or any path. Different from a polygon, which is closed.',
  },
  {
    term: 'Radius',
    anchor: 'radius',
    letter: 'R',
    definition:
      'The distance from the center of a circle to its edge. On a map, a radius is typically expressed in miles, kilometers, meters, or feet — and used to define what is "within range" of a point.',
  },
  {
    term: 'Raster tiles',
    anchor: 'raster-tiles',
    letter: 'R',
    definition:
      'Map tiles delivered as pre-rendered PNG or JPEG images. Simple to display but the styling is fixed at the server, so the client cannot restyle the map at runtime.',
  },
  {
    term: 'Reverse geocoding',
    anchor: 'reverse-geocoding',
    letter: 'R',
    definition:
      'The opposite of geocoding — converting latitude/longitude coordinates into a postal address or named place. "What city am I in?" is a reverse-geocoding question.',
  },
  {
    term: 'Shapefile',
    anchor: 'shapefile',
    letter: 'S',
    definition:
      "Esri's vector GIS file format, dating to the early 1990s. A shapefile is actually a set of files (.shp, .shx, .dbf, often .prj) that together describe geometry and attributes. Still widely used in professional GIS.",
  },
  {
    term: 'Slippy map',
    anchor: 'slippy-map',
    letter: 'S',
    definition:
      'A draggable, zoomable web map made of map tiles — the kind you find on Google Maps, OpenStreetMap, and almost every modern site. Named for the smooth panning ("slippy") experience.',
  },
  {
    term: 'Valhalla',
    anchor: 'valhalla',
    letter: 'V',
    definition:
      'An open-source routing engine that uses OpenStreetMap data, with strong support for multimodal routes (drive, walk, bike, transit). Often used for isochrones and matrix calculations.',
  },
  {
    term: 'Vector tiles',
    anchor: 'vector-tiles',
    letter: 'V',
    definition:
      'Map tiles delivered as binary geometry data and rendered in the browser. Compared to raster tiles, vector tiles are smaller, sharper at any zoom level, and styleable on the fly.',
  },
  {
    term: 'Web Mercator (EPSG:3857)',
    anchor: 'web-mercator',
    letter: 'W',
    definition:
      'The variant of the Mercator projection used by virtually all consumer web maps — Google Maps, OpenStreetMap, Bing, Mapbox. Optimized for square tiles; distortion grows toward the poles.',
  },
  {
    term: 'WGS 84 (EPSG:4326)',
    anchor: 'wgs-84',
    letter: 'W',
    definition:
      'The World Geodetic System 1984 — the global coordinate reference system used by GPS satellites, aviation, and most consumer mapping. Coordinates are latitude/longitude in decimal degrees.',
  },
  {
    term: 'Zoom level',
    anchor: 'zoom-level',
    letter: 'Z',
    definition:
      'An integer specifying how detailed the map is. Zoom 0 fits the whole world in one tile; each higher zoom doubles linear resolution. Most web maps support zooms 0–22.',
  },
];

const letters = Array.from(new Set(terms.map((t) => t.letter)));

export default function GlossaryPage() {
  return (
    <>
      {/* BreadcrumbList Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://mapwithradius.com',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Glossary',
                item: 'https://mapwithradius.com/glossary',
              },
            ],
          }),
        }}
      />

      {/* DefinedTermSet Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'DefinedTermSet',
            name: 'Map & Radius Glossary',
            description:
              'Definitions of common terms in radius mapping, geocoding, routing, and geospatial analysis.',
            url: 'https://mapwithradius.com/glossary',
            inDefinedTermSet: 'https://mapwithradius.com/glossary',
            hasDefinedTerm: terms.map((t) => ({
              '@type': 'DefinedTerm',
              name: t.term,
              description: t.definition,
              url: `https://mapwithradius.com/glossary#${t.anchor}`,
              inDefinedTermSet: 'https://mapwithradius.com/glossary',
            })),
          }),
        }}
      />

      {/* Hero */}
      <section className="section-white py-12 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="text-sm text-slate-500 mb-4">
            <Link href="/" className="hover:text-slate-700">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-slate-700">Glossary</span>
          </nav>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
            Map &amp; Radius Glossary
          </h1>
          <p className="text-lg text-slate-600 mb-8">
            Plain-English definitions of {terms.length} terms used in radius mapping, geocoding,
            routing, and geospatial analysis. Written for marketers, planners, and curious
            readers — not GIS specialists.
          </p>

          {/* Letter nav */}
          <nav aria-label="Glossary index" className="flex flex-wrap gap-2 pb-6 border-b border-slate-200">
            {letters.map((letter) => (
              <a
                key={letter}
                href={`#letter-${letter}`}
                className="inline-flex items-center justify-center w-9 h-9 text-sm font-semibold text-slate-700 bg-slate-100 rounded hover:bg-accent hover:text-white transition-colors"
              >
                {letter}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {/* Terms */}
      <section className="section-white pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {letters.map((letter) => (
            <div key={letter} className="mb-10">
              <h2
                id={`letter-${letter}`}
                className="text-3xl font-bold text-accent mb-4 pt-4 scroll-mt-24"
              >
                {letter}
              </h2>
              <dl className="space-y-6">
                {terms
                  .filter((t) => t.letter === letter)
                  .map((t) => (
                    <div key={t.anchor}>
                      <dt
                        id={t.anchor}
                        className="text-xl font-semibold text-slate-900 mb-1 scroll-mt-24"
                      >
                        {t.term}
                      </dt>
                      <dd className="text-slate-700 leading-relaxed">{t.definition}</dd>
                    </div>
                  ))}
              </dl>
            </div>
          ))}
        </div>
      </section>

      {/* Related Tools */}
      <section className="section-gray py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Use the Tools</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link
              href="/"
              className="block p-4 bg-white rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="font-semibold text-slate-900">Radius Map</div>
              <div className="text-sm text-slate-600">Draw a radius circle on any map</div>
            </Link>
            <Link
              href="/drive-time-map"
              className="block p-4 bg-white rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="font-semibold text-slate-900">Drive Time Map</div>
              <div className="text-sm text-slate-600">See an isochrone on a real map</div>
            </Link>
            <Link
              href="/walking-radius-map"
              className="block p-4 bg-white rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="font-semibold text-slate-900">Walking Radius Map</div>
              <div className="text-sm text-slate-600">Pedestrian and cyclist isochrones</div>
            </Link>
            <Link
              href="/distance-calculator"
              className="block p-4 bg-white rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="font-semibold text-slate-900">Distance Calculator</div>
              <div className="text-sm text-slate-600">Straight-line and road distance</div>
            </Link>
            <Link
              href="/geofence-map"
              className="block p-4 bg-white rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="font-semibold text-slate-900">Geofence Map</div>
              <div className="text-sm text-slate-600">Plan a radius geofence boundary</div>
            </Link>
            <Link
              href="/zip-code-radius"
              className="block p-4 bg-white rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="font-semibold text-slate-900">Zip Code Radius</div>
              <div className="text-sm text-slate-600">Find every zip code within a radius</div>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
