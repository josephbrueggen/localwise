/*
 * Cloudflare Pages Function: GET /api/keepalive
 *
 * Supabase pauses free projects after about a week without activity. A free
 * scheduled GitHub Action calls this twice a week. It runs a tiny read on the
 * waitlist table that returns zero rows, so no customer data is read, returned
 * or stored. The response only says whether the database answered.
 */

interface Env {
  SUPABASE_URL: string;
  SUPABASE_SERVICE_ROLE_KEY: string;
}

export async function onRequestGet({ env }: { env: Env }): Promise<Response> {
  if (!env.SUPABASE_URL || !env.SUPABASE_SERVICE_ROLE_KEY) {
    return Response.json({ ok: false }, { status: 500, headers: { "Cache-Control": "no-store" } });
  }
  const key = env.SUPABASE_SERVICE_ROLE_KEY;
  const headers: Record<string, string> = { apikey: key };
  if (key.startsWith("eyJ")) headers.Authorization = `Bearer ${key}`;

  const res = await fetch(`${env.SUPABASE_URL.replace(/\/+$/, "")}/rest/v1/waitlist?select=id&limit=0`, {
    headers,
  });
  return Response.json({ ok: res.ok }, { status: res.ok ? 200 : 502, headers: { "Cache-Control": "no-store" } });
}
