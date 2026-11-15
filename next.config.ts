import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static site: Cloudflare Pages serves the files in out/, and the waitlist
  // signup runs as a Cloudflare Pages Function (functions/api/waitlist.ts).
  output: "export",
  // Hide the Next.js dev badge so local previews look like the real page.
  devIndicators: false,
};

export default nextConfig;
