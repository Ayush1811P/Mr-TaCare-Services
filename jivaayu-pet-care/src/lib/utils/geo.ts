import type { Coordinates } from '@/types';

const EARTH_RADIUS_KM = 6371;

const toRadians = (degrees: number) => (degrees * Math.PI) / 180;

/**
 * Great-circle distance between two points, in kilometres.
 *
 * Used client-side for mock search. Once Supabase is connected this is
 * replaced by a PostGIS/earthdistance query so ranking happens in the database.
 */
export function haversineDistanceKm(a: Coordinates, b: Coordinates): number {
  const dLat = toRadians(b.latitude - a.latitude);
  const dLon = toRadians(b.longitude - a.longitude);
  const lat1 = toRadians(a.latitude);
  const lat2 = toRadians(b.latitude);

  const h = Math.sin(dLat / 2) ** 2 + Math.sin(dLon / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);

  return 2 * EARTH_RADIUS_KM * Math.asin(Math.sqrt(h));
}

/** "1.8 km away" / "600 m away" */
export function formatDistance(km: number): string {
  if (km < 1) {
    return `${Math.round(km * 1000)} m away`;
  }
  return `${km.toFixed(1)} km away`;
}

export function isValidCoordinates(value: Partial<Coordinates> | undefined): value is Coordinates {
  return (
    typeof value?.latitude === 'number' &&
    typeof value?.longitude === 'number' &&
    Number.isFinite(value.latitude) &&
    Number.isFinite(value.longitude) &&
    Math.abs(value.latitude) <= 90 &&
    Math.abs(value.longitude) <= 180
  );
}
