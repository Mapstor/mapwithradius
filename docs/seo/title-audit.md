# Title & Metadata Audit — mapwithradius.com

**Scope:** every indexable page. The production build emits **74 routes**; **46 are indexable HTML pages** (21 static `(main)` routes + 25 rendered `/radius-map/[city]` pages). The other 28 are non-indexable (`/embed` noindex, `/_not-found`, 22 `opengraph-image` endpoints, `/icon.svg`, `/apple-icon`, `/robots.txt`, `/sitemap.xml`) — reconciled at the bottom.

**Method:** titles/descriptions read verbatim from each page's `export const metadata` / `generateMetadata`; H1s from rendered JSX. The rendered `<title>` applies the sitewide template. Char counts are exact character lengths of the final rendered strings (em dash `—` = 1 char). Extracted from source, not assumed.

## Sitewide metadata (root layouts)

| Field | Value | Source |
|---|---|---|
| Title template | `%s \| Map With Radius` — applied to every `(main)` page that sets a **string** title | `src/app/(main)/layout.tsx` L13–16 |
| Default title (fallback) | Map With Radius — Draw a Radius Circle on Any Map (Free) — used verbatim when a page sets **no** title; **not** templated | `src/app/(main)/layout.tsx` L14 |
| Default description (fallback) | Free radius map tool. Draw circles on a map by distance, find what's within your radius, and share your map. No signup, no limits. Works on mobile. | `src/app/(main)/layout.tsx` L17–18 |
| Robots (main) | `index, follow` — no `max-image-preview`, `max-snippet`, or `max-video-preview` | `src/app/(main)/layout.tsx` L39–42 |
| Robots (embed) | `noindex, nofollow` | `src/app/(embed)/layout.tsx` L8–11 |
| **`max-image-preview:large`** | **NOT set anywhere** — grep across all `page.tsx`/`layout.tsx` = 0 hits. Google defaults to `standard` image previews. | — |

## Indexable pages — one row per page

Rendered `<title>` = the page's title value + template suffix (or the default title for pages that set none). `Title/H1 mismatch` is flagged only when token overlap is low **and** neither string is largely contained in the other (so an H1 that is just a longer/shorter variant of the title is treated as aligned).

| URL | `<title>` (exact, rendered) | Title chars | H1 (exact) | Meta description (exact) | Desc chars | Source file | Robots | Flags |
|---|---|---|---|---|---|---|---|---|
| `/` | Map With Radius — Draw a Radius Circle on Any Map (Free) | 56 | Radius Map Tool | Free radius map tool. Draw circles on a map by distance, find what's within your radius, and share your map. No signup, no limits. Works on mobile. | 147 | `src/app/(main)/page.tsx` | index, follow | title≠H1 (J=0.33); no unique title (sitewide default); no meta description (inherits default) |
| `/about` | About Our Free Radius Map Tools \| Map With Radius | 49 | About Map With Radius | Map With Radius — free, privacy-respecting mapping tools built on Leaflet and OpenStreetMap. Our mission, full tool lineup, tech stack, and accuracy notes. | 155 | `src/app/(main)/about/page.tsx` | index, follow | — |
| `/alternatives` | Radius Map Tool Alternatives Compared \| Map With Radius | 55 | Radius Map Tool Alternatives Compared | Compare six radius map tools — FreeMapTools, MapDevelopers, CalcMaps, Smappen, Maptive, and Map With Radius. Pricing, features, and which fits your use case. | 157 | `src/app/(main)/alternatives/page.tsx` | index, follow | — |
| `/alternatives/calcmaps` | CalcMaps Alternative — Free Radius Map \| Map With Radius | 56 | CalcMaps Alternative — Free Radius Maps Without Prepaid Credits | CalcMaps alternative — draw radius circles, export KML and PNG, no prepaid credits, no ads, no account. Free on OpenStreetMap with mobile-first design. | 151 | `src/app/(main)/alternatives/calcmaps/page.tsx` | index, follow | near-dup |
| `/alternatives/freemaptools` | FreeMapTools Radius Alternative \| Map With Radius | 49 | FreeMapTools Radius — Alternative | FreeMapTools radius alternative — modern, mobile-friendly, with full address search and instant KML/PNG export. Free, no Google API, no account required. | 153 | `src/app/(main)/alternatives/freemaptools/page.tsx` | index, follow | — |
| `/alternatives/mapdevelopers` | MapDevelopers Draw Circle Alternative \| Map With Radius | 55 | MapDevelopers Alternative — Modern Radius Maps with KML Export | MapDevelopers Draw Circle Tool alternative — KML and PNG export, drag-to-resize circles on OpenStreetMap. Free, no Google API, no account, mobile-first. | 152 | `src/app/(main)/alternatives/mapdevelopers/page.tsx` | index, follow | title≠H1 (J=0.22) |
| `/alternatives/maptive` | Maptive Alternative — Free Radius Map \| Map With Radius | 55 | Maptive Alternative — Free Radius Maps Without a Per-User Subscription | Maptive alternative for radius mapping — free, no signup, no per-user subscription. Draw circles on OpenStreetMap, export KML, no account. | 138 | `src/app/(main)/alternatives/maptive/page.tsx` | index, follow | near-dup |
| `/alternatives/smappen` | Smappen Alternative — Free Radius Map \| Map With Radius | 55 | Smappen Alternative — Free Radius Maps Without a Subscription | Smappen alternative for simple radius maps — free, no signup, no monthly subscription. Draw circles, export KML and PNG, share URLs instantly. | 142 | `src/app/(main)/alternatives/smappen/page.tsx` | index, follow | near-dup |
| `/contact` | Contact Us \| Map With Radius | 28 | Contact Us | Contact Map With Radius for questions, bug reports, feature requests, or business inquiries. We typically respond within 48 hours. | 130 | `src/app/(main)/contact/page.tsx` | index, follow | — |
| `/distance-calculator` | Distance Between Two Points Calculator \| Map With Radius | 56 | Distance Between Two Points | Measure the straight-line or driving distance between any two points on a map. Shows both "as the crow flies" and road distance. | 128 | `src/app/(main)/distance-calculator/page.tsx` | index, follow | — |
| `/drive-time-map` | Drive Time Map — Free Isochrone Tool \| Map With Radius | 54 | Drive Time Map | Free drive time radius map. Enter a location and time limit to see how far you can actually travel by car, foot, or bike. Uses real road data. | 142 | `src/app/(main)/drive-time-map/page.tsx` | index, follow | — |
| `/geofence-map` | Geofence Map Tool — Create a Geofence \| Map With Radius | 55 | Geofence Map Tool | What is a geofence and how to visualize one on a map. Plan geofence boundaries with our free radius tool, then export KML for your geofencing platform. | 151 | `src/app/(main)/geofence-map/page.tsx` | index, follow | — |
| `/glossary` | Map & Radius Glossary \| Map With Radius | 39 | Map & Radius Glossary | Plain-English definitions of common terms used in radius mapping, geocoding, and geospatial analysis — radius, isochrone, geofence, KML, and 40+ more. | 150 | `src/app/(main)/glossary/page.tsx` | index, follow | — |
| `/km-radius-map` | KM Radius Map — Free Metric Radius Tool \| Map With Radius | 57 | KM Radius Map | Draw a radius in kilometers on any map. Free metric radius tool — enter an address and distance in km. No signup, no limits. | 124 | `src/app/(main)/km-radius-map/page.tsx` | index, follow | — |
| `/privacy` | Privacy Policy \| Map With Radius | 32 | Privacy Policy | Map With Radius privacy policy — no accounts, your location stays in your browser, GDPR and CCPA compliant. How we handle analytics, advertising, and your choices. | 163 | `src/app/(main)/privacy/page.tsx` | index, follow | — |
| `/radius-map` | City Radius Maps — Pre-Centered Tools for 25 Cities \| Map With Radius | 69 | City Radius Maps | Pre-centered radius maps for 25 major cities across 4 continents. Hand-authored coverage, local use cases, and city-specific quirks for New York, London, Paris, Tokyo, Sydney, and more. | 185 | `src/app/(main)/radius-map/page.tsx` | index, follow | >60 (69) |
| `/radius-on-google-maps` | How to Draw a Radius on Google Maps \| Map With Radius | 53 | How to Draw a Radius on Google Maps | Google Maps has no built-in radius tool. Here are 3 ways to draw a radius circle on Google Maps — plus a free alternative that works instantly. | 143 | `src/app/(main)/radius-on-google-maps/page.tsx` | index, follow | — |
| `/terms` | Terms of Use \| Map With Radius | 30 | Terms of Use | Map With Radius terms of use — acceptable use, accuracy disclaimer, OpenStreetMap attribution requirements, and limitation of liability. | 136 | `src/app/(main)/terms/page.tsx` | index, follow | — |
| `/use-cases` | Radius Map Use Cases \| Map With Radius | 38 | Radius Map Use Cases | How real estate agents, delivery teams, retailers, event planners, marketers, and sales managers use radius maps. Concrete examples, common pitfalls, and which tool fits each job. | 179 | `src/app/(main)/use-cases/page.tsx` | index, follow | — |
| `/walking-radius-map` | Walking & Cycling Radius Map (Free) \| Map With Radius | 53 | Walking & Cycling Radius Map | See how far you can walk or cycle in 5, 10, 15, or 30 minutes. Shows real walking/biking area based on actual roads and paths. | 126 | `src/app/(main)/walking-radius-map/page.tsx` | index, follow | — |
| `/zip-code-radius` | Zip Code Radius Map — Free Tool \| Map With Radius | 49 | Zip Code Radius Map | Enter a zip code and distance to find all zip codes within that radius. Export the list as CSV. Free, no signup. | 112 | `src/app/(main)/zip-code-radius/page.tsx` | index, follow | — |

## Dynamic route — `/radius-map/[city]` (template + 3 examples)

Pattern lives in `src/app/(main)/radius-map/[city]/page.tsx`: `generateMetadata` (L13–37) builds the title/description; the H1 is JSX (L180–182). `generateStaticParams` (L9–11) renders **25** cities from `src/data/cities.ts`. Title and H1 are identical by construction (`Radius Map of {City}`) → no title/H1 mismatch. All `index, follow` with a unique canonical.

| URL | `<title>` (exact, rendered) | Title chars | H1 (exact) | Meta description (exact) | Desc chars | Robots |
|---|---|---|---|---|---|---|
| `/radius-map/{city}` **(TEMPLATE)** | Radius Map of {City} \| Map With Radius | *(varies by name)* | Radius Map of {City} | What's within a radius of {City}, {Country}. Mile-by-mile (or kilometer-by-kilometer) coverage from {centralLandmark}, plus city-specific use cases, geographic quirks, and FAQs. Free interactive map. | *(varies)* | index, follow |
| `/radius-map/new-york-city` | Radius Map of New York City \| Map With Radius | 45 | Radius Map of New York City | What's within a radius of New York City, United States. Mile-by-mile (or kilometer-by-kilometer) coverage from Times Square, plus city-specific use cases, geographic quirks, and FAQs. Free interactive map. | 205 | index, follow |
| `/radius-map/los-angeles` | Radius Map of Los Angeles \| Map With Radius | 43 | Radius Map of Los Angeles | What's within a radius of Los Angeles, United States. Mile-by-mile (or kilometer-by-kilometer) coverage from downtown Los Angeles, plus city-specific use cases, geographic quirks, and FAQs. Free interactive map. | 211 | index, follow |
| `/radius-map/chicago` | Radius Map of Chicago \| Map With Radius | 39 | Radius Map of Chicago | What's within a radius of Chicago, United States. Mile-by-mile (or kilometer-by-kilometer) coverage from the Loop, plus city-specific use cases, geographic quirks, and FAQs. Free interactive map. | 195 | index, follow |

## Flags

### 1. Titles > 60 chars — truncation risk (1 static)

| URL | Rendered title | Chars |
|---|---|---|
| `/radius-map` | City Radius Maps — Pre-Centered Tools for 25 Cities \| Map With Radius | 69 |

The ` | Map With Radius` suffix is 18 chars, so any **core** title over ~42 chars truncates. Longest city names (e.g. `Radius Map of New York City | Map With Radius` = 45) sit right at the edge.

### 2. Title / H1 semantic mismatch — rewrite risk (2)

Token overlap (Jaccard, stop-words dropped, plurals folded) with a containment guard. Both strings shown; judge intent.

| URL | Core title | H1 | Jaccard | Containment |
|---|---|---|---|---|
| `/alternatives/mapdevelopers` | MapDevelopers Draw Circle Alternative | MapDevelopers Alternative — Modern Radius Maps with KML Export | 0.22 | 0.50 |
| `/` | Map With Radius — Draw a Radius Circle on Any Map (Free) | Radius Map Tool | 0.33 | 0.67 |

_Aligned but not identical (H1 is a longer/shorter variant of the title — low priority, 4):_
- `/radius-map` — title *City Radius Maps — Pre-Centered Tools for 25 Cities* vs H1 *City Radius Maps* (J=0.38, containment=1.00)
- `/drive-time-map` — title *Drive Time Map — Free Isochrone Tool* vs H1 *Drive Time Map* (J=0.50, containment=1.00)
- `/km-radius-map` — title *KM Radius Map — Free Metric Radius Tool* vs H1 *KM Radius Map* (J=0.50, containment=1.00)
- `/alternatives/maptive` — title *Maptive Alternative — Free Radius Map* vs H1 *Maptive Alternative — Free Radius Maps Without a Per-User Subscription* (J=0.56, containment=1.00)

### 3. Duplicate / near-duplicate titles

**Exact duplicates:** none.

**Near-duplicate clusters** (core titles ≥ 0.6 token overlap — same template, differentiated only by the brand name):
- `/alternatives/calcmaps`, `/alternatives/maptive`, `/alternatives/smappen`
    - `/alternatives/calcmaps`: CalcMaps Alternative — Free Radius Map
    - `/alternatives/maptive`: Maptive Alternative — Free Radius Map
    - `/alternatives/smappen`: Smappen Alternative — Free Radius Map

> Plus the 25 `/radius-map/[city]` pages, which are near-duplicates by design (`Radius Map of {City}`) — expected for a city template, differentiated by the unique city name + canonical + body content.

### 4. Pages missing a unique meta description (1)

Set no `description`, so they fall back to the sitewide default (shown in the table) — not empty, but not unique:
- `/` (also uses the default title)

## Robots meta — per page

No page overrides robots; every indexable page inherits `index, follow`. `max-image-preview:large` / `max-snippet` / `max-video-preview` are configured on **no** page or layout.

| Route(s) | robots | max-image-preview | Source |
|---|---|---|---|
| All 21 `(main)` static pages (table above) | `index, follow` | not set (Google default `standard`) | `(main)/layout.tsx` L39–42 |
| All 25 `/radius-map/[city]` pages | `index, follow` | not set | inherited from `(main)/layout.tsx` |
| `/embed` | `noindex, nofollow` | not set | `(embed)/layout.tsx` L8–11 |
| `/_not-found` | `noindex` (Next default) | — | framework |

## Reconciling the 74 build routes

| Category | Count | Indexable? |
|---|---|---|
| `(main)` static HTML pages | 21 | ✅ audited above |
| `/radius-map/[city]` rendered pages | 25 | ✅ template + 3 examples above |
| `/embed` | 1 | ❌ noindex |
| `/_not-found` | 1 | ❌ noindex |
| `opengraph-image` endpoints | 22 | ❌ image assets |
| `/icon.svg`, `/apple-icon` | 2 | ❌ icon assets |
| `/robots.txt`, `/sitemap.xml` | 2 | ❌ non-HTML |
| **Total** | **74** | **46 indexable** |

---
_Read-only audit — no application code modified. Extracted from `export const metadata` / `generateMetadata` and rendered H1s across `src/app/**` at HEAD._
