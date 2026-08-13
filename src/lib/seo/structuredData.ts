import { defaultServiceArea, siteConfig } from '@/config/site';
import { absoluteUrl } from '@/lib/seo/metadata';
import type { Doctor } from '@/types';

/**
 * JSON-LD builders.
 *
 * Only properties backed by real data are emitted. No invented ratings,
 * reviews, opening hours, prices or availability — a listing that is not
 * verified simply carries fewer properties.
 */

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    logo: {
      '@type': 'ImageObject',
      url: absoluteUrl('/icon.svg'),
    },
    areaServed: {
      '@type': 'City',
      name: defaultServiceArea.city,
      containedInPlace: {
        '@type': 'AdministrativeArea',
        name: defaultServiceArea.state,
      },
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: siteConfig.email,
      areaServed: 'IN',
      availableLanguage: ['en', 'hi'],
    },
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteConfig.url}/#website`,
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: 'en-IN',
    publisher: { '@id': `${siteConfig.url}/#organization` },
  };
}

export function breadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, position) => ({
      '@type': 'ListItem',
      position: position + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

/**
 * VeterinaryCare schema for a verified doctor's clinic.
 *
 * Called only for verified listings — an unverified profile has no confirmed
 * address, fee or hours, so publishing it as a LocalBusiness would be a claim
 * we cannot stand behind.
 */
export function veterinaryCareSchema(doctor: Doctor) {
  const url = absoluteUrl(`/doctors/${doctor.slug}`);

  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'VeterinaryCare',
    '@id': `${url}#clinic`,
    name: doctor.clinic.name,
    url,
    address: {
      '@type': 'PostalAddress',
      streetAddress: doctor.clinic.addressLine,
      addressLocality: `${doctor.clinic.locality}, ${doctor.clinic.city}`,
      addressRegion: doctor.clinic.state,
      postalCode: doctor.clinic.postalCode,
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: doctor.clinic.latitude,
      longitude: doctor.clinic.longitude,
    },
    employee: {
      '@type': 'Person',
      name: doctor.name,
      jobTitle: 'Veterinary Doctor',
      description: doctor.headline,
      image: absoluteUrl(doctor.imageUrl),
    },
    availableService: doctor.services.map((service) => ({
      '@type': 'MedicalProcedure',
      name: service.name,
    })),
    isAcceptingNewPatients: undefined,
  };

  if (doctor.clinic.openingHours?.length) {
    schema.openingHoursSpecification = doctor.clinic.openingHours.map((hours) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: hours.days,
      opens: hours.opens,
      closes: hours.closes,
    }));
  }

  if (typeof doctor.consultationFee === 'number') {
    schema.priceRange = `₹${doctor.consultationFee}`;
  }

  // Drop undefined keys so nothing empty ends up in the emitted JSON.
  return Object.fromEntries(Object.entries(schema).filter(([, v]) => v !== undefined));
}

export function faqSchema(items: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
}
