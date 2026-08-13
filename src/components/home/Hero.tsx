import Image from 'next/image';
import { ButtonLink } from '@/components/ui/Button';
import { ArrowRightIcon, ChatIcon, PinIcon, ShieldCheckIcon } from '@/components/ui/Icons';
import { defaultServiceArea } from '@/config/site';

const trustPoints = [
  { icon: PinIcon, label: `Doctors across ${defaultServiceArea.city}` },
  { icon: ChatIcon, label: 'Request on WhatsApp' },
  { icon: ShieldCheckIcon, label: 'No account needed' },
];

export function Hero() {
  return (
    <section className="from-cream-100 to-cream-50 relative overflow-hidden bg-gradient-to-b">
      <div className="container-page py-14 sm:py-20 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          <div className="animate-fade-up">
            <p className="inline-flex items-center gap-2 rounded-full border border-teal-700/15 bg-white px-4 py-1.5 text-sm font-semibold text-teal-700">
              <span className="bg-clay-500 flex h-2 w-2 rounded-full" aria-hidden="true" />
              Now serving {defaultServiceArea.city}
            </p>

            <h1 className="text-ink-900 mt-6 text-4xl leading-[1.08] font-extrabold sm:text-5xl lg:text-[3.5rem]">
              Find the right care for your pet,{' '}
              <span className="text-teal-700">right when they need it.</span>
            </h1>

            <p className="text-ink-500 mt-6 max-w-xl text-lg leading-relaxed sm:text-xl">
              Answer a few quick questions, see veterinary doctors near you, and send an appointment
              request straight to them on WhatsApp. No forms, no sign-up, no waiting on hold.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <ButtonLink href="/find-a-doctor" size="lg" className="group">
                See a Doctor
                <ArrowRightIcon className="h-5 w-5 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none" />
              </ButtonLink>
              <ButtonLink href="/how-it-works" size="lg" variant="secondary">
                How it works
              </ButtonLink>
            </div>

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

          <div className="relative">
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
                className="h-auto w-full object-cover"
              />
            </div>

            <div className="border-cream-300/70 shadow-soft absolute -bottom-5 left-4 flex items-center gap-3 rounded-2xl border bg-white/95 px-4 py-3 backdrop-blur-sm sm:left-6">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
                <ChatIcon className="h-5 w-5" />
              </span>
              <div>
                <p className="text-ink-900 text-sm font-bold">Straight to WhatsApp</p>
                <p className="text-ink-500 text-xs">You review the message before it sends</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
