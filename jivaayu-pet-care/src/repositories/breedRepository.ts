import { mockBreeds } from '@/data/mock/breeds';
import type { Breed, PetTypeSlug } from '@/types';

export interface BreedRepository {
  listPopular(petTypeSlug: PetTypeSlug): Promise<Breed[]>;
  listAll(petTypeSlug: PetTypeSlug): Promise<Breed[]>;
  search(petTypeSlug: PetTypeSlug, query: string): Promise<Breed[]>;
  getBySlug(petTypeSlug: PetTypeSlug, slug: string): Promise<Breed | null>;
}

class MockBreedRepository implements BreedRepository {
  async listPopular(petTypeSlug: PetTypeSlug): Promise<Breed[]> {
    return mockBreeds.filter((breed) => breed.petTypeSlug === petTypeSlug && breed.isPopular);
  }

  async listAll(petTypeSlug: PetTypeSlug): Promise<Breed[]> {
    return mockBreeds.filter((breed) => breed.petTypeSlug === petTypeSlug);
  }

  async search(petTypeSlug: PetTypeSlug, query: string): Promise<Breed[]> {
    const needle = query.trim().toLowerCase();
    if (!needle) return this.listPopular(petTypeSlug);

    return mockBreeds.filter(
      (breed) => breed.petTypeSlug === petTypeSlug && breed.name.toLowerCase().includes(needle),
    );
  }

  async getBySlug(petTypeSlug: PetTypeSlug, slug: string): Promise<Breed | null> {
    return (
      mockBreeds.find((breed) => breed.petTypeSlug === petTypeSlug && breed.slug === slug) ?? null
    );
  }
}

export const breedRepository: BreedRepository = new MockBreedRepository();
