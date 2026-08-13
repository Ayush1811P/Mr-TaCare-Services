import { ServiceCard } from '@/components/home/ServiceCard';
import { Section, SectionHeading } from '@/components/ui/Section';
import { BathIcon, StethoscopeIcon, BowlIcon, BoneIcon, PackageIcon } from '@/components/ui/Icons';

export function Services() {
  return (
    <Section id="services" ariaLabelledBy="services-heading" className="bg-cream-50">
      <SectionHeading
        id="services-heading"
        eyebrow="What we do"
        title="Everything we offer"
        description="Your one-stop solution for all pet needs."
      />

      <div className="mx-auto mt-12 grid max-w-6xl gap-6 md:grid-cols-2 md:gap-7 lg:grid-cols-3">
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

        <ServiceCard
          status="coming-soon"
          title="Pet Foods"
          description="Premium nutrition for your companions — from daily kibble to specialized diets."
          imageSrc="/images/pet-food.jpg"
          imageAlt="A bowl of pet food"
          icon={<BowlIcon className="h-6 w-6" />}
        />

        <ServiceCard
          status="coming-soon"
          title="Pet Toys"
          description="Engaging and durable toys to keep your pet active and happy."
          imageSrc="/images/pet-toys.jpg"
          imageAlt="A dog playing with a toy"
          icon={<BoneIcon className="h-6 w-6" />}
        />

        <ServiceCard
          status="coming-soon"
          title="Pet Materials"
          description="Essential supplies, accessories, and bedding for a comfortable life."
          imageSrc="/images/pet-materials.jpg"
          imageAlt="Pet supplies, food, and accessories on a pink background"
          icon={<PackageIcon className="h-6 w-6" />}
        />
      </div>
    </Section>
  );
}
