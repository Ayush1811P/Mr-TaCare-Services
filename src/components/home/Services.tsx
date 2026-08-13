import { ServiceCard } from '@/components/home/ServiceCard';
import { Section, SectionHeading } from '@/components/ui/Section';
import { BathIcon, StethoscopeIcon } from '@/components/ui/Icons';

export function Services() {
  return (
    <Section id="services" ariaLabelledBy="services-heading" className="bg-cream-50">
      <SectionHeading
        id="services-heading"
        eyebrow="What we do"
        title="Two ways we look after your pet"
        description="Veterinary care is live today. Grooming is on the way."
      />

      <div className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-2 md:gap-7">
        <ServiceCard
          status="active"
          title="See a Doctor"
          description="Find a nearby veterinary doctor for your pet and send an appointment request in a couple of minutes."
          imageSrc="/images/vet-care.webp"
          imageAlt="A veterinary doctor gently holding a golden retriever puppy during a check-up"
          icon={<StethoscopeIcon className="h-6 w-6" />}
          ctaLabel="Find a Doctor"
          ctaHref="/find-a-doctor"
        />

        <ServiceCard
          status="coming-soon"
          title="Groom Your Pet"
          description="Professional pet grooming and cleaning, from a bath and brush-out to a full trim — booked the same simple way."
          imageSrc="/images/grooming.webp"
          imageAlt="A small white dog being gently brushed during a grooming session"
          icon={<BathIcon className="h-6 w-6" />}
        />
      </div>
    </Section>
  );
}
