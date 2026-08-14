'use client';

import { useId, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { PinIcon } from '@/components/ui/Icons';
import { FieldError, LoadingState } from '@/components/ui/States';
import { StepContainer } from '@/components/pet-flow/StepContainer';
import { GeolocationFailure, requestCurrentPosition } from '@/lib/location/geolocation';
import {
  describeCoordinates,
  resolveManualLocation,
  suggestLocalities,
} from '@/lib/location/resolve';
import { validateLocalityInput } from '@/lib/utils/validation';
import { defaultServiceArea } from '@/config/site';
import type { ResolvedLocation } from '@/types';

/**
 * Final step: location.
 *
 * Deliberately last — the pet details are collected before we ask for
 * permission, so the browser prompt arrives once the user is invested and
 * understands why it is needed. Any failure falls straight through to manual
 * entry; the user is never stuck.
 */
export function LocationStep({
  petName,
  onResolved,
  onBack,
  onStartOver,
}: {
  petName: string;
  onResolved: (location: ResolvedLocation) => void;
  onBack: () => void;
  onStartOver: () => void;
}) {
  const inputId = useId();
  const errorId = `${inputId}-error`;

  const [status, setStatus] = useState<'idle' | 'locating'>('idle');
  const [geoError, setGeoError] = useState<string | null>(null);
  const [manualOpen, setManualOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [manualError, setManualError] = useState<string | null>(null);

  const suggestions = suggestLocalities(query);

  const useCurrentLocation = async () => {
    setStatus('locating');
    setGeoError(null);
    try {
      const coords = await requestCurrentPosition();
      onResolved(describeCoordinates(coords));
    } catch (error) {
      const message =
        error instanceof GeolocationFailure
          ? error.message
          : 'We could not access your location. You can enter your sector manually instead.';
      setGeoError(message);
      setManualOpen(true);
      setStatus('idle');
    }
  };

  const submitManual = (value: string) => {
    const validation = validateLocalityInput(value);
    if (!validation.ok) {
      setManualError(validation.error);
      return;
    }

    const resolved = resolveManualLocation(validation.value);
    if (!resolved) {
      setManualError(
        `We don't cover that area yet. Try a ${defaultServiceArea.city} sector, for example “Sector 62”.`,
      );
      return;
    }

    setManualError(null);
    onResolved(resolved);
  };

  if (status === 'locating') {
    return (
      <StepContainer
        stepKey="location-loading"
        question="Finding your location..."
        helper="Please accept the location prompt from your browser."
        onBack={onBack}
        canGoBack={false}
      >
        <LoadingState
          title="Finding your location..."
          description="This usually takes a couple of seconds."
        />
      </StepContainer>
    );
  }

  return (
    <StepContainer
      stepKey="location"
      question="Find veterinary doctors near you 📍"
      helper={
        petName
          ? `We'll use your current location to find nearby veterinary doctors for ${petName}.`
          : "We'll use your current location to find nearby veterinary doctors."
      }
      onBack={onBack}
      canGoBack
    >
      <Button type="button" size="lg" fullWidth onClick={useCurrentLocation}>
        <PinIcon className="h-5 w-5" />
        Use My Current Location
      </Button>

      {geoError ? (
        <div
          role="alert"
          className="border-clay-300/70 bg-clay-50 mt-4 flex items-start gap-2.5 rounded-2xl border px-4 py-3.5"
        >
          <span aria-hidden="true" className="text-clay-600 mt-0.5">
            ⚠
          </span>
          <p className="text-ink-700 text-sm leading-relaxed">{geoError}</p>
        </div>
      ) : null}

      <p className="text-ink-400 mt-4 text-center text-sm">
        We only use your location to sort doctors by distance. It is never stored or shared.
      </p>

      {!manualOpen ? (
        <div className="border-cream-300 mt-6 border-t pt-6">
          <Button
            type="button"
            variant="ghost"
            size="md"
            fullWidth
            className="border-cream-300 border"
            onClick={() => setManualOpen(true)}
          >
            Enter location manually
          </Button>
        </div>
      ) : (
        <div className="border-cream-300 mt-6 border-t pt-6">
          <label htmlFor={inputId} className="text-ink-700 mb-2 block text-sm font-semibold">
            Sector, locality or city
          </label>
          <input
            id={inputId}
            type="text"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              if (manualError) setManualError(null);
            }}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault();
                submitManual(query);
              }
            }}
            placeholder={`e.g. Sector 62, ${defaultServiceArea.city}`}
            enterKeyHint="search"
            aria-invalid={manualError ? true : undefined}
            aria-describedby={manualError ? errorId : undefined}
            className="border-cream-300 text-ink-900 placeholder:text-ink-400 aria-[invalid=true]:border-danger-600 min-h-14 w-full rounded-2xl border-2 bg-white px-5 text-lg outline-none focus:border-teal-600"
          />

          {manualError ? <FieldError id={errorId}>{manualError}</FieldError> : null}

          {suggestions.length > 0 ? (
            <>
              <p className="text-ink-700 mt-5 mb-2.5 text-sm font-semibold">
                {query.trim() ? 'Matching areas' : `Popular areas in ${defaultServiceArea.city}`}
              </p>
              <ul className="flex flex-wrap gap-2">
                {suggestions.map((locality) => (
                  <li key={locality.label}>
                    <button
                      type="button"
                      onClick={() =>
                        onResolved({
                          ...locality.coordinates,
                          label: locality.label,
                          source: 'manual',
                          serviceAreaSlug: locality.serviceAreaSlug,
                        })
                      }
                      className="border-cream-300 text-ink-700 inline-flex min-h-11 items-center rounded-full border-2 bg-white px-4 text-sm font-semibold transition-colors hover:border-teal-400 hover:bg-teal-50"
                    >
                      {locality.label}
                    </button>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p className="text-ink-500 mt-4 text-sm">
              No matching area. We currently serve {defaultServiceArea.city},{' '}
              {defaultServiceArea.state}.
            </p>
          )}

          <Button
            type="button"
            size="lg"
            fullWidth
            className="mt-6"
            onClick={() => submitManual(query)}
          >
            Find doctors here
          </Button>
        </div>
      )}

      {/* Start Over Button */}
      <div className="mt-8 text-center">
        <button
          type="button"
          onClick={onStartOver}
          className="text-ink-500 hover:text-ink-800 text-sm font-semibold underline underline-offset-4 transition-colors"
        >
          Start Over
        </button>
      </div>
    </StepContainer>
  );
}
