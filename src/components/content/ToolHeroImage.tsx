interface ToolHeroImageProps {
  /** Same-domain path under /public, e.g. /images/radius-map-10-mile-las-vegas.png */
  src: string;
  /** Describes the depicted result (the drawn circle/overlay/polygon). */
  alt: string;
  /** One-line visible caption tying the shot to the tool; OSM attribution is appended. */
  caption: string;
  /** Eager-load the first/flagship image; others lazy-load. */
  eager?: boolean;
  width?: number;
  height?: number;
}

/**
 * A crawlable static hero screenshot of the live tool, used as the SERP/social thumbnail.
 * A plain <img> (not next/image) so the rendered src is the stable /images/… URL that the
 * image sitemap and og:image reference — no /_next/image optimizer rewrite. Explicit
 * width/height reserve the box (no CLS).
 */
export default function ToolHeroImage({
  src,
  alt,
  caption,
  eager = false,
  width = 1600,
  height = 900,
}: ToolHeroImageProps) {
  return (
    <figure className="mb-12">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        className="w-full h-auto rounded-xl border border-slate-200 shadow-sm"
      />
      <figcaption className="mt-2 text-center text-sm text-slate-500">
        {caption} <span className="text-slate-400">· Map data © OpenStreetMap contributors</span>
      </figcaption>
    </figure>
  );
}
