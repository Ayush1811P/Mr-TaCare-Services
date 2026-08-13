import Link from 'next/link';
import { FinalCta } from '@/components/home/FinalCta';
import { HowItWorks } from '@/components/home/HowItWorks';
import { JsonLd } from '@/components/seo/JsonLd';
import { Section } from '@/components/ui/Section';
import { defaultServiceArea } from '@/config/site';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { breadcrumbSchema } from '@/lib/seo/structuredData';

export const metadata = buildPageMetadata({
  title: 'How It Works',
  description:
    'See how Jivaayu Pet Care works: answer a few questions about your pet, find veterinary doctors near you in Noida, and send an appointment request on WhatsApp.',
  path: '/how-it-works',
});

const faqs = [
  {
    question: 'Do I need to create an account?',
    answer:
      'No. There is no sign-up, password or OTP anywhere in the flow. We ask for your name and mobile number only so the doctor knows who is contacting them.',
  },
  {
    question: 'Why do you ask for my location at the end?',
    answer:
      'Because you should know what you are sharing and why. We collect your pet details first, then ask for location only when it is time to actually search for nearby doctors. You can always type your sector instead.',
  },
  {
    question: 'Is my appointment confirmed once WhatsApp opens?',
    answer:
      'No. Opening WhatsApp starts a conversation — nothing more. The doctor confirms availability and the appointment directly with you.',
  },
  {
    question: 'What happens to my phone number?',
    answer:
      'It goes into the WhatsApp message you send, so the doctor can call you back. Your answers stay in your browser for the session and are not shared with other users.',
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <section className="bg-cream-100 py-14 sm:py-20">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-3 text-sm font-semibold tracking-[0.14em] text-teal-600 uppercase">
              How it works
            </p>
            <h1 className="text-ink-900 text-4xl font-extrabold sm:text-5xl">
              From &ldquo;my dog seems off&rdquo; to a doctor on WhatsApp
            </h1>
            <p className="text-ink-500 mt-5 text-lg leading-relaxed">
              Three steps, about two minutes, and no account to create. Here is exactly what happens
              at each stage — and what we do with what you tell us.
            </p>
          </div>
        </div>
      </section>

      <HowItWorks />

      <Section className="bg-white" ariaLabelledBy="detail-heading">
        <div className="mx-auto max-w-3xl">
          <h2 id="detail-heading" className="text-3xl font-bold sm:text-4xl">
            What to expect, step by step
          </h2>

          <div className="mt-8 space-y-8">
            <div>
              <h3 className="text-ink-900 text-xl font-bold">1. A few questions about your pet</h3>
              <p className="text-ink-600 mt-2.5 leading-relaxed">
                We ask your name and mobile number, then who needs a doctor — dog, cat, rabbit, bird
                or another companion. From there the questions adapt: pick a cat and we ask how old
                your cat is, not how old your &ldquo;pet&rdquo; is. Breed is optional, and
                &ldquo;Mixed / Not sure&rdquo; is always one tap away.
              </p>
            </div>

            <div>
              <h3 className="text-ink-900 text-xl font-bold">2. Doctors near you</h3>
              <p className="text-ink-600 mt-2.5 leading-relaxed">
                Only once your pet&apos;s details are in do we ask for location — and only then does
                your browser show a permission prompt. Prefer not to share it? Type your sector
                instead. We list veterinary doctors across {defaultServiceArea.city} with their
                clinic, services and distance from you, closest first.
              </p>
            </div>

            <div>
              <h3 className="text-ink-900 text-xl font-bold">3. A message you control</h3>
              <p className="text-ink-600 mt-2.5 leading-relaxed">
                Choose a doctor and we show you a review screen with everything we are about to
                include. Press continue and WhatsApp opens with the message written out — your name,
                your pet, their age and breed, and any date or time you prefer. You read it, then
                you press send. We never message anyone on your behalf.
              </p>
            </div>
          </div>

          <div className="rounded-card border-clay-300/60 bg-clay-50 mt-10 border p-6">
            <h3 className="text-ink-900 text-lg font-bold">One thing to be clear about</h3>
            <p className="text-ink-600 mt-2.5 leading-relaxed">
              Jivaayu Pet Care helps you reach a veterinary doctor. We are not a clinic, we do not
              give medical advice, and we cannot confirm an appointment for you — only the doctor
              can do that. If your pet needs urgent care, please contact a veterinary hospital
              directly.
            </p>
          </div>
        </div>
      </Section>

      <Section className="bg-cream-100" ariaLabelledBy="faq-heading">
        <div className="mx-auto max-w-3xl">
          <h2 id="faq-heading" className="text-3xl font-bold sm:text-4xl">
            Common questions
          </h2>
          <dl className="mt-8 space-y-5">
            {faqs.map((faq) => (
              <div
                key={faq.question}
                className="rounded-card border-cream-300/70 border bg-white p-6"
              >
                <dt className="text-ink-900 text-lg font-bold">{faq.question}</dt>
                <dd className="text-ink-600 mt-2 leading-relaxed">{faq.answer}</dd>
              </div>
            ))}
          </dl>

          <p className="text-ink-600 mt-8">
            Still unsure about something?{' '}
            <Link
              href="/contact"
              className="font-semibold text-teal-700 underline underline-offset-4 hover:text-teal-800"
            >
              Get in touch
            </Link>
            .
          </p>
        </div>
      </Section>

      <FinalCta />

      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'How It Works', path: '/how-it-works' },
        ])}
      />
    </>
  );
}
