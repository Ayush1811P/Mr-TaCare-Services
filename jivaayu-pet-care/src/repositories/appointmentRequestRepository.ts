import type {
  AppointmentRequest,
  AppointmentRequestRecord,
  AppointmentRequestStatus,
} from '@/types';

/**
 * Persistence for appointment requests and their status events.
 *
 * Phase 1 keeps records in memory only — nothing is transmitted anywhere, and
 * personal data never leaves the tab. The Supabase implementation will INSERT
 * into `appointment_requests` / `appointment_events` under an RLS policy that
 * allows insert-only access for anonymous visitors.
 */
export interface AppointmentRequestRepository {
  create(request: AppointmentRequest): Promise<AppointmentRequestRecord>;
  updateStatus(id: string, status: AppointmentRequestStatus): Promise<void>;
}

function createId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }
  return `req_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;
}

class InMemoryAppointmentRequestRepository implements AppointmentRequestRepository {
  private readonly records = new Map<string, AppointmentRequestRecord>();

  async create(request: AppointmentRequest): Promise<AppointmentRequestRecord> {
    const record: AppointmentRequestRecord = {
      ...request,
      id: createId(),
      createdAt: new Date().toISOString(),
    };
    this.records.set(record.id, record);
    return record;
  }

  async updateStatus(id: string, status: AppointmentRequestStatus): Promise<void> {
    const existing = this.records.get(id);
    if (!existing) return;
    this.records.set(id, { ...existing, status });
  }
}

export const appointmentRequestRepository: AppointmentRequestRepository =
  new InMemoryAppointmentRequestRepository();
