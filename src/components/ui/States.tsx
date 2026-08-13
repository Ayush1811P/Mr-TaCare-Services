import type { ReactNode } from 'react';
import { AlertIcon, PawIcon, SearchIcon } from '@/components/ui/Icons';
import { cn } from '@/lib/utils/cn';

/**
 * Shared loading / empty / error presentation.
 *
 * Async status is announced politely so screen reader users learn what is
 * happening without the focus being yanked around.
 */

export function LoadingState({
  title,
  description,
  className,
}: {
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn('flex flex-col items-center gap-3 py-10 text-center', className)}
    >
      <span className="relative flex h-12 w-12 items-center justify-center">
        <span className="absolute inset-0 animate-ping rounded-full bg-teal-200/70 motion-reduce:animate-none" />
        <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-teal-100 text-teal-700">
          <PawIcon className="h-6 w-6" />
        </span>
      </span>
      <p className="text-ink-900 text-base font-semibold">{title}</p>
      {description ? <p className="text-ink-500 text-sm">{description}</p> : null}
    </div>
  );
}

export function DoctorCardSkeleton() {
  return (
    <div className="rounded-card border-cream-300/70 shadow-soft border bg-white p-5">
      <div className="flex gap-4">
        <div className="skeleton h-20 w-20 shrink-0 rounded-2xl" />
        <div className="flex-1 space-y-2.5 py-1">
          <div className="skeleton h-4 w-2/5 rounded-full" />
          <div className="skeleton h-3 w-3/5 rounded-full" />
          <div className="skeleton h-3 w-1/3 rounded-full" />
        </div>
      </div>
      <div className="mt-5 space-y-2">
        <div className="skeleton h-3 w-4/5 rounded-full" />
        <div className="skeleton h-3 w-2/3 rounded-full" />
      </div>
      <div className="mt-5 flex gap-3">
        <div className="skeleton h-12 flex-1 rounded-full" />
        <div className="skeleton h-12 w-28 rounded-full" />
      </div>
    </div>
  );
}

export function EmptyState({
  title,
  description,
  children,
  icon,
}: {
  title: string;
  description: string;
  children?: ReactNode;
  icon?: ReactNode;
}) {
  return (
    <div className="rounded-card border-cream-300/80 shadow-soft border bg-white px-6 py-12 text-center">
      <span className="bg-cream-100 mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full text-teal-700">
        {icon ?? <SearchIcon className="h-7 w-7" />}
      </span>
      <h2 className="text-ink-900 text-xl font-bold sm:text-2xl">{title}</h2>
      <p className="text-ink-500 mx-auto mt-3 max-w-md">{description}</p>
      {children ? <div className="mt-7 flex flex-wrap justify-center gap-3">{children}</div> : null}
    </div>
  );
}

export function ErrorState({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <div
      role="alert"
      className="rounded-card border-danger-600/20 bg-danger-50 border px-6 py-10 text-center"
    >
      <span className="text-danger-600 mx-auto mb-4 flex h-13 w-13 items-center justify-center rounded-full bg-white p-3">
        <AlertIcon className="h-7 w-7" />
      </span>
      <h2 className="text-ink-900 text-xl font-bold">{title}</h2>
      <p className="text-ink-600 mx-auto mt-2.5 max-w-md">{description}</p>
      {children ? <div className="mt-6 flex flex-wrap justify-center gap-3">{children}</div> : null}
    </div>
  );
}

/**
 * Inline field error.
 *
 * Pairs an icon with the text so the message never relies on colour alone,
 * and marks the region assertive so it is announced on validation failure.
 */
export function FieldError({ id, children }: { id: string; children: ReactNode }) {
  return (
    <p
      id={id}
      role="alert"
      className="text-danger-700 mt-2.5 flex items-start gap-2 text-sm font-medium"
    >
      <AlertIcon className="mt-0.5 h-4 w-4 shrink-0" />
      <span>{children}</span>
    </p>
  );
}
