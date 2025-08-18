/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    POSTGRES_URL: process.env.POSTGRES_URL,
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, must-revalidate',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig