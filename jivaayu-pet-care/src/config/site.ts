/**
 * Central site configuration.
 *
 * Everything that is environment- or brand-specific lives here so that no
 * component hardcodes a URL, a city, or a brand string.
 */

const rawSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, '') ?? 'https://jivaayu.example';

export const siteConfig = {
  /** Official brand name. Never abbreviate or re-spell this. */
  name: 'Jivaayu Pet Care',
  shortName: 'Jivaayu',
  url: rawSiteUrl,
  locale: 'en_IN',
  description:
    'Find nearby veterinary doctors in Noida and send an appointment request straight to them on WhatsApp. No account, no forms, no waiting on hold.',
  tagline: 'Find the right care for your pet, right when they need it.',
  email: 'hello@jivaayu.example',
  /** Public business contact used for support links (not a customer number). */
  supportWhatsApp: process.env.NEXT_PUBLIC_SUPPORT_WHATSAPP ?? '911234567890',
  ogImage: '/opengraph-image',
  twitterHandle: '@jivaayupetcare',
  /**
   * Set NEXT_PUBLIC_DEMO_DATA="false" once verified provider data is loaded.
   * While true, the UI clearly labels doctor listings as sample data.
   */
  isDemoData: process.env.NEXT_PUBLIC_DEMO_DATA !== 'false',
} as const;

/**
 * Service areas. Noida is the launch city, but the app is not hardcoded to it:
 * add an entry here and the location step, SEO copy and search all follow.
 */
export type ServiceArea = {
  slug: string;
  city: string;
  state: string;
  country: string;
  /** Approximate centre, used as the fallback search origin. */
  center: { latitude: number; longitude: number };
  /** Localities offered in the manual location picker. */
  localities: string[];
};

export const serviceAreas: readonly ServiceArea[] = [
  {
    slug: 'noida',
    city: 'Noida',
    state: 'Uttar Pradesh',
    country: 'India',
    center: { latitude: 28.5355, longitude: 77.391 },
    localities: [
      'Sector 15',
      'Sector 18',
      'Sector 27',
      'Sector 44',
      'Sector 50',
      'Sector 62',
      'Sector 76',
      'Sector 93',
      'Sector 104',
      'Sector 119',
      'Sector 137',
      'Greater Noida West',
    ],
  },
];

export const defaultServiceArea = serviceAreas[0];

export function findServiceArea(slug: string): ServiceArea | undefined {
  return serviceAreas.find((area) => area.slug === slug);
}

export const mainNav = [
  { href: '/', label: 'Home' },
  { href: '/how-it-works', label: 'How It Works' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
] as const;

export const footerNav = [
  { href: '/doctors', label: 'Find a Doctor' },
  { href: '/how-it-works', label: 'How It Works' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms of Use' },
] as const;
