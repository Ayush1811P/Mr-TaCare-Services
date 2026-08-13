'use client';

import Image from 'next/image';
import { useEffect, useId, useMemo, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { CheckIcon, SearchIcon } from '@/components/ui/Icons';
import { LoadingState } from '@/components/ui/States';
import { StepContainer } from '@/components/pet-flow/StepContainer';
import { getAllBreeds, getPopularBreeds } from '@/services/breeds';
import { breedQuestion } from '@/lib/utils/pet';
import { cn } from '@/lib/utils/cn';
import type { Breed, PetType } from '@/types';

/**
 * Breed picker.
 *
 * Popular breeds render as image cards on first paint. The full list is only
 * fetched when the user opens search, so the long tail never costs anything to
 * someone who picks a Labrador.
 */
export function BreedStep({
  petType,
  selected,
  onSubmit,
  onBack,
}: {
  petType: PetType;
  selected: Breed | null;
  onSubmit: (breed: Breed | null, skipped: boolean) => void;
  onBack: () => void;
}) {
  const searchId = useId();
  const [popular, setPopular] = useState<Breed[] | null>(null);
  const [allBreeds, setAllBreeds] = useState<Breed[] | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [loadingAll, setLoadingAll] = useState(false);

  useEffect(() => {
    let active = true;
    getPopularBreeds(petType.slug).then((breeds) => {
      if (active) setPopular(breeds);
    });
    return () => {
      active = false;
    };
  }, [petType.slug]);

  const openSearch = async () => {
    setSearchOpen(true);
    if (allBreeds) return;
    setLoadingAll(true);
    const breeds = await getAllBreeds(petType.slug);
    setAllBreeds(breeds);
    setLoadingAll(false);
  };

  const results = useMemo(() => {
    if (!allBreeds) return [];
    const needle = query.trim().toLowerCase();
    if (!needle) return allBreeds;
    return allBreeds.filter((breed) => breed.name.toLowerCase().includes(needle));
  }, [allBreeds, query]);

  const hasImages = popular?.some((breed) => breed.imageUrl);

  return (
    <StepContainer
      stepKey="breed"
      question={breedQuestion(petType)}
      helper="Not sure? Pick “Mixed / Not sure” — it won't change what we show you."
      onBack={onBack}
      canGoBack
      wide
    >
      {popular === null ? (
        <LoadingState title="Loading breeds..." />
      ) : (
        <>
          {!searchOpen ? (
            <>
              <ul
                className={cn(
                  'grid gap-3.5',
                  hasImages ? 'grid-cols-2 sm:grid-cols-4' : 'grid-cols-1 sm:grid-cols-2',
                )}
              >
                {popular.map((breed) => {
                  const isSelected = selected?.slug === breed.slug;

                  return (
                    <li key={breed.id}>
                      <button
                        type="button"
                        onClick={() => onSubmit(breed, false)}
                        aria-pressed={isSelected}
                        className={cn(
                          'group hover:shadow-lift w-full overflow-hidden rounded-2xl border-2 bg-white text-left transition-all duration-200 hover:-translate-y-0.5 motion-reduce:hover:translate-y-0',
                          isSelected
                            ? 'shadow-lift border-teal-700'
                            : 'border-cream-300 shadow-soft hover:border-teal-400',
                        )}
                      >
                        {breed.imageUrl ? (
                          <span className="bg-cream-200 relative block aspect-square overflow-hidden">
                            <Image
                              src={breed.imageUrl}
                              alt=""
                              width={512}
                              height={512}
                              loading="lazy"
                              sizes="(min-width: 640px) 170px, 45vw"
                              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none"
                            />
                            {isSelected ? (
                              <span className="text-cream-50 absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-teal-700">
                                <CheckIcon className="h-3.5 w-3.5" strokeWidth={3} />
                              </span>
                            ) : null}
                          </span>
                        ) : null}

                        <span className="flex min-h-12 items-center justify-between gap-2 px-3.5 py-2.5">
                          <span className="text-ink-900 text-sm font-bold">{breed.name}</span>
                          {!breed.imageUrl && isSelected ? (
                            <CheckIcon className="h-4 w-4 shrink-0 text-teal-700" strokeWidth={3} />
                          ) : null}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button type="button" variant="secondary" size="md" onClick={openSearch} fullWidth>
                  <SearchIcon className="h-4 w-4" />
                  Search all breeds
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="md"
                  fullWidth
                  onClick={() => onSubmit(null, true)}
                  className="border-cream-300 border"
                >
                  Mixed / Not sure
                </Button>
              </div>
            </>
          ) : (
            <>
              <label htmlFor={searchId} className="text-ink-700 mb-2 block text-sm font-semibold">
                Search breeds
              </label>
              <div className="relative">
                <SearchIcon className="text-ink-400 pointer-events-none absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2" />
                <input
                  id={searchId}
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder={`Start typing a ${petType.noun} breed`}
                  enterKeyHint="search"
                  autoFocus
                  className="border-cream-300 text-ink-900 placeholder:text-ink-400 min-h-14 w-full rounded-2xl border-2 bg-white pr-5 pl-12 text-lg outline-none focus:border-teal-600"
                />
              </div>

              {loadingAll ? (
                <LoadingState title="Loading breeds..." />
              ) : (
                <>
                  <p aria-live="polite" className="text-ink-400 mt-4 text-sm">
                    {results.length} {results.length === 1 ? 'breed' : 'breeds'} found
                  </p>

                  <ul className="mt-2 max-h-80 space-y-1.5 overflow-y-auto pr-1">
                    {results.map((breed) => (
                      <li key={breed.id}>
                        <button
                          type="button"
                          onClick={() => onSubmit(breed, false)}
                          className="border-cream-300 text-ink-800 flex min-h-13 w-full items-center rounded-xl border bg-white px-4 text-left text-[0.9375rem] font-semibold transition-colors hover:border-teal-400 hover:bg-teal-50"
                        >
                          {breed.name}
                        </button>
                      </li>
                    ))}
                  </ul>

                  {results.length === 0 ? (
                    <div className="bg-cream-100 mt-3 rounded-2xl px-4 py-6 text-center">
                      <p className="text-ink-600 text-[0.9375rem]">
                        No breed matches &ldquo;{query.trim()}&rdquo;.
                      </p>
                      <Button
                        type="button"
                        variant="secondary"
                        size="sm"
                        className="mt-4"
                        onClick={() => onSubmit(null, true)}
                      >
                        Continue with Mixed / Other
                      </Button>
                    </div>
                  ) : null}
                </>
              )}

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button
                  type="button"
                  variant="ghost"
                  size="md"
                  fullWidth
                  className="border-cream-300 border"
                  onClick={() => {
                    setSearchOpen(false);
                    setQuery('');
                  }}
                >
                  Back to popular breeds
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="md"
                  fullWidth
                  className="border-cream-300 border"
                  onClick={() => onSubmit(null, true)}
                >
                  Mixed / Not sure
                </Button>
              </div>
            </>
          )}
        </>
      )}
    </StepContainer>
  );
}
