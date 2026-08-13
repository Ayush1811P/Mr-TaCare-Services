import { Section, SectionHeading } from '@/components/ui/Section';
import { BoltIcon, ChatIcon, PawIcon, PinIcon } from '@/components/ui/Icons';

const values = [
  {
    icon: PinIcon,
    title: 'Nearby',
    description:
      'Find the closest doctors, grooming centers, and pet supply stores around your location.',
  },
  {
    icon: BoltIcon,
    title: 'Simple',
    description:
      'No account, no password, no registration. Answer a few questions and you are done.',
  },
  {
    icon: ChatIcon,
    title: 'Direct',
    description:
      'Your request opens in WhatsApp, already written. You read it, you press send, you talk directly to the provider.',
  },
  {
    icon: PawIcon,
    title: 'Pet-first',
    description:
      'The questions adapt to your pet, so a rabbit owner is never asked about dog breeds.',
  },
];

export function ValueProps() {
  return (
    <Section ariaLabelledBy="why-heading" className="bg-white">
      <SectionHeading
        id="why-heading"
        eyebrow="Why Jivaayu Pet Care"
        title="Caring for your pet shouldn't be complicated"
      />

      <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        {values.map(({ icon: Icon, title, description }) => (
          <li
            key={title}
            className="rounded-card border-cream-300/70 bg-cream-50 hover:shadow-soft border p-6 transition-shadow"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-50 text-teal-700">
              <Icon className="h-6 w-6" />
            </span>
            <h3 className="text-ink-900 mt-5 text-lg font-bold">{title}</h3>
            <p className="text-ink-500 mt-2 text-[0.9375rem] leading-relaxed">{description}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
