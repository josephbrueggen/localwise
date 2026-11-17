import { ImageResponse } from "next/og";

/*
 * Link-preview image (1200×630) shown when someone shares the site link.
 * Generated once at build time. Colors are the design tokens' values
 * (ImageResponse can't read CSS variables). Mirrors the Paper frame
 * "Link preview (1200×630)" in the "Localwise landing page" file.
 */

export const dynamic = "force-static";
export const alt = "Localwise: simple, actionable insights for your local small business.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const NAVY = "#14213D"; // --color-navy
const NAVY_RAISED = "#1B2B4E"; // --color-navy-raised
const NAVY_HIGHLIGHT = "#26407A"; // --color-navy-highlight
const NAVY_BORDER = "#3A4E7A"; // --color-navy-border
const SKY = "#7FA6F5"; // --color-sky
const ACCENT = "#1F5BD8"; // --color-accent
const AMBER = "#F59E0B"; // --color-amber
const WHITE = "#FFFFFF"; // --color-surface
const ON_NAVY_STRONG = "#E3EAF8"; // --color-on-navy-strong

// Load Space Grotesk Bold from Google Fonts at build time. If that fails,
// the image still renders with the default font.
async function loadHeadingFont(): Promise<ArrayBuffer | null> {
  try {
    const css = await (
      await fetch("https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700&display=swap", {
        headers: { "User-Agent": "Mozilla/5.0 (compatible; next-og)" },
      })
    ).text();
    const url = css.match(/src:\s*url\(([^)]+)\)/)?.[1];
    if (!url) return null;
    const res = await fetch(url);
    return res.ok ? await res.arrayBuffer() : null;
  } catch {
    return null;
  }
}

export default async function OpenGraphImage() {
  const font = await loadHeadingFont();
  const heading = font ? "Space Grotesk" : "sans-serif";

  const blocks: [number, number, number, number][] = [];
  const cols: [number, number][] = [[-20, 270], [300, 300], [630, 250], [910, 310]];
  const rows: [number, number][] = [[-20, 200], [220, 160], [420, 230]];
  rows.forEach(([y, h]) => cols.forEach(([x, w]) => blocks.push([x, y, w, h])));

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", background: NAVY }}>
        <svg width="1200" height="630" viewBox="0 0 1200 630" style={{ position: "absolute", top: 0, left: 0, opacity: 0.45 }}>
          {blocks.map(([x, y, w, h]) => (
            <rect key={`${x}-${y}`} x={x} y={y} width={w} height={h} rx="10" fill={NAVY_RAISED} />
          ))}
          <path d="M0 200 H1200 M0 400 H1200 M285 0 V630 M615 0 V630 M895 0 V630" fill="none" stroke={NAVY_HIGHLIGHT} strokeWidth="2" strokeDasharray="10 12" />
        </svg>
        <div style={{ position: "relative", display: "flex", flexDirection: "column", justifyContent: "center", gap: 32, padding: "0 80px", width: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, color: WHITE, fontFamily: heading, fontSize: 34, fontWeight: 700 }}>
            <svg width="52" height="52" viewBox="0 0 40 40">
              <circle cx="20" cy="20" r="18" fill="none" stroke={SKY} strokeWidth="2" strokeDasharray="3 4" />
              <path d="M20 30s-7-6-7-11.5a7 7 0 0 1 14 0C27 24 20 30 20 30z" fill={ACCENT} />
              <circle cx="20" cy="18.5" r="2.6" fill={WHITE} />
            </svg>
            Localwise
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", maxWidth: 900, color: WHITE, fontFamily: heading, fontSize: 76, fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.02em" }}>
            <span>Simple, actionable insights for your local&nbsp;</span>
            <span style={{ color: SKY }}>small business</span>
            <span>.</span>
          </div>
          <div style={{ display: "flex", alignSelf: "flex-start", alignItems: "center", gap: 12, padding: "12px 20px", border: `1px solid ${NAVY_BORDER}`, borderRadius: 10, color: ON_NAVY_STRONG, fontSize: 26 }}>
            <div style={{ width: 12, height: 12, borderRadius: 4, background: AMBER }} />
            Sign up before February 2027 and it&apos;s free for life
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: font ? [{ name: "Space Grotesk", data: font, weight: 700, style: "normal" }] : undefined,
    },
  );
}
