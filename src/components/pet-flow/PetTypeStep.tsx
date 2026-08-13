'use client';

import Image from 'next/image';
import { StepContainer } from '@/components/pet-flow/StepContainer';
import { CheckIcon } from '@/components/ui/Icons';
import { cn } from '@/lib/utils/cn';
import type { PetType } from '@/types';

/**
 * Pet type picker. Choosing a card advances immediately — no Continue button,
 * because the choice itself is the answer.
 */
export function PetTypeStep({
  petTypes,
  selected,
  onSelect,
  onBack,
}: {
  petTypes: PetType[];
  selected: PetType | null;
  onSelect: (petType: PetType) => void;
  onBack: () => void;
}) {
  return (
    <StepContainer
      stepKey="petType"
      question="Who needs a doctor? 🐾"
      helper="Pick the animal you're booking for. The next questions will match your choice."
      onBack={onBack}
      canGoBack
      wide
    >
      <ul className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 sm:gap-4">
        {petTypes.map((petType) => {
          const isSelected = selected?.slug === petType.slug;

          return (
            <li key={petType.id}>
              <button
                type="button"
                onClick={() => onSelect(petType)}
                aria-pressed={isSelected}
                className={cn(
                  'group rounded-card hover:shadow-lift relative w-full overflow-hidden border-2 bg-white text-left transition-all duration-200 hover:-translate-y-0.5 motion-reduce:hover:translate-y-0',
                  isSelected
                    ? 'shadow-lift border-teal-700'
                    : 'border-cream-300 shadow-soft hover:border-teal-400',
                )}
              >
                <span className="bg-cream-200 relative block aspect-4/3 overflow-hidden">
                  <Image
                    src={petType.imageUrl}
                    alt=""
                    width={448}
                    height={448}
                    loading="lazy"
                    sizes="(min-width: 640px) 220px, 45vw"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none"
                  />
                  {isSelected ? (
                    <span className="text-cream-50 absolute top-2.5 right-2.5 flex h-7 w-7 items-center justify-center rounded-full bg-teal-700">
                      <CheckIcon className="h-4 w-4" strokeWidth={2.5} />
                    </span>
                  ) : null}
                </span>

                <span className="flex items-center justify-between gap-2 px-4 py-3.5">
                  <span className="text-ink-900 text-base font-bold">{petType.label}</span>
                  <span aria-hidden="true" className="text-lg">
                    {petType.emoji}
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </StepContainer>
  );
}
