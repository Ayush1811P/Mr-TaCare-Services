'use client';

import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { CloseIcon, WhatsAppIcon } from '@/components/ui/Icons';
import { ErrorState } from '@/components/ui/States';
import { createAppointmentRequest, markWhatsAppOpened } from '@/services/appointmentRequests';
import { buildAppointmentWhatsAppUrl } from '@/lib/utils/whatsapp';
import { formatPetAge } from '@/lib/utils/pet';
import type { Doctor, PetType, ResolvedLocation, Breed } from '@/types';

/**
 * Review screen shown before the WhatsApp handoff.
 *
 * Nothing is sent from here. Pressing "Continue to WhatsApp" records the
 * request through the service layer, then opens WhatsApp with the message
 * prefilled — the customer still has to press send inside WhatsApp.
 */

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5 py-2.5">
      <dt className="text-ink-500 text-sm font-medium">{label}</dt>
      <dd className="text-ink-900 text-right text-[0.9375rem] font-semibold">{value}</dd>
    </div>
  );
}

export function AppointmentSummary({
  doctor,
  customerName,
  mobile,
  petType,
  petName,
  breed,
  breedSkipped,
  ageYears,
  ageMonths,
  location,
  onClose,
}: {
  doctor: Doctor;
  customerName: string;
  mobile: string;
  petType: PetType;
  petName: string;
  breed: Breed | null;
  breedSkipped: boolean;
  ageYears: number;
  ageMonths: number;
  location: ResolvedLocation | null;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);
  const [opened, setOpened] = useState(false);

  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('');

  useEffect(() => {
    closeRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    const prevBodyOverflow = document.body.style.overflow;
    const prevHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = prevBodyOverflow;
      document.documentElement.style.overflow = prevHtmlOverflow;
    };
  }, [onClose]);

  const breedLabel = breedSkipped ? 'Mixed / Not sure' : (breed?.name ?? 'Not specified');
  const mobileE164 = `+91${mobile}`;
  const today = new Date().toISOString().split('T')[0];

  const handleContinue = async () => {
    setSubmitting(true);
    setError(false);

    // Open the window synchronously to bypass async popup blockers
    const popup = window.open('about:blank', '_blank');

    try {
      // Referral record created before handoff, via the service layer.
      const record = await createAppointmentRequest({
        customerName,
        customerMobile: mobileE164,
        petName,
        petType: petType.slug.toUpperCase(),
        breed: breedSkipped ? undefined : breed?.name,
        ageYears,
        ageMonths,
        doctorId: doctor.id,
        clinicId: doctor.clinic.id,
        latitude: location?.latitude,
        longitude: location?.longitude,
        preferredDate: preferredDate || undefined,
        preferredTime: preferredTime || undefined,
      });

      const url = buildAppointmentWhatsAppUrl({
        doctor,
        customerName,
        customerMobileE164: mobileE164,
        petName,
        petTypeLabel: petType.label,
        breedName: breedSkipped ? undefined : breed?.name,
        ageYears,
        ageMonths,
        preferredDate: preferredDate || undefined,
        preferredTime: preferredTime || undefined,
      });

      if (popup) {
        popup.location.href = url;
      } else {
        // Fallback if synchronous popup was still blocked
        const link = document.createElement('a');
        link.href = url;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        document.body.appendChild(link);
        link.click();
        link.remove();
      }

      await markWhatsAppOpened(record.id);
      setOpened(true);
      setSubmitting(false);
    } catch {
      if (popup) popup.close();
      setError(true);
      setSubmitting(false);
    }
  };

  const whatsappUrl = buildAppointmentWhatsAppUrl({
    doctor,
    customerName,
    customerMobileE164: mobileE164,
    petName,
    petTypeLabel: petType.label,
    breedName: breedSkipped ? undefined : breed?.name,
    ageYears,
    ageMonths,
    preferredDate: preferredDate || undefined,
    preferredTime: preferredTime || undefined,
  });

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      <button
        type="button"
        aria-label="Close review"
        tabIndex={-1}
        onClick={onClose}
        className="bg-ink-900/45 animate-fade-in absolute inset-0 h-full w-full cursor-default"
      />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="review-title"
        className="bg-cream-50 shadow-lift animate-fade-up overscroll-contain relative max-h-[92dvh] w-full overflow-y-auto rounded-t-3xl p-6 sm:max-w-lg sm:rounded-3xl sm:p-7"
      >
        <div className="flex items-start justify-between gap-4">
          <h2 id="review-title" className="text-ink-900 text-xl font-extrabold sm:text-2xl">
            Review your appointment request
          </h2>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="text-ink-500 hover:bg-cream-200 hover:text-ink-900 -mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-colors"
          >
            <CloseIcon className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </button>
        </div>

        {error ? (
          <div className="mt-5">
            <ErrorState
              title="We couldn't prepare your request"
              description="Something went wrong on our side. You can still open WhatsApp directly with the link below."
            >
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-whatsapp hover:bg-whatsapp-hover inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 font-semibold text-white transition-colors"
              >
                <WhatsAppIcon className="h-5 w-5" />
                Open WhatsApp directly
              </a>
            </ErrorState>
          </div>
        ) : null}

        {opened ? (
          <div
            role="status"
            className="mt-5 rounded-2xl border border-teal-200 bg-teal-50 px-4 py-3.5"
          >
            <p className="text-sm leading-relaxed text-teal-900">
              <strong className="font-bold">WhatsApp is open in a new tab.</strong> Send the message
              to {doctor.name} to request your appointment. Your appointment is confirmed only once
              the doctor replies.
            </p>
            {/* Safety net: if the tab was blocked, this link still works. */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block text-sm font-semibold text-teal-800 underline underline-offset-4 hover:text-teal-900"
            >
              Didn&apos;t open? Tap here instead
            </a>
          </div>
        ) : null}

        <dl className="divide-cream-300/70 mt-6 divide-y rounded-2xl bg-white px-5 py-1">
          <Row label="Owner" value={customerName} />
          <Row label="Mobile" value={mobileE164} />
          <Row label="Pet" value={petName} />
          <Row label="Type" value={petType.label} />
          <Row label="Breed" value={breedLabel} />
          <Row label="Age" value={formatPetAge(ageYears, ageMonths)} />
          <Row label="Doctor" value={doctor.name} />
          <Row label="Clinic" value={doctor.clinic.name} />
          <Row label="Location" value={`${doctor.clinic.locality}, ${doctor.clinic.city}`} />
        </dl>

        <fieldset className="mt-5">
          <legend className="text-ink-700 mb-2.5 text-sm font-semibold">
            Preferred appointment <span className="text-ink-400 font-normal">(optional)</span>
          </legend>
          <div className="flex flex-col gap-2.5 sm:flex-row">
            <div className="flex-1">
              <label
                htmlFor="preferred-date"
                className="text-ink-500 mb-1.5 block text-xs font-medium"
              >
                Date
              </label>
              <input
                id="preferred-date"
                type="date"
                min={today}
                value={preferredDate}
                onChange={(event) => setPreferredDate(event.target.value)}
                className="border-cream-300 text-ink-900 min-h-12 w-full rounded-xl border-2 bg-white px-3.5 text-[0.9375rem] outline-none focus:border-teal-600"
              />
            </div>
            <div className="flex-1">
              <label
                htmlFor="preferred-time"
                className="text-ink-500 mb-1.5 block text-xs font-medium"
              >
                Time
              </label>
              <input
                id="preferred-time"
                type="time"
                value={preferredTime}
                onChange={(event) => setPreferredTime(event.target.value)}
                className="border-cream-300 text-ink-900 min-h-12 w-full rounded-xl border-2 bg-white px-3.5 text-[0.9375rem] outline-none focus:border-teal-600"
              />
            </div>
          </div>
        </fieldset>

        <p className="text-ink-500 mt-5 text-sm leading-relaxed">
          We&apos;ll open WhatsApp with your appointment request already prepared. You send it
          yourself — {doctor.name} confirms availability directly with you.
        </p>

        <Button
          type="button"
          variant="whatsapp"
          size="lg"
          fullWidth
          className="mt-5"
          disabled={submitting}
          onClick={handleContinue}
        >
          <WhatsAppIcon className="h-5 w-5" />
          {submitting ? 'Preparing your request...' : 'Continue to WhatsApp'}
        </Button>

        <button
          type="button"
          onClick={onClose}
          className="text-ink-500 hover:bg-cream-200 hover:text-ink-800 mt-3 min-h-11 w-full rounded-full text-sm font-semibold transition-colors"
        >
          {opened ? 'Done' : 'Cancel'}
        </button>
      </div>
    </div>
  );
}
