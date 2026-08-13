/**
 * Input validation and sanitisation.
 *
 * Everything the customer types passes through here before it reaches state,
 * a URL, or a WhatsApp message. Rules stay permissive enough for real Indian
 * names and numbers while rejecting obvious junk and control characters.
 */

export type ValidationResult = { ok: true; value: string } | { ok: false; error: string };

/**
 * Strips control characters that could corrupt a URL or message body.
 *
 * Newlines are preserved: the WhatsApp message is deliberately multi-line, and
 * stripping \n would collapse it into an unreadable paragraph. Everything else
 * in the C0/C1 ranges is removed.
 */
export function sanitizeText(input: string): string {
  return input.replace(/[\u0000-\u0009\u000B-\u001F\u007F-\u009F]/g, '').trim();
}

/** Collapses runs of whitespace so "  Rahul   Singh " becomes "Rahul Singh". */
export function normalizeWhitespace(input: string): string {
  return sanitizeText(input).replace(/\s+/g, ' ');
}

export function validatePersonName(raw: string): ValidationResult {
  const value = normalizeWhitespace(raw);

  if (value.length === 0) {
    return { ok: false, error: 'Please enter your name so the doctor knows who is writing.' };
  }
  if (value.length < 2) {
    return { ok: false, error: 'That looks a little short. Please enter your full name.' };
  }
  if (value.length > 60) {
    return { ok: false, error: 'Please keep your name under 60 characters.' };
  }
  // Letters from any script, plus spaces, apostrophes, hyphens and dots.
  if (!/^[\p{L}][\p{L}\p{M}\s'.-]*$/u.test(value)) {
    return { ok: false, error: 'Please use letters only — no numbers or symbols.' };
  }
  return { ok: true, value };
}

export function validatePetName(raw: string): ValidationResult {
  const value = normalizeWhitespace(raw);

  if (value.length === 0) {
    return { ok: false, error: 'Please enter a name so we can personalise the request.' };
  }
  if (value.length > 40) {
    return { ok: false, error: 'Please keep the name under 40 characters.' };
  }
  if (!/^[\p{L}\p{N}][\p{L}\p{M}\p{N}\s'.-]*$/u.test(value)) {
    return { ok: false, error: 'Please use letters and numbers only.' };
  }
  return { ok: true, value };
}

/** Digits only, with any leading +91 / 0 stripped. */
export function normalizeIndianMobile(raw: string): string {
  const digits = raw.replace(/\D/g, '');
  if (digits.startsWith('91') && digits.length > 10) return digits.slice(-10);
  if (digits.startsWith('0') && digits.length === 11) return digits.slice(1);
  return digits.slice(0, 10);
}

export function validateIndianMobile(raw: string): ValidationResult {
  const value = normalizeIndianMobile(raw);

  if (value.length === 0) {
    return { ok: false, error: 'Please enter your mobile number.' };
  }
  if (value.length < 10) {
    return {
      ok: false,
      error: 'An Indian mobile number has 10 digits. Please check and try again.',
    };
  }
  // Indian mobile numbers begin with 6, 7, 8 or 9.
  if (!/^[6-9]\d{9}$/.test(value)) {
    return { ok: false, error: 'That does not look like a valid Indian mobile number.' };
  }
  return { ok: true, value };
}

/** "98765 43210" — display grouping only, never used for storage. */
export function formatIndianMobile(value: string): string {
  const digits = normalizeIndianMobile(value);
  if (digits.length <= 5) return digits;
  return `${digits.slice(0, 5)} ${digits.slice(5)}`;
}

export function validateLocalityInput(raw: string): ValidationResult {
  const value = normalizeWhitespace(raw);

  if (value.length < 2) {
    return { ok: false, error: 'Please enter a sector or locality, for example “Sector 62”.' };
  }
  if (value.length > 80) {
    return { ok: false, error: 'Please shorten your location.' };
  }
  if (!/^[\p{L}\p{N}][\p{L}\p{M}\p{N}\s,'./-]*$/u.test(value)) {
    return { ok: false, error: 'Please use letters, numbers and commas only.' };
  }
  return { ok: true, value };
}

/** Clamp a number into range; used by the age selector. */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
