import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return []; // Make sure we have no redirects configured
  },
};

export default nextConfig;
