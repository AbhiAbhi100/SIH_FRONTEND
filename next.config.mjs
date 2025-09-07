/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['rest.soilgrids.org', 'api.openweathermap.org'],
  },
};

export default nextConfig;
