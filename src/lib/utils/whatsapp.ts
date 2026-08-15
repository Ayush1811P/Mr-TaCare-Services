import { siteConfig } from '@/config/site';
import { formatPetAge } from '@/lib/utils/pet';
import { sanitizeText } from '@/lib/utils/validation';
import type { Doctor } from '@/types';

/**
 * WhatsApp deep-link construction.
 *
 * The site never sends a message. It builds a wa.me URL with a prefilled body
 * and the customer presses send inside WhatsApp themselves.
 */

export type AppointmentMessageInput = {
  doctor: Doctor;
  customerName: string;
  customerMobileE164: string;
  petName: string;
  petTypeLabel: string;
  breedName?: string;
  ageYears: number;
  ageMonths: number;
  preferredDate?: string;
  preferredTime?: string;
};

/** Strips everything but digits — wa.me requires a bare E.164 number. */
function toWaNumber(raw: string): string {
  return raw.replace(/\D/g, '');
}

/** First name only, so the greeting reads naturally. */
function greetingName(doctorName: string): string {
  const withoutTitle = doctorName.replace(/^Dr\.?\s*/i, '').trim();
  const first = withoutTitle.split(' ')[0];
  return first ? `Dr. ${first}` : doctorName;
}

export function buildAppointmentMessage(input: AppointmentMessageInput): string {
  const lines: string[] = [
    `Hi ${greetingName(input.doctor.name)},`,
    '',
    `I found your veterinary service through ${siteConfig.name} and would like to request an appointment.`,
    '',
    `Owner: ${input.customerName}`,
    `Mobile: ${input.customerMobileE164}`,
    `Pet: ${input.petName}`,
    `Type: ${input.petTypeLabel}`,
  ];

  if (input.breedName) lines.push(`Breed: ${input.breedName}`);
  lines.push(`Age: ${formatPetAge(input.ageYears, input.ageMonths)}`);

  if (input.preferredDate || input.preferredTime) {
    lines.push('');
    if (input.preferredDate) lines.push(`Preferred date: ${input.preferredDate}`);
    if (input.preferredTime) lines.push(`Preferred time: ${input.preferredTime}`);
  }

  lines.push('', 'Please let me know your availability.');

  return sanitizeText(lines.join('\n'));
}

/**
 * Builds the wa.me URL. Uses the URL API so the message is encoded correctly
 * and no user input can break out of the query string.
 */
export function buildWhatsAppUrl(phone: string, message: string): string {
  const number = toWaNumber(phone);
  const url = new URL(`https://api.whatsapp.com/send`);
  url.searchParams.set('phone', number);
  url.searchParams.set('text', message);
  return url.toString();
}

export function buildAppointmentWhatsAppUrl(input: AppointmentMessageInput): string {
  return buildWhatsAppUrl(input.doctor.whatsappNumber, buildAppointmentMessage(input));
}

/** Support link used on the contact page and empty states. */
export function buildSupportWhatsAppUrl(message: string): string {
  return buildWhatsAppUrl(siteConfig.supportWhatsApp, sanitizeText(message));
}
