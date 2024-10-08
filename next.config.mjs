/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    sassOptions: {
      includePaths: ['./src'],
    },
    images: {
      domains: ['images.pexels.com'],
    },
  }
  
export default nextConfig;