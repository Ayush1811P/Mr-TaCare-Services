import type { Coordinates } from '@/types';

/**
 * Browser Geolocation wrapper.
 *
 * Permission is requested only when this is called — never on page load — and
 * every failure mode maps to a friendly, actionable message so the user is
 * always offered the manual fallback instead of being trapped.
 */

export type GeolocationErrorCode =
  'UNSUPPORTED' | 'PERMISSION_DENIED' | 'POSITION_UNAVAILABLE' | 'TIMEOUT' | 'UNKNOWN';

export class GeolocationFailure extends Error {
  constructor(
    readonly code: GeolocationErrorCode,
    message: string,
  ) {
    super(message);
    this.name = 'GeolocationFailure';
  }
}

const MESSAGES: Record<GeolocationErrorCode, string> = {
  UNSUPPORTED: 'Your browser does not support location sharing. Please enter your sector instead.',
  PERMISSION_DENIED:
    'We could not access your location. You can enter your sector manually instead.',
  POSITION_UNAVAILABLE:
    'We could not pinpoint your location right now. Please enter your sector instead.',
  TIMEOUT: 'Finding your location took too long. Please try again or enter your sector.',
  UNKNOWN: 'Something went wrong while finding your location. Please enter your sector instead.',
};

export function isGeolocationSupported(): boolean {
  return typeof navigator !== 'undefined' && 'geolocation' in navigator;
}

export function requestCurrentPosition(timeoutMs = 10_000): Promise<Coordinates> {
  return new Promise((resolve, reject) => {
    if (!isGeolocationSupported()) {
      reject(new GeolocationFailure('UNSUPPORTED', MESSAGES.UNSUPPORTED));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) =>
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }),
      (error) => {
        let code: GeolocationErrorCode = 'UNKNOWN';
        if (error.code === error.PERMISSION_DENIED) code = 'PERMISSION_DENIED';
        else if (error.code === error.POSITION_UNAVAILABLE) code = 'POSITION_UNAVAILABLE';
        else if (error.code === error.TIMEOUT) code = 'TIMEOUT';
        reject(new GeolocationFailure(code, MESSAGES[code]));
      },
      { enableHighAccuracy: true, timeout: timeoutMs, maximumAge: 60_000 },
    );
  });
}
