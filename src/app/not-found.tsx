import Link from 'next/link';
import { ButtonLink } from '@/components/ui/Button';

export const metadata = {
  title: 'Page not found',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="container-page flex min-h-[60vh] items-center justify-center py-16">
      <div className="mx-auto max-w-md text-center">
        <p className="text-6xl" aria-hidden="true">
          🐾
        </p>
        <h1 className="text-ink-900 mt-6 text-3xl font-extrabold sm:text-4xl">
          This page has wandered off
        </h1>
        <p className="text-ink-500 mt-4 leading-relaxed">
          The page you were looking for doesn&apos;t exist or may have moved. Let&apos;s get you
          back to finding care for your pet.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href="/" size="lg">
            Back to home
          </ButtonLink>
          <ButtonLink href="/find-a-doctor" size="lg" variant="secondary">
            Find a doctor
          </ButtonLink>
        </div>
        <p className="text-ink-400 mt-8 text-sm">
          Need a hand?{' '}
          <Link
            href="/contact"
            className="font-semibold text-teal-700 underline underline-offset-4 hover:text-teal-800"
          >
            Contact us
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
