import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static site: Cloudflare Pages serves the files in out/.
  output: "export",
  // Hide the Next.js dev badge so local previews look like the real page.
  devIndicators: false,
};

export default nextConfig;
