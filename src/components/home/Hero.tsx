import Image from 'next/image';
import { ButtonLink } from '@/components/ui/Button';
import { ArrowRightIcon, ChatIcon, PinIcon, ShieldCheckIcon } from '@/components/ui/Icons';
import { defaultServiceArea } from '@/config/site';

const trustPoints = [
  { icon: PinIcon, label: `Vet & Grooming` },
  { icon: ChatIcon, label: 'Food & Toys' },
  { icon: ShieldCheckIcon, label: 'All on WhatsApp' },
];

export function Hero() {
  return (
    <section className="from-cream-100 to-cream-50 relative overflow-hidden bg-gradient-to-b">
      <div className="container-page py-14 sm:py-20 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          <div className="animate-fade-up order-2 lg:order-1">
            <p className="inline-flex items-center gap-2 rounded-full border border-teal-700/15 bg-white px-4 py-1.5 text-sm font-semibold text-teal-700">
              <span className="bg-clay-500 flex h-2 w-2 rounded-full" aria-hidden="true" />
              Now serving {defaultServiceArea.city}
            </p>

            <h1 className="text-ink-900 mt-6 text-4xl leading-[1.08] font-extrabold sm:text-5xl lg:text-[3.5rem]">
              Everything your pet needs, <span className="text-teal-700">all in one place.</span>
            </h1>

            <ul className="mt-10 flex flex-wrap gap-x-7 gap-y-3">
              {trustPoints.map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="text-ink-600 flex items-center gap-2 text-sm font-medium"
                >
                  <Icon className="h-[1.15rem] w-[1.15rem] text-teal-600" />
                  {label}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative order-1 lg:order-2">
            <div className="bg-cream-200 shadow-lift relative overflow-hidden rounded-[1.75rem]">
              {/*
                The LCP element: eagerly loaded with fetchPriority high, fixed
                aspect ratio to reserve space, and sized so the browser can pick
                a right-sized source instead of the full-width original.
              */}
              <Image
                src="/images/hero-pets.webp"
                alt="A relaxed Labrador and a tabby cat resting together, waiting to see a veterinary doctor"
                width={1408}
                height={768}
                priority
                fetchPriority="high"
                quality={70}
                sizes="(min-width: 1024px) 46vw, calc(100vw - 2.5rem)"
                className="animate-float-subtle hidden h-auto w-full object-cover sm:block"
              />
              <Image
                src="/images/mobile-hero-pets.png"
                alt="Ultra 4K cinematic image of a beautiful cat and dog"
                width={768}
                height={1024}
                priority
                fetchPriority="high"
                quality={90}
                className="animate-pulse block h-auto w-full object-cover sm:hidden"
              />

            </div>
            
            <div className="mt-8 flex flex-col items-center justify-center text-center">
              <span className="text-3xl font-extrabold text-ink-900 sm:text-4xl">OUR</span>
              <span className="text-3xl font-extrabold text-teal-700 sm:text-4xl">Family Member</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
