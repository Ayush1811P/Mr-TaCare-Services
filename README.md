# Jivaayu Pet Care 🐾

Frontend for **Jivaayu Pet Care** — helping pet owners in Noida find nearby veterinary doctors and send an appointment request straight to them on WhatsApp.

Built with Next.js 16 (App Router), TypeScript and Tailwind CSS v4. Server Components by default, mock data behind a repository layer, and a clean seam for Supabase.

---

## Status

**Phase 1 — frontend only.** There is no backend, no database, no authentication and no admin or doctor dashboard. Doctor listings come from fixtures in `src/data/mock/` and are clearly labelled as sample data in the UI.

Grooming appears on the homepage as **Coming Soon** and intentionally starts no workflow.

---

## Quick start

```bash
npm install
cp .env.example .env.local   # then edit NEXT_PUBLIC_SITE_URL
npm run dev                  # http://localhost:3000
```

Requires Node.js ≥ 20.9.

### Scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | ESLint |
| `npm run format` | Prettier write |
| `npm run check` | typecheck + lint + format check |
| `npm run audit:deps` | Audit production dependencies |

---

## The customer journey

```
Home  →  See a Doctor  →  name  →  mobile  →  pet type
      →  age  →  breed  →  pet name  →  location
      →  doctors near you  →  select  →  review  →  WhatsApp
```

One question per screen, with a progress bar and a working back button. Questions are generated from the selected animal — pick a cat and the flow asks *"How old is your cat?"*, never *"How old is your pet?"*.

**Location is requested last**, only when the user reaches that step, and every failure path (denied, timeout, unavailable, unsupported) falls through to manual sector entry. The user is never trapped.

---

## Architecture

```
src/
├── app/                      # routes, metadata, robots, sitemap, OG image
│   ├── (flow)/               # shares FlowProvider across the flow + results
│   │   ├── find-a-doctor/    # the step-by-step questions (noindex)
│   │   └── doctors/          # results + crawlable directory + [slug] profiles
│   ├── about/ contact/ how-it-works/ privacy/ terms/
│   ├── layout.tsx  page.tsx  globals.css
│   ├── robots.ts  sitemap.ts  opengraph-image.tsx
│   └── error.tsx  not-found.tsx
├── components/
│   ├── layout/ home/ doctor/ pet-flow/ location/ whatsapp/ ui/ seo/
├── services/                 # what the UI calls
├── repositories/             # where data comes from  ← swap for Supabase here
├── data/mock/                # fixtures (delete once Supabase is live)
├── lib/{utils,seo,location,supabase}/
├── types/                    # domain types mirroring the planned schema
└── config/site.ts            # brand, service areas, navigation
```

**The rule:** components call `services/`, services call `repositories/`, and only repositories know where data lives. No component imports a fixture or builds a query.

---

## Connecting Supabase later

The data layer was written to make this a contained change:

1. `npm install @supabase/supabase-js`
2. Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Uncomment the client in `src/lib/supabase/client.ts`
4. Add a `SupabaseDoctorRepository` implementing the existing `DoctorRepository` interface and export it from `src/repositories/doctorRepository.ts`
5. Delete `src/data/mock/` and set `NEXT_PUBLIC_DEMO_DATA=false`

No UI component changes. `src/lib/supabase/types.ts` already describes the planned tables — `customers`, `pets`, `pet_types`, `breeds`, `doctors`, `clinics`, `doctor_clinics`, `services`, `doctor_services`, `appointment_requests`, `appointment_events` — so regenerating types will surface any drift as compile errors.

Distance is currently computed in `lib/utils/geo.ts`; move that into a PostGIS query so ranking happens in the database.

### Security requirements before going live

- Enable **Row Level Security on every table**.
- `appointment_requests` and `customers` hold personal data: grant anonymous `INSERT` only, never public `SELECT`.
- `doctors`, `clinics`, `breeds`, `pet_types` may be publicly readable — expose only the columns rendered.
- Only the **publishable/anon key** may appear in browser code. The service-role key must never be given a `NEXT_PUBLIC_` prefix or imported anywhere client-reachable.

---

## Two things this product will not do

**1. It never claims availability it cannot verify.** There is no availability feed, so no listing says "available at 6:30 PM". Cards say *"Contact doctor for appointment availability"*. Fees and opening hours render only for verified listings, and `veterinaryCareSchema()` emits structured data only for those. No ratings, no reviews — none of that data exists yet, so none of it is invented.

**2. WhatsApp opened ≠ appointment confirmed.** The site builds a `wa.me` deep link and the customer presses send themselves. Nothing is sent silently, and no screen ever says "Appointment Confirmed" — only the doctor can confirm, and this product has no channel to receive that.

---

## SEO

- Unique title, description and canonical on every indexable route via `lib/seo/metadata.ts`
- Server-rendered JSON-LD: `Organization`, `WebSite`, `BreadcrumbList`, `FAQPage`, and `VeterinaryCare` for verified doctors only
- `robots.ts` and a `sitemap.ts` that grows from the repository as verified doctors are added
- Generated OG image at `/opengraph-image`
- `/doctors` serves a **server-rendered directory** so the page has crawlable content without hydration; the personalised results layer on top for users who completed the flow
- Only verified profiles are prerendered and indexed — unverified ones carry `noindex` rather than becoming thin duplicate pages
- `/find-a-doctor` is `noindex`: it is per-session UI, not content

---

## Verified results

Measured on this build, not aspirational:

| Check | Result |
| --- | --- |
| `npm run check` | typecheck, lint and format all clean |
| `npm run build` | 20 routes prerendered, no errors |
| axe-core (WCAG 2.1/2.2 AA) | **0 violations** across 8 pages, all 7 flow steps, results, review dialog and mobile menu — mobile and desktop |
| Lighthouse mobile | Performance **95–98**, Accessibility **100**, Best Practices **100**, SEO **100** |
| Core Web Vitals (lab) | LCP 2.2–2.7s · CLS **0** · TBT 70–180ms |
| `npm audit --omit=dev` | 0 vulnerabilities |
| Runtime dependencies | 3 (`next`, `react`, `react-dom`) |

Lighthouse numbers are lab data from an emulated Moto G on a local server. Field results depend on hosting, network and device. Ranking depends on content, competition, links and authority — a technical foundation is necessary, not sufficient.

---

## Accessibility

Targets WCAG 2.2 AA: semantic landmarks, one H1 per page, visible focus rings, ≥44px touch targets, labelled controls, errors announced via `role="alert"` and paired with an icon so colour is never the only signal, and `prefers-reduced-motion` honoured (animations collapse but content stays visible).

Focus is managed deliberately in the flow: choice steps move focus to the new question heading, while text steps focus the input and reference the heading through `aria-describedby` — so keyboard users can just start typing.

---

## Privacy

Name, mobile number, pet details and location are treated as personal data. Answers are kept in `sessionStorage` — not the URL, not `localStorage` — so nothing personal lands in a shareable link, server log or referrer, and it is gone when the tab closes. Geolocation is resolved offline against configured service areas; coordinates are never sent to a third-party geocoder.

---

## Adding another city

`src/config/site.ts` drives service areas. Add an entry to `serviceAreas` with a centre and its localities, add coordinates to `LOCALITY_COORDS` in `lib/location/resolve.ts`, and the location step, search and SEO copy follow. Noida is the default, not a hardcoded assumption.

---

## Not included by design

Authentication, registration, admin dashboard, doctor dashboard, grooming booking, payments, backend API, database. The code is structured so a `/grooming` section can be added without rework.

---

## License

Proprietary — © Jivaayu Pet Care.
