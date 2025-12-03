import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Deshabilitar ESLint durante el build para deployment
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
