/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['animejs'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'framerusercontent.com',
        pathname: '/**',
      },
    ],
  },
}

export default nextConfig
