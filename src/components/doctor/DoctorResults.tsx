'use client';

import Link from 'next/link';
import { useEffect, useState, type ReactNode } from 'react';
import { AppointmentSummary } from '@/components/whatsapp/AppointmentSummary';
import { DoctorCard } from '@/components/doctor/DoctorCard';
import { DemoDataNotice } from '@/components/layout/DemoDataNotice';
import { useFlow } from '@/components/pet-flow/FlowProvider';
import { Button } from '@/components/ui/Button';
import { ArrowLeftIcon, PinIcon, WhatsAppIcon } from '@/components/ui/Icons';
import { DoctorCardSkeleton, EmptyState, ErrorState } from '@/components/ui/States';
import { DEFAULT_RADIUS_KM, nextRadius, searchDoctors } from '@/services/doctors';
import { buildSupportWhatsAppUrl } from '@/lib/utils/whatsapp';
import { siteConfig } from '@/config/site';
import type { DoctorSearchResult } from '@/types';

type Status = 'idle' | 'loading' | 'success' | 'error';

/**
 * Personalised results for a completed flow.
 *
 * Rendered client-side because it depends on session-only answers. The
 * crawlable, server-rendered directory lives at /doctors for visitors who
 * arrive without a flow — see the page component.
 */
export function DoctorResults({ children }: { children: ReactNode }) {
  const { state, isReady } = useFlow();
  const [status, setStatus] = useState<Status>('loading');
  const [results, setResults] = useState<DoctorSearchResult[]>([]);
  const [radiusKm, setRadiusKm] = useState<number>(DEFAULT_RADIUS_KM);
  const [retryToken, setRetryToken] = useState(0);
  const [selected, setSelected] = useState<DoctorSearchResult | null>(null);

  const { location, petType, petName } = state;
  const petTypeSlug = petType?.slug;
  const latitude = location?.latitude;
  const longitude = location?.longitude;

  /*
   * The search is driven entirely by its inputs: change the radius or retry
   * and the effect re-runs. State is only written after the await, never
   * synchronously in the effect body, which keeps renders from cascading.
   */
  useEffect(() => {
    if (!isReady || latitude === undefined || longitude === undefined) return;

    let cancelled = false;

    void (async () => {
      try {
        const found = await searchDoctors({
          origin: { latitude, longitude },
          radiusKm,
          petTypeSlug,
        });
        if (cancelled) return;
        setResults(found);
        setStatus('success');
      } catch {
        if (!cancelled) setStatus('error');
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [isReady, latitude, longitude, petTypeSlug, radiusKm, retryToken]);

  const expandRadius = () => {
    const next = nextRadius(radiusKm);
    if (!next) return;
    setStatus('loading');
    setRadiusKm(next);
  };

  const retry = () => {
    setStatus('loading');
    setRetryToken((token) => token + 1);
  };

  /*
   * Until hydration resolves, and for anyone who has not completed the flow,
   * the server-rendered prompt passed as children stands. Keeping that exact
   * markup in the initial HTML is what keeps CLS at zero here.
   */
  if (!isReady || !location || !petType) {
    return <>{children}</>;
  }

  const heading = petName
    ? `Let's find a doctor for ${petName}. 🐾`
    : 'Veterinary doctors near you';

  return (
    <>
      <div className="mb-6">
        <Link
          href="/find-a-doctor"
          className="text-ink-500 hover:bg-cream-200/70 hover:text-ink-800 inline-flex min-h-11 items-center gap-2 rounded-full px-3 text-sm font-semibold transition-colors"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          Change details
        </Link>
      </div>

      <h2 className="text-ink-900 text-2xl font-extrabold sm:text-3xl">{heading}</h2>
      <p className="text-ink-500 mt-3 flex flex-wrap items-center gap-x-2 gap-y-1">
        <PinIcon className="h-[1.15rem] w-[1.15rem] text-teal-600" />
        <span>Based on your location — {location.label}</span>
        <span aria-hidden="true" className="text-cream-300">
          •
        </span>
        <span>within {radiusKm} km</span>
      </p>

      {siteConfig.isDemoData ? <DemoDataNotice className="mt-6" /> : null}

      <div className="mt-8">
        {status === 'loading' ? (
          <>
            <p
              role="status"
              aria-live="polite"
              className="text-ink-900 mb-5 text-base font-semibold"
            >
              Finding doctors near you...
            </p>
            <div className="space-y-4">
              <DoctorCardSkeleton />
              <DoctorCardSkeleton />
              <DoctorCardSkeleton />
            </div>
          </>
        ) : null}

        {status === 'error' ? (
          <ErrorState
            title="We couldn't load doctors just now"
            description="Something went wrong on our side. Please try again in a moment."
          >
            <Button type="button" onClick={retry}>
              Try again
            </Button>
          </ErrorState>
        ) : null}

        {status === 'success' && results.length === 0 ? (
          <EmptyState
            title="We couldn't find a nearby doctor right now."
            description={`No veterinary doctors matched within ${radiusKm} km of ${location.label}. Widening the search usually helps.`}
          >
            {nextRadius(radiusKm) ? (
              <Button type="button" onClick={expandRadius}>
                Search within {nextRadius(radiusKm)} km
              </Button>
            ) : null}
            <Link
              href="/find-a-doctor"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-teal-700/25 bg-white px-6 font-semibold text-teal-800 transition-colors hover:bg-teal-50"
            >
              Enter another location
            </Link>
            <a
              href={buildSupportWhatsAppUrl(
                `Hi ${siteConfig.name}, I couldn't find a veterinary doctor near ${location.label}. Can you help?`,
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-teal-700/25 bg-white px-6 font-semibold text-teal-800 transition-colors hover:bg-teal-50"
            >
              <WhatsAppIcon className="h-4 w-4" />
              Ask us for help
            </a>
          </EmptyState>
        ) : null}

        {status === 'success' && results.length > 0 ? (
          <>
            <p aria-live="polite" className="text-ink-500 mb-5 text-sm font-medium">
              {results.length} {results.length === 1 ? 'doctor' : 'doctors'} found near you
            </p>

            <ul className="space-y-4">
              {results.map((doctor) => (
                <li key={doctor.id}>
                  <DoctorCard
                    doctor={doctor}
                    distanceKm={doctor.distanceKm}
                    headingLevel="h3"
                    action={
                      <button
                        type="button"
                        onClick={() => setSelected(doctor)}
                        className="shadow-soft bg-whatsapp hover:bg-whatsapp-hover inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full px-6 text-[0.975rem] font-semibold text-white transition-colors"
                      >
                        <WhatsAppIcon className="h-5 w-5" />
                        Book via WhatsApp
                      </button>
                    }
                  />
                </li>
              ))}
            </ul>

            {nextRadius(radiusKm) ? (
              <div className="mt-8 text-center">
                <Button type="button" variant="secondary" onClick={expandRadius}>
                  Widen search to {nextRadius(radiusKm)} km
                </Button>
              </div>
            ) : null}
          </>
        ) : null}
      </div>

      {selected ? (
        <AppointmentSummary
          doctor={selected}
          customerName={state.customerName}
          mobile={state.mobile}
          petType={petType}
          petName={state.petName}
          breed={state.breed}
          breedSkipped={state.breedSkipped}
          ageYears={state.ageYears}
          ageMonths={state.ageMonths}
          location={location}
          onClose={() => setSelected(null)}
        />
      ) : null}
    </>
  );
}
