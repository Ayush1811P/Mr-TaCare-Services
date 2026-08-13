'use client';

import { useEffect, useId, useRef, useState, type FormEvent } from 'react';
import { Button } from '@/components/ui/Button';
import { FieldError } from '@/components/ui/States';
import { StepContainer } from '@/components/pet-flow/StepContainer';
import {
  formatIndianMobile,
  normalizeIndianMobile,
  validateIndianMobile,
} from '@/lib/utils/validation';

/**
 * Mobile number step.
 *
 * India-only for now, so the +91 prefix is shown as a fixed, non-editable
 * affix rather than a country dropdown nobody needs to open. When more
 * countries are served this becomes a select and `dialCode` moves into state.
 */
export function MobileStep({
  initialValue,
  onSubmit,
  onBack,
}: {
  initialValue: string;
  onSubmit: (value: string) => void;
  onBack: () => void;
}) {
  const inputId = useId();
  const errorId = `${inputId}-error`;
  const hintId = `${inputId}-hint`;
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState(formatIndianMobile(initialValue));
  const [error, setError] = useState<string | null>(null);

  // Focus the field on mount; StepContainer yields the heading to us.
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const result = validateIndianMobile(value);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    setError(null);
    onSubmit(result.value);
  };

  return (
    <StepContainer
      stepKey="mobile"
      question="What's your mobile number? 📱"
      helper="The doctor will see this in your WhatsApp request so they can reach you back."
      onBack={onBack}
      canGoBack
      focusHeading={false}
    >
      {(headingId) => (
        <form onSubmit={handleSubmit} noValidate>
          <label htmlFor={inputId} className="text-ink-700 mb-2 block text-sm font-semibold">
            Mobile number
          </label>

          <div className="flex items-stretch gap-2.5">
            <span className="border-cream-300 bg-cream-100 text-ink-700 flex min-h-14 shrink-0 items-center gap-2 rounded-2xl border-2 px-4 text-lg font-semibold">
              <span aria-hidden="true">🇮🇳</span>
              <span>+91</span>
              <span className="sr-only">India country code plus ninety one</span>
            </span>

            <input
              ref={inputRef}
              id={inputId}
              name="mobile"
              type="tel"
              inputMode="numeric"
              value={value}
              onChange={(event) => {
                setValue(formatIndianMobile(normalizeIndianMobile(event.target.value)));
                if (error) setError(null);
              }}
              placeholder="98765 43210"
              autoComplete="tel-national"
              enterKeyHint="next"
              maxLength={11}
              aria-invalid={error ? true : undefined}
              aria-describedby={
                error ? `${headingId} ${errorId} ${hintId}` : `${headingId} ${hintId}`
              }
              className="border-cream-300 text-ink-900 placeholder:text-ink-400 aria-[invalid=true]:border-danger-600 min-h-14 w-full rounded-2xl border-2 bg-white px-5 text-lg tracking-wide transition-colors outline-none focus:border-teal-600"
            />
          </div>

          {error ? <FieldError id={errorId}>{error}</FieldError> : null}

          <p id={hintId} className="text-ink-400 mt-2.5 text-sm">
            10-digit Indian mobile number. We never call you — this is only shared in the message
            you send.
          </p>

          <Button type="submit" size="lg" fullWidth className="mt-6">
            Continue
          </Button>
        </form>
      )}
    </StepContainer>
  );
}
