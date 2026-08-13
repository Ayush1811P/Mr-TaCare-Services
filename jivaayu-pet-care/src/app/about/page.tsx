import Image from 'next/image';
import { FinalCta } from '@/components/home/FinalCta';
import { JsonLd } from '@/components/seo/JsonLd';
import { Section } from '@/components/ui/Section';
import { defaultServiceArea, siteConfig } from '@/config/site';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { breadcrumbSchema } from '@/lib/seo/structuredData';

export const metadata = buildPageMetadata({
  title: 'About Us',
  description:
    'Jivaayu Pet Care is a Noida-based startup helping pet owners find nearby veterinary doctors and reach them on WhatsApp, without accounts or call centres.',
  path: '/about',
});

export default function AboutPage() {
  const { city, state } = defaultServiceArea;

  return (
    <>
      <section className="bg-cream-100 py-14 sm:py-20">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-3 text-sm font-semibold tracking-[0.14em] text-teal-600 uppercase">
              About us
            </p>
            <h1 className="text-ink-900 text-4xl font-extrabold sm:text-5xl">
              Built for pet owners in {city}
            </h1>
            <p className="text-ink-500 mt-5 text-lg leading-relaxed">
              {siteConfig.name} started with a simple frustration: finding a vet in a hurry is
              harder than it should be.
            </p>
          </div>
        </div>
      </section>

      <Section className="bg-white" ariaLabelledBy="story-heading">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-card bg-cream-200 mb-10 overflow-hidden">
            <Image
              src="/images/vet-care.webp"
              alt="A veterinary doctor gently holding a puppy during a consultation"
              width={512}
              height={512}
              loading="lazy"
              sizes="(min-width: 768px) 768px, 100vw"
              className="h-56 w-full object-cover sm:h-72"
            />
          </div>

          <h2 id="story-heading" className="text-3xl font-bold sm:text-4xl">
            Why we built this
          </h2>

          <div className="text-ink-600 mt-6 space-y-5 text-[1.0625rem] leading-relaxed">
            <p>
              If you have ever had a pet fall ill on a Sunday evening, you know the drill: a dozen
              browser tabs, listings with numbers that ring out, reviews from three years ago, and
              no clear sense of which clinic is actually close to you. Meanwhile the one thing you
              care about is sitting on the floor looking miserable.
            </p>
            <p>
              We thought the first step — simply reaching a veterinary doctor — should take two
              minutes, not twenty. So we built exactly that, and nothing more. Tell us about your
              pet, share where you are, pick a doctor, and send a message that already contains
              everything they need to know.
            </p>
            <p>
              We chose WhatsApp deliberately. It is where people in India already talk to their
              doctors, their shops and their neighbours. Rather than inventing another inbox nobody
              checks, we hand the conversation over to a place that already works — and then get out
              of the way.
            </p>

            <h3 className="text-ink-900 pt-3 text-xl font-bold sm:text-2xl">What we care about</h3>
            <p>
              <strong className="text-ink-900 font-semibold">Honesty about what we know.</strong> We
              do not publish invented ratings, fake reviews or made-up availability. If a listing is
              not verified, we do not show a consultation fee or opening hours for it. If we cannot
              tell you whether a doctor is free at 6:30 PM, we say &ldquo;contact the doctor for
              availability&rdquo; — because that is the truth.
            </p>
            <p>
              <strong className="text-ink-900 font-semibold">Respect for your data.</strong> No
              account, no password, no tracking you across the internet. Your location is used to
              sort doctors by distance and nothing else. Your phone number goes into the message you
              send, and that is it.
            </p>
            <p>
              <strong className="text-ink-900 font-semibold">Staying in our lane.</strong> We are
              not veterinarians. We do not diagnose, prescribe or advise on treatment. We connect
              you to qualified professionals and let them do their job.
            </p>

            <h3 className="text-ink-900 pt-3 text-xl font-bold sm:text-2xl">
              Where we&apos;re going
            </h3>
            <p>
              We are starting in {city}, {state}, and onboarding verified veterinary clinics sector
              by sector. Pet grooming is our next service, and we are building it the same way:
              small, simple and genuinely useful before it is big. If you are a veterinary doctor in{' '}
              {city} who would like to be listed, we would love to hear from you.
            </p>
          </div>
        </div>
      </Section>

      <FinalCta />

      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'About', path: '/about' },
        ])}
      />
    </>
  );
}
