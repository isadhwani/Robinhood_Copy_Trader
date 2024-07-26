/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['gcdnb.pbrd.co'],
  },
  future: {
    webpack5: true,
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }
    return config;
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://127.0.0.1:8000/:path*', // proxy to Backend
      },
    ];
  },
};

export default nextConfig;