/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'utfs.io', // Add this for UploadThing images
        port: '',
        pathname: '/**',
      },
    ],
  },
  env: {
    JWT_SECRET: process.env.JWT_SECRET,
  },
};

module.exports = nextConfig;