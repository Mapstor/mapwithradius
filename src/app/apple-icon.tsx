import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const size = {
  width: 180,
  height: 180,
};
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#1B3A5C',
          borderRadius: 32,
        }}
      >
        {/* Map pin */}
        <svg
          width="100"
          height="100"
          viewBox="0 0 24 24"
          fill="white"
        >
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
        </svg>
        {/* Radius indicator dot */}
        <div
          style={{
            position: 'absolute',
            bottom: 35,
            right: 35,
            width: 28,
            height: 28,
            backgroundColor: '#3B82F6',
            borderRadius: '50%',
            border: '4px solid white',
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
