/* The sample "Local competition scan" card (Paper: Option E). Made-up shop. */

const findings = [
  {
    text: "A new café opened two blocks away. Its reviews mention coffee but not pastries, so your baked goods still stand out.",
    source: "Source: Corner Cup's Google Maps listing and 38 reviews",
  },
  {
    text: "Two nearby bakeries close at 3pm. Shoppers searching after work have fewer choices.",
    source: "Source: posted hours for Rye & Rise and Hillside Breads",
  },
  {
    text: "The Saturday farmers market is the busiest morning on your street.",
    source: "Source: Northfield farmers market website",
  },
];

function LinkIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M10 14a4 4 0 0 0 5.66 0l3-3a4 4 0 0 0-5.66-5.66l-1 1M14 10a4 4 0 0 0-5.66 0l-3 3a4 4 0 0 0 5.66 5.66l1-1"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BulbIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.6 10.8c.6.5 1 1.2 1.1 2V16h5v-.2c.1-.8.5-1.5 1.1-2A6 6 0 0 0 12 3z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function SampleCard() {
  return (
    <figure className="lp-sample">
      <article className="lp-card" aria-labelledby="lp-card-title">
        <div className="lp-card-body">
          <h2 id="lp-card-title" className="lp-card-title">
            Juniper Street Bakery, Northfield
          </h2>
          <ol className="lp-findings">
            {findings.map((f, i) => (
              <li key={i} className="lp-finding">
                <span className="lp-finding-num" aria-hidden="true">
                  {i + 1}
                </span>
                <div className="lp-finding-body">
                  <p className="lp-finding-text">{f.text}</p>
                  <p className="lp-pill lp-pill-source">
                    <LinkIcon />
                    <span>{f.source}</span>
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <div className="lp-idea">
          <p className="lp-pill lp-pill-idea">
            <BulbIcon />
            <span>Consider this</span>
          </p>
          <p className="lp-idea-text">
            Try a late-afternoon pastry special on weekdays, when the other bakeries are closed.
          </p>
        </div>
      </article>
      <figcaption className="lp-caption">
        This is an illustrative example. Real reports are tailored to your small business.
      </figcaption>
    </figure>
  );
}
