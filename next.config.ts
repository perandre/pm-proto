import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ['sanity', '@sanity/vision', 'next-sanity'],
}

export default nextConfig;
