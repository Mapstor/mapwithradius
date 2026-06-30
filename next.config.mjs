/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/ads.txt',
        destination: 'https://ads.adthrive.com/sites/6a3d589918ca6927370d0a51/ads.txt',
        statusCode: 301,
      },
    ];
  },
};
export default nextConfig;
