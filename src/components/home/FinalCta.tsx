import { ButtonLink } from '@/components/ui/Button';
import { ArrowRightIcon } from '@/components/ui/Icons';
import { defaultServiceArea } from '@/config/site';

export function FinalCta() {
  return (
    <section aria-labelledby="cta-heading" className="bg-cream-50 pb-20 sm:pb-24">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-[1.75rem] bg-teal-800 px-7 py-14 text-center sm:px-12 sm:py-16">
          <div
            className="pointer-events-none absolute -top-20 -right-16 h-56 w-56 rounded-full bg-teal-700/50 blur-2xl"
            aria-hidden="true"
          />
          <div className="relative">
            <h2
              id="cta-heading"
              className="text-cream-50 mx-auto max-w-2xl text-3xl font-extrabold sm:text-4xl"
            >
              Everything your pet needs, a tap away.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-teal-100">
              Connect with verified professionals and supply stores across {defaultServiceArea.city}{' '}
              in about two minutes.
            </p>
            <ButtonLink href="/#services" size="lg" variant="inverse" className="group mt-8">
              Explore Services
              <ArrowRightIcon className="h-5 w-5 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none" />
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
