/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['gcdnb.pbrd.co'],
  },
  //swcMinify: false, 
  future: {
    webpack5: true,
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }
    return config;
  },
};

export default nextConfig;