import Link from 'next/link';
import { EmptyState } from '@/components/ui/States';
import { PinIcon } from '@/components/ui/Icons';

/**
 * Server-rendered prompt shown on /doctors to anyone who has not completed the
 * flow. Living on the server means the slot has real content in the initial
 * HTML, so hydrating personalised results in its place cannot shift the page.
 */
export function StartFlowPrompt() {
  return (
    <EmptyState
      title="Let's start with a few details"
      description="Tell us about your pet and share your location, and we'll show you veterinary doctors near you — closest first."
      icon={<PinIcon className="h-7 w-7" />}
    >
      <Link
        href="/find-a-doctor"
        className="text-cream-50 inline-flex min-h-12 items-center justify-center rounded-full bg-teal-700 px-6 font-semibold transition-colors hover:bg-teal-800"
      >
        See a Doctor
      </Link>
    </EmptyState>
  );
}
