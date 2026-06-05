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
      'The point on Earth diametrically opposite a given location. The antipode of London is in the Pacific Ocean southeast of New Zealand. Useful in trivia and certain global routing problems (the longest possible great-circle flight is roughly antipode-to-antipode) but rarely relevant in everyday radius mapping.',
  },
  {
    term: 'As the crow flies',
    anchor: 'as-the-crow-flies',
    letter: 'A',
    definition:
      'Straight-line distance between two points, ignoring roads, terrain, and obstacles. On Earth this is the great-circle distance, calculated with the Haversine formula. Actual driving distance is typically 20–40% longer than the straight-line distance because roads detour around obstacles — the Distance Calculator on this site computes both for any two points.',
  },
  {
    term: 'Bounding box',
    anchor: 'bounding-box',
    letter: 'B',
    definition:
      'A rectangle defined by minimum and maximum latitude/longitude pairs that encloses a geographic region. Often abbreviated bbox and used to constrain map queries. Search APIs like Nominatim accept a bbox parameter — querying "Springfield" inside a bbox covering Massachusetts returns the Springfield in MA rather than the dozens of other Springfields in the US.',
  },
  {
    term: 'Buffer (GIS)',
    anchor: 'buffer-gis',
    letter: 'B',
    definition:
      'A zone of a given distance around a feature on a map. A radius circle around a point is a buffer; so is a corridor around a road. Buffers underpin flood-zone analysis (X meters from a river), regulatory compliance (Y meters from a school for cannabis dispensaries), and conservation planning (Z meters from a habitat boundary).',
  },
  {
    term: 'Catchment area',
    anchor: 'catchment-area',
    letter: 'C',
    definition:
      "The geographic region from which a business, school, or service draws its customers or users. Often modeled as a radius or a drive-time isochrone. Trade-area analysis defines a primary catchment containing the ~70% of customers closest to a location and a secondary catchment for the next ~20% — Reilly's and Huff's gravity models formalize the math.",
  },
  {
    term: 'Centroid',
    anchor: 'centroid',
    letter: 'C',
    definition:
      "The geometric center of a polygon — the point you'd balance the shape on. For irregular polygons it may fall outside the shape (e.g., a crescent-shaped park). For map labeling and approximate location queries, the centroid is the standard anchor: a state's centroid is what most tools use when you query 'show Texas on a map.'",
  },
  {
    term: 'Choropleth map',
    anchor: 'choropleth',
    letter: 'C',
    definition:
      "A thematic map where regions are shaded by a data value — population density per county, election results per state, COVID rates per zip code. The classic risk: choropleth misleads when regions vary wildly in size. A sparsely-populated rural state of 50,000 voters can look as visually dominant as a dense urban state of 10 million.",
  },
  {
    term: 'Coordinate system',
    anchor: 'coordinate-system',
    letter: 'C',
    definition:
      "A framework that assigns coordinates to every point on Earth. WGS 84 is the standard used by GPS and most consumer maps. National grids (UK OSGB, French Lambert-93, German Gauß-Krüger) are alternative coordinate systems used in surveying and cadastral records — converting between them requires a re-projection step that introduces small but documented offsets.",
  },
  {
    term: 'Decimal degrees',
    anchor: 'decimal-degrees',
    letter: 'D',
    definition:
      'A coordinate format using fractional degrees, like 51.5074, -0.1278 (London). The dominant format in modern web maps and APIs. Six decimal places (e.g., 40.758896, -73.985130) gives sub-meter accuracy — enough for a building entrance. Four decimal places (40.7589) lands you within roughly 10 m, fine for radius mapping but not for surveying.',
  },
  {
    term: 'DMS coordinates',
    anchor: 'dms',
    letter: 'D',
    definition:
      "Degrees, minutes, seconds — the traditional notation for latitude and longitude, e.g. 51°30'26\"N 0°7'40\"W. One degree equals 60 minutes; one minute equals 60 seconds. Aviation, maritime navigation, and older paper maps still use DMS extensively; most modern web map APIs require decimal degrees but accept either format with automatic conversion.",
  },
  {
    term: 'Driving distance',
    anchor: 'driving-distance',
    letter: 'D',
    definition:
      'The distance along the road network between two points, computed by a routing engine like OSRM or Valhalla. Almost always longer than the straight-line distance because roads detour around obstacles. A 5-mile straight-line radius typically corresponds to roughly 6.5 miles of driving in suburbs and 7–10 miles in dense urban grids.',
  },
  {
    term: 'EPSG code',
    anchor: 'epsg',
    letter: 'E',
    definition:
      'A numeric identifier from the EPSG registry of coordinate reference systems. EPSG:4326 is WGS 84 (lat/lng); EPSG:3857 is Web Mercator (the projection used by web maps). If you receive a shapefile or geodatabase from another team and the data looks visually shifted on your map, the EPSG code is usually the culprit — the file is in a national grid (e.g., EPSG:27700, OSGB36) while your map expects WGS 84.',
  },
  {
    term: 'Geocoding',
    anchor: 'geocoding',
    letter: 'G',
    definition:
      'Converting a human-readable address ("221B Baker Street, London") into latitude/longitude coordinates. The reverse — coordinates to address — is reverse geocoding. Geocoding is harder than it looks: "123 Main St" is ambiguous without a city, zip codes can be shared across multiple towns, and address formats vary wildly by country. Modern geocoders (Nominatim, Google, Mapbox) use fuzzy matching to return the most likely candidate.',
  },
  {
    term: 'GeoJSON',
    anchor: 'geojson',
    letter: 'G',
    definition:
      "An open JSON format for encoding geographic features — points, lines, and polygons — with properties. Widely supported by GIS tools and JavaScript map libraries. If you're building a web app and need to display geographic features, GeoJSON is the format you'll usually consume; every major mapping library reads it natively. Open-data portals (city boundaries, transit routes, restaurant inspections) commonly publish in GeoJSON.",
  },
  {
    term: 'Geofence',
    anchor: 'geofence',
    letter: 'G',
    definition:
      "A virtual boundary on a map, usually a circle or polygon. Geofences trigger location-based actions: a delivery driver entering a zone, a phone leaving a parent-defined area, an ad firing inside a stadium. Practical examples — ride-share apps activate driver mode at airport geofences; retail apps push notifications when a customer crosses a competitor's perimeter; fleet-management software flags vehicles leaving their assigned zone. See the Geofence Map tool on this site for the planning workflow.",
  },
  {
    term: 'Great-circle distance',
    anchor: 'great-circle-distance',
    letter: 'G',
    definition:
      'The shortest distance between two points on a sphere, measured along the surface. On Earth it is what "as the crow flies" approximates and what the Haversine formula calculates. Flight paths approximate great circles — which is why a NYC-to-Tokyo flight passes near the Arctic Circle even though that route looks unintuitive on a standard rectangular world map. The Mercator projection makes great-circle paths appear curved.',
  },
  {
    term: 'Haversine formula',
    anchor: 'haversine',
    letter: 'H',
    definition:
      "The standard formula for computing great-circle distance between two latitude/longitude points on a sphere. Accurate to within a fraction of a percent for Earth-scale distances. The Haversine assumes a perfectly spherical Earth (radius ~6,371 km), which introduces an error of <0.3% at 1,000 km — irrelevant for radius mapping but worth noting for surveying or aviation, which use ellipsoidal formulas like Vincenty's instead.",
  },
  {
    term: 'Heatmap',
    anchor: 'heatmap',
    letter: 'H',
    definition:
      "A map visualization that uses color intensity to show density of data points — where Twitter mentions cluster, where 911 calls originate, where bike-share trips begin. Heatmaps work well for showing density at a glance but poorly for showing exact counts (was it 10 incidents at this spot or 50?). They're aesthetic; for precise analysis you need the underlying point data.",
  },
  {
    term: 'Isochrone',
    anchor: 'isochrone',
    letter: 'I',
    definition:
      "A boundary enclosing every point reachable from a starting location within a given travel time. A 30-minute drive-time isochrone shows everywhere you can drive to in half an hour. Computed by routing engines like OSRM or Valhalla. Isochrones look like inkblots — irregular, occasionally with holes where roads pinch around terrain. They're the right primitive for any commute or delivery question, since they answer 'how far can I actually travel' rather than 'how far is X distance.'",
  },
  {
    term: 'KML (Keyhole Markup Language)',
    anchor: 'kml',
    letter: 'K',
    definition:
      "An XML-based file format for geographic data, originally developed by Keyhole Inc. (the company Google acquired to launch Google Earth in 2004). Now an OGC standard, supported by Google My Maps, ArcGIS, QGIS, and most consumer mapping tools. KML is the most widely interoperable format for sharing simple geographic data between mapping tools — every export on this site includes a KML option.",
  },
  {
    term: 'Latitude',
    anchor: 'latitude',
    letter: 'L',
    definition:
      'Angular distance north or south of the equator, ranging from -90 (South Pole) to +90 (North Pole). Often abbreviated "lat" and listed first in coordinate pairs. Each degree of latitude is approximately 111 km, regardless of where on Earth you are — useful for quick mental math when working with radii (a 1° latitude band ≈ a 111 km strip).',
  },
  {
    term: 'Leaflet',
    anchor: 'leaflet',
    letter: 'L',
    definition:
      'An open-source JavaScript library for interactive maps in web browsers. Lightweight (about 40 KB compressed), mobile-friendly, and works with OpenStreetMap and most tile providers. Created by Volodymyr Agafonkin in 2011 and now maintained by a small open-source community. Battle-tested across major sites — Foursquare, OpenStreetMap, USA Today, and Map With Radius all use Leaflet.',
  },
  {
    term: 'Longitude',
    anchor: 'longitude',
    letter: 'L',
    definition:
      'Angular distance east or west of the prime meridian (Greenwich, London), ranging from -180 to +180. Often abbreviated "lng" or "lon" and listed second in coordinate pairs. Unlike latitude, the distance per degree of longitude varies with latitude — at the equator it\'s about 111 km, but at 60° (Stockholm, Anchorage) it\'s only ~55 km. This is the same effect that distorts the visual size of countries on Mercator maps.',
  },
  {
    term: 'Map projection',
    anchor: 'map-projection',
    letter: 'M',
    definition:
      "A method of representing Earth's curved surface on a flat plane. Every projection distorts something — area, shape, or distance — so different projections suit different uses. Mercator preserves angles (good for navigation, bad for area comparison). Albers Equal Area preserves area (good for statistical mapping). Robinson is a balanced compromise often used for world maps in atlases.",
  },
  {
    term: 'Map tile',
    anchor: 'map-tile',
    letter: 'M',
    definition:
      'A 256×256 image (or vector packet) at a specific zoom level and grid coordinate. Modern web maps stitch many tiles together as you pan and zoom. At zoom 0, the entire world fits in a single tile. Each higher zoom level doubles linear resolution: zoom 1 has 4 tiles, zoom 2 has 16, zoom 18 has ~69 billion. Web maps pre-render or compute tiles on demand from each provider\'s tile server.',
  },
  {
    term: 'Mercator projection',
    anchor: 'mercator',
    letter: 'M',
    definition:
      "A cylindrical map projection from 1569 that preserves shapes and angles but exaggerates area near the poles — the reason Greenland looks larger than Africa on most world maps. Gerardus Mercator designed it specifically for navigation: straight lines on a Mercator map are constant-bearing lines (rhumb lines), which sailors could follow with a compass. The area distortion is a known cost of preserving angles.",
  },
  {
    term: 'Mile',
    anchor: 'mile',
    letter: 'M',
    definition:
      "Imperial unit of distance. 1 statute mile = 1.609 kilometers = 5,280 feet, defined exactly by international agreement in 1959. A nautical mile (used in aviation and shipping) is slightly longer at 1.852 km. The statute mile derives from the Roman mille passuum (1,000 paces). The UK, US, and a handful of other countries still use it; the rest of the world uses kilometers.",
  },
  {
    term: 'Nominatim',
    anchor: 'nominatim',
    letter: 'N',
    definition:
      "An open-source geocoder built on OpenStreetMap data. Used by Map With Radius for address search; available as a free public service (with usage limits — typically 1 request per second per IP under OSM's tile policy) or self-hostable. A typical self-hosted Nominatim instance covering Europe needs ~80 GB of disk and runs on standard hardware.",
  },
  {
    term: 'OpenStreetMap (OSM)',
    anchor: 'openstreetmap',
    letter: 'O',
    definition:
      "A free, editable map of the world built and maintained by a global community of volunteers since 2004. The data is openly licensed under ODbL and powers many independent mapping tools, including this site. OSM has reached coverage parity with commercial maps in most populated areas and exceeds it in many — especially for trail networks, cycling routes, and detailed building footprints. Free for any use including commercial, with an attribution requirement.",
  },
  {
    term: 'OSRM',
    anchor: 'osrm',
    letter: 'O',
    definition:
      'Open Source Routing Machine — a fast routing engine optimized for OpenStreetMap road data. Used to compute driving, walking, and cycling routes and isochrones. OSRM is the engine of choice in many city-comparison studies because it\'s fast, deterministic, and reproducible. It powers many free routing services and is also self-hostable for custom workflows.',
  },
  {
    term: 'POI (Point of Interest)',
    anchor: 'poi',
    letter: 'P',
    definition:
      "Any named location of interest on a map: a restaurant, school, hospital, or landmark. POIs typically have a category, name, and coordinates. OpenStreetMap has ~50 million POIs globally. Commercial datasets (Google Places, Foursquare, SafeGraph) cover similar territory with denser metadata; OSM tends to win on coverage in rural areas and specialty categories like hiking shelters or EV-charging stations.",
  },
  {
    term: 'Polygon',
    anchor: 'polygon',
    letter: 'P',
    definition:
      'A closed shape defined by an ordered ring of coordinates, used to represent areas like neighborhoods, parks, or country borders. A multipolygon represents a feature made of multiple disconnected pieces. Real-world polygons get complicated fast — a country boundary may include hundreds of islands (Indonesia, Greece) or have holes (Vatican City inside Italy, Lesotho inside South Africa).',
  },
  {
    term: 'Polyline',
    anchor: 'polyline',
    letter: 'P',
    definition:
      "An open shape defined by a sequence of coordinates, used to draw routes, rivers, roads, or any path. Different from a polygon, which is closed. GPS tracks — from a phone, a bike computer, or a delivery vehicle — are stored as polylines. So are most route results from a routing engine: a sequence of decimal-degree pairs from start to end.",
  },
  {
    term: 'Radius',
    anchor: 'radius',
    letter: 'R',
    definition:
      'The distance from the center of a circle to its edge. On a map, a radius is typically expressed in miles, kilometers, meters, or feet — and used to define what is "within range" of a point. Radius is the simplest possible geographic primitive: one point and one distance. Despite the simplicity, it\'s the workhorse of trade-area analysis, geofencing, delivery zones, real-estate comp searches, and most location-based marketing — what this entire site is built around.',
  },
  {
    term: 'Raster tiles',
    anchor: 'raster-tiles',
    letter: 'R',
    definition:
      "Map tiles delivered as pre-rendered PNG or JPEG images. Simple to display but the styling is fixed at the server, so the client cannot restyle the map at runtime. Standard OpenStreetMap tiles are raster — pre-rendered PNG images served from osm.org's tile servers. They're simple to consume; if you want a dark theme or a custom color palette, you need a different tile source.",
  },
  {
    term: 'Reverse geocoding',
    anchor: 'reverse-geocoding',
    letter: 'R',
    definition:
      "The opposite of geocoding — converting latitude/longitude coordinates into a postal address or named place. \"What city am I in?\" is a reverse-geocoding question. When you tap a point on a map and the app shows 'Times Square, New York, NY,' that's reverse geocoding in action. Quality varies by region and dataset density; rural areas often return only a road name rather than a specific street address.",
  },
  {
    term: 'Shapefile',
    anchor: 'shapefile',
    letter: 'S',
    definition:
      "Esri's vector GIS file format, dating to the early 1990s. A shapefile is actually a set of files (.shp, .shx, .dbf, often .prj) that together describe geometry and attributes. Still widely used in professional GIS — especially in government workflows where the format is deeply entrenched. The quirks (file-set instead of single file, no native UTF-8 support, max attribute name length of 10 characters) frustrate modern developers but the format persists.",
  },
  {
    term: 'Slippy map',
    anchor: 'slippy-map',
    letter: 'S',
    definition:
      'A draggable, zoomable web map made of map tiles — the kind you find on Google Maps, OpenStreetMap, and almost every modern site. The name comes from the smooth "slippy" panning behavior pioneered by Google Maps in 2005 and now standard on every web map. The slippy-map approach defines the tile grid and zoom levels that virtually every web mapping tool follows today.',
  },
  {
    term: 'Valhalla',
    anchor: 'valhalla',
    letter: 'V',
    definition:
      'An open-source routing engine that uses OpenStreetMap data, with strong support for multimodal routes (drive, walk, bike, transit). Often used for isochrones and matrix calculations. Developed by Mapzen and open-sourced when Mapzen wound down, Valhalla emphasizes flexible multimodal routing and detailed isochrone generation. Several commercial isochrone services build on Valhalla under the hood.',
  },
  {
    term: 'Vector tiles',
    anchor: 'vector-tiles',
    letter: 'V',
    definition:
      "Map tiles delivered as binary geometry data and rendered in the browser. Compared to raster tiles, vector tiles are smaller, sharper at any zoom level, and styleable on the fly. Vector tiles enable dynamic styling — a single tile set can be displayed as a dark map, a light map, a satellite-style map, or any custom theme without re-rendering server-side. Mapbox and modern map libraries default to vector tiles for that reason.",
  },
  {
    term: 'Web Mercator (EPSG:3857)',
    anchor: 'web-mercator',
    letter: 'W',
    definition:
      'The variant of the Mercator projection used by virtually all consumer web maps — Google Maps, OpenStreetMap, Bing, Mapbox. Optimized for square tiles; distortion grows toward the poles. Web Mercator (defined by EPSG:3857) cuts off Antarctica and the high Arctic to keep the world square — a tradeoff for tile efficiency. The Greenland-looks-huge distortion is intentional: every web map you use, including this site, looks the same way for the same reason.',
  },
  {
    term: 'WGS 84 (EPSG:4326)',
    anchor: 'wgs-84',
    letter: 'W',
    definition:
      'The World Geodetic System 1984 — the global coordinate reference system used by GPS satellites, aviation, and most consumer mapping. Coordinates are latitude/longitude in decimal degrees. GPS satellites broadcast positions in WGS 84, which is why every consumer location service uses it as the default. Older national datums (NAD27 in the US, OSGB36 in the UK) are still in use for surveying with documented offsets that can be applied to convert to WGS 84.',
  },
  {
    term: 'Zoom level',
    anchor: 'zoom-level',
    letter: 'Z',
    definition:
      'An integer specifying how detailed the map is. Zoom 0 fits the whole world in one tile; each higher zoom doubles linear resolution. Most web maps support zooms 0–22. A 1 km feature spans 1 pixel at zoom 2 and 4,096 pixels at zoom 18. Map tiles are typically only available up to zoom 18 or 19 for raster tiles, 20+ for vector tiles where supported.',
  },
];

const letters = Array.from(new Set(terms.map((t) => t.letter)));

const CATEGORIES = [
  {
    label: 'Coordinates & projections',
    description:
      'How locations are described mathematically and how the curved Earth gets flattened onto a screen.',
    terms: ['Coordinate system', 'Latitude', 'Longitude', 'Decimal degrees', 'DMS coordinates', 'EPSG code', 'WGS 84 (EPSG:4326)', 'Web Mercator (EPSG:3857)', 'Map projection', 'Mercator projection'],
  },
  {
    label: 'Distance & geometry',
    description:
      'The shapes and measurements at the heart of radius mapping.',
    terms: ['Radius', 'Buffer (GIS)', 'As the crow flies', 'Great-circle distance', 'Haversine formula', 'Mile', 'Driving distance', 'Antipode', 'Centroid', 'Catchment area'],
  },
  {
    label: 'Map features & data',
    description:
      'The building blocks of every map: points, lines, polygons, and the metadata layered on top.',
    terms: ['POI (Point of Interest)', 'Polygon', 'Polyline', 'Bounding box', 'Heatmap', 'Choropleth map'],
  },
  {
    label: 'File formats',
    description:
      'How geographic data moves between tools — exchange formats and legacy standards still in active use.',
    terms: ['KML (Keyhole Markup Language)', 'GeoJSON', 'Shapefile'],
  },
  {
    label: 'Tiles & rendering',
    description:
      'The pieces that get stitched together into the smooth, zoomable maps users actually see.',
    terms: ['Map tile', 'Raster tiles', 'Vector tiles', 'Slippy map', 'Zoom level'],
  },
  {
    label: 'Tools & engines',
    description:
      'The open-source mapping ecosystem this site is built on — and that powers most independent mapping tools.',
    terms: ['OpenStreetMap (OSM)', 'Leaflet', 'Nominatim', 'OSRM', 'Valhalla'],
  },
  {
    label: 'Mapping concepts',
    description:
      'The recurring concepts in location-based services, marketing, and trade-area analysis.',
    terms: ['Geocoding', 'Reverse geocoding', 'Geofence', 'Isochrone'],
  },
];

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
          <p className="text-lg text-slate-700 leading-relaxed mb-4">
            Plain-English definitions of {terms.length} terms used in radius mapping,
            geocoding, routing, and geospatial analysis. Written for marketers, planners,
            real-estate professionals, and curious readers — not GIS specialists.
          </p>
          <p className="text-slate-700 leading-relaxed mb-4">
            Mapping picks up jargon from three places: the math (Haversine, great-circle,
            projection), the data formats (KML, GeoJSON, shapefile), and the tools
            (OpenStreetMap, Leaflet, Nominatim, OSRM, Valhalla). Each term here is defined
            with one or two sentences of context plus a concrete example of where you&apos;d
            actually encounter it. If a definition still feels abstract, follow the cross-links
            into our radius tools — most concepts make immediate sense once you see them on a
            map.
          </p>
          <p className="text-slate-700 leading-relaxed mb-6">
            Two ways to use this page: jump to a letter with the A–Z index below for quick
            reference, or browse the topic-grouped table of contents to learn the field
            systematically.
          </p>

          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-200">
            <div>
              <div className="text-3xl font-bold text-slate-900">{terms.length}</div>
              <div className="text-sm text-slate-600">terms defined</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-slate-900">{letters.length}</div>
              <div className="text-sm text-slate-600">letters of the alphabet</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-slate-900">{CATEGORIES.length}</div>
              <div className="text-sm text-slate-600">topic groups</div>
            </div>
          </div>

          {/* Letter nav */}
          <nav aria-label="Glossary alphabet index" className="flex flex-wrap gap-2 pt-6 mt-6 border-t border-slate-200">
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

      {/* Topic groups */}
      <section className="section-gray py-12 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-heading mb-3">Topics covered</h2>
          <p className="text-slate-700 mb-8 leading-relaxed">
            Seven topic groups organize the {terms.length} terms. Use them as a study aid if
            you&apos;re new to the field, or skip ahead to the alphabetical reference below.
          </p>
          <div className="space-y-6">
            {CATEGORIES.map((cat) => (
              <div key={cat.label} className="bg-white rounded-lg border border-slate-200 p-5">
                <h3 className="text-lg font-bold text-slate-900 mb-1">{cat.label}</h3>
                <p className="text-sm text-slate-600 mb-3 leading-relaxed">{cat.description}</p>
                <div className="flex flex-wrap gap-x-2 gap-y-1 text-sm">
                  {cat.terms.map((termName, idx) => {
                    const term = terms.find((t) => t.term === termName);
                    if (!term) return null;
                    return (
                      <span key={termName}>
                        <a
                          href={`#${term.anchor}`}
                          className="text-accent hover:underline"
                        >
                          {term.term}
                        </a>
                        {idx < cat.terms.length - 1 && <span className="text-slate-300 ml-2">·</span>}
                      </span>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Terms — alphabetical */}
      <section className="section-white py-12 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-heading mb-3">A–Z reference</h2>
          <p className="text-slate-700 mb-8 leading-relaxed">
            Full alphabetical list of every term in the glossary. Each definition includes a
            concrete example or pointer for additional context.
          </p>
          {letters.map((letter) => (
            <div key={letter} className="mb-10">
              <h3
                id={`letter-${letter}`}
                className="text-3xl font-bold text-accent mb-4 pt-4 scroll-mt-24"
              >
                {letter}
              </h3>
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

      {/* Further reading */}
      <section className="section-gray py-12 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-heading mb-6">Further reading</h2>
          <p className="text-slate-700 leading-relaxed mb-6">
            Standards bodies, primary sources, and good first-principles writing on the
            topics covered above.
          </p>
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="bg-white p-5 rounded-lg border border-slate-200">
              <h3 className="font-bold text-slate-900 mb-2">Coordinate systems &amp; geodesy</h3>
              <ul className="space-y-2 text-sm text-slate-700">
                <li>
                  <a
                    href="https://en.wikipedia.org/wiki/World_Geodetic_System"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="content-link"
                  >
                    WGS 84
                  </a>{' '}
                  — the GPS coordinate reference system.
                </li>
                <li>
                  <a
                    href="https://en.wikipedia.org/wiki/Web_Mercator_projection"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="content-link"
                  >
                    Web Mercator (EPSG:3857)
                  </a>{' '}
                  — the projection every web map you use is built on.
                </li>
                <li>
                  <a
                    href="https://epsg.io/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="content-link"
                  >
                    EPSG registry
                  </a>{' '}
                  — searchable database of coordinate reference systems.
                </li>
                <li>
                  <a
                    href="https://en.wikipedia.org/wiki/Vincenty%27s_formulae"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="content-link"
                  >
                    Vincenty&apos;s formulae
                  </a>{' '}
                  — the ellipsoidal alternative to Haversine for surveying-grade accuracy.
                </li>
              </ul>
            </div>

            <div className="bg-white p-5 rounded-lg border border-slate-200">
              <h3 className="font-bold text-slate-900 mb-2">Tools &amp; libraries</h3>
              <ul className="space-y-2 text-sm text-slate-700">
                <li>
                  <a
                    href="https://leafletjs.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="content-link"
                  >
                    Leaflet
                  </a>{' '}
                  — the open-source map library powering Map With Radius.
                </li>
                <li>
                  <a
                    href="https://www.openstreetmap.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="content-link"
                  >
                    OpenStreetMap
                  </a>{' '}
                  — open mapping data behind nearly every independent mapping tool.
                </li>
                <li>
                  <a
                    href="https://nominatim.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="content-link"
                  >
                    Nominatim
                  </a>{' '}
                  — the open-source geocoder built on OSM.
                </li>
                <li>
                  <a
                    href="https://project-osrm.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="content-link"
                  >
                    OSRM
                  </a>{' '}
                  /{' '}
                  <a
                    href="https://valhalla.github.io/valhalla/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="content-link"
                  >
                    Valhalla
                  </a>{' '}
                  — open-source routing engines for isochrones and routes.
                </li>
              </ul>
            </div>

            <div className="bg-white p-5 rounded-lg border border-slate-200">
              <h3 className="font-bold text-slate-900 mb-2">Formats &amp; standards</h3>
              <ul className="space-y-2 text-sm text-slate-700">
                <li>
                  <a
                    href="https://en.wikipedia.org/wiki/Keyhole_Markup_Language"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="content-link"
                  >
                    KML standard (OGC)
                  </a>{' '}
                  — the universal exchange format for radius and polygon data.
                </li>
                <li>
                  <a
                    href="https://geojson.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="content-link"
                  >
                    GeoJSON specification
                  </a>{' '}
                  — open format for geographic features in modern web apps.
                </li>
                <li>
                  <a
                    href="https://en.wikipedia.org/wiki/Shapefile"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="content-link"
                  >
                    Shapefile (Esri)
                  </a>{' '}
                  — the legacy GIS format still widely used in government and academic
                  workflows.
                </li>
                <li>
                  <a
                    href="https://www.ogc.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="content-link"
                  >
                    Open Geospatial Consortium (OGC)
                  </a>{' '}
                  — the standards body behind KML, WMS, WFS, and other interoperability
                  formats.
                </li>
              </ul>
            </div>

            <div className="bg-white p-5 rounded-lg border border-slate-200">
              <h3 className="font-bold text-slate-900 mb-2">On this site</h3>
              <ul className="space-y-2 text-sm text-slate-700">
                <li>
                  <Link href="/" className="content-link">
                    Radius Map
                  </Link>{' '}
                  — draw a radius and see most of the glossary terms in action.
                </li>
                <li>
                  <Link href="/use-cases" className="content-link">
                    Use cases
                  </Link>{' '}
                  — how the terms above are applied by industry.
                </li>
                <li>
                  <Link href="/radius-map" className="content-link">
                    City radius maps
                  </Link>{' '}
                  — radii applied to 25 specific cities with hand-authored coverage notes.
                </li>
                <li>
                  <Link href="/alternatives" className="content-link">
                    Tool alternatives
                  </Link>{' '}
                  — how the underlying technology choices map to the tools you can pick from.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Related Tools */}
      <section className="section-white py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Use the tools</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link
              href="/"
              className="block p-4 bg-slate-50 rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="font-semibold text-slate-900">Radius Map</div>
              <div className="text-sm text-slate-600">Draw a radius circle on any map</div>
            </Link>
            <Link
              href="/drive-time-map"
              className="block p-4 bg-slate-50 rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="font-semibold text-slate-900">Drive Time Map</div>
              <div className="text-sm text-slate-600">See an isochrone on a real map</div>
            </Link>
            <Link
              href="/walking-radius-map"
              className="block p-4 bg-slate-50 rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="font-semibold text-slate-900">Walking Radius Map</div>
              <div className="text-sm text-slate-600">Pedestrian and cyclist isochrones</div>
            </Link>
            <Link
              href="/distance-calculator"
              className="block p-4 bg-slate-50 rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="font-semibold text-slate-900">Distance Calculator</div>
              <div className="text-sm text-slate-600">Straight-line and road distance</div>
            </Link>
            <Link
              href="/geofence-map"
              className="block p-4 bg-slate-50 rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="font-semibold text-slate-900">Geofence Map</div>
              <div className="text-sm text-slate-600">Plan a radius geofence boundary</div>
            </Link>
            <Link
              href="/zip-code-radius"
              className="block p-4 bg-slate-50 rounded-lg hover:shadow-md transition-shadow"
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
