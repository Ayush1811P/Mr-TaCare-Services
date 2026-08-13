import type { PetType } from '@/types';

/**
 * MOCK DATA — replace with the Supabase `pet_types` table.
 * Shape is intentionally identical to the planned table columns.
 */
export const mockPetTypes: readonly PetType[] = [
  {
    id: 'pt_dog',
    slug: 'dog',
    label: 'Dog',
    noun: 'dog',
    emoji: '🐶',
    imageUrl: '/images/pets/dog.webp',
    hasBreeds: true,
  },
  {
    id: 'pt_cat',
    slug: 'cat',
    label: 'Cat',
    noun: 'cat',
    emoji: '🐱',
    imageUrl: '/images/pets/cat.webp',
    hasBreeds: true,
  },
  {
    id: 'pt_rabbit',
    slug: 'rabbit',
    label: 'Rabbit',
    noun: 'rabbit',
    emoji: '🐰',
    imageUrl: '/images/pets/rabbit.webp',
    hasBreeds: true,
  },
  {
    id: 'pt_bird',
    slug: 'bird',
    label: 'Bird',
    noun: 'bird',
    emoji: '🐦',
    imageUrl: '/images/pets/bird.webp',
    hasBreeds: true,
  },
  {
    id: 'pt_other',
    slug: 'other',
    label: 'Other',
    noun: 'pet',
    emoji: '🐾',
    imageUrl: '/images/pets/other.webp',
    hasBreeds: false,
  },
];
