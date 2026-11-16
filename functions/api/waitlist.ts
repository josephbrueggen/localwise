/*
 * Cloudflare Pages Function: POST /api/waitlist
 *
 * Receives { email, token } from the landing page, checks the Turnstile
 * spam token, and inserts the email into the private Supabase `waitlist`
 * table using the server-only service key.
 *
 * Customer data rule (see CLAUDE.md): never log, echo or store the email
 * anywhere except the database. Errors return generic messages only.
 *
 * Secrets (set in Cloudflare Pages > Settings > Variables, never in code):
 *   SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, TURNSTILE_SECRET_KEY
 */

interface Env {
  SUPABASE_URL: string;
  SUPABASE_SERVICE_ROLE_KEY: string;
  TURNSTILE_SECRET_KEY?: string;
}

type Ctx = { request: Request; env: Env };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });
}

export async function onRequestPost({ request, env }: Ctx): Promise<Response> {
  let email = "";
  let token = "";
  try {
    const body = (await request.json()) as { email?: unknown; token?: unknown };
    email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    token = typeof body.token === "string" ? body.token : "";
  } catch {
    return json({ status: "error" }, 400);
  }

  if (!EMAIL_RE.test(email) || email.length > 254) {
    return json({ status: "invalid" }, 400);
  }

  // Spam check. Required whenever a Turnstile secret is configured.
  if (env.TURNSTILE_SECRET_KEY) {
    const form = new FormData();
    form.append("secret", env.TURNSTILE_SECRET_KEY);
    form.append("response", token);
    const ip = request.headers.get("CF-Connecting-IP");
    if (ip) form.append("remoteip", ip);
    const verify = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: form,
    });
    const result = (await verify.json()) as { success?: boolean };
    if (!result.success) return json({ status: "error" }, 403);
  }

  if (!env.SUPABASE_URL || !env.SUPABASE_SERVICE_ROLE_KEY) {
    return json({ status: "error" }, 500);
  }

  // Works with both Supabase key styles: the newer "secret" keys (sb_secret_…)
  // go in the apikey header only; legacy service_role JWTs also go in Authorization.
  const key = env.SUPABASE_SERVICE_ROLE_KEY;
  const headers: Record<string, string> = {
    apikey: key,
    "Content-Type": "application/json",
    Prefer: "return=minimal",
  };
  if (key.startsWith("eyJ")) headers.Authorization = `Bearer ${key}`;

  const res = await fetch(`${env.SUPABASE_URL.replace(/\/+$/, "")}/rest/v1/waitlist`, {
    method: "POST",
    headers,
    body: JSON.stringify({ email, source: "landing" }),
  });

  if (res.status === 409) return json({ status: "already" });
  if (!res.ok) return json({ status: "error" }, 502);
  return json({ status: "ok" });
}

export async function onRequest(): Promise<Response> {
  return new Response(null, { status: 405, headers: { Allow: "POST" } });
}
