import { supabase } from '@/lib/supabase';
import { supabaseServer } from '@/lib/supabase-server';
import type {
  AppointmentRequest,
  AppointmentRequestRecord,
  AppointmentRequestStatus,
} from '@/types';

export interface AppointmentRequestRepository {
  create(request: AppointmentRequest): Promise<AppointmentRequestRecord>;
  updateStatus(id: string, status: AppointmentRequestStatus): Promise<void>;
}

class SupabaseAppointmentRequestRepository implements AppointmentRequestRepository {
  async create(request: AppointmentRequest): Promise<AppointmentRequestRecord> {
    const { data, error } = await supabase.rpc('submit_appointment_request', {
      p_customer_name: request.customerName,
      p_mobile_number: request.customerMobile,
      p_pet_name: request.petName,
      p_pet_type: request.petType,
      p_breed: request.breed || null,
      p_age_years: request.ageYears ?? null,
      p_age_months: request.ageMonths ?? null,
      p_doctor_id: request.doctorId,
      p_preferred_date: request.preferredDate || null,
      p_preferred_time: request.preferredTime || null,
      p_latitude: request.latitude ?? null,
      p_longitude: request.longitude ?? null,
      p_location_text: null,
    });

    if (error) {
      console.error('Error creating appointment request:', error);
      throw new Error(error.message);
    }

    if (!data) {
      throw new Error('No data returned from submit_appointment_request');
    }

    return {
      ...request,
      id: data as string,
      createdAt: new Date().toISOString(),
    };
  }

  async updateStatus(id: string, status: AppointmentRequestStatus): Promise<void> {
    // We use the service_role client here because the schema revokes UPDATE on appointment_requests from anon.
    const { error } = await supabaseServer
      .from('appointment_requests')
      .update({ status })
      .eq('id', id);

    if (error) {
      console.error('Error updating appointment request status:', error);
      throw new Error(error.message);
    }

    // Insert into appointment_events explicitly for WHATSAPP_OPENED
    // (The REQUESTED event is handled by trigger)
    const { error: eventError } = await supabaseServer.from('appointment_events').insert({
      appointment_request_id: id,
      event_type: status,
    });

    if (eventError) {
      console.error('Error creating appointment event:', eventError);
    }
  }
}

export const appointmentRequestRepository: AppointmentRequestRepository =
  new SupabaseAppointmentRequestRepository();
