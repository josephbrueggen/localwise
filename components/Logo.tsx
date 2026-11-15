export default function Logo({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
      <circle cx="20" cy="20" r="18" fill="none" stroke="var(--color-sky)" strokeWidth="2" strokeDasharray="3 4" />
      <path d="M20 30s-7-6-7-11.5a7 7 0 0 1 14 0C27 24 20 30 20 30z" fill="var(--color-accent)" />
      <circle cx="20" cy="18.5" r="2.6" fill="var(--color-surface)" />
    </svg>
  );
}
