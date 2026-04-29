import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Map With Radius - Draw radius circles on any map for free';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f8fafc',
          position: 'relative',
        }}
      >
        {/* Map-like background pattern */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'linear-gradient(#e2e8f0 1px, transparent 1px), linear-gradient(90deg, #e2e8f0 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            opacity: 0.5,
          }}
        />

        {/* Radius circles */}
        <div
          style={{
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Outer circle */}
          <div
            style={{
              width: 400,
              height: 400,
              borderRadius: '50%',
              border: '3px solid rgba(59, 130, 246, 0.3)',
              backgroundColor: 'rgba(59, 130, 246, 0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Middle circle */}
            <div
              style={{
                width: 280,
                height: 280,
                borderRadius: '50%',
                border: '3px solid rgba(59, 130, 246, 0.5)',
                backgroundColor: 'rgba(59, 130, 246, 0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {/* Inner circle */}
              <div
                style={{
                  width: 160,
                  height: 160,
                  borderRadius: '50%',
                  border: '4px solid #3B82F6',
                  backgroundColor: 'rgba(59, 130, 246, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {/* Center pin */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="#1B3A5C"
                  >
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Text content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'absolute',
            bottom: 80,
          }}
        >
          {/* Logo text */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              marginBottom: 16,
            }}
          >
            <span
              style={{
                fontSize: 56,
                fontWeight: 700,
                color: '#0f172a',
              }}
            >
              Map With
            </span>
            <span
              style={{
                fontSize: 56,
                fontWeight: 700,
                color: '#1B3A5C',
              }}
            >
              Radius
            </span>
          </div>

          {/* Tagline */}
          <span
            style={{
              fontSize: 28,
              color: '#64748b',
              fontWeight: 500,
            }}
          >
            Draw radius circles on any map — Free, no signup
          </span>
        </div>

        {/* URL badge */}
        <div
          style={{
            position: 'absolute',
            bottom: 24,
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#1B3A5C',
            color: 'white',
            padding: '8px 20px',
            borderRadius: 20,
            fontSize: 18,
            fontWeight: 600,
          }}
        >
          mapwithradius.com
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
