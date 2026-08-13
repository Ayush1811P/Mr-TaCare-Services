'use client';

import { useState } from 'react';
import { AppointmentSummary } from '@/components/whatsapp/AppointmentSummary';
import { useFlow } from '@/components/pet-flow/FlowProvider';
import { Button, ButtonLink } from '@/components/ui/Button';
import { WhatsAppIcon } from '@/components/ui/Icons';
import { buildWhatsAppUrl } from '@/lib/utils/whatsapp';
import { siteConfig } from '@/config/site';
import type { Doctor } from '@/types';

/**
 * Profile-page booking CTA.
 *
 * If the visitor already completed the flow, their details are reused and the
 * review screen opens straight away. Otherwise it degrades to a plain
 * introduction message — still user-initiated, still nothing sent silently.
 */
export function DoctorWhatsAppButton({ doctor }: { doctor: Doctor }) {
  const { state } = useFlow();
  const [reviewOpen, setReviewOpen] = useState(false);

  const hasFlowDetails = Boolean(
    state.customerName && state.mobile && state.petType && state.petName,
  );

  if (!hasFlowDetails) {
    const fallbackMessage = `Hi ${doctor.name.replace(/^Dr\.?\s*/i, 'Dr. ')},\n\nI found your veterinary service through ${siteConfig.name} and would like to request an appointment for my pet.\n\nPlease let me know your availability.`;

    return (
      <div className="flex flex-col gap-2.5 sm:flex-row">
        <ButtonLink
          href={buildWhatsAppUrl(doctor.whatsappNumber, fallbackMessage)}
          external
          variant="whatsapp"
          size="lg"
          fullWidth
        >
          <WhatsAppIcon className="h-5 w-5" />
          Book Appointment via WhatsApp
        </ButtonLink>
        <ButtonLink href="/find-a-doctor" variant="secondary" size="lg" fullWidth>
          Add my pet&apos;s details first
        </ButtonLink>
      </div>
    );
  }

  return (
    <>
      <Button
        type="button"
        variant="whatsapp"
        size="lg"
        fullWidth
        onClick={() => setReviewOpen(true)}
      >
        <WhatsAppIcon className="h-5 w-5" />
        Book Appointment via WhatsApp
      </Button>

      {reviewOpen && state.petType ? (
        <AppointmentSummary
          doctor={doctor}
          customerName={state.customerName}
          mobile={state.mobile}
          petType={state.petType}
          petName={state.petName}
          breed={state.breed}
          breedSkipped={state.breedSkipped}
          ageYears={state.ageYears}
          ageMonths={state.ageMonths}
          location={state.location}
          onClose={() => setReviewOpen(false)}
        />
      ) : null}
    </>
  );
}
