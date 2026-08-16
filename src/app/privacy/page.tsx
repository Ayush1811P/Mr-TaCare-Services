import Link from 'next/link';
import { Section } from '@/components/ui/Section';
import { siteConfig } from '@/config/site';
import { buildPageMetadata } from '@/lib/seo/metadata';

export const metadata = buildPageMetadata({
  title: 'Privacy Policy',
  description:
    'How Jivaayu Pet Care handles your name, mobile number, pet details and location — what we collect, why, and what we never do with it.',
  path: '/privacy',
});

const LAST_UPDATED = '13 August 2026';

export default function PrivacyPage() {
  return (
    <>
      <section className="bg-cream-100 py-12 sm:py-16">
        <div className="container-page">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-ink-900 text-4xl font-extrabold sm:text-5xl">Privacy Policy</h1>
            <p className="text-ink-500 mt-4">Last updated: {LAST_UPDATED}</p>
          </div>
        </div>
      </section>

      <Section className="bg-white">
        <div className="mx-auto max-w-3xl">
          <div className="text-ink-600 mt-8 space-y-8 text-[1.0625rem] leading-relaxed">
            <section>
              <h2 className="text-ink-900 text-2xl font-bold">1. What We Collect</h2>
              <p className="mt-3">
                To facilitate your request for veterinary, grooming, or supply services, we collect the following limited personal data: your name, your mobile number, details about your pet (type, age, breed, and name), and your location. We do not require account creation, passwords, or OTPs.
              </p>
            </section>

            <section>
              <h2 className="text-ink-900 text-2xl font-bold">2. Purpose of Collection</h2>
              <p className="mt-3">
                We collect this information strictly to:
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-5">
                <li>Sort and display local service providers based on distance.</li>
                <li>Prepare a pre-filled WhatsApp message containing your details and pet's information so the provider can assist you efficiently.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-ink-900 text-2xl font-bold">3. Data Retention</h2>
              <p className="mt-3">
                Currently, your answers remain in your local browser for the duration of your session and are cleared when you close the tab. We do not persist your personal information in our databases. As our services expand, any data retention policies will be explicitly stated here before implementation, adhering to row-level security and restricted access.
              </p>
            </section>

            <section>
              <h2 className="text-ink-900 text-2xl font-bold">4. Third-Party Sharing</h2>
              <p className="mt-3">
                We do not sell your personal data. When you proceed to contact a provider, your prefilled appointment request is passed to WhatsApp (Meta). From that point forward, the transmission and conversation are governed by WhatsApp's own privacy terms and policies. We do not share your data with other users or publicly.
              </p>
            </section>

            <section>
              <h2 className="text-ink-900 text-2xl font-bold">5. Your Rights and Grievance Redressal</h2>
              <p className="mt-3">
                Under applicable data protection laws, you have the right to request access to, correction of, or deletion of your personal data. If you wish to exercise these rights or raise a privacy-related grievance, please contact our Data Protection/Grievance Officer by emailing{' '}
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="font-semibold text-teal-700 underline underline-offset-4 hover:text-teal-800"
                >
                  {siteConfig.email}
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </Section>
    </>
  );
}
