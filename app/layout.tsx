import type { Metadata, Viewport } from "next";
import { Atkinson_Hyperlegible_Next, Space_Grotesk } from "next/font/google";
import "../design-tokens.css";
import "./globals.css";
import "./site.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-loaded-heading",
  display: "swap",
});

// Body font: Atkinson Hyperlegible Next, chosen in the Impeccable check
// (2026-11-15) to replace the Inter placeholder. It was designed for low-vision
// readers, which suits owners reading on a phone at the counter.
const body = Atkinson_Hyperlegible_Next({
  subsets: ["latin"],
  variable: "--font-loaded-body",
  display: "swap",
});

// Public site address, used for share previews.
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

// Fathom Analytics site ID (public; it appears in the page anyway).
const FATHOM_SITE_ID = process.env.NEXT_PUBLIC_FATHOM_SITE_ID || "SBVEZWWM";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Localwise: actionable insights for your local small business",
  description:
    "No intrusive AI. You focus on your small business and Localwise brings you helpful reports along the way. Sign up before February 2027 and it's free for life.",
  openGraph: {
    title: "Localwise: actionable insights for your local small business",
    description:
      "No intrusive AI. You focus on your small business and Localwise brings you helpful reports along the way.",
    siteName: "Localwise",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Localwise: actionable insights for your local small business",
    description:
      "No intrusive AI. You focus on your small business and Localwise brings you helpful reports along the way.",
  },
};

export const viewport: Viewport = {
  themeColor: "#14213D",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${body.variable}`}>
      <head>
        <script src="https://cdn.usefathom.com/script.js" data-site={FATHOM_SITE_ID} defer />
      </head>
      <body>{children}</body>
    </html>
  );
}
