import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:5217/api/:path*' // Adjust if your .NET API runs on another port
      }
    ];
  }
};

export default nextConfig;
