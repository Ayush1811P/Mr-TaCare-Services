/**
 * Domain types.
 *
 * These intentionally mirror the future Supabase schema (customers, pets,
 * pet_types, breeds, doctors, clinics, doctor_clinics, services,
 * doctor_services, appointment_requests, appointment_events) so that swapping
 * the mock repositories for Supabase queries is a mapping exercise, not a
 * refactor.
 */

export type PetTypeSlug = 'dog' | 'cat' | 'rabbit' | 'bird' | 'other';

export type PetType = {
  id: string;
  slug: PetTypeSlug;
  /** Display label, e.g. "Dog". */
  label: string;
  /** Lowercase noun used inside generated questions, e.g. "dog" -> "How old is your dog?" */
  noun: string;
  /** Emoji used alongside dynamic questions. */
  emoji: string;
  imageUrl: string;
  /** Whether a breed step makes sense for this animal. */
  hasBreeds: boolean;
};

export type Breed = {
  id: string;
  petTypeSlug: PetTypeSlug;
  slug: string;
  name: string;
  /** Popular breeds are shown first; the rest sit behind search. */
  isPopular: boolean;
  imageUrl?: string;
};

export type Clinic = {
  id: string;
  name: string;
  addressLine: string;
  locality: string;
  city: string;
  state: string;
  postalCode?: string;
  latitude: number;
  longitude: number;
  /** Only present when the clinic has been verified by Jivaayu Pet Care. */
  openingHours?: OpeningHours[];
};

export type OpeningHours = {
  /** ISO day names as used by schema.org: Monday, Tuesday, ... */
  days: string[];
  opens: string;
  closes: string;
};

export type DoctorService = {
  id: string;
  name: string;
};

export type Doctor = {
  id: string;
  slug: string;
  name: string;
  /** Post-nominals, e.g. "BVSc & AH". */
  qualifications: string;
  headline: string;
  about: string;
  imageUrl: string;
  yearsOfExperience: number;
  languages: string[];
  services: DoctorService[];
  clinic: Clinic;
  /**
   * Verified means Jivaayu Pet Care has confirmed the listing with the doctor.
   * Fees, opening hours and the profile page are only surfaced when verified.
   */
  isVerified: boolean;
  /** Rupees. Only meaningful when isVerified is true. */
  consultationFee?: number;
  /** E.164 without the leading "+", e.g. 919812345678. */
  whatsappNumber: string;
};

/** A doctor plus query-specific data (distance from the search origin). */
export type DoctorSearchResult = Doctor & {
  distanceKm: number;
};

export type Coordinates = {
  latitude: number;
  longitude: number;
};

export type ResolvedLocation = Coordinates & {
  /** Human readable label, e.g. "Sector 62, Noida". */
  label: string;
  source: 'geolocation' | 'manual';
  serviceAreaSlug: string;
};

export type DoctorSearchParams = {
  origin: Coordinates;
  radiusKm: number;
  petTypeSlug?: PetTypeSlug;
  limit?: number;
};

export type PetDraft = {
  typeSlug: PetTypeSlug;
  name: string;
  breedSlug?: string;
  breedName?: string;
  ageYears: number;
  ageMonths: number;
};

export type CustomerDraft = {
  name: string;
  /** National number only; the country code is stored separately. */
  mobile: string;
  dialCode: string;
};

export type AppointmentRequestStatus = 'REQUESTED' | 'WHATSAPP_OPENED';

/**
 * Payload handed to the appointment request service before the WhatsApp
 * handoff. Mirrors the future `appointment_requests` table.
 */
export type AppointmentRequest = {
  customerId?: string;
  customerName: string;
  customerMobile: string;
  petId?: string;
  petName: string;
  petType: string;
  breed?: string;
  ageYears?: number;
  ageMonths?: number;
  doctorId: string;
  clinicId: string;
  latitude?: number;
  longitude?: number;
  preferredDate?: string;
  preferredTime?: string;
  status: AppointmentRequestStatus;
};

export type AppointmentRequestRecord = AppointmentRequest & {
  id: string;
  createdAt: string;
};

/** Analytics-style trail, mirroring the future `appointment_events` table. */
export type AppointmentEvent = {
  requestId: string;
  type: AppointmentRequestStatus;
  createdAt: string;
};
