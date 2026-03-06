/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['animejs'],
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'framerusercontent.com' },
      { protocol: 'https', hostname: 'cdn.sanity.io' },
    ],
  },
}

export default nextConfig
