import { mockPetTypes } from '@/data/mock/petTypes';
import type { PetType, PetTypeSlug } from '@/types';

export interface PetTypeRepository {
  list(): Promise<PetType[]>;
  getBySlug(slug: PetTypeSlug): Promise<PetType | null>;
}

class MockPetTypeRepository implements PetTypeRepository {
  async list(): Promise<PetType[]> {
    return [...mockPetTypes];
  }

  async getBySlug(slug: PetTypeSlug): Promise<PetType | null> {
    return mockPetTypes.find((petType) => petType.slug === slug) ?? null;
  }
}

export const petTypeRepository: PetTypeRepository = new MockPetTypeRepository();
