import type { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';
import { listIndexableDoctorSlugs } from '@/services/doctors';

/**
 * Scales with the provider list: doctor URLs come from the repository, so
 * adding verified doctors in Supabase later grows the sitemap automatically.
 * Only verified profiles are included — thin or unverified pages stay out.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${siteConfig.url}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    {
      url: `${siteConfig.url}/doctors`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/how-it-works`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${siteConfig.url}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${siteConfig.url}/contact`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${siteConfig.url}/privacy`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    { url: `${siteConfig.url}/terms`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ];

  const slugs = await listIndexableDoctorSlugs();
  const doctorRoutes: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url: `${siteConfig.url}/doctors/${slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [...staticRoutes, ...doctorRoutes];
}
