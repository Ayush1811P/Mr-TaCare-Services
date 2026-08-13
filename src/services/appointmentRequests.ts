import { appointmentRequestRepository } from '@/repositories/appointmentRequestRepository';
import type { AppointmentRequest, AppointmentRequestRecord } from '@/types';

/**
 * Appointment request lifecycle.
 *
 * A request is created with status REQUESTED just before the WhatsApp handoff,
 * then moved to WHATSAPP_OPENED once the user actually opens the chat.
 *
 * Neither status means the appointment is confirmed. Confirmation can only
 * come from the doctor, and this product has no channel to receive it, so no
 * part of the UI may ever claim it.
 */

export async function createAppointmentRequest(
  request: Omit<AppointmentRequest, 'status'>,
): Promise<AppointmentRequestRecord> {
  return appointmentRequestRepository.create({ ...request, status: 'REQUESTED' });
}

export async function markWhatsAppOpened(requestId: string): Promise<void> {
  return appointmentRequestRepository.updateStatus(requestId, 'WHATSAPP_OPENED');
}
