import { doctorRepository } from '@/repositories/doctorRepository';
import type { Doctor, DoctorSearchParams, DoctorSearchResult } from '@/types';

/** Radius ladder used when a search comes back empty. */
export const SEARCH_RADII_KM = [5, 10, 20, 40] as const;
export const DEFAULT_RADIUS_KM = SEARCH_RADII_KM[0];

export async function searchDoctors(params: DoctorSearchParams): Promise<DoctorSearchResult[]> {
  return doctorRepository.search(params);
}

export async function getDoctorBySlug(slug: string): Promise<Doctor | null> {
  return doctorRepository.getBySlug(slug);
}

export async function getDoctorById(id: string): Promise<Doctor | null> {
  return doctorRepository.getById(id);
}

export async function listIndexableDoctorSlugs(): Promise<string[]> {
  return doctorRepository.listIndexableSlugs();
}

/** Next radius in the ladder, or null when already at the widest. */
export function nextRadius(current: number): number | null {
  return SEARCH_RADII_KM.find((radius) => radius > current) ?? null;
}
