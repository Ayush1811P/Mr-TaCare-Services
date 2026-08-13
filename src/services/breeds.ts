import { breedRepository } from '@/repositories/breedRepository';
import type { Breed, PetTypeSlug } from '@/types';

export async function getPopularBreeds(petTypeSlug: PetTypeSlug): Promise<Breed[]> {
  return breedRepository.listPopular(petTypeSlug);
}

export async function getAllBreeds(petTypeSlug: PetTypeSlug): Promise<Breed[]> {
  return breedRepository.listAll(petTypeSlug);
}

export async function searchBreeds(petTypeSlug: PetTypeSlug, query: string): Promise<Breed[]> {
  return breedRepository.search(petTypeSlug, query);
}

export async function getBreedBySlug(
  petTypeSlug: PetTypeSlug,
  slug: string,
): Promise<Breed | null> {
  return breedRepository.getBySlug(petTypeSlug, slug);
}
