import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { ClockIcon, PinIcon, ShieldCheckIcon } from '@/components/ui/Icons';
import { formatDistance } from '@/lib/utils/geo';
import type { Doctor } from '@/types';

/**
 * Doctor listing card.
 *
 * Presentational and server-renderable; the booking CTA is injected so the
 * same card works in the crawlable list and in personalised results.
 *
 * Note what is absent: no rating, no "available at 6:30 PM", no
 * "appointment guaranteed". The product has no availability feed, so it makes
 * no availability claims.
 */
export function DoctorCard({
  doctor,
  distanceKm,
  action,
  headingLevel: Heading = 'h3',
}: {
  doctor: Doctor;
  distanceKm?: number;
  action: ReactNode;
  headingLevel?: 'h2' | 'h3';
}) {
  return (
    <article className="rounded-card border-cream-300/70 shadow-soft hover:shadow-lift border bg-white p-5 transition-shadow sm:p-6">
      <div className="flex gap-4">
        <Image
          src={doctor.imageUrl}
          alt={`Portrait of ${doctor.name}`}
          width={384}
          height={384}
          loading="lazy"
          sizes="80px"
          className="bg-cream-200 h-20 w-20 shrink-0 rounded-2xl object-cover sm:h-22 sm:w-22"
        />

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <Heading className="text-ink-900 text-lg font-bold sm:text-xl">
              <Link
                href={`/doctors/${doctor.slug}`}
                className="rounded transition-colors hover:text-teal-700"
              >
                {doctor.name}
              </Link>
            </Heading>

            {doctor.isVerified ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-teal-50 px-2.5 py-1 text-xs font-bold text-teal-700">
                <ShieldCheckIcon className="h-3.5 w-3.5" />
                Verified
              </span>
            ) : null}
          </div>

          <p className="text-ink-500 mt-0.5 text-sm">Veterinary Doctor · {doctor.qualifications}</p>

          <p className="text-ink-800 mt-2 text-[0.9375rem] font-semibold">{doctor.clinic.name}</p>

          <p className="text-ink-500 mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
            <span className="inline-flex items-center gap-1.5">
              <PinIcon className="text-ink-400 h-4 w-4 shrink-0" />
              {doctor.clinic.locality}, {doctor.clinic.city}
            </span>
            {typeof distanceKm === 'number' ? (
              <>
                <span aria-hidden="true" className="text-cream-300">
                  •
                </span>
                <span className="font-semibold text-teal-700">{formatDistance(distanceKm)}</span>
              </>
            ) : null}
          </p>
        </div>
      </div>

      <div className="border-cream-200 mt-4 border-t pt-4">
        <h4 className="sr-only">Services offered by {doctor.name}</h4>
        <ul className="flex flex-wrap gap-1.5">
          {doctor.services.slice(0, 4).map((service) => (
            <li
              key={service.id}
              className="bg-cream-100 text-ink-600 rounded-full px-3 py-1.5 text-xs font-semibold"
            >
              {service.name}
            </li>
          ))}
        </ul>

        <p className="mt-3.5 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-sm">
          {doctor.isVerified && typeof doctor.consultationFee === 'number' ? (
            <span className="text-ink-800 font-semibold">
              Consultation from ₹{doctor.consultationFee}
            </span>
          ) : null}
          <span className="text-ink-500 inline-flex items-center gap-1.5">
            <ClockIcon className="text-ink-400 h-4 w-4 shrink-0" />
            Contact doctor for appointment availability
          </span>
        </p>
      </div>

      <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
        {action}
        <Link
          href={`/doctors/${doctor.slug}`}
          className="inline-flex min-h-12 items-center justify-center rounded-full border border-teal-700/25 bg-white px-6 text-[0.975rem] font-semibold text-teal-800 transition-colors hover:border-teal-700/50 hover:bg-teal-50"
        >
          View Profile
        </Link>
      </div>
    </article>
  );
}
