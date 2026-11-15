import Logo from "@/components/Logo";

/* Shared top bar and footer for the landing and privacy pages. */

export function TopBar() {
  return (
    <div className="lp-container lp-topbar">
      <a href="/" className="lp-brand" aria-label="Localwise, home">
        <Logo size={36} />
        <span>Localwise</span>
      </a>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="lp-footer">
      <div className="lp-container lp-footer-inner">
        <p>Localwise is being built in public, for the love of small businesses.</p>
        <a href="/privacy" className="lp-footer-link">
          Privacy and contact
        </a>
      </div>
    </footer>
  );
}
