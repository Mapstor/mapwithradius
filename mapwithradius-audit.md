# MapWithRadius.com — Audit Refresh
**Date:** June 10, 2026 · **Scope:** Live site — 21 routes sampled, including all 6 primary tools, hub pages (/radius-map, /alternatives, /use-cases, /glossary), 4 city pages (NYC, London, Tokyo, LA, Paris), 2 alternatives pages, all 4 legal/company pages, plus `/robots.txt`, `/sitemap.xml`, `/ads.txt`. Verified raw HTML for meta, schema, scripts.
**Author byline:** Marko Visic (LinkedIn: https://www.linkedin.com/in/marko-visic/)

---

## 0. Implementation log — June 10, 2026 (this session)

Shipped during the working session that followed this audit. `tsc --noEmit` clean; `npm run verify` passes (ZIP database build + ZIP regression + city-coverage regression).

### Day 1 — Free credibility fixes
- **Action 1 — /about present-tense rewrite.** Removed "AdSense account is currently in review", "no live ads are serving yet", "consent management platform is planned", "Once approved …". Drive-time blurb "traffic patterns" → "road types and typical speeds".
- **Action 2 — Marko Visic byline + Person schema.** /about intro now names Marko with LinkedIn link. Added Person JSON-LD with `sameAs: [linkedin]`, `homeLocation: SI`, `worksFor` pointing at Organization @id. Added `founder` ref on Organization schema.
- **Action 3 — Deleted `meta name="keywords"` sitewide.** 18 files swept. Worst offender (NYC's "nyc, new york, the big apple, manhattan") gone.
- **Action 4 — /terms governing-law fix.** "Laws of the United States" → "Republic of Slovenia" + Slovenian courts, with EU mandatory consumer-protection carve-out preserved.
- **Action 5 — /contact DPO/privacy tile + operator identity.** Added a "Privacy & Data Protection" tile (GDPR/CCPA enquiry handling), an "Operated by Marko Visic, Slovenia" line under the primary email, and fixed the stale ads FAQ in two places.

### Cleanup sweep (Day 1 follow-on)
- 9 stale "in review" / "once approved" / "planned" phrases removed from /privacy (4), /geofence-map (2), /km-radius-map (2), and the layout's Consent Mode v2 comment (1).

### Day 2 — Stated decline cause
- **Action 6 — ZIP database expanded from 516 → 33,783 ZIPs.** Found that `src/lib/zipCodes.ts` had been shipping a hardcoded sample array of 516 ZIPs across 6 states while the full SimpleMaps CSV (33,784 rows) sat unused in `data/uszips.csv`. Wired the full dataset:
  - `scripts/build-uszips-json.mjs` — hand-rolled RFC-4180 CSV parser, strips to 5-field tuples, emits `public/data/us-zip-points.json` (1.47 MB raw, ~350 KB gzipped). Gracefully no-ops if CSV missing on CI.
  - `scripts/verify-zip-coverage.mjs` — regression test asserting ≥33K ZIPs, all 50 states + DC, and 11 specific test ZIPs (90210, 02134, 56374, 99577, 96799, 00601, 78701, 60601, 33101, 19102, 98101).
  - `src/lib/zipCodes.ts` — rewritten with `loadZipDatabase()` Promise-cached async loader; query helpers now take the loaded `db` as a parameter.
  - `src/components/map/ZipCodeRadiusMap.tsx` — lazy-loads on mount, gates the Search button with "Loading ZIP database…" UX, surfaces `count / states / source / verified date` strip under the form.
  - `/zip-code-radius` FAQ — replaced "all active US zip codes (approximately 41,700)" with honest 33,784-centroid coverage statement + business/PO-box/retired ZIP disclaimer in 5 HTML entries and their JSON-LD mirrors. "Any part of boundary touches" claim softened to actual centroid behavior.
  - Big stat 41,700+ → 33,784.
  - `predev` / `prebuild` / `verify` npm scripts chained.

### Day 3 — Verified-or-omitted sweep
- **Action 7 — City-page coverage verifier.** Built `scripts/verify-city-coverage.mjs`: text-parses `src/data/cities.ts`, locates each city by slug, locates each radius bucket by `radius: N,`, extracts the includes/excludes arrays, asserts each named place's haversine distance is consistent with its bucket. Borderline band of `max(0.5, radius × 2%)` for centroid edge cases. Currently locks in **46 assertions across NYC, London, Tokyo** — extend by adding `places: [...]` entries to other cities.
  - NYC errors fixed: Stamford/Morristown out of 25-mile includes → into excludes with distance qualifiers; Yonkers/Newark Liberty Airport out of 10-mile includes → excludes; Trenton/Bridgeport/Newburgh/Easton out of 50-mile includes; "Newark Airport is inside" FAQ corrected; 10/25/50-mile descriptions rewritten to match facts.
  - Tokyo distance claims corrected: Skytree ~7 km → ~10 km (×2), Haneda ~14 km → ~17 km (×4), 10-km description rewritten (×2).
  - Bridgeport regression caught during dev — verifier flagged "both" when I'd left it in both includes and excludes.
- **Action 8 — ZIP density table computed from real data.** `scripts/build-zip-density.mjs` writes `src/data/zip-density.json` with counts per metro at 10/25/50 mi derived from the loaded ZIP DB. `/zip-code-radius` table renders from JSON. Old fabricated numbers (NYC 187/412/892, LA 156/387/612, etc.) replaced with computed values. Page now shows source + last-verified date.
- **Action 9 — Article schema + dateModified.** City pages now emit an Article JSON-LD with `author` referencing Marko's `#marko` Person @id, `publisher` referencing the Organization, plus `datePublished`/`dateModified` from `city.lastUpdated`. Homepage and /about gained `WebPage` JSON-LD with `dateModified: '2026-06-10'` and author/publisher refs.

### Day 4 — Polish
- **Action 12 — Per-page programmatic OG images.** Stripped `images: OG_IMAGES,` from all 21 per-page metadata exports (and their unused imports). Next.js now picks up the per-route `opengraph-image.tsx` generators that were already in the repo but were being overridden. Layout's `OG_IMAGES` kept as a sitewide fallback.
- **Action 13 — Funding Choices CMP loader.** Added `<Script src="…/i/pub-3093026304369835?ers=1" />` plus the `googlefcPresent` signaling iframe to `layout.tsx`. **User must still publish a CMP message** in AdSense → Privacy & Messaging for a banner to actually display.
- **Action 15 — /privacy footer "Related Pages" vestige removed** (template inconsistency caught in the audit).
- **CLAUDE.md drift fixed** — alternatives list now reflects all 5 pages (calcmaps, freemaptools, mapdevelopers, maptive, smappen) + the hub.

### Pre-deploy hardening pass (AdSense reviewer focus)
- **Homepage worked examples replaced with honest values.** Audit R1 numbers fixed: Denver "47 distinct neighborhoods" → descriptive list of named suburbs; Brooklyn "450,000+ residents" → descriptive coverage statement; Phoenix "~5,800 square miles" → descriptive overlap statement. The 706 sq mi (Denver) and 28.3 sq mi (Brooklyn) values stay because they're π × r² and self-evidently correct.
- **/zip-code-radius worked examples recomputed from real ZIP DB.** 8 specific numbers replaced with computed values (Scottsdale 85251 @ 15mi: 87→59 ZIPs; Dallas 75201 @ 50mi: 312→260; Houston 77002 @ 50mi: 298→224; Austin 78701 @ 50mi: 186→119; Cambridge 02139 @ 5mi: 42→44; Chicago 60611 @ 30mi: 428→223; Downers Grove 60515 @ 30mi: 312→262; Chicago overlap: 187→203; Miami Beach 33139 @ 10mi: 67→32 ZIPs; populations updated from SimpleMaps `population` field: Scottsdale 425K households → 2.1M residents; Miami Beach 1.2M → 900K). Section now opens with "Verified [date]" note.
- **/contact "embeddable widget coming" FAQ replaced** with the actual `/embed` endpoint instructions (HTML + JSON-LD).
- **/privacy §6 absolute claim softened.** "Your coordinates never leave your browser" → accurate, scoped "Your coordinates are not sent to *our* servers; the browser still queries OpenStreetMap tile and Nominatim services for the surrounding viewport, see Section 5" so it doesn't contradict §5.
- **"Privacy at a Glance" line tightened.** "Location data stays in your browser" → "Coordinates aren't sent to our servers" (same accuracy fix).
- **/privacy `dateModified` and visible "Last updated" both bumped to 2026-06-10.**
- **layout.tsx author/creator updated** from "Map With Radius" → "Marko Visic" (+ LinkedIn URL on `authors`). Added `publisher: 'Map With Radius'`. The HTML `<meta name="author">` now reflects the human author, consistent with the byline on /about and the Person JSON-LD.

### Stale-language sweep (final)
Verified with `grep -rni -E "coming soon|we're working on|TODO|FIXME|placeholder|TBD|under construction|stay tuned"` — only legitimate "currently" uses remain (e.g. "tool does not currently factor in real-time traffic"), which are accurate present-state claims. No "coming soon" / "in review" / "planned" left in the codebase.

### Pre-deploy verification
- `npm run verify` clean: 33,783 ZIPs + 50 states + 11 required test ZIPs + 46 city assertions across NYC/London/Tokyo + 0 failures
- `tsc --noEmit` clean
- ads.txt verified: `google.com, pub-3093026304369835, DIRECT, f08c47fec0942fa0` + OWNERDOMAIN + CONTACT
- AdSense pub ID consistent across layout meta, adsbygoogle.js, Funding Choices loader, ads.txt
- /embed properly noindex/nofollow via embed layout metadata
- Every page in /(main)/ sets a canonical URL (grep -L verifies none missing)
- Robots.txt allows all major AI crawlers + Googlebot; disallows /embed only
- Sitemap excludes /embed; includes all 25 city pages + 5 alternatives + all tool pages

### ZIP-tool reviewer hardening (post-Raptive-pivot)
The previous Raptive decline cited "many ZIPs returned not found." Beyond the 516 → 33,784 dataset swap (Action 6), I added two UX rails so a reviewer never hits a dead-end:

1. **Pad-to-5 leading zeros.** A user typing `601` (intending Puerto Rico's `00601`) is auto-padded and resolves correctly. Previously: silent failure.
2. **Nearest-ZIP suggestion + one-click re-search.** When a ZIP genuinely isn't in the dataset (PO-box/business/retired — e.g. `06101` Hartford, `12345` GE Schenectady, `20505` CIA, `10048` retired WTC), the error message includes a clickable button:
   > *"Try 06103 (Hartford, CT) →"*
   Clicking auto-fills + re-runs the search.

Algorithm: pad input to 5, exact-lookup; if missing, find the ZIP with the smallest |numeric difference|. ZIP codes are roughly geographically ordered by USPS Sectional Center (first 3 digits), so the numeric nearest is almost always in the same metro.

Stress-test results (verified inline):
- **100 random ZIPs from the dataset**: 100/100 resolve; avg 51 neighbors at 25 mi.
- **8 adversarial ZIPs** (06101, 12345, 20505, 10048, 00936, 06102 plus controls 22102, 30309): every miss returns a working same-city or same-metro suggestion (e.g. `06101 → 06103 Hartford, CT (27 ZIPs in 10mi)`, `12345 → 12309 Schenectady, NY (27 in 10mi)`, `20505 → 20510 Washington, DC (113 in 10mi)`).

Translation for Raptive's reviewer: every ZIP they could plausibly type — including the ones that aren't technically in the dataset — produces a useful, working result in two clicks max.

### Post-Raptive-acceptance follow-ups (after they approve)
- Swap `ads.txt` to add Raptive's required entries.
- Replace the standalone AdSense auto-ads script with Raptive's ad code.
- Replace the Funding Choices loader with Raptive's built-in TCF CMP.
- Update /about + /privacy "I use Google AdSense to fund the site" → "Map With Radius is monetized by Raptive (which manages AdX, header bidding, and consent)."

### Verifier output today
```
build-uszips-json: 33,783 ZIPs across 56 states/territories
ZIP coverage verification PASSED          (11 required ZIPs, 50 states)
City coverage: 46 passed, 0 failed, 1 not-mentioned (informational)
City coverage verification PASSED
```

### Still open (next session)
- **Phase 2 ZIP augmentation** — HUD/GeoNames merge to lift coverage from 33,783 → ~41,000 USPS ZIPs (covers retired/business/PO-box-only ZIPs like 20505, 12345, 10048).
- **22 other city pages** not yet locked in by the coverage verifier — LA, Chicago, Paris, Berlin, Madrid, Rome, Sydney, Toronto, SF, Boston, Seattle, Miami, DC, Vancouver, Dublin, Amsterdam, Barcelona, Munich, Singapore, Hong Kong, Auckland, Manchester. Add ~10 `places: [...]` each.
- **"Just outside" semantic abuse** on London/Tokyo lists (80-km places under "Just outside" 25-km bucket) — editorial pass, not regression-detectable.
- **Homepage worked examples** with audit-flagged numbers (Denver "47 distinct neighborhoods", Brooklyn "450,000+ population", Phoenix "~5,800 square miles") — compute or delete.
- **Funding Choices CMP message** — publish in AdSense console; once live, update /about + /privacy "no consent banner" lines.
- **Bytespider opt-in decision** in robots.txt — keep allowed for AI visibility, or block as most major publishers do.
- **Twitter @site / @creator handles** — add if there's an X account to point at.
- **/privacy §6 absolute claim** ("coordinates never leave your browser") — soften to match §5 (which correctly notes OSM tile and Nominatim requests do transmit viewport / search terms).

---

## 1. What's already been fixed (do not redo)

| Prior audit item | Current state |
|---|---|
| **B2** Privacy policy forbids the ads you're applying for | **Resolved.** /privacy now discloses Google AdSense + partners by name, advertising cookies, personalized vs contextual ads, Google Consent Mode v2 for EEA/UK/CH, GDPR/CCPA/CPRA rights, GPC honoring, and the correct opt-out links. Dated **June 3, 2026** in the body. Plausible fiction removed; GA4 disclosed correctly. |
| **R2** Two template generations live on the site | **Looks resolved.** /privacy and /alternatives/* now render the same header/footer shell as the homepage. One vestige: /privacy footer includes an extra "Related" link group (Terms / About / Contact / Back to Map Tool) that no other page has — cosmetic but inconsistent. |
| **R3** Hardcoded stale counts | **Partly fixed.** /radius-map correctly says "25 cities", but the NYC page body still says "the index of all 25 city pages" as static text — wasn't computed, just happens to be right now. Will silently drift again. |
| **R4** "Traffic patterns" overclaim on drive-time | **Fixed.** /drive-time-map now says "does not currently factor in real-time traffic or road closures." |
| Infrastructure: ads.txt, robots.txt, sitemap, schema | `ads.txt` present and correctly formatted (`google.com, pub-3093026304369835, DIRECT, f08c47fec0942fa0`). Sitemap is well-formed, includes all 25 cities + all tools + legal pages (46 URLs). Homepage has rich schema (Organization, WebSite, WebApplication, HowTo, FAQPage). Robots.txt explicitly Allow's every major AI bot. |
| **R6** Per-page OG images (partial) | **Started but stuck.** Homepage emits a dynamic OG (`/opengraph-image-12jlf3`), but every other route I checked still falls back to the static `/og-image.png` — the recent "per-page programmatic OG via shared template" commit didn't propagate to subroutes. |

---

## 2. Still-open blockers

### B1. ZIP database gap + false coverage claim *(unchanged — still the stated decline cause)*

Verified live today. /zip-code-radius FAQ still reads: *"The tool includes all active US zip codes (approximately 41,700). Data is sourced from the US Census Bureau's ZCTA dataset."* The contradiction is exactly as the previous audit described — ~33.6K ZCTAs vs ~41.7K USPS ZIPs — and Raptive's testers will hit the same gap. **Fix per the previous audit's B1 plan; nothing has shipped here.**

### B2-new. The About page actively contradicts the site you're running

The previous audit caught /about's self-disqualifying admissions. They are still there — and now the contradiction is sharper, because:

- **/about claims** (verbatim, fetched today):
  - "the account is currently in review with Google, so **no live ads are serving yet**"
  - "Once approved, AdSense will display ads…"
  - "a **consent management platform is planned**"
- **/about source** (and homepage, and every page I checked) actually loads:
  - `<link rel="preload" href="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3093026304369835">`
  - `<meta name="google-adsense-account" content="ca-pub-3093026304369835">`
  - `<link rel="preload" href="https://www.googletagmanager.com/gtag/js?id=G-H8ZRCLN1TK">`
  - An inline Google Consent Mode v2 default-deny stub for the EEA/UK/CH region list, default-grant elsewhere.
- `ads.txt` declares `google.com, pub-3093026304369835, DIRECT, f08c47fec0942fa0` — the live production declaration AdSense actually reads.

So one of three things is true:
1. AdSense has actually approved (likely — the pub ID matches the portfolio) and /about is months stale.
2. The script is requesting ads while the account is in review, which is a policy gray area.
3. The script loads but no ads render — wasted requests, worst-of-both-worlds.

Whichever it is, **a Raptive/AdX reviewer who reads /about will see the site declaring itself not-monetization-ready while their inspector tab shows the ad script loading**. That contradiction is a more concrete decline signal than the original "no advertising cookies" promise was, because it's evidence of operational neglect. **Fix /about's monetization paragraph to present tense, before anything else, because it's free and takes minutes.**

There is also still **no actual CMP banner** anywhere — only the inline default-deny stub. That's technically AdSense-compliant (no consent → non-personalized only), but it means EEA traffic earns the floor rate forever and /about's promise of a forthcoming CMP remains undelivered. Install Funding Choices (Google's free CMP, the natural choice given ca-pub already configured) — script tag plus AdSense console toggle.

### B3-new. No human attached, and the schema confirms it

Grep'd /about's source today for "Marko", "Visic"/"Višić", "Slovenia", "physicist", "LinkedIn", "github.com", "twitter.com", "x.com" — **zero hits.** The JSON-LD has an `Organization` and a `ContactPoint`, but **no `Person`**. No `author` field on any page schema I checked (about, home, NYC, alternatives). The "I'm an avid traveler" first-person voice on /about is therefore ghost-authored from a reviewer's perspective and from Google's E-E-A-T machinery's perspective. Same finding as the previous audit's B4, restated with one piece of new evidence (schema confirms it).

---

## 3. Findings the previous audit did not catch (or under-stated)

### N1. The "ground truth" labels on city pages are systemically wrong, not just NYC

The previous audit caught Stamford and Morristown on NYC. I computed haversine distances from each city's stated anchor (Times Square, Charing Cross, Shinjuku Station, Notre-Dame, downtown LA City Hall) for everywhere labeled "just inside" / "just outside" on the four cities I sampled.

**NYC** — additional errors beyond Stamford/Morristown:
- **Yonkers** labeled "(just inside)" 10 mi — actually **~12.8 mi** from Times Square (outside).
- **Newark Liberty Airport** listed inside 10 mi — actually **~10.6 mi** (just outside).
- **Easton, PA** listed inside 50 mi — actually **~64.8 mi** (15 mi outside).
- **Trenton** listed inside 50 mi — actually **~55.1 mi** (outside).
- **Newburgh** listed inside 50 mi — actually **~51.5 mi** (just outside).
- **Princeton, NJ** in the 25-mile "Just Outside" group — actually **~45.3 mi** (20 mi past edge, not "just" outside).

**London** — the "Just Outside" label is consistently misused:
- 5 km "Just Outside" lists **Wembley** (~11.8 km), **Greenwich** (~9.5 km), **Stratford** (~9.9 km), Olympic Park, Hampstead Heath — all are 5–7 km *past* the 5 km edge, not "just outside" it.
- 10 km "Just Outside" lists **Croydon (~16 km)**, **Romford (~22 km)**, **Heathrow (~22 km)** — all 6–12 km past the edge.
- 25 km "Just Outside" lists **Brighton (~80 km)** — 55 km past the edge.
- 50 km "Just Outside" lists **Reading**, **Brighton**, **Oxford**, **Cambridge** — all 30–90 km past the edge.

**Tokyo** — same labeling pattern plus actual distance errors:
- "Tokyo Skytree **(~7 km east)**" from Shinjuku — actually **~10.2 km**.
- "Haneda Airport **(~14 km south)**" — actually **~17.2 km**.

**LA** — Malibu "Outside (~30 mi west)" of 25 mi — Malibu Pier is right around 25 mi; only Point Dume hits 30+. Minor.

**Paris** — visibly cleaner (Versailles ~17.6 km vs claimed ~20 km southwest; CDG ~22.6 km vs claimed ~25 km northeast). All within 2–3 km. Use Paris as the editorial standard.

**The systemic issue is the labeling vocabulary, not just specific places.** Across all four non-Paris cities I checked, "Just Inside" / "Just Outside" sections are being used as "Inside / Outside" sections without any threshold for "just." A reader who interprets "just outside" literally — the real-estate analyst the "ground truth" framing targets — will be misled. The fix is the previous audit's R1 verifier; I'm flagging that **the breadth requires it across all 25 pages, with an explicit tolerance band for "just" (e.g., within ±10% of the radius).**

### N2. The terms of use have an unenforceable jurisdiction clause

/terms says: *"laws of the United States, without regard to its conflict of law provisions"* and *"exclusive jurisdiction of the courts located in the United States."* US contract law lives at the state level — there is no generic "law of the United States" for consumer ToS, and "courts located in the United States" is too vague to be enforceable. For a Slovenian-operated site this is doubly mismatched. A reviewer who reads /terms sees boilerplate written by someone who didn't read what they pasted. Pick a state (Delaware is the boring choice) or actually use Slovenian/EU law if that matches the operator.

### N3. NYC meta keywords are a stuffing tell, sitewide pattern continues

`meta name="keywords"` is still on every page. NYC's is the egregious one:
> `radius map new york city, new york city radius, 5 miles radius new york city, 10 miles radius new york city, what's within new york city, nyc, new york, the big apple, manhattan`

Google doesn't read it, but a reviewer who views source absolutely does, and this reads like 2008 spam. Delete the meta sitewide.

### N4. dateModified is implemented unevenly

Schema grep across 5 pages: **/privacy** and **/nyc** include `dateModified`. **/home, /about, /alternatives/freemaptools** do not. The city pages all have visible "Last updated May 4, 2026" text but only NYC has it in schema. Either ship `dateModified` everywhere or remove it from the two that have it — partial implementation is worse than none because it signals neglect.

### N5. City pages should be Article schema, not just Place + FAQPage

City pages currently emit `WebPage`, `BreadcrumbList`, `FAQPage`, `Place`, `GeoCoordinates`, `PostalAddress`. No `Article`, no `dateModified` on most, no `author`. These pages are hand-authored geography essays with a Q&A appendix — the correct type is `Article` (or `BlogPosting`) with `author`, `datePublished`, `dateModified`, `mainEntityOfPage`. That's what Google's HCU signals reward. The current schema describes the *subject* of the page (New York City the place) but not the *editorial content*, which is the asset.

### N6. The robots.txt opt-in to every AI crawler is a choice — surfacing in case it's accidental

You explicitly Allow GPTBot, ChatGPT-User, OAI-SearchBot, ClaudeBot, anthropic-ai, Claude-Web, PerplexityBot, Perplexity-User, Google-Extended, Applebot-Extended, CCBot, Meta-ExternalAgent, FacebookBot, **Bytespider**, DuckAssistBot. If "AI visibility" is the goal (per the prior audit header), this is correct. If you didn't intend to opt in to **Bytespider** (ByteDance/TikTok, widely blocked by major publishers), reconsider. Flagging because it's a per-bot trade-off you should know you're making.

### N7. There are 5 alternatives pages, not 2

Sitemap lists `/alternatives/{calcmaps, freemaptools, mapdevelopers, maptive, smappen}` plus the `/alternatives` hub. CLAUDE.md only lists freemaptools and mapdevelopers. Documentation drift — if you regenerate scaffolding from CLAUDE.md you'll wipe three pages.

### N8. Contact page has no DPO/abuse contact and no operator name

Two emails (`contact@`, `info@`), no postal address, no named operator, no legal entity, no DPO. For a GDPR-relevant site (you advertise to EEA users, you process search queries via a third-party geocoder), the contact thinness is a compliance smell. At minimum, add a `privacy@` or note that `contact@` doubles for data-protection enquiries.

### N9. Twitter card has no @site or @creator handle

Minor SEO. Card type is `summary_large_image` with image and title set, no `twitter:site` or `twitter:creator`.

### N10. The ZIP density table has no "Last verified [date]" footer

Homepage's competitor comparison table has *"Data last verified February 2026"* — a great habit. The /zip-code-radius metro-density table doesn't. Inconsistent practice; either drop the verified-date language sitewide or extend it. (And the table needs to actually be verified — see B1.)

---

## 4. Items I nuance vs the previous audit

- **R5 (infrastructure risk at ad-scale):** Agree, but probably not blocking acceptance — it's a *post*-acceptance survival concern. Do not sequence before B1 or B2-new.
- **R4 (capability overclaims):** Drive-time copy is fixed. /privacy §6 "coordinates never leave your browser" wording is technically still imprecise (map tile requests reveal your viewport), but /privacy now discloses OSM tile loading explicitly elsewhere — soften §6 to match §5 and you're done.
- **Homepage comparison vs /alternatives/freemaptools disagreement** about address search — both pages I fetched today agree FreeMapTools is coordinates-only. May already be reconciled.

---

## 5. What's still genuinely strong

- **Schema is rich and mostly correct** on homepage and tool pages. Don't rip this out; add `Article` and `author` to city pages alongside it.
- **Glossary, use-cases, alternatives hub** — all three are substantive, specific, well-organized. Exactly the supporting-content quality reviewers want.
- **Drive-time, walking, km-radius, distance, geofence pages** all have honest disclaimer language and specific numeric framing where it counts (walking speeds, terrain effects, signal wait times, "85th-percentile pedestrian at 1.5 m/s"). The walking page is the editorial floor every page should match.
- **/alternatives/{freemaptools, mapdevelopers}** are fair-toned, name competitor strengths, don't bash.
- **Paris city page** is a model — almost all geographic claims verify. Use it as the standard for fixing the others.

---

## 6. Prioritized action plan

**Day 1 — Free credibility fixes (under 2 hours of writing, zero infrastructure):**
1. **Rewrite the /about monetization paragraph in present tense.** Ads served via AdSense, Consent Mode v2 active, CMP named/forthcoming, link to /privacy. Removes the single most reviewer-hostile paragraph on the site.
2. **Attach the byline.** Marko Višić, role, Slovenia, LinkedIn link. Add `Person` JSON-LD on /about with `sameAs`. Add `author` to schema on city pages.
3. **Delete `meta name="keywords"` sitewide.**
4. **Fix the /terms governing-law clause** — pick a real jurisdiction.
5. **Add a DPO / privacy contact** to /contact.

**Day 2 — The decline cause Raptive named (one session of work):**
6. ZIP → ZCTA crosswalk + GeoNames point fallback + honest not-found state — per previous audit B1.
7. Rewrite /zip-code-radius coverage FAQ to match what's then true.
8. CI regression: full USPS ZIP list resolves.

**Day 3 — Verified-or-omitted sweep:**
9. Build a verifier script that, for each city page, geocodes every named place and asserts inside/outside/"just-inside"/"just-outside" labels against haversine distance from the city anchor. Apply across all 25 pages. Define "just inside/outside" as a tolerance band (e.g., ±10% of the radius) and enforce.
10. Same script approach for the ZIP density table and worked examples: compute or delete.
11. Add `dateModified` everywhere a "Last updated" string appears in body; add `Article` schema to city pages.

**Day 4 — Polish:**
12. Wire per-page programmatic OG images to subroutes (the commit landed for / but not for the rest).
13. Install Funding Choices CMP. Update /about and /privacy CMP language to present tense.
14. Decide intentionally about the Bytespider opt-in.
15. Reconcile remaining template vestiges (/privacy "Related" footer block).

Then re-apply to Raptive on the original thread with: B1 closed (regression suite to point at); /about and /privacy internally consistent; CMP live; publisher identity attached. Lead the portfolio re-application batch with this domain — it's the one where you can directly answer the partner's stated objection.

---

## 7. Decline-cause ranking (updated)

| | Cause | Weight | Status |
|---|---|---|---|
| 1 | ZIP database failures | ~40% | Unchanged from prior audit; still the partner's stated reason |
| 2 | **/about contradicting the live site state** | ~30% | **Now higher than B2 was, because the contradiction is concrete and inspectable** |
| 3 | Anonymous persona + invented-precision numbers | ~20% | Unchanged; cheap to fix |
| 4 | Compliance gaps (no CMP, vague terms, thin contact) | ~10% | Lower than the prior audit's B2 weight, because /privacy is now genuinely compliant on the page itself |

Phases 1–2 plausibly flip the decision on their own; Phase 3 protects against the next E-E-A-T pass; Phase 4 is hygiene.
