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
          <div className="rounded-card border-clay-300/60 bg-clay-50 border p-5">
            <p className="text-ink-600 text-sm leading-relaxed">
              <strong className="text-ink-900 font-semibold">Please note:</strong> this is a
              starting-point policy published while {siteConfig.name} is in its early phase. It
              describes how the product actually behaves today, but it has not yet been reviewed by
              a lawyer and will be expanded before commercial launch.
            </p>
          </div>

          <div className="text-ink-600 mt-8 space-y-8 text-[1.0625rem] leading-relaxed">
            <section>
              <h2 className="text-ink-900 text-2xl font-bold">What we collect</h2>
              <p className="mt-3">
                To prepare an appointment request we ask for four things: your name, your mobile
                number, details about your pet (type, age, breed and name), and your location. That
                is the entire list. We do not ask for an email address, we do not create an account
                for you, and there is no password or OTP anywhere in the flow.
              </p>
            </section>

            <section>
              <h2 className="text-ink-900 text-2xl font-bold">Why we collect it</h2>
              <ul className="mt-3 list-disc space-y-2 pl-5">
                <li>
                  <strong className="text-ink-900 font-semibold">
                    Your name and mobile number
                  </strong>{' '}
                  go into the WhatsApp message you send, so the veterinary doctor knows who is
                  contacting them and how to respond.
                </li>
                <li>
                  <strong className="text-ink-900 font-semibold">Your pet&apos;s details</strong>{' '}
                  personalise the questions you are asked and give the doctor useful context up
                  front.
                </li>
                <li>
                  <strong className="text-ink-900 font-semibold">Your location</strong> is used to
                  sort veterinary doctors by distance from you. Nothing else.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-ink-900 text-2xl font-bold">Where your information lives</h2>
              <p className="mt-3">
                In this phase of the product, your answers stay in your own browser for the duration
                of your session and are cleared when you close the tab. Your location is requested
                only when you reach the location step — never when the page loads — and you can
                decline and type your sector instead.
              </p>
              <p className="mt-3">
                When you press &ldquo;Continue to WhatsApp&rdquo;, your appointment request is
                handed to WhatsApp as a prefilled message. From that point the conversation is
                between you and the doctor, governed by WhatsApp&apos;s own privacy terms.
              </p>
            </section>

            <section>
              <h2 className="text-ink-900 text-2xl font-bold">What we never do</h2>
              <ul className="mt-3 list-disc space-y-2 pl-5">
                <li>We never send a WhatsApp message on your behalf. You press send.</li>
                <li>We never show your name, number or pet details to other users.</li>
                <li>We never sell your personal information.</li>
                <li>We never put your personal details into a shareable URL or page metadata.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-ink-900 text-2xl font-bold">As the product grows</h2>
              <p className="mt-3">
                We plan to store appointment requests in a secure database so we can improve the
                service and support you if something goes wrong. When that happens, access will be
                restricted by row-level security policies, personal data will not be publicly
                readable, and this policy will be updated to describe exactly what is retained and
                for how long — before the change goes live.
              </p>
            </section>

            <section>
              <h2 className="text-ink-900 text-2xl font-bold">Your choices</h2>
              <p className="mt-3">
                You can decline location access and still use the service. You can leave the flow at
                any point — nothing is submitted until you open WhatsApp. To ask what we hold about
                you, or to have it removed, email{' '}
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="font-semibold text-teal-700 underline underline-offset-4 hover:text-teal-800"
                >
                  {siteConfig.email}
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="text-ink-900 text-2xl font-bold">Contact</h2>
              <p className="mt-3">
                Questions about this policy? Write to{' '}
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
                .
              </p>
            </section>
          </div>
        </div>
      </Section>
    </>
  );
}
