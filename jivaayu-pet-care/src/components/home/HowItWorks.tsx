import { Section, SectionHeading } from '@/components/ui/Section';
import { ChatIcon, PawIcon, PinIcon } from '@/components/ui/Icons';

export const steps = [
  {
    number: '01',
    icon: PawIcon,
    title: 'Tell us about your pet',
    description:
      'A few simple questions — who needs a doctor, how old they are, and what they are called.',
  },
  {
    number: '02',
    icon: PinIcon,
    title: 'Find nearby doctors',
    description:
      'Share your location, or type your sector. We show veterinary doctors near you with distance and services.',
  },
  {
    number: '03',
    icon: ChatIcon,
    title: 'Connect on WhatsApp',
    description:
      'Review your appointment request, then open WhatsApp with the message already written for you.',
  },
] as const;

export function HowItWorks({ headingLevel = 'h2' }: { headingLevel?: 'h1' | 'h2' }) {
  return (
    <Section ariaLabelledBy="how-heading" className="bg-cream-100">
      <SectionHeading
        id="how-heading"
        as={headingLevel}
        eyebrow="How it works"
        title="Three steps, about two minutes"
        description="You stay in control the whole way through — nothing is sent without you pressing send."
      />

      <ol className="mt-12 grid gap-6 md:grid-cols-3 md:gap-7">
        {steps.map(({ number, icon: Icon, title, description }) => (
          <li
            key={number}
            className="rounded-card border-cream-300/70 shadow-soft relative border bg-white p-7"
          >
            <div className="flex items-center justify-between">
              <span className="text-cream-50 flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-700">
                <Icon className="h-6 w-6" />
              </span>
              <span
                className="text-cream-400 text-3xl font-extrabold tabular-nums"
                aria-hidden="true"
              >
                {number}
              </span>
            </div>
            <h3 className="text-ink-900 mt-5 text-lg font-bold sm:text-xl">{title}</h3>
            <p className="text-ink-500 mt-2.5 leading-relaxed">{description}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
