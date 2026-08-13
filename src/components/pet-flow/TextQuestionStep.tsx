'use client';

import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { Button } from '@/components/ui/Button';
import { FieldError } from '@/components/ui/States';
import { StepContainer } from '@/components/pet-flow/StepContainer';
import type { ValidationResult } from '@/lib/utils/validation';

/**
 * Shared single-text-input step (customer name, pet name).
 *
 * Validation runs on submit rather than keystroke, so the user is never
 * scolded mid-typing; the error is then wired up via aria-describedby.
 */
export function TextQuestionStep({
  stepKey,
  question,
  helper,
  label,
  placeholder,
  initialValue,
  autoComplete,
  validate,
  onSubmit,
  onBack,
  canGoBack,
  submitLabel = 'Continue',
}: {
  stepKey: string;
  question: string;
  helper?: ReactNode;
  label: string;
  placeholder: string;
  initialValue: string;
  autoComplete?: string;
  validate: (value: string) => ValidationResult;
  onSubmit: (value: string) => void;
  onBack: () => void;
  canGoBack: boolean;
  submitLabel?: string;
}) {
  const inputId = useId();
  const errorId = `${inputId}-error`;
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState<string | null>(null);

  // Focus the field on step change; StepContainer yields the heading to us.
  useEffect(() => {
    inputRef.current?.focus();
  }, [stepKey]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const result = validate(value);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    setError(null);
    onSubmit(result.value);
  };

  return (
    <StepContainer
      stepKey={stepKey}
      question={question}
      helper={helper}
      onBack={onBack}
      canGoBack={canGoBack}
      focusHeading={false}
    >
      {(headingId) => (
        <form onSubmit={handleSubmit} noValidate>
          <label htmlFor={inputId} className="text-ink-700 mb-2 block text-sm font-semibold">
            {label}
          </label>
          <input
            ref={inputRef}
            id={inputId}
            name={inputId}
            type="text"
            value={value}
            onChange={(event) => {
              setValue(event.target.value);
              if (error) setError(null);
            }}
            placeholder={placeholder}
            autoComplete={autoComplete}
            autoCapitalize="words"
            enterKeyHint="next"
            maxLength={60}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? `${headingId} ${errorId}` : headingId}
            className="border-cream-300 text-ink-900 placeholder:text-ink-400 aria-[invalid=true]:border-danger-600 min-h-14 w-full rounded-2xl border-2 bg-white px-5 text-lg transition-colors outline-none focus:border-teal-600"
          />

          {error ? <FieldError id={errorId}>{error}</FieldError> : null}

          <Button type="submit" size="lg" fullWidth className="mt-6">
            {submitLabel}
          </Button>
        </form>
      )}
    </StepContainer>
  );
}
