/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'firebasestorage.googleapis.com', 'imgur.com', 'i.imgur.com'],
  },
};

module.exports = nextConfig;
