import { HeroMap } from "@/components/Illustrations";
import { SiteFooter, TopBar } from "@/components/landing/Chrome";
import SampleCard from "@/components/landing/SampleCard";
import WaitlistForm from "@/components/landing/WaitlistForm";

/* Landing page (Paper: "Localwise landing page" > Landing page). */

const points = [
  {
    title: "Specific to your locale",
    text: "Cited reports on what customers ask, how you show up online, and more! Real insights specific to your community. No AI slop.",
  },
  {
    title: "No tedious AI learning curve",
    text: "Localwise requires no technical skill. It brings the value of AI to your small business hassle-free, with simple reports you'll actually use.",
  },
  {
    title: "Free for life if you join early",
    text: "Sign up before February 2027 and you can use Localwise for free, for life. No cost, no catch, and you can unsubscribe anytime.",
  },
];

export default function LandingPage() {
  return (
    <>
      <header className="lp-header-solid on-navy">
        <TopBar />
      </header>
      <div className="lp-hero on-navy">
        <HeroMap />
        <main id="main" className="lp-container lp-hero-main">
          <div className="lp-pitch">
            <p className="lp-badge">
              <span className="lp-dot" aria-hidden="true" />
              Sign up before February 2027 and it&apos;s free for life
            </p>
            <h1 className="lp-title">
              Simple, actionable insights for your local <span className="lp-title-accent">shop</span>.
            </h1>
            <p className="lp-lead">
              No intrusive AI. You focus on your small business and Localwise brings you helpful reports along the
              way.
            </p>
            <WaitlistForm />
          </div>
          <SampleCard />
        </main>
      </div>

      <section className="lp-points" aria-label="Why Localwise">
        <div className="lp-container lp-points-inner">
          {points.map((p) => (
            <div key={p.title} className="lp-point">
              <h2 className="lp-point-title">{p.title}</h2>
              <p className="lp-point-text">{p.text}</p>
            </div>
          ))}
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
