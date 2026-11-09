import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Blog photos come from the CMS at full camera size; next/image resizes and caches them.
  // The CMS can take 8–10s to serve a 4MB original, so allow more than the 7s default, and
  // cache resized copies for a week (Drupal gives each upload a unique file name).
  images: {
    remotePatterns: [{ protocol: "https", hostname: "api.dmaimpact.org", pathname: "/sites/default/files/**" }],
    minimumCacheTTL: 60 * 60 * 24 * 7,
  },
  experimental: {
    imgOptTimeoutInSeconds: 30,
  },
};

export default nextConfig;
