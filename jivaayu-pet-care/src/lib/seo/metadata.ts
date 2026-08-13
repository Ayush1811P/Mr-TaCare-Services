import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';

/**
 * Metadata helpers.
 *
 * Every indexable route builds its metadata here so titles, descriptions,
 * canonicals and social tags stay unique and consistent.
 */

export function absoluteUrl(path = '/'): string {
  return new URL(path, siteConfig.url).toString();
}

type PageMetadataInput = {
  title: string;
  description: string;
  /** Path beginning with "/" — becomes the canonical URL. */
  path: string;
  /** Set false for utility pages that should stay out of the index. */
  index?: boolean;
  ogImage?: string;
  type?: 'website' | 'article' | 'profile';
};

export function buildPageMetadata({
  title,
  description,
  path,
  index = true,
  ogImage,
  type = 'website',
}: PageMetadataInput): Metadata {
  const canonical = absoluteUrl(path);
  const image = ogImage ?? siteConfig.ogImage;

  return {
    title,
    description,
    alternates: { canonical },
    robots: index
      ? { index: true, follow: true, googleBot: { index: true, follow: true } }
      : { index: false, follow: true },
    openGraph: {
      type,
      title,
      description,
      url: canonical,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      images: [{ url: image, width: 1200, height: 630, alt: `${siteConfig.name} — ${title}` }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
      site: siteConfig.twitterHandle,
    },
  };
}
