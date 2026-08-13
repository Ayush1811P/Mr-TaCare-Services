import Link from 'next/link';
import { Section } from '@/components/ui/Section';
import { defaultServiceArea } from '@/config/site';

/**
 * Crawlable prose about the service.
 *
 * Written for a pet owner first. Location and service terms appear because
 * they describe what the product genuinely does, not to hit a keyword count.
 */
export function SeoContent() {
  const { city, state } = defaultServiceArea;

  return (
    <Section ariaLabelledBy="about-service-heading" className="bg-white">
      <div className="mx-auto max-w-3xl">
        <h2 id="about-service-heading" className="text-3xl font-bold sm:text-4xl">
          Veterinary doctors in {city}, without the runaround
        </h2>

        <div className="text-ink-600 mt-6 space-y-5 text-[1.0625rem] leading-relaxed">
          <p>
            When a pet suddenly stops eating or starts limping, the last thing you want is to scroll
            through a dozen tabs trying to work out which clinic is open and how far away it is.
            Jivaayu Pet Care exists to shorten that gap. Tell us about your pet, share your
            location, and we show you veterinary doctors near you across {city} — with their clinic,
            the services they offer, and how far they are from where you are standing.
          </p>

          <p>
            Every listing ends the same way: a WhatsApp message you can read before you send it.
            Rather than making you repeat your pet&apos;s age and breed over a phone call, we
            prepare the details and hand them over in one message. You choose the doctor, you press
            send, and the conversation is yours from there.
          </p>

          <h3 className="text-ink-900 pt-2 text-xl font-bold sm:text-2xl">
            Care for dogs, cats and smaller companions
          </h3>
          <p>
            Most requests we see are for a dog doctor or a cat doctor — vaccinations, skin and coat
            trouble, upset stomachs, and the annual check-up that keeps quietly getting postponed.
            The flow adapts to whoever needs help: pick a rabbit or a bird and we match you with
            veterinary doctors who list small and exotic pet care, instead of showing you a list of
            dog specialists.
          </p>

          <h3 className="text-ink-900 pt-2 text-xl font-bold sm:text-2xl">
            Built around {city} sectors
          </h3>
          <p>
            {city} is spread out, and &ldquo;veterinary clinic near me&rdquo; means something very
            different from Sector 15 than it does from Sector 137. That is why distance is shown on
            every card and why you can enter your sector by hand if you would rather not share your
            location. We currently cover sectors across {city}, {state}, and we are adding verified
            veterinary clinics as we onboard them.
          </p>

          <h3 className="text-ink-900 pt-2 text-xl font-bold sm:text-2xl">
            What we do — and what we don&apos;t
          </h3>
          <p>
            Jivaayu Pet Care helps you find a veterinary doctor and request an appointment. We are
            not a clinic, we do not give medical advice, and we do not confirm appointments on a
            doctor&apos;s behalf — opening WhatsApp starts a conversation, and the doctor confirms
            availability themselves. If your pet needs urgent attention, please contact a veterinary
            hospital directly.
          </p>

          <p>
            Ready when you are:{' '}
            <Link
              href="/find-a-doctor"
              className="font-semibold text-teal-700 underline underline-offset-4 hover:text-teal-800"
            >
              find a veterinary doctor near you
            </Link>
            , or read more about{' '}
            <Link
              href="/how-it-works"
              className="font-semibold text-teal-700 underline underline-offset-4 hover:text-teal-800"
            >
              how the process works
            </Link>
            .
          </p>
        </div>
      </div>
    </Section>
  );
}
