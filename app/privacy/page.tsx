import type { Metadata } from "next";
import { SiteFooter, TopBar } from "@/components/landing/Chrome";

/* Privacy and contact page (Paper: "Localwise landing page" > Privacy and contact). */

export const metadata: Metadata = {
  title: "Privacy and contact · Localwise",
  description:
    "Localwise asks only for your email to join the waitlist. We never sell or share it. Contact a real person at Localwise.",
};

const CONTACT_EMAIL = "josephbrueggen@gmail.com";

const sections = [
  {
    title: "What we collect",
    text: "Before February 2027, only your email address to join the waitlist. No name, no business details, no payment information. After we launch, you'll have the option to provide basic business information to help Localwise send you more useful reports.",
  },
  {
    title: "How we use your email",
    text: "To tell you when your waitlist spot opens, and to confirm you signed up before February 2027, so Localwise stays free for you for life. No spam email.",
  },
  {
    title: "Where your email is kept",
    text: "In a secure database run by an established hosting provider. Only the Localwise team can see it. Although Localwise is being built in public, no information associated with its users will ever be made public.",
  },
  {
    title: "We never sell or share your email address",
    text: "Your email isn't sold, rented or handed to anyone else for marketing. Ever.",
  },
  {
    title: "Leaving the list, or deleting your email",
    text: "Ask to be removed from the waitlist anytime by emailing us. Any emails we send in the future will include an unsubscribe link. Ask us to delete your email at any time and we will, no questions asked.",
  },
  {
    title: "Visits and cookies",
    text: "Localwise uses Fathom Analytics to track privacy-centric, anonymized website visits. There are no advertising trackers on the Localwise website or in any Localwise email. Localwise does not sell or distribute any of your information in any way.",
  },
];

export default function PrivacyPage() {
  return (
    <>
      <header className="lp-header-solid on-navy">
        <TopBar />
      </header>
      <main id="main">
        <div className="pc-intro">
          <div className="lp-container">
            <h1 className="pc-title">Privacy and contact</h1>
            <p className="pc-lead">
              Before February 2027 launch, Localwise asks only for your email address to join the waitlist. We use
              it to tell you when your spot opens. We never sell or share it. You won&apos;t receive any spammy
              emails, ever.
            </p>
          </div>
        </div>
        <div className="lp-container pc-body">
          <section className="pc-privacy" aria-labelledby="pc-privacy-title">
            <h2 id="pc-privacy-title" className="pc-h2">
              Privacy
            </h2>
            {sections.map((s) => (
              <div key={s.title} className="pc-section">
                <h3 className="pc-h3">{s.title}</h3>
                <p className="pc-text">{s.text}</p>
              </div>
            ))}
            <p className="pc-updated">Last updated November 2026</p>
          </section>
          <aside className="pc-contact" aria-labelledby="pc-contact-title" id="contact">
            <h2 id="pc-contact-title" className="pc-h2">
              Contact
            </h2>
            <p className="pc-text">
              Questions, ideas, or want your email removed? Write to us and a real person will reply within 48
              hours.
            </p>
            <a href={`mailto:${CONTACT_EMAIL}`} className="pc-email">
              {CONTACT_EMAIL}
            </a>
            <hr className="pc-rule" />
            <p className="pc-who">Localwise is built in public by Joseph Brueggen in Kissimmee, FL.</p>
          </aside>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
