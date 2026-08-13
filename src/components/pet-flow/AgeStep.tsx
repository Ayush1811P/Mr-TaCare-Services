'use client';

import { useId, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { StepContainer } from '@/components/pet-flow/StepContainer';
import { ageQuestion, formatPetAge } from '@/lib/utils/pet';
import { clamp } from '@/lib/utils/validation';
import { cn } from '@/lib/utils/cn';
import type { PetType } from '@/types';

/**
 * Age selector.
 *
 * Shortcut chips cover the common answers in one tap; the year/month steppers
 * handle everything else. Both write to the same state, and the live summary
 * confirms the result in words.
 */

const shortcuts = [
  { label: 'Under 6 months', years: 0, months: 3 },
  { label: '6–12 months', years: 0, months: 9 },
  { label: '1–2 years', years: 1, months: 6 },
  { label: '3–5 years', years: 4, months: 0 },
  { label: '6–8 years', years: 7, months: 0 },
  { label: '9+ years (senior)', years: 9, months: 0 },
] as const;

function Stepper({
  label,
  value,
  min,
  max,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
}) {
  const id = useId();

  return (
    <div className="border-cream-300 flex-1 rounded-2xl border-2 bg-white p-4">
      <label htmlFor={id} className="text-ink-700 block text-sm font-semibold">
        {label}
      </label>
      <div className="mt-2.5 flex items-center gap-2">
        <button
          type="button"
          onClick={() => onChange(clamp(value - 1, min, max))}
          disabled={value <= min}
          className="border-cream-300 text-ink-700 hover:bg-cream-100 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border text-xl font-bold transition-colors disabled:opacity-40"
        >
          <span aria-hidden="true">−</span>
          <span className="sr-only">Decrease {label}</span>
        </button>

        <input
          id={id}
          type="number"
          inputMode="numeric"
          value={value}
          min={min}
          max={max}
          onChange={(event) => onChange(clamp(Number(event.target.value) || 0, min, max))}
          className="bg-cream-50 text-ink-900 min-h-11 w-full [appearance:textfield] rounded-xl border border-transparent text-center text-xl font-bold outline-none focus:border-teal-600 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />

        <button
          type="button"
          onClick={() => onChange(clamp(value + 1, min, max))}
          disabled={value >= max}
          className="border-cream-300 text-ink-700 hover:bg-cream-100 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border text-xl font-bold transition-colors disabled:opacity-40"
        >
          <span aria-hidden="true">+</span>
          <span className="sr-only">Increase {label}</span>
        </button>
      </div>
    </div>
  );
}

export function AgeStep({
  petType,
  initialYears,
  initialMonths,
  onSubmit,
  onBack,
}: {
  petType: PetType;
  initialYears: number;
  initialMonths: number;
  onSubmit: (years: number, months: number) => void;
  onBack: () => void;
}) {
  const [years, setYears] = useState(initialYears);
  const [months, setMonths] = useState(initialMonths);
  const [touched, setTouched] = useState(initialYears > 0 || initialMonths > 0);

  const applyShortcut = (y: number, m: number) => {
    setYears(y);
    setMonths(m);
    setTouched(true);
  };

  const activeShortcut = shortcuts.find((s) => s.years === years && s.months === months);

  return (
    <StepContainer
      stepKey="age"
      question={ageQuestion(petType)}
      helper="An approximate age is fine — it helps the doctor prepare."
      onBack={onBack}
      canGoBack
      wide
    >
      <fieldset>
        <legend className="text-ink-700 mb-3 text-sm font-semibold">Quick pick</legend>
        <div className="flex flex-wrap gap-2.5">
          {shortcuts.map((shortcut) => {
            const isActive = activeShortcut?.label === shortcut.label;
            return (
              <button
                key={shortcut.label}
                type="button"
                onClick={() => applyShortcut(shortcut.years, shortcut.months)}
                aria-pressed={isActive}
                className={cn(
                  'inline-flex min-h-11 items-center gap-1.5 rounded-full border-2 px-4 text-sm font-semibold transition-colors',
                  isActive
                    ? 'text-cream-50 border-teal-700 bg-teal-700'
                    : 'border-cream-300 text-ink-700 bg-white hover:border-teal-400 hover:bg-teal-50',
                )}
              >
                {isActive ? <span aria-hidden="true">✓</span> : null}
                {shortcut.label}
              </button>
            );
          })}
        </div>
      </fieldset>

      <fieldset className="mt-7">
        <legend className="text-ink-700 mb-3 text-sm font-semibold">Or set it exactly</legend>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Stepper
            label="Years"
            value={years}
            min={0}
            max={30}
            onChange={(v) => {
              setYears(v);
              setTouched(true);
            }}
          />
          <Stepper
            label="Months"
            value={months}
            min={0}
            max={11}
            onChange={(v) => {
              setMonths(v);
              setTouched(true);
            }}
          />
        </div>
      </fieldset>

      <p className="bg-cream-100 text-ink-600 mt-5 rounded-2xl px-4 py-3 text-center text-[0.9375rem] font-medium">
        <span aria-live="polite">
          {touched ? (
            <>
              Your {petType.noun} is{' '}
              <strong className="text-ink-900 font-bold">{formatPetAge(years, months)}</strong>
            </>
          ) : (
            'Choose a quick pick or set the exact age'
          )}
        </span>
      </p>

      <Button
        type="button"
        size="lg"
        fullWidth
        className="mt-6"
        disabled={!touched}
        onClick={() => onSubmit(years, months)}
      >
        Continue
      </Button>
    </StepContainer>
  );
}
