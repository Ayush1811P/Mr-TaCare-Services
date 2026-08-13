import { JsonLd } from '@/components/seo/JsonLd';
import { ButtonLink } from '@/components/ui/Button';
import { Section } from '@/components/ui/Section';
import { ChatIcon, PawIcon, WhatsAppIcon } from '@/components/ui/Icons';
import { defaultServiceArea, siteConfig } from '@/config/site';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { breadcrumbSchema } from '@/lib/seo/structuredData';
import { buildSupportWhatsAppUrl } from '@/lib/utils/whatsapp';

export const metadata = buildPageMetadata({
  title: 'Contact Us',
  description:
    'Get in touch with Jivaayu Pet Care — for help finding a veterinary doctor in Noida, or to list your veterinary practice with us.',
  path: '/contact',
});

export default function ContactPage() {
  const { city } = defaultServiceArea;

  return (
    <>
      <section className="bg-cream-100 py-14 sm:py-20">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-3 text-sm font-semibold tracking-[0.14em] text-teal-600 uppercase">
              Contact
            </p>
            <h1 className="text-ink-900 text-4xl font-extrabold sm:text-5xl">Talk to us</h1>
            <p className="text-ink-500 mt-5 text-lg leading-relaxed">
              Whether you need help finding a doctor or you run a clinic in {city}, we read
              everything that comes in.
            </p>
          </div>
        </div>
      </section>

      <Section className="bg-white" ariaLabelledBy="contact-heading">
        <h2 id="contact-heading" className="sr-only">
          Ways to reach Jivaayu Pet Care
        </h2>

        <div className="mx-auto grid max-w-4xl gap-5 md:grid-cols-2">
          <div className="rounded-card border-cream-300/70 bg-cream-50 border p-7">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-50 text-teal-700">
              <ChatIcon className="h-6 w-6" />
            </span>
            <h3 className="text-ink-900 mt-5 text-xl font-bold">Need help as a pet owner?</h3>
            <p className="text-ink-500 mt-2.5 leading-relaxed">
              Can&apos;t find a doctor near you, or something on the site isn&apos;t working?
              Message us and we&apos;ll help you find care for your pet.
            </p>
            <ButtonLink
              href={buildSupportWhatsAppUrl(
                `Hi ${siteConfig.name}, I need help finding a veterinary doctor.`,
              )}
              external
              variant="whatsapp"
              className="mt-6 w-full sm:w-auto"
            >
              <WhatsAppIcon className="h-5 w-5" />
              Message us on WhatsApp
            </ButtonLink>
          </div>

          <div className="rounded-card border-cream-300/70 bg-cream-50 border p-7">
            <span className="bg-clay-50 text-clay-600 flex h-12 w-12 items-center justify-center rounded-2xl">
              <PawIcon className="h-6 w-6" />
            </span>
            <h3 className="text-ink-900 mt-5 text-xl font-bold">Are you a veterinary doctor?</h3>
            <p className="text-ink-500 mt-2.5 leading-relaxed">
              We&apos;re onboarding verified veterinary clinics across {city}. Listing is free while
              we build out our network — write to us with your clinic details.
            </p>
            <ButtonLink
              href={`mailto:${siteConfig.email}?subject=${encodeURIComponent('Veterinary clinic listing request')}`}
              variant="secondary"
              className="mt-6 w-full sm:w-auto"
            >
              List your practice
            </ButtonLink>
          </div>
        </div>

        <div className="rounded-card border-cream-300/70 mx-auto mt-6 max-w-4xl border bg-white p-7">
          <h3 className="text-ink-900 text-lg font-bold">Email</h3>
          <p className="text-ink-500 mt-2">
            For anything else, reach us at{' '}
            <a
              href={`mailto:${siteConfig.email}`}
              className="font-semibold text-teal-700 underline underline-offset-4 hover:text-teal-800"
            >
              {siteConfig.email}
            </a>
            . We usually reply within a working day.
          </p>

          <div className="border-cream-200 mt-6 border-t pt-5">
            <h3 className="text-ink-900 text-lg font-bold">In an emergency</h3>
            <p className="text-ink-500 mt-2 leading-relaxed">
              We are not an emergency service and cannot provide medical help. If your pet needs
              urgent attention, please contact a veterinary hospital directly.
            </p>
          </div>
        </div>
      </Section>

      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Contact', path: '/contact' },
        ])}
      />
    </>
  );
}
