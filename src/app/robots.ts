import type { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';

/**
 * Public pages are fully crawlable. Only the interactive flow is excluded —
 * it is a per-session UI state with no standalone content, not something we
 * are hiding.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/find-a-doctor'],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
