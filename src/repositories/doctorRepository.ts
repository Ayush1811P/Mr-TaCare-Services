import { mockDoctors } from '@/data/mock/doctors';
import { haversineDistanceKm } from '@/lib/utils/geo';
import type { Doctor, DoctorSearchParams, DoctorSearchResult } from '@/types';

/**
 * Data access for doctors.
 *
 * The interface is what the rest of the app depends on. Today it is backed by
 * fixtures; tomorrow `SupabaseDoctorRepository` implements the same interface
 * and only this file changes.
 */
export interface DoctorRepository {
  search(params: DoctorSearchParams): Promise<DoctorSearchResult[]>;
  getBySlug(slug: string): Promise<Doctor | null>;
  getById(id: string): Promise<Doctor | null>;
  /** Slugs safe to expose in the sitemap — verified listings only. */
  listIndexableSlugs(): Promise<string[]>;
}

class MockDoctorRepository implements DoctorRepository {
  async search({
    origin,
    radiusKm,
    petTypeSlug,
    limit = 20,
  }: DoctorSearchParams): Promise<DoctorSearchResult[]> {
    const results = mockDoctors
      .map((doctor) => ({
        ...doctor,
        distanceKm: haversineDistanceKm(origin, {
          latitude: doctor.clinic.latitude,
          longitude: doctor.clinic.longitude,
        }),
      }))
      .filter((doctor) => doctor.distanceKm <= radiusKm)
      .filter((doctor) => {
        // Birds, rabbits and "other" need a vet who lists exotic/small pets.
        if (!petTypeSlug || petTypeSlug === 'dog' || petTypeSlug === 'cat') return true;
        return doctor.services.some(
          (service) => service.id === 'sv_exotic' || service.id === 'sv_consult',
        );
      })
      .sort((a, b) => {
        // Verified listings rank first, then by proximity.
        if (a.isVerified !== b.isVerified) return a.isVerified ? -1 : 1;
        return a.distanceKm - b.distanceKm;
      })
      .slice(0, limit);

    return results;
  }

  async getBySlug(slug: string): Promise<Doctor | null> {
    return mockDoctors.find((doctor) => doctor.slug === slug) ?? null;
  }

  async getById(id: string): Promise<Doctor | null> {
    return mockDoctors.find((doctor) => doctor.id === id) ?? null;
  }

  async listIndexableSlugs(): Promise<string[]> {
    // Only verified profiles carry enough unique, accurate content to index.
    return mockDoctors.filter((doctor) => doctor.isVerified).map((doctor) => doctor.slug);
  }
}

export const doctorRepository: DoctorRepository = new MockDoctorRepository();
