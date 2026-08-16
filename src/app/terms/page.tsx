import Link from 'next/link';
import { Section } from '@/components/ui/Section';
import { siteConfig } from '@/config/site';
import { buildPageMetadata } from '@/lib/seo/metadata';

export const metadata = buildPageMetadata({
  title: 'Terms of Use',
  description:
    'The terms that apply when you use Jivaayu Pet Care to find veterinary doctors and send appointment requests.',
  path: '/terms',
});

const LAST_UPDATED = '13 August 2026';

export default function TermsPage() {
  return (
    <>
      <section className="bg-cream-100 py-12 sm:py-16">
        <div className="container-page">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-ink-900 text-4xl font-extrabold sm:text-5xl">Terms of Use</h1>
            <p className="text-ink-500 mt-4">Last updated: {LAST_UPDATED}</p>
          </div>
        </div>
      </section>

      <Section className="bg-white">
        <div className="mx-auto max-w-3xl">
          <div className="text-ink-600 mt-8 space-y-8 text-[1.0625rem] leading-relaxed">
            <section>
              <h2 className="text-ink-900 text-2xl font-bold">1. Eligibility</h2>
              <p className="mt-3">
                You must be 18 years of age or older to use this service to connect with providers or request supplies.
              </p>
            </section>

            <section>
              <h2 className="text-ink-900 text-2xl font-bold">2. What this service is</h2>
              <p className="mt-3">
                {siteConfig.name} helps pet owners find veterinary doctors, groomers, and supply stores nearby and start a conversation with them on WhatsApp. We are a discovery and referral service — a way of connecting you to local providers.
              </p>
            </section>

            <section>
              <h2 className="text-ink-900 text-2xl font-bold">3. What this service is not (Liability Shield)</h2>
              <p className="mt-3">
                We are not a veterinary clinic, groomer, or retailer, and we do not employ the professionals listed on this site. We do not provide medical advice, diagnosis, or treatment, and nothing on this website should be treated as such. We do not vet the medical judgment, treatment quality, product safety, or service quality of any listed provider. Any dispute regarding a consultation, treatment, grooming service, or product is strictly between you and the provider.
              </p>
              <p className="mt-3">
                <strong className="text-ink-900 font-semibold">
                  In an emergency, contact a veterinary hospital directly
                </strong>{' '}
                rather than using this website.
              </p>
            </section>

            <section>
              <h2 className="text-ink-900 text-2xl font-bold">
                4. Appointments are not confirmed here
              </h2>
              <p className="mt-3">
                Opening WhatsApp with a prepared message does not create, confirm or guarantee an appointment or an order. Only the provider can confirm availability or stock. We make no promise that a provider will respond, be available, or accept your request.
              </p>
            </section>

            <section>
              <h2 className="text-ink-900 text-2xl font-bold">5. About the listings & "Verified" Providers</h2>
              <p className="mt-3">
                When we label a provider or store as "verified", we mean that we have confirmed their business registration and a working contact number. We do not audit their medical qualifications, inspect their premises, or endorse their quality of service.
              </p>
              <p className="mt-3">
                Even for verified listings, information such as fees, hours, and services can change without notice. Please confirm all details directly with the provider.
              </p>
            </section>

            <section>
              <h2 className="text-ink-900 text-2xl font-bold">6. Using the site responsibly</h2>
              <p className="mt-3">
                Please provide accurate information about yourself and your pet, and use the WhatsApp handoff to make genuine requests. Do not use this service to send unsolicited or abusive messages, and do not attempt to scrape, disrupt, or misuse the site.
              </p>
            </section>

            <section>
              <h2 className="text-ink-900 text-2xl font-bold">7. Limitation of Liability</h2>
              <p className="mt-3">
                We provide this service on a "best-effort" basis without any warranties. In no event shall {siteConfig.name} or its operators be held liable for any direct, indirect, incidental, or consequential damages arising from the care, advice, conduct, availability, or outcome of any provider you contact through this platform. Your choice of provider, and your decisions about your pet's health and care, remain entirely yours.
              </p>
            </section>
          </div>
        </div>
      </Section>
    </>
  );
}
