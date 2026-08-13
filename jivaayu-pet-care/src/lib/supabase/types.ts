/**
 * Planned database shape.
 *
 * This is the contract the repositories code against. When Supabase is
 * connected, regenerate this file with:
 *   npx supabase gen types typescript --project-id <id> > src/lib/supabase/types.ts
 * and the repository mappers will surface any drift as type errors.
 */

export type DbPetType = {
  id: string;
  slug: string;
  label: string;
  noun: string;
  emoji: string;
  image_url: string;
  has_breeds: boolean;
};

export type DbBreed = {
  id: string;
  pet_type_id: string;
  slug: string;
  name: string;
  is_popular: boolean;
  image_url: string | null;
};

export type DbClinic = {
  id: string;
  name: string;
  address_line: string;
  locality: string;
  city: string;
  state: string;
  postal_code: string | null;
  latitude: number;
  longitude: number;
  is_verified: boolean;
};

export type DbDoctor = {
  id: string;
  slug: string;
  name: string;
  qualifications: string;
  headline: string;
  about: string;
  image_url: string;
  years_of_experience: number;
  languages: string[];
  is_verified: boolean;
  consultation_fee: number | null;
  /** Stored server-side; exposed to the client only for listed providers. */
  whatsapp_number: string;
};

export type DbService = {
  id: string;
  name: string;
};

export type DbDoctorClinic = {
  doctor_id: string;
  clinic_id: string;
};

export type DbDoctorService = {
  doctor_id: string;
  service_id: string;
};

export type DbCustomer = {
  id: string;
  name: string;
  mobile: string;
  created_at: string;
};

export type DbPet = {
  id: string;
  customer_id: string;
  pet_type_id: string;
  breed_id: string | null;
  name: string;
  age_years: number | null;
  age_months: number | null;
};

export type DbAppointmentRequest = {
  id: string;
  customer_id: string | null;
  customer_name: string;
  customer_mobile: string;
  pet_id: string | null;
  pet_name: string;
  pet_type: string;
  breed: string | null;
  age_years: number | null;
  age_months: number | null;
  doctor_id: string;
  clinic_id: string;
  latitude: number | null;
  longitude: number | null;
  preferred_date: string | null;
  preferred_time: string | null;
  status: 'REQUESTED' | 'WHATSAPP_OPENED';
  created_at: string;
};

export type DbAppointmentEvent = {
  id: string;
  request_id: string;
  type: 'REQUESTED' | 'WHATSAPP_OPENED';
  created_at: string;
};

export type Database = {
  public: {
    Tables: {
      pet_types: { Row: DbPetType };
      breeds: { Row: DbBreed };
      clinics: { Row: DbClinic };
      doctors: { Row: DbDoctor };
      services: { Row: DbService };
      doctor_clinics: { Row: DbDoctorClinic };
      doctor_services: { Row: DbDoctorService };
      customers: { Row: DbCustomer };
      pets: { Row: DbPet };
      appointment_requests: { Row: DbAppointmentRequest };
      appointment_events: { Row: DbAppointmentEvent };
    };
  };
};
