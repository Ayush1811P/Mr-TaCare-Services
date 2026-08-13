'use client';

import { useEffect, useId, useRef, type ReactNode } from 'react';
import { ArrowLeftIcon } from '@/components/ui/Icons';
import { cn } from '@/lib/utils/cn';

/**
 * Shell for a single question.
 *
 * On step change, focus moves to the question heading so keyboard and screen
 * reader users land on the new question rather than being stranded where the
 * previous control used to be.
 *
 * Steps whose answer is a text field opt out via `focusHeading={false}` and
 * focus their input instead — otherwise the heading would steal focus from the
 * field and the user's first keystrokes would go nowhere. Those inputs
 * reference `headingId` through aria-describedby, so the question is still
 * announced when focus arrives.
 */
export function StepContainer({
  stepKey,
  question,
  helper,
  onBack,
  canGoBack,
  children,
  footer,
  wide,
  focusHeading = true,
}: {
  stepKey: string;
  question: string;
  helper?: ReactNode;
  onBack: () => void;
  canGoBack: boolean;
  children: ReactNode | ((headingId: string) => ReactNode);
  footer?: ReactNode;
  wide?: boolean;
  focusHeading?: boolean;
}) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const headingId = useId();

  useEffect(() => {
    if (focusHeading) headingRef.current?.focus();
  }, [stepKey, focusHeading]);

  return (
    <div className={cn('mx-auto w-full', wide ? 'max-w-3xl' : 'max-w-xl')}>
      {canGoBack ? (
        <button
          type="button"
          onClick={onBack}
          className="text-ink-500 hover:bg-cream-200/70 hover:text-ink-800 mb-6 inline-flex min-h-11 items-center gap-2 rounded-full px-3 text-sm font-semibold transition-colors"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          Back
        </button>
      ) : (
        <div className="mb-6 h-11" aria-hidden="true" />
      )}

      <div key={stepKey} className="animate-fade-up">
        <h1
          ref={headingRef}
          id={headingId}
          tabIndex={-1}
          className="text-ink-900 text-[1.75rem] leading-tight font-extrabold outline-none sm:text-4xl"
        >
          {question}
        </h1>

        {helper ? (
          <p className="text-ink-500 mt-3 text-[1.0625rem] leading-relaxed">{helper}</p>
        ) : null}

        <div className="mt-8">
          {typeof children === 'function' ? children(headingId) : children}
        </div>

        {footer ? <div className="mt-8">{footer}</div> : null}
      </div>
    </div>
  );
}
