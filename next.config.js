/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['images.unsplash.com', 'lh3.googleusercontent.com'],
  },
  experimental: {
    appDir: true,
  },
  // Add your custom Next.js configurations here.
  // For example, to configure the output directory:
  // distDir: 'build',
  // Or to configure the public path:
  // basePath: '/my-app',
  // ...
};

module.exports = nextConfig;