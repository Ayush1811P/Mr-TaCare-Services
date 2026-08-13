import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { JsonLd } from '@/components/seo/JsonLd';
import { siteConfig } from '@/config/site';
import { organizationSchema, websiteSchema } from '@/lib/seo/structuredData';
import './globals.css';

/**
 * Self-hosted via next/font: no render-blocking request to Google, and
 * `display: swap` plus a fallback stack keeps text visible during load.
 */
const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-plus-jakarta',
  weight: ['400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Find Veterinary Doctors in Noida`,
    // Child routes supply their own title; this appends the brand once.
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: 'Pet Care',
  formatDetection: { telephone: false, address: false, email: false },
  alternates: { canonical: '/' },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  openGraph: {
    type: 'website',
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    url: siteConfig.url,
  },
  twitter: { card: 'summary_large_image', site: siteConfig.twitterHandle },
};

export const viewport: Viewport = {
  themeColor: '#17544a',
  colorScheme: 'light',
  width: 'device-width',
  initialScale: 1,
  // Not capping zoom: pinch-to-zoom is an accessibility requirement.
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={plusJakarta.variable} suppressHydrationWarning>
      <body className="bg-cream-50 flex min-h-dvh flex-col antialiased">
        <a
          href="#main"
          className="text-cream-50 sr-only rounded-full bg-teal-800 px-5 py-3 font-semibold focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50"
        >
          Skip to main content
        </a>

        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />

        <JsonLd data={[organizationSchema(), websiteSchema()]} />
      </body>
    </html>
  );
}
