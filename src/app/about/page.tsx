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
    'Jivaayu Pet Care is a Noida-based startup providing a one-stop solution for all your pet needs—from doctors and grooming to food and supplies—directly on WhatsApp.',
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
              {siteConfig.name} started with a simple frustration: managing your pet&apos;s
              needs—from finding a vet to buying food—means jumping between too many apps and tabs.
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
              If you have ever tried to manage everything your pet needs, you know the drill:
              jumping between a clinic&apos;s website for a vet, a different app for grooming, and
              yet another store for food and toys. It&apos;s frustrating and takes time away from
              what actually matters.
            </p>
            <p>
              We thought taking care of your pet should be seamless. So we built a true one-stop
              solution. Whether you need to book a vet, schedule grooming, or restock on premium
              food and toys, tell us what you need, share your location, and connect directly on
              WhatsApp in under two minutes.
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
              We are starting in {city}, {state}, expanding our network of verified clinics,
              groomers, and premium supply stores sector by sector. If you are a pet care
              professional or store owner in {city} who would like to be listed, we would love to
              hear from you.
            </p>
          </div>
        </div>
      </Section>

      <Section className="bg-cream-100" ariaLabelledBy="about-service-heading">
        <div className="mx-auto max-w-3xl">
          <h2 id="about-service-heading" className="text-3xl font-bold sm:text-4xl">
            Everything for your pet in {city}, without the runaround
          </h2>

          <div className="text-ink-600 mt-6 space-y-5 text-[1.0625rem] leading-relaxed">
            <p>
              Whether your pet needs an urgent check-up, a fresh haircut, or a new bag of food, the
              last thing you want is to scroll through a dozen tabs trying to find the best option.
              Jivaayu Pet Care exists to shorten that gap. Tell us what you need, share your
              location, and we show you the best verified professionals and stores near you across{' '}
              {city}.
            </p>

            <h3 className="text-ink-900 pt-2 text-xl font-bold sm:text-2xl">
              Care for dogs, cats and smaller companions
            </h3>
            <p>
              Most requests we see are for dogs and cats — vaccinations, grooming, and their
              favorite kibble. The platform adapts to whoever needs help: pick a rabbit or a bird
              and we match you with specialists and supplies tailored exactly for small and exotic
              pets.
            </p>

            <h3 className="text-ink-900 pt-2 text-xl font-bold sm:text-2xl">
              Built around {city} sectors
            </h3>
            <p>
              {city} is spread out, and &ldquo;veterinary clinic near me&rdquo; means something very
              different from Sector 15 than it does from Sector 137. That is why distance is shown
              on every card and why you can enter your sector by hand if you would rather not share
              your location. We currently cover sectors across {city}, {state}, and we are adding
              verified veterinary clinics as we onboard them.
            </p>

            <h3 className="text-ink-900 pt-2 text-xl font-bold sm:text-2xl">
              What we do — and what we don&apos;t
            </h3>
            <p>
              Jivaayu Pet Care helps you find a veterinary doctor and request an appointment. We are
              not a clinic, we do not give medical advice, and we do not confirm appointments on a
              doctor&apos;s behalf — opening WhatsApp starts a conversation, and the doctor confirms
              availability themselves. If your pet needs urgent attention, please contact a
              veterinary hospital directly.
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
