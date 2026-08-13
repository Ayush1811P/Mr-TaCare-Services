/**
 * Supabase wiring — intentionally inert in this phase.
 *
 * The frontend currently reads from mock repositories. When the database is
 * ready, install `@supabase/supabase-js`, uncomment the client below, and
 * switch the repository implementations in `src/repositories/*`. No UI
 * component needs to change, because nothing imports Supabase directly.
 *
 * SECURITY RULES (non-negotiable):
 *  - Only the publishable/anon key may appear in browser code, via
 *    NEXT_PUBLIC_SUPABASE_ANON_KEY.
 *  - The service-role key must NEVER be referenced in this directory or in any
 *    file that can be bundled for the client. Server-only usage belongs in a
 *    route handler or server action reading a non-public env var.
 *  - Row Level Security must be enabled on every table before launch.
 *  - `appointment_requests` and `customers` hold personal data (name, phone,
 *    location). Public roles get INSERT only; SELECT stays restricted.
 *  - `doctors`, `clinics`, `breeds`, `pet_types` may be publicly readable, but
 *    expose only the columns the site actually renders.
 */

export const supabaseConfig = {
  url: process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
  anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '',
} as const;

export function isSupabaseConfigured(): boolean {
  return Boolean(supabaseConfig.url && supabaseConfig.anonKey);
}

/*
 * Reference implementation for the next phase:
 *
 * import { createClient } from '@supabase/supabase-js';
 * import type { Database } from './types';
 *
 * export const supabase = createClient<Database>(
 *   supabaseConfig.url,
 *   supabaseConfig.anonKey,
 *   { auth: { persistSession: false } },
 * );
 */
