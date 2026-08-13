import type { PetType } from '@/types';

/**
 * Question copy is generated from the selected pet type so the flow never
 * repeats a generic "How old is your pet?".
 */

export function ageQuestion(petType: PetType): string {
  return `How old is your ${petType.noun}? ${petType.emoji}`;
}

export function nameQuestion(petType: PetType): string {
  return `What's your ${petType.noun}'s name? ${petType.emoji}`;
}

export function breedQuestion(petType: PetType): string {
  return `What's your ${petType.noun}'s breed? ${petType.emoji}`;
}

/** "3 years", "8 months", "2 years 6 months", "Under a month old" */
export function formatPetAge(years: number, months: number): string {
  const parts: string[] = [];
  if (years > 0) parts.push(`${years} ${years === 1 ? 'year' : 'years'}`);
  if (months > 0) parts.push(`${months} ${months === 1 ? 'month' : 'months'}`);
  if (parts.length === 0) return 'Under a month old';
  return parts.join(' ');
}

/** Broad life stage, useful context for the doctor. */
export function lifeStageLabel(petType: PetType, years: number, months: number): string {
  const totalMonths = years * 12 + months;
  if (totalMonths < 3) return 'Newborn';
  if (totalMonths < 12)
    return petType.slug === 'dog' ? 'Puppy' : petType.slug === 'cat' ? 'Kitten' : 'Young';
  if (years >= 8) return 'Senior';
  return 'Adult';
}
