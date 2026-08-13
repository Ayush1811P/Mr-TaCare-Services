import { defaultServiceArea, serviceAreas } from '@/config/site';
import { haversineDistanceKm } from '@/lib/utils/geo';
import type { Coordinates, ResolvedLocation, ServiceAreaLocality } from '@/lib/location/types';

/**
 * Turns raw coordinates or typed text into a ResolvedLocation.
 *
 * Phase 1 resolves against the configured service areas offline — no
 * geocoding API, no network call, no third-party sharing of the user's
 * position. A real geocoder can be slotted in behind `resolveManualLocation`
 * without touching the UI.
 */

/** Approximate centroids for the localities offered in the manual picker. */
const LOCALITY_COORDS: Record<string, Coordinates> = {
  'Sector 15': { latitude: 28.5852, longitude: 77.3116 },
  'Sector 18': { latitude: 28.5708, longitude: 77.3261 },
  'Sector 27': { latitude: 28.5806, longitude: 77.3312 },
  'Sector 44': { latitude: 28.5545, longitude: 77.3435 },
  'Sector 50': { latitude: 28.5709, longitude: 77.3611 },
  'Sector 62': { latitude: 28.6265, longitude: 77.3649 },
  'Sector 76': { latitude: 28.5697, longitude: 77.3948 },
  'Sector 93': { latitude: 28.5162, longitude: 77.3697 },
  'Sector 104': { latitude: 28.5372, longitude: 77.3479 },
  'Sector 119': { latitude: 28.6033, longitude: 77.3919 },
  'Sector 137': { latitude: 28.5031, longitude: 77.4041 },
  'Greater Noida West': { latitude: 28.6118, longitude: 77.4373 },
};

export function listLocalities(): ServiceAreaLocality[] {
  return serviceAreas.flatMap((area) =>
    area.localities.map((locality) => ({
      label: `${locality}, ${area.city}`,
      locality,
      serviceAreaSlug: area.slug,
      coordinates: LOCALITY_COORDS[locality] ?? area.center,
    })),
  );
}

/** Nearest configured service area to a coordinate pair. */
export function nearestServiceArea(coords: Coordinates) {
  return serviceAreas.reduce((closest, area) => {
    const d = haversineDistanceKm(coords, area.center);
    const best = haversineDistanceKm(coords, closest.center);
    return d < best ? area : closest;
  }, defaultServiceArea);
}

/**
 * Labels a detected position using the nearest known locality, so the UI can
 * say "Near Sector 62, Noida" rather than printing raw coordinates.
 */
export function describeCoordinates(coords: Coordinates): ResolvedLocation {
  const area = nearestServiceArea(coords);
  const localities = listLocalities().filter((l) => l.serviceAreaSlug === area.slug);

  let nearest = localities[0];
  let nearestDistance = Number.POSITIVE_INFINITY;

  for (const locality of localities) {
    const distance = haversineDistanceKm(coords, locality.coordinates);
    if (distance < nearestDistance) {
      nearestDistance = distance;
      nearest = locality;
    }
  }

  const label =
    nearest && nearestDistance <= 6
      ? `Near ${nearest.locality}, ${area.city}`
      : `Near ${area.city}`;

  return {
    ...coords,
    label,
    source: 'geolocation',
    serviceAreaSlug: area.slug,
  };
}

/** Matches typed text against known localities; falls back to the city centre. */
export function resolveManualLocation(input: string): ResolvedLocation | null {
  const needle = input.trim().toLowerCase();
  if (!needle) return null;

  const localities = listLocalities();

  const exact = localities.find(
    (l) => l.locality.toLowerCase() === needle || l.label.toLowerCase() === needle,
  );
  const partial = exact ?? localities.find((l) => l.label.toLowerCase().includes(needle));

  if (partial) {
    return {
      ...partial.coordinates,
      label: partial.label,
      source: 'manual',
      serviceAreaSlug: partial.serviceAreaSlug,
    };
  }

  // Fall back to a city match so "Noida" alone still works.
  const area = serviceAreas.find((a) => a.city.toLowerCase().includes(needle));
  if (area) {
    return {
      ...area.center,
      label: area.city,
      source: 'manual',
      serviceAreaSlug: area.slug,
    };
  }

  return null;
}

export function suggestLocalities(query: string, limit = 6): ServiceAreaLocality[] {
  const needle = query.trim().toLowerCase();
  const all = listLocalities();
  if (!needle) return all.slice(0, limit);
  return all.filter((l) => l.label.toLowerCase().includes(needle)).slice(0, limit);
}
