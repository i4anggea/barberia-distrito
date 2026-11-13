import type { APIRoute } from 'astro';
import { site } from '../content/site.ts';
export const GET: APIRoute = () =>
  new Response(
    `User-agent: *\n${site.mode === 'demo' ? 'Disallow: /' : 'Allow: /'}\n`,
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
  );
