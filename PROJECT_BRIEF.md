# PROJECT_BRIEF.md — Map With Radius Build Specification

## Domain
mapwithradius.com

---

## Homepage: `/`

### Tool Requirements (above the fold)

**Map:**
- Leaflet map, full width, ~70vh height on desktop, ~50vh on mobile
- OpenStreetMap tiles (https://tile.openstreetmap.org/{z}/{x}/{y}.png)
- Default center: user's geolocation if granted, otherwise center of USA (39.8283, -98.5795) at zoom 4
- Zoom controls (top-left), scale bar (bottom-left), OSM attribution (bottom-right)

**Controls panel (sidebar on desktop, bottom panel on mobile):**

1. **Address search**
   - Input field with placeholder "Search address, city, or zip code..."
   - On submit: geocode via Nominatim API (https://nominatim.openstreetmap.org/search?format=json&q=QUERY)
   - Respect Nominatim usage policy: max 1 request/second, include a User-Agent header
   - On result: center map on location, place circle

2. **Radius input**
   - Number input + unit dropdown (Miles, Kilometers, Meters, Feet)
   - Default: 10 miles
   - On change: update circle in real time

3. **Quick presets**
   - Row of buttons: 1 mi · 5 mi · 10 mi · 25 mi · 50 mi · 100 mi
   - Second row: 1 km · 5 km · 10 km · 50 km · 100 km
   - Click: sets radius input + redraws circle

4. **"Use My Location" button**
   - Uses browser geolocation API
   - On success: center map + place circle at current position
   - On failure: show message "Location access denied. Please search for an address instead."

5. **Circle color picker**
   - Simple color swatches: blue (default), red, green, orange, purple, black
   - Changes fill + stroke of current circle

6. **"Add Another Circle" button**
   - Keeps existing circles, next click/search places a new circle
   - Each circle independently editable

7. **"Clear All" button**
   - Removes all circles from map

8. **Share & Export panel**
   - "Copy Link" — generates URL with params: `?lat=X&lng=Y&r=10mi&color=4285F4`
   - "Download PNG" — uses leaflet-image or html2canvas to capture current map view
   - "Export KML" — generates KML file with circle polygon (360-point approximation)

**Circle behavior:**
- Semi-transparent fill (opacity ~0.15), colored stroke (opacity ~0.7, weight 2)
- Center marker (draggable) — drag to reposition circle
- Edge handle (draggable) — drag to resize radius (updates radius input)
- Click circle → show popup with: center coordinates, radius distance, area
- Circle drawn using L.circle (Leaflet handles Haversine/projection)

**URL parameter support:**
- `?lat=40.71&lng=-74.00` — center map on coordinates
- `?r=50mi` or `?r=10km` — set radius
- `?locate=true` — trigger geolocation on load
- `?color=ff4444` — circle color
- Multiple circles: `?c=40.71,-74.00,10mi,4285F4&c=41.88,-87.63,25mi,ff4444`
- On page load: parse params → draw circles → fit map bounds

### Content (below the fold)
See `/content/homepage.md` for full content. Implement as:
- Comfortable reading width (max-w-3xl mx-auto)
- All headings use proper H2/H3 hierarchy
- Tables responsive (overflow-x-auto wrapper on mobile)
- FAQ section as accordion (click to expand) with FAQPage schema
- "How Big Is a Mile?" section as interactive React component with a range slider controlling a Leaflet circle in a smaller embedded map
- Comparison table with checkmarks (✓) and crosses (✗)
- Internal links as Next.js <Link> components
- External links as <a target="_blank" rel="noopener">

---

## Tool Page: `/drive-time-map`

### Tool Requirements
- Same Leaflet map setup as homepage
- Same address search + "Use My Location"
- **Time input:** dropdown or input — 5, 10, 15, 30, 45, 60, 90, 120 min (custom allowed)
- **Mode toggle:** Drive 🚗 · Walk 🚶 · Cycle 🚴 (icon buttons)
- On submit: fetch isochrone from OSRM/Valhalla → render polygon on map
- Polygon: semi-transparent fill, colored border
- Optional checkbox: "Show radius circle too" — overlays a straight-line circle for comparison
- Share link support

**Isochrone API (use one):**
- OSRM: self-hosted or public demo server (limited). Endpoint: `http://router.project-osrm.org/table/v1/driving/{lng},{lat}?sources=0`
- Valhalla: `https://valhalla1.openstreetmap.de/isochrone?json={"locations":[{"lat":X,"lon":Y}],"costing":"auto","contours":[{"time":30}]}`
- Fallback: if API unavailable, show message and suggest using radius tool instead

### Content
See `/content/drive-time-map.md`

---

## Tool Page: `/zip-code-radius`

### Tool Requirements
- Same Leaflet map as homepage
- **Input:** Zip code field + radius distance + unit
- On submit: geocode zip → draw radius circle → highlight zip code boundaries within circle
- **Zip code data:** Use GeoJSON boundaries from US Census ZCTA data (load on demand, not all at once)
- **Results panel:** Sortable list of zip codes within radius — columns: Zip Code, City, State, Distance from center
- **Export CSV** button: downloads the list

### Content
See zip-code-radius section in `/content/remaining-pages.md`

---

## Tool Page: `/km-radius-map`

### Tool Requirements
- Identical to homepage tool
- Only difference: unit dropdown defaults to "Kilometers" instead of "Miles"
- Preset buttons show km values first: 1 km · 5 km · 10 km · 25 km · 50 km · 100 km

### Content
See km-radius-map section in `/content/remaining-pages.md`

---

## Tool Page: `/walking-radius-map`

### Tool Requirements
- Same isochrone approach as drive-time-map
- Default mode: Walk 🚶
- Toggle: Walk 🚶 · Cycle 🚴 (no driving option on this page)
- Time presets: 5 · 10 · 15 · 20 · 30 · 45 · 60 min
- Optional: "Show radius circle" checkbox

### Content
See walking-radius-map section in `/content/remaining-pages.md`

---

## Tool Page: `/distance-calculator`

### Tool Requirements
- Leaflet map
- Click point A → place marker "A"
- Click point B → place marker "B"
- Draw dashed line between points (straight-line distance)
- Draw solid line along roads (road distance, via OSRM route API)
- **Results panel:**
  - Straight-line distance: X.XX mi / X.XX km
  - Road distance: X.XX mi / X.XX km
  - Driving time estimate: X min
- "Add another point" — extends to multi-stop
- "Clear" button

### Content
See distance-calculator section in `/content/remaining-pages.md`

---

## Content Page: `/radius-on-google-maps`

### Layout
- No tool above the fold (this is a guide/article page)
- Article layout: max-w-3xl, comfortable reading
- Embedded mini radius tool in Method 1 section (smaller map, ~400px height, with CTA "Open full tool →")
- Image placeholders for all 5 specified images (see content file)
- Code block for Method 3 (syntax highlighted)
- FAQ accordion at bottom with schema

### Content
See `/content/radius-on-google-maps.md`

---

## Content Page: `/geofence-map`

### Layout
- Article layout with embedded CTA to main tool
- Table of common geofence sizes
- FAQ accordion

### Content
See geofence-map section in `/content/remaining-pages.md`

---

## Comparison Pages: `/alternatives/freemaptools` and `/alternatives/mapdevelopers`

### Layout
- Article layout
- Comparison tables
- CTA buttons linking to homepage tool
- External links to competitor sites (regular links, not nofollow — these are honest references)

### Content
See alternatives sections in `/content/remaining-pages.md`

---

## Footer Pages: `/about`, `/contact`, `/terms`, `/privacy`

### Layout
- Simple article layout, max-w-2xl
- No tool, no fancy components
- `/contact`: just the email address, no contact form
- `/about`: list of tools with links, technology credits
- `/terms` and `/privacy`: write real, concise legal text (not placeholder). Keep it simple — this is a free tool, not a SaaS.

### Content
See footer sections in `/content/remaining-pages.md`

---

## Embed Endpoint: `/embed`

### Requirements
- Standalone page with NO header, footer, or navigation
- Just the Leaflet map + basic controls (search, radius input)
- Accepts URL params: `?lat=X&lng=Y&r=10mi&color=ff4444&zoom=12`
- Designed to be loaded in an iframe
- Lightweight — minimal CSS/JS bundle
- Small "Powered by Map With Radius" link in bottom corner (links to homepage, opens in new tab)

---

## Shared Components

### Header (`Header.tsx`)
- Logo/site name: "Map With Radius" (text, no image logo needed)
- Nav links: Tools (dropdown) · Guide · About
- Tools dropdown: Radius Map, Drive Time Map, Zip Code Radius, KM Radius, Walking Map, Distance Calculator
- Mobile: hamburger menu
- Sticky on scroll (optional — test if it interferes with map on mobile)

### Footer (`Footer.tsx`)
- 3 columns: Tools (links to all tool pages), Resources (guide, comparisons), Legal (about, contact, terms, privacy)
- Bottom: "Built with Leaflet and OpenStreetMap" + copyright
- Keep it compact

### Breadcrumbs (`Breadcrumbs.tsx`)
- Show on all pages except homepage
- Schema: BreadcrumbList
- Example: Home > Tools > Drive Time Map
- Keep it small/subtle, above the main content

### FAQ Accordion (`FAQ.tsx`)
- Reusable component accepting array of {question, answer} objects
- Click to expand/collapse
- Injects FAQPage JSON-LD schema automatically
- Smooth height animation

### Schema Markup (`SchemaMarkup.tsx`)
- Accepts schema type + data as props
- Renders JSON-LD in <script> tag
- Supports: WebApplication, FAQPage, HowTo, Article, BreadcrumbList, VideoObject

---

## SEO Requirements

### Every page must have:
- Unique title tag (from content files)
- Unique meta description (from content files)
- Canonical URL
- Open Graph tags (og:title, og:description, og:image, og:url)
- Twitter card tags
- Breadcrumb schema (except homepage)

### Site-level:
- `/sitemap.xml` — auto-generated, all 14 pages
- `/robots.txt` — allow all, reference sitemap
- Trailing slash consistency (pick one, Next.js config)
- 404 page with link back to homepage

---

## Performance Targets
- Lighthouse Performance: 90+
- Largest Contentful Paint: < 2.5s
- Leaflet loaded dynamically (not in SSR — use next/dynamic with ssr: false)
- Map tiles lazy-loaded
- Content images: WebP format, responsive sizes
- Minimal JavaScript bundle — Leaflet (~40KB) is the main dependency
