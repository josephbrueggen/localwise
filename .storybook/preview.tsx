import type { Preview } from "@storybook/nextjs-vite";
import { Atkinson_Hyperlegible_Next, Space_Grotesk } from "next/font/google";
import "../design-tokens.css";
import "../app/globals.css";
import "../app/site.css";

// Same fonts and CSS variables as app/layout.tsx, so stories match the live site.
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-loaded-heading",
  display: "swap",
});
const body = Atkinson_Hyperlegible_Next({
  subsets: ["latin"],
  variable: "--font-loaded-body",
  display: "swap",
});

// The font tokens are defined on :root, so the font classes go on <html>.
if (typeof document !== "undefined") {
  document.documentElement.classList.add(spaceGrotesk.variable, body.variable);
}

const preview: Preview = {
  parameters: {
    layout: "padded",
    controls: { expanded: true },
  },
};

export default preview;
