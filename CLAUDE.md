# CLAUDE.md — Map With Radius

## Project Overview
Map With Radius (mapwithradius.com) is a free online radius map tool. Users draw circles on a map by entering an address and distance. The site targets 1,341 keywords with 285K monthly search volume.

## Tech Stack
- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Maps:** Leaflet + React-Leaflet
- **Map tiles:** OpenStreetMap (free, no API key)
- **Geocoding:** Nominatim (free, no API key)
- **Routing/Isochrones:** OSRM or Valhalla (free, for drive-time features)
- **Deployment:** Vercel
- **Git:** GitHub

## Key Rules

### NEVER do these:
- Never use placeholder/dummy data. All content, examples, and data must be real.
- Never use Google Maps API. We use Leaflet + OpenStreetMap exclusively.
- Never add fake team bios, fake testimonials, or fake company info.
- Never hardcode content that should come from the content files in `/content/`.
- Never skip mobile responsiveness. Every page must work on 375px+ screens.
- Never add a login/signup system. This is a free tool with no accounts.

### ALWAYS do these:
- Read `PROJECT_BRIEF.md` for the full spec before starting any page.
- Read the relevant content file in `/content/` before building any page's content sections.
- Use real locations in any examples or defaults (e.g., center map on user's location or a real city).
- Implement all schema markup specified in the content files.
- Implement all internal links exactly as specified in the content files.
- Make the tool the hero of every tool page — it should be above the fold, full width.
- Support URL parameters on the homepage: `?lat=X&lng=Y&r=10mi&locate=true`
- All images will be added after the tool is built (screenshots of real tool). Leave proper `<Image>` tags with the correct alt text from content files, pointing to `/public/images/`.

## Project Structure
```
mapwithradius/
├── CLAUDE.md                    # This file
├── PROJECT_BRIEF.md             # Full build specification
├── content/                     # Page content (markdown)
│   ├── homepage.md
│   ├── radius-on-google-maps.md
│   ├── drive-time-map.md
│   └── remaining-pages.md
├── src/
│   ├── app/                     # Next.js App Router pages
│   │   ├── layout.tsx           # Root layout with nav + footer
│   │   ├── page.tsx             # Homepage (main tool)
│   │   ├── radius-on-google-maps/page.tsx
│   │   ├── drive-time-map/page.tsx
│   │   ├── zip-code-radius/page.tsx
│   │   ├── km-radius-map/page.tsx
│   │   ├── walking-radius-map/page.tsx
│   │   ├── distance-calculator/page.tsx
│   │   ├── geofence-map/page.tsx
│   │   ├── alternatives/
│   │   │   ├── freemaptools/page.tsx
│   │   │   └── mapdevelopers/page.tsx
│   │   ├── about/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── terms/page.tsx
│   │   ├── privacy/page.tsx
│   │   └── embed/page.tsx       # Embeddable widget
│   ├── components/
│   │   ├── map/
│   │   │   ├── RadiusMap.tsx     # Main radius map component
│   │   │   ├── DriveTimeMap.tsx  # Isochrone map component
│   │   │   ├── DistanceMap.tsx   # Point-to-point distance
│   │   │   ├── MapControls.tsx   # Sidebar controls (search, radius input, presets)
│   │   │   ├── CircleManager.tsx # Manages multiple circles
│   │   │   └── ShareExport.tsx   # Copy link, PNG, KML export
│   │   ├── layout/
│   │   │   ├── Header.tsx        # Site header with nav
│   │   │   ├── Footer.tsx        # Footer with links
│   │   │   └── Breadcrumbs.tsx
│   │   ├── content/
│   │   │   ├── FAQ.tsx           # Reusable FAQ accordion with schema
│   │   │   ├── ComparisonTable.tsx
│   │   │   └── RadiusPresets.tsx # Quick preset buttons
│   │   └── seo/
│   │       ├── SchemaMarkup.tsx  # JSON-LD schema injection
│   │       └── MetaTags.tsx
│   ├── lib/
│   │   ├── geocoding.ts         # Nominatim API wrapper
│   │   ├── haversine.ts         # Distance calculations
│   │   ├── kmlExport.ts         # KML file generation
│   │   ├── pngExport.ts         # Map screenshot
│   │   └── urlParams.ts         # Parse/generate shareable URLs
│   └── styles/
│       └── globals.css
├── public/
│   ├── images/                  # Screenshots (added after tool is built)
│   ├── sitemap.xml              # Generated
│   └── robots.txt
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

## Build Phases

### Phase 1: Core (build first)
1. Next.js project setup with Tailwind
2. Root layout (header, footer, nav)
3. Homepage with fully working RadiusMap tool
4. URL parameter support
5. Share/export functionality (copy link, KML)
6. Footer pages (about, contact, terms, privacy)

### Phase 2: Supporting Tool Pages
7. /km-radius-map (same tool, km default)
8. /distance-calculator
9. /zip-code-radius

### Phase 3: Content Pages
10. /radius-on-google-maps (guide)
11. /alternatives/freemaptools
12. /alternatives/mapdevelopers
13. /geofence-map

### Phase 4: Advanced Tools
14. /drive-time-map (needs OSRM integration)
15. /walking-radius-map (needs routing)
16. /embed endpoint

### Phase 5: SEO Polish
17. All schema markup
18. sitemap.xml generation
19. robots.txt
20. Open Graph meta tags
21. Image placeholders with correct alt text

## Content Integration
All page content is in `/content/` as markdown files. When building a page:
1. Read the relevant section in the content file
2. Implement the META section as Next.js metadata
3. Build the tool section above the fold
4. Render the content sections below the tool
5. Implement FAQ as an accordion with FAQPage schema
6. Add all internal links as Next.js `<Link>` components
7. Add all external links as `<a target="_blank" rel="noopener">`

## Design Guidelines
- Clean, modern, tool-first design
- White/light background, professional blue accent color (#1B3A5C or similar)
- Tool takes full viewport width on load
- Content below the fold uses comfortable reading width (max-w-3xl)
- Tables are responsive (horizontal scroll on mobile)
- Mobile: tool controls collapse into a bottom sheet or expandable panel
- No animations or fancy transitions — this is a utility tool, speed matters
- Leaflet map should have: zoom controls, scale bar, attribution
