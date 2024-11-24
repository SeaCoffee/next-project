import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
      return [
          {
              source: '/',
              destination: '/movies-home',
              permanent: true
          }
      ]
  }
};

export default nextConfig;
