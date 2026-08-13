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
          <div className="rounded-card border-clay-300/60 bg-clay-50 border p-5">
            <p className="text-ink-600 text-sm leading-relaxed">
              <strong className="text-ink-900 font-semibold">Please note:</strong> these are
              starting-point terms published during {siteConfig.name}&apos;s early phase. They will
              be reviewed and expanded before commercial launch.
            </p>
          </div>

          <div className="text-ink-600 mt-8 space-y-8 text-[1.0625rem] leading-relaxed">
            <section>
              <h2 className="text-ink-900 text-2xl font-bold">What this service is</h2>
              <p className="mt-3">
                {siteConfig.name} helps pet owners find veterinary doctors nearby and start a
                conversation with them on WhatsApp. We are a discovery and referral service — a way
                of getting you to the right person faster.
              </p>
            </section>

            <section>
              <h2 className="text-ink-900 text-2xl font-bold">What this service is not</h2>
              <p className="mt-3">
                We are not a veterinary clinic and we do not employ the doctors listed on this site.
                We do not provide medical advice, diagnosis or treatment, and nothing on this
                website should be treated as such. Any professional relationship is between you and
                the veterinary doctor you choose to contact.
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
                Appointments are not confirmed here
              </h2>
              <p className="mt-3">
                Opening WhatsApp with a prepared message does not create, confirm or guarantee an
                appointment. Only the veterinary doctor can confirm availability. We make no promise
                that a doctor will respond, be available, or accept your request.
              </p>
            </section>

            <section>
              <h2 className="text-ink-900 text-2xl font-bold">About the listings</h2>
              <p className="mt-3">
                While we build our network, the doctor listings shown on this site are clearly
                labelled sample data used for demonstration. They do not represent real practices.
                As we onboard verified veterinary partners, listings will be replaced with real,
                confirmed information — and details such as consultation fees and opening hours are
                shown only where a listing has been verified.
              </p>
              <p className="mt-3">
                Even for verified listings, information such as fees, hours and services can change
                without notice. Please confirm directly with the clinic.
              </p>
            </section>

            <section>
              <h2 className="text-ink-900 text-2xl font-bold">Using the site responsibly</h2>
              <p className="mt-3">
                Please provide accurate information about yourself and your pet, and use the
                WhatsApp handoff to make genuine appointment requests. Do not use this service to
                send unsolicited or abusive messages to the doctors listed here, and do not attempt
                to scrape, disrupt or misuse the site.
              </p>
            </section>

            <section>
              <h2 className="text-ink-900 text-2xl font-bold">Liability</h2>
              <p className="mt-3">
                We provide this service on a best-effort basis and cannot accept liability for the
                care, advice, conduct, availability or outcome of any veterinary doctor you contact
                through it. Your choice of doctor, and your decisions about your pet&apos;s health,
                remain yours.
              </p>
            </section>

            <section>
              <h2 className="text-ink-900 text-2xl font-bold">Changes</h2>
              <p className="mt-3">
                We may update these terms as the product develops. The date at the top of this page
                shows when it was last revised.
              </p>
            </section>

            <section>
              <h2 className="text-ink-900 text-2xl font-bold">Contact</h2>
              <p className="mt-3">
                Questions about these terms? Write to{' '}
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="font-semibold text-teal-700 underline underline-offset-4 hover:text-teal-800"
                >
                  {siteConfig.email}
                </a>{' '}
                or visit our{' '}
                <Link
                  href="/contact"
                  className="font-semibold text-teal-700 underline underline-offset-4 hover:text-teal-800"
                >
                  contact page
                </Link>
                . See also our{' '}
                <Link
                  href="/privacy"
                  className="font-semibold text-teal-700 underline underline-offset-4 hover:text-teal-800"
                >
                  privacy policy
                </Link>
                .
              </p>
            </section>
          </div>
        </div>
      </Section>
    </>
  );
}
