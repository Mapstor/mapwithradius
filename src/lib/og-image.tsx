import { ImageResponse } from 'next/og';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

interface OgImageProps {
  title: string;
  subtitle?: string;
  eyebrow?: string;
}

const BRAND_BG = 'linear-gradient(135deg, #0F2A47 0%, #1B3A5C 50%, #1E4E7A 100%)';
const BRAND_ACCENT = '#60A5FA';
const BRAND_TITLE_COLOR = '#FFFFFF';
const BRAND_SUBTITLE_COLOR = '#CBD5E1';
const BRAND_FOOTER_COLOR = '#94A3B8';
const BRAND_EYEBROW_COLOR = '#93C5FD';

export function generateOgImage({ title, subtitle, eyebrow = 'Map With Radius' }: OgImageProps) {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
          background: BRAND_BG,
          color: BRAND_TITLE_COLOR,
          padding: '80px',
          fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 999,
              border: `5px solid ${BRAND_ACCENT}`,
              display: 'flex',
            }}
          />
          <div style={{ fontSize: 32, fontWeight: 600, color: BRAND_EYEBROW_COLOR }}>
            {eyebrow}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginTop: 96,
            gap: 24,
          }}
        >
          <div
            style={{
              fontSize: 76,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              color: BRAND_TITLE_COLOR,
            }}
          >
            {title}
          </div>
          {subtitle ? (
            <div
              style={{
                fontSize: 34,
                fontWeight: 400,
                color: BRAND_SUBTITLE_COLOR,
                lineHeight: 1.3,
                maxWidth: 980,
              }}
            >
              {subtitle}
            </div>
          ) : null}
        </div>

        <div
          style={{
            marginTop: 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: 26,
            color: BRAND_FOOTER_COLOR,
          }}
        >
          <div>mapwithradius.com</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: 999,
                background: BRAND_ACCENT,
                display: 'flex',
              }}
            />
            <div>Free · No login · No API key</div>
          </div>
        </div>
      </div>
    ),
    size
  );
}
