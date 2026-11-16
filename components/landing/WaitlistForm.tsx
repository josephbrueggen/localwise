"use client";

import { useEffect, useRef, useState } from "react";

/*
 * Waitlist signup. Sends only the email (and a spam-check token) to our own
 * /api/waitlist endpoint, which stores it in the private database.
 * Customer data rule: never log or store the email anywhere else here.
 */

type Status = "idle" | "sending" | "done" | "already" | "error";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: Record<string, unknown>) => string;
      reset: (id?: string) => void;
    };
  }
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const tokenRef = useRef<string>("");
  const widgetRef = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | undefined>(undefined);

  // Load Cloudflare Turnstile (free, privacy-friendly spam check) when configured.
  useEffect(() => {
    if (!TURNSTILE_SITE_KEY || !widgetRef.current) return;
    const render = () => {
      if (!window.turnstile || !widgetRef.current || widgetId.current) return;
      widgetId.current = window.turnstile.render(widgetRef.current, {
        sitekey: TURNSTILE_SITE_KEY,
        size: "flexible",
        appearance: "interaction-only",
        callback: (t: string) => {
          tokenRef.current = t;
        },
        "expired-callback": () => {
          tokenRef.current = "";
        },
      });
    };
    if (window.turnstile) return render();
    const s = document.createElement("script");
    s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    s.async = true;
    s.onload = render;
    document.head.appendChild(s);
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const value = email.trim();
    if (!EMAIL_RE.test(value)) {
      setStatus("error");
      setMessage("That email doesn't look quite right. Check it and try again.");
      return;
    }
    setStatus("sending");
    setMessage("");
    try {
      // The invisible spam check usually finishes within a second or two of
      // the page loading. If someone is quicker, wait briefly for it.
      if (TURNSTILE_SITE_KEY) {
        for (let i = 0; i < 40 && !tokenRef.current; i++) {
          await new Promise((r) => setTimeout(r, 250));
        }
      }
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: value, token: tokenRef.current }),
      });
      const data = (await res.json().catch(() => ({}))) as { status?: string };
      if (res.ok && data.status === "already") {
        setStatus("already");
      } else if (res.ok) {
        setStatus("done");
      } else {
        throw new Error();
      }
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Something went wrong on our side. Please try again in a moment.");
      tokenRef.current = "";
      if (widgetId.current) window.turnstile?.reset(widgetId.current);
    }
  }

  if (status === "done" || status === "already") {
    return (
      <div className="lp-form-done" role="status">
        <p className="lp-form-done-title">
          {status === "done" ? "You're on the list." : "You're already on the list."}
        </p>
        <p className="lp-form-done-text">
          We'll email you when your spot opens.
        </p>
      </div>
    );
  }

  return (
    <form className="lp-form" onSubmit={onSubmit} noValidate>
      <label htmlFor="lp-email" className="lp-form-label">
        Your email
      </label>
      <div className="lp-form-row">
        <input
          id="lp-email"
          type="email"
          name="email"
          autoComplete="email"
          inputMode="email"
          placeholder="you@yourshop.com"
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          aria-invalid={status === "error"}
          aria-describedby="lp-form-note"
          className="lp-input"
        />
        <button type="submit" className="lp-button" disabled={status === "sending"}>
          {status === "sending" ? "Joining…" : "Join the waitlist"}
        </button>
      </div>
      <div ref={widgetRef} className="lp-turnstile" />
      {status === "error" ? (
        <p id="lp-form-note" className="lp-form-error" role="alert">
          {message}
        </p>
      ) : (
        <p id="lp-form-note" className="lp-form-note">
          No payment method required. No spammy emails, ever.
        </p>
      )}
    </form>
  );
}
