'use client';

import { useState } from 'react';
import { AppointmentSummary } from '@/components/whatsapp/AppointmentSummary';
import { useFlow } from '@/components/pet-flow/FlowProvider';
import { Button, ButtonLink } from '@/components/ui/Button';
import { WhatsAppIcon } from '@/components/ui/Icons';
import { buildWhatsAppUrl } from '@/lib/utils/whatsapp';
import { siteConfig } from '@/config/site';
import type { Doctor } from '@/types';

import { createAppointmentRequest, markWhatsAppOpened } from '@/services/appointmentRequests';

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
  const [submittingAnonymous, setSubmittingAnonymous] = useState(false);

  const hasFlowDetails = Boolean(
    state.customerName && state.mobile && state.petType && state.petName,
  );

  if (!hasFlowDetails) {
    const fallbackMessage = `Hi ${doctor.name.replace(/^Dr\.?\s*/i, 'Dr. ')},\n\nI found your veterinary service through ${siteConfig.name} and would like to request an appointment for my pet.\n\nPlease let me know your availability.`;

    const handleAnonymousBooking = async () => {
      setSubmittingAnonymous(true);
      const url = buildWhatsAppUrl(doctor.whatsappNumber, fallbackMessage);
      const popup = window.open('about:blank', '_blank');

      try {
        const record = await createAppointmentRequest({
          customerName: 'Anonymous',
          customerMobile: '+910000000000',
          petName: 'Unknown',
          petType: 'OTHER',
          doctorId: doctor.id,
          clinicId: doctor.clinic.id,
        });

        if (popup) {
          popup.location.href = url;
        } else {
          const link = document.createElement('a');
          link.href = url;
          link.target = '_blank';
          link.rel = 'noopener noreferrer';
          document.body.appendChild(link);
          link.click();
          link.remove();
        }

        await markWhatsAppOpened(record.id);
      } catch (error) {
        // Fallback to just opening the URL if DB insert fails
        console.error('Failed to record anonymous appointment request:', error);
        if (popup) {
          popup.location.href = url;
        } else {
          window.open(url, '_blank', 'noopener,noreferrer');
        }
      } finally {
        setSubmittingAnonymous(false);
      }
    };

    return (
      <div className="flex flex-col gap-2.5 sm:flex-row">
        <Button
          type="button"
          onClick={handleAnonymousBooking}
          disabled={submittingAnonymous}
          variant="whatsapp"
          size="lg"
          fullWidth
        >
          <WhatsAppIcon className="h-5 w-5" />
          {submittingAnonymous ? 'Preparing...' : 'Book Appointment via WhatsApp'}
        </Button>
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
