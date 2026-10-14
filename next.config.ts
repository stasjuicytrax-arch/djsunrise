import type { NextConfig } from "next";

// GitHub Pages project site: https://stasjuicytrax-arch.github.io/djsunrise/
const basePath = process.env.NODE_ENV === "production" ? "/djsunrise" : "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath || undefined,
  images: { unoptimized: true },
  trailingSlash: true,
  experimental: { optimizePackageImports: ["@phosphor-icons/react", "motion"] },
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
