import type * as Leaflet from 'leaflet';

/**
 * Single source of truth for the basemap tile layer used by every map tool
 * (radius, km, geofence, city, zip, population, acre, area, miles-to-minutes,
 * distance, drive-time, route, embed, and the mini map).
 *
 * Swapping the whole site's basemap is a ONE-entry change: point ACTIVE_TILE_PROVIDER
 * at a different TileProvider constant. Each provider carries everything Leaflet needs
 * (url template, attribution, maxZoom, optional subdomains, optional API-key token).
 */
export interface TileProvider {
  /** Leaflet URL template. Tokens {z}/{x}/{y} may appear in any order (Esri uses {z}/{y}/{x}).
   *  If it contains {apiKey}, the key is read from NEXT_PUBLIC_TILE_API_KEY at layer creation. */
  url: string;
  attribution: string;
  maxZoom: number;
  /** Only for providers whose url uses the {s} token (e.g. CARTO 'abcd'). */
  subdomains?: string | string[];
}

/**
 * Esri World Street Map — the active provider. Note Esri's tile path order is {z}/{y}/{x}
 * (y before x), unlike OSM's {z}/{x}/{y}. Attribution credits Esri and its data providers
 * per Esri's terms of use for the ArcGIS Online basemaps.
 */
export const ESRI_WORLD_STREET: TileProvider = {
  url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
  // Minimal single-line credit Esri's terms accept (a linked "© Esri"); kept short so it
  // pins flush in the map's bottom-right corner instead of sprawling across the map body.
  attribution: 'Tiles &copy; <a href="https://www.esri.com" target="_blank" rel="noopener">Esri</a>',
  maxZoom: 19,
};

/** OpenStreetMap — kept as a fallback constant for a one-line revert. */
export const OSM: TileProvider = {
  url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  maxZoom: 19,
};

/** The provider the whole site renders with. Swap this line to change every map at once. */
export const ACTIVE_TILE_PROVIDER: TileProvider = ESRI_WORLD_STREET;

/**
 * Build the basemap tile layer for a Leaflet map. Callers pass their own Leaflet instance
 * (all map components already `import L from 'leaflet'`) and add it: createTileLayer(L).addTo(map).
 *
 * crossOrigin:'anonymous' is set for every provider so html2canvas PNG export keeps an
 * untainted canvas. All bundled providers (Esri, OSM, CARTO) send `Access-Control-Allow-Origin: *`;
 * a future provider without CORS headers would need this relaxed.
 */
export function createTileLayer(
  L: typeof Leaflet,
  provider: TileProvider = ACTIVE_TILE_PROVIDER
): Leaflet.TileLayer {
  const options: Leaflet.TileLayerOptions = {
    attribution: provider.attribution,
    maxZoom: provider.maxZoom,
    crossOrigin: 'anonymous',
  };
  if (provider.subdomains) options.subdomains = provider.subdomains;
  // Optional API key for keyed providers (Esri World Street + OSM need none). Kept env-driven
  // so switching to a keyed provider stays a one-entry change.
  if (provider.url.includes('{apiKey}')) {
    (options as Record<string, unknown>).apiKey = process.env.NEXT_PUBLIC_TILE_API_KEY ?? '';
  }
  return L.tileLayer(provider.url, options);
}
