/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['animejs'],
  serverExternalPackages: ['resend'],
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'framerusercontent.com' },
      { protocol: 'https', hostname: 'cdn.sanity.io' },
    ],
  },
}

export default nextConfig
