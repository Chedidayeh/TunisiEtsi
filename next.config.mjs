/* jshint esversion: 6 */

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,   
    images: {
      domains: ['utfs.io'],
    },
    experimental: {
      serverActions: {
        bodySizeLimit: '1000MB',
      },
    },
  };
  
  export default nextConfig;
  