import { petTypeRepository } from '@/repositories/petTypeRepository';
import type { PetType, PetTypeSlug } from '@/types';

export async function getPetTypes(): Promise<PetType[]> {
  return petTypeRepository.list();
}

export async function getPetType(slug: PetTypeSlug): Promise<PetType | null> {
  return petTypeRepository.getBySlug(slug);
}
