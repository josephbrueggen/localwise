"use client";

import { useEffect, useState } from "react";

const WORDS = ["shop", "bakery", "studio", "salon", "café", "bookshop", "florist", "business"];
const INTERVAL_MS = 2600;
const OUT_MS = 320;
const STAGGER_MS = 30;

type Phase = "in" | "out";

/**
 * The cycling word in the hero headline. It is decorative: the heading
 * also carries a visually hidden sentence for screen readers, so this
 * whole element is aria-hidden. With reduced motion it stays on "shop".
 */
export default function RotatingWord() {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("in");
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) return;

    let outTimer: number | undefined;
    const tick = window.setInterval(() => {
      if (document.hidden) return;
      setAnimate(true);
      setPhase("out");
      const word = WORDS[index];
      outTimer = window.setTimeout(() => {
        setIndex((i) => (i + 1) % WORDS.length);
        setPhase("in");
      }, OUT_MS + STAGGER_MS * (word.length - 1));
    }, INTERVAL_MS);

    return () => {
      window.clearInterval(tick);
      if (outTimer) window.clearTimeout(outTimer);
    };
  }, [index]);

  const word = WORDS[index];

  return (
    <span className="rotator" aria-hidden="true">
      {WORDS.map((w) => (
        <span key={w} className="sizer">
          {w}.
        </span>
      ))}
      <span key={`${word}-${phase}`}>
        {Array.from(word).map((ch, i) => (
          <span
            key={i}
            className={animate ? `letter is-${phase}` : "letter"}
            style={{ animationDelay: `${i * STAGGER_MS}ms` }}
          >
            {ch}
          </span>
        ))}
        <span className="period">.</span>
      </span>
    </span>
  );
}
