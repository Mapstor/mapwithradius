# mapwithradius.com — Mobile Redesign Spec (for Claude Code)

Scope: mobile only (< 768px). Desktop untouched. Reference UX: approved prototype `mapwithradius-mobile-redesign.html`.

---

## 1. Root causes of the three bugs (fix these regardless of redesign)

### 1a. Radius handle ignores the first drag
The resize handle is a small Leaflet marker (~20px hit area). First touch falls through to the map pane and starts a pan; Leaflet's `Draggable` click-tolerance means the marker only responds after being "focused" by a prior gesture.

**Fix (Leaflet):**
```js
const handleIcon = L.divIcon({
  className: 'radius-handle',
  iconSize: [56, 56],        // 56px invisible hit area, WCAG/Apple ≥44px
  iconAnchor: [28, 28],
  html: '<div class="radius-handle-dot"></div>'  // 20px visual dot, centered
});
const handle = L.marker(edgeLatLng, { icon: handleIcon, draggable: true, keyboard: false });
```
```css
.radius-handle { touch-action: none; }   /* critical: browser never claims the gesture */
.radius-handle-dot { width:20px; height:20px; margin:18px; border-radius:50%;
  background:#fff; border:3.5px solid #2563EB; box-shadow:0 2px 8px rgba(15,23,42,.3); }
```
- On `dragstart`: `map.dragging.disable()`; on `dragend`: re-enable. Belt-and-suspenders — the big hit area + touch-action:none is the real fix.
- Do NOT implement the handle with `L.circleMarker` + manual mouse events (likely current cause — mouse events don't map 1:1 to touch).
- During drag: recompute radius = haversine(center, handle latlng); let the handle sit wherever the finger is (store angle), don't force it back to north mid-drag.
- Live tooltip anchored to the handle while dragging: `12.4 mi · 20.0 km` (both units, active unit bold). Hide on dragend.
- Gentle snap: within 0.18 units of an integer in the active unit → snap + `navigator.vibrate(6)` once per snap value.
- Center dot: same 56px-hit-area pattern, draggable, moves the circle.

### 1b. Bottom sheet can't be opened
Grabber is a 40×4px line with no extended hit zone; the Raptive unit injected inside the sheet steals touches and shifts layout mid-gesture.

**Fix:** rebuild as a real 3-detent bottom sheet (section 2). Drag surface = full-width 44px-tall grab zone + the whole peek row. Pointer events with a 10px commit threshold so taps on controls inside the peek row still register as taps. Suppress the synthetic click after a committed drag.

### 1c. Ads inside the interaction surface
The in-content unit renders between the search bar and the controls; an outstream video floats over the map. Both cause mid-gesture layout shift and dead touch zones.

**Fix — Raptive config (you do this in the Raptive dashboard / via support, not code):**
- Exclude the tool container from auto-insertion: wrap sheet + map in a container and register it as a no-ad zone (Raptive supports exclusion selectors — ask support to exclude `#radius-tool` on the homepage template).
- Disable outstream/video player on the tool page template.
- Keep exactly two mobile placements:
  1. **Anchor/adhesion at the very bottom** (Raptive standard, highest mobile RPM). The sheet's `bottom` offset = anchor height, so the sheet always sits *above* the anchor and never fights it.
  2. **One reserved in-sheet slot** at the very end of the sheet body (below Share & Export), with `min-height: 110px` hard-reserved in CSS so it can never shift layout. Good viewability: it's on screen whenever the sheet is at mid/full.
- SEO/content ads below the fold (how-to cards, FAQ) are unaffected — the map tool section is `100dvh` minus header, content continues below as today.

---

## 2. New mobile layout

```
┌──────────────────────────┐
│ Header 52px (logo, menu) │
├──────────────────────────┤
│                          │
│   MAP (fills the rest)   │  zoom +/− top-left
│   ○ circle + 2 handles   │  locate FAB right, above sheet
│                          │  scale bar bottom-left, above sheet
│ ┌────────────────────┐   │
│ │ ── grabber ──      │◄──┼─ SHEET, 3 detents
│ │ [10.0 mi][mi|km][🔍]│  │   peek 150px / mid ~52vh / full vh−120
│ │  slider ───────●── │   │
│ │  1 2 5 10 25 50 mi │   │
│ │  AREA | DIAMETER   │   │
│ │  CIRCLES list      │   │
│ │  + New circle      │   │
│ │  colors ● ● ● ● ●  │   │
│ │  Copy link PNG KML │   │
│ │  [reserved ad 110px]│  │
│ └────────────────────┘   │
│ [Raptive anchor  64px]   │
└──────────────────────────┘
```

### Sheet detents
- **Peek (150px, default):** grabber + one row: radius pill · mi/km segmented · search button. This row is ALWAYS visible — the #1 failure of the current design is that radius/unit input is unreachable.
- **Mid (~52vh):** + slider, presets, area/diameter stats, circle list, colors, share/export, reserved ad.
- **Full (vh−120):** search mode (input focused, results list) or scrolled sheet body.
- Sheet uses `transform: translateY()` only (compositor-friendly), `transition .3s cubic-bezier(.32,.72,.24,1)`, no transition while dragging. Fling velocity > 0.55 px/ms advances one detent.
- `bottom: calc(var(--anchor-h) + env(safe-area-inset-bottom))`.

### Peek row components
- **Radius pill:** big tabular numerals (`24px/800`), tap → swaps to `<input inputmode="decimal">`, select-all, Enter/blur commits. This is the direct numeric entry that's currently unreachable.
- **Unit segmented control** mi|km: converts all readouts, presets, slider labels, tooltip order.
- **Search button:** opens search mode → sheet snaps to full, input autofocused, "Use my location" as the first result row. `visualViewport` listener keeps the input above the keyboard.
- **Empty state** (no circle): pill shows dashed-circle icon + "Tap the map to draw a radius".

### Interaction model
- Tap map, no circles → create circle at tap point, default 10 mi/km, sheet stays at peek, toast "Drag the white dot to resize".
- Tap map, circles exist → moves the ACTIVE circle's center (primary intent). Tapping inside a *different* circle selects it.
- "+ New circle" → arms placement ("Tap the map to place…"), next tap creates it, cycles palette color.
- Any map tap collapses sheet to peek (map-first).
- Slider: log scale 0.25–250 mi, 30px thumb, rounds to nice values (0.5 steps < 20, integers above).
- Presets: 1/2/5/10/25/50 in active unit, 44px chips, active state highlighted.
- Haptics (`navigator.vibrate`, no-op on iOS Safari, fine): circle create 12ms, snap 6ms, detent change 6ms.
- Remove: the floating "Circle Info" card (replaced by pill + stats + drag tooltip) and the blocking intro tooltip (replace with a 2.6s auto-dismiss toast, top-center, `pointer-events:none`).

### Keep desktop parity features (in mid sheet)
Circle color swatches (6), multi-circle list with per-row delete, Clear all, Copy share link (URL restores center+radius+zoom+unit), PNG export, KML export.

## 3. Accessibility & quality floor
- Every touch target ≥ 44px (handles get 56px).
- `aria-label` on handles, zoom, FAB, delete buttons; `prefers-reduced-motion` disables sheet/FAB transitions.
- `viewport-fit=cover` + safe-area insets (anchor ad and sheet).
- `100dvh` not `100vh` for the tool viewport (iOS URL bar).

## 4. QA gate before deploy (Playwright, extend the existing 360px gate)
Emulate iPhone (hasTouch: true), 360×780 and 390×844:
1. First `touchscreen` drag on edge handle changes radius (assert radius delta after ONE gesture — this is the regression test for bug 1a).
2. Sheet opens with a single upward drag from the peek row; snaps to mid.
3. Tap radius pill → input focused → type "7" → Enter → circle radius = 7.
4. mi/km toggle converts pill, stats, presets.
5. No element overlaps the anchor-ad region; CLS = 0 on the tool section (assert `layout-shift` entries).
6. Search: focus → sheet full → pick result → circle centered, sheet returns to peek.
7. With a second circle added, tapping the first circle selects it (list row highlights).
