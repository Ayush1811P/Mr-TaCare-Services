import type { Coordinates, ResolvedLocation } from '@/types';

export type { Coordinates, ResolvedLocation };

export type ServiceAreaLocality = {
  /** "Sector 62, Noida" */
  label: string;
  /** "Sector 62" */
  locality: string;
  serviceAreaSlug: string;
  coordinates: Coordinates;
};
