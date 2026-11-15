/* Decorative SVGs from Paper "Homepage v3". All are aria-hidden. */

export function HeroMap() {
  const blocks: [number, number, number, number][] = [];
  const cols: [number, number][] = [[-20, 320], [340, 360], [740, 300], [1080, 380]];
  const rows: [number, number][] = [[-20, 250], [270, 200], [510, 330]];
  rows.forEach(([y, h]) => cols.forEach(([x, w]) => blocks.push([x, y, w, h])));
  return (
    <svg className="hero-map" viewBox="0 0 1440 820" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      {blocks.map(([x, y, w, h]) => (
        <rect key={`${x}-${y}`} x={x} y={y} width={w} height={h} rx="12" fill="var(--color-navy-raised)" />
      ))}
      <g fill="none" stroke="var(--color-navy-highlight)" strokeWidth="2" strokeDasharray="10 12">
        <path d="M0 250 H1440" />
        <path d="M0 490 H1440" />
        <path d="M320 0 V820" />
        <path d="M720 0 V820" />
        <path d="M1060 0 V820" />
      </g>
    </svg>
  );
}

export function PinTile() {
  return (
    <svg className="card-pin" width="36" height="36" viewBox="0 0 40 40" aria-hidden="true">
      <rect width="40" height="40" rx="10" fill="var(--color-tint)" />
      <path d="M20 30s-7-6-7-11.5a7 7 0 0 1 14 0C27 24 20 30 20 30z" fill="var(--color-accent)" />
      <circle cx="20" cy="18.5" r="2.6" fill="var(--color-surface)" />
    </svg>
  );
}

function Rings() {
  return (
    <>
      <circle cx="80" cy="80" r="34" fill="none" stroke="var(--color-sky)" strokeWidth="2" strokeDasharray="3 6" />
      <circle cx="80" cy="80" r="64" fill="none" stroke="var(--color-sky)" strokeWidth="2" strokeDasharray="3 6" opacity="0.6" />
    </>
  );
}

const pin = (
  <path
    d="M80 90s-10-8-10-16a10 10 0 0 1 20 0c0 8-10 16-10 16z"
    fill="var(--color-accent)"
    stroke="var(--color-surface)"
    strokeWidth="2"
  />
);

export function MapFaq() {
  return (
    <svg width="160" height="160" viewBox="0 0 160 160" aria-hidden="true">
      <rect width="160" height="160" rx="14" fill="var(--color-tint)" />
      <path d="M0 50 H160 M0 110 Q80 90 160 118 M50 0 V160 M118 0 L104 160" fill="none" stroke="var(--color-surface)" strokeWidth="10" strokeLinecap="round" />
      <Rings />
      <circle cx="30" cy="34" r="6" fill="var(--color-amber)" stroke="var(--color-surface)" strokeWidth="2" />
      <circle cx="132" cy="128" r="6" fill="var(--color-sky)" stroke="var(--color-surface)" strokeWidth="2" />
      {pin}
    </svg>
  );
}

export function MapOnline() {
  return (
    <svg width="160" height="160" viewBox="0 0 160 160" aria-hidden="true">
      <rect width="160" height="160" rx="14" fill="var(--color-tint)" />
      <path d="M0 80 H160 M80 0 V160 M0 22 L160 146" fill="none" stroke="var(--color-surface)" strokeWidth="10" strokeLinecap="round" />
      <Rings />
      <circle cx="124" cy="30" r="6" fill="var(--color-amber)" stroke="var(--color-surface)" strokeWidth="2" />
      <circle cx="30" cy="110" r="6" fill="var(--color-amber)" stroke="var(--color-surface)" strokeWidth="2" />
      {pin}
    </svg>
  );
}

export function ThumbFaq() {
  return (
    <svg width="112" height="80" viewBox="0 0 112 80" aria-hidden="true">
      <rect width="112" height="80" rx="12" fill="var(--color-tint)" />
      <path d="M0 28 H112 M40 0 V80 M84 0 L76 80" fill="none" stroke="var(--color-surface)" strokeWidth="7" />
      <circle cx="56" cy="44" r="22" fill="none" stroke="var(--color-sky)" strokeWidth="1.5" strokeDasharray="2 4" />
      <circle cx="20" cy="56" r="4" fill="var(--color-amber)" />
      <circle cx="96" cy="14" r="4" fill="var(--color-amber)" />
      <g transform="translate(44 32)">
        <path d="M2 2h20v13H9l-5 4z" fill="var(--color-surface)" stroke="var(--color-accent-hover)" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M9.5 6.5a2.2 2.2 0 1 1 3.2 2c-.6.4-1 .8-1 1.5" fill="none" stroke="var(--color-accent-hover)" strokeWidth="1.5" strokeLinecap="round" />
      </g>
    </svg>
  );
}

export function ThumbCompetition() {
  return (
    <svg width="112" height="80" viewBox="0 0 112 80" aria-hidden="true">
      <rect width="112" height="80" rx="12" fill="var(--color-tint)" />
      <path d="M0 52 H112 M30 0 V80 M78 0 V80" fill="none" stroke="var(--color-surface)" strokeWidth="7" />
      <circle cx="56" cy="40" r="26" fill="none" stroke="var(--color-sky)" strokeWidth="1.5" strokeDasharray="2 4" />
      <circle cx="16" cy="18" r="4" fill="var(--color-amber)" />
      <circle cx="94" cy="66" r="4" fill="var(--color-amber)" />
      <circle cx="96" cy="22" r="4" fill="var(--color-sky)" />
      <path d="M56 50s-8-6.5-8-13a8 8 0 0 1 16 0c0 6.5-8 13-8 13z" fill="var(--color-accent)" stroke="var(--color-surface)" strokeWidth="2" />
    </svg>
  );
}

export function ThumbOnline() {
  return (
    <svg width="112" height="80" viewBox="0 0 112 80" aria-hidden="true">
      <rect width="112" height="80" rx="12" fill="var(--color-tint)" />
      <path d="M0 22 H112 M0 62 H112 M62 0 V80" fill="none" stroke="var(--color-surface)" strokeWidth="7" />
      <circle cx="18" cy="42" r="4" fill="var(--color-sky)" />
      <g transform="translate(40 26)">
        <rect x="1" y="1" width="30" height="26" rx="3" fill="var(--color-surface)" stroke="var(--color-accent-hover)" strokeWidth="1.6" />
        <path d="M1 8 H31" stroke="var(--color-accent-hover)" strokeWidth="1.6" />
        <path d="M10 17l3.5 3.5L22 13" fill="none" stroke="var(--color-accent-hover)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  );
}

const stroke = { fill: "none", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

export function IconPin() {
  return (
    <svg width="30" height="30" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 21s-6.5-5.4-6.5-10.5a6.5 6.5 0 0 1 13 0C18.5 15.6 12 21 12 21z" stroke="var(--color-surface)" {...stroke} />
      <circle cx="12" cy="10.5" r="2.4" stroke="var(--color-surface)" {...stroke} />
    </svg>
  );
}

export function IconTarget() {
  return (
    <svg width="30" height="30" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" stroke="var(--color-accent-hover)" strokeDasharray="2 3" {...stroke} />
      <circle cx="12" cy="12" r="4" stroke="var(--color-accent-hover)" {...stroke} />
      <circle cx="12" cy="12" r="1" fill="var(--color-accent-hover)" />
    </svg>
  );
}

export function IconMail() {
  return (
    <svg width="30" height="30" viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="var(--color-navy)" {...stroke} />
      <path d="M3.5 6.5 12 13l8.5-6.5" stroke="var(--color-navy)" {...stroke} />
    </svg>
  );
}

export function IconCheck() {
  return (
    <svg width="24" height="24" viewBox="0 0 28 28" aria-hidden="true">
      <circle cx="14" cy="14" r="12" fill="none" stroke="var(--color-accent)" strokeWidth="2" strokeDasharray="3 3" />
      <path d="M9 14.5l3.2 3.2L19 11" fill="none" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function StepsRoute() {
  return (
    <svg className="steps-route" viewBox="0 0 100 64" preserveAspectRatio="none" aria-hidden="true">
      <path d="M0 32 H100" fill="none" stroke="var(--color-sky)" strokeWidth="3" strokeLinecap="round" strokeDasharray="2 12" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}
