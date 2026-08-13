'use client';

import { useEffect } from 'react';
import { Button, ButtonLink } from '@/components/ui/Button';

/**
 * Route-level error boundary.
 *
 * Shows a friendly message; the raw error object is never rendered to the
 * customer. In production this is where a monitoring hook would go.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.error(error);
    }
  }, [error]);

  return (
    <div className="container-page flex min-h-[60vh] items-center justify-center py-16">
      <div className="mx-auto max-w-md text-center">
        <p className="text-5xl" aria-hidden="true">
          🐾
        </p>
        <h1 className="text-ink-900 mt-6 text-3xl font-extrabold sm:text-4xl">
          Something went wrong
        </h1>
        <p className="text-ink-500 mt-4 leading-relaxed">
          Sorry — that didn&apos;t work as expected. Trying again usually sorts it out.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button type="button" size="lg" onClick={reset}>
            Try again
          </Button>
          <ButtonLink href="/" size="lg" variant="secondary">
            Back to home
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
