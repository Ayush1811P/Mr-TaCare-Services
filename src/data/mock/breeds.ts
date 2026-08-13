import type { Breed } from '@/types';

/**
 * MOCK DATA — replace with the Supabase `breeds` table.
 *
 * Only popular breeds carry images: those are the ones rendered as cards on
 * first paint. The long tail is text-only and reached through search, which
 * keeps the initial payload small.
 */

const dogBreeds: Breed[] = [
  { slug: 'labrador-retriever', name: 'Labrador Retriever', isPopular: true },
  { slug: 'golden-retriever', name: 'Golden Retriever', isPopular: true },
  { slug: 'german-shepherd', name: 'German Shepherd', isPopular: true },
  { slug: 'pug', name: 'Pug', isPopular: true },
  { slug: 'beagle', name: 'Beagle', isPopular: true },
  { slug: 'rottweiler', name: 'Rottweiler', isPopular: true },
  { slug: 'shih-tzu', name: 'Shih Tzu', isPopular: true },
  { slug: 'indian-pariah', name: 'Indian Pariah / Indie', isPopular: true },
  { slug: 'golden-doodle', name: 'Goldendoodle', isPopular: false },
  { slug: 'boxer', name: 'Boxer', isPopular: false },
  { slug: 'cocker-spaniel', name: 'Cocker Spaniel', isPopular: false },
  { slug: 'dachshund', name: 'Dachshund', isPopular: false },
  { slug: 'dalmatian', name: 'Dalmatian', isPopular: false },
  { slug: 'doberman', name: 'Doberman Pinscher', isPopular: false },
  { slug: 'french-bulldog', name: 'French Bulldog', isPopular: false },
  { slug: 'great-dane', name: 'Great Dane', isPopular: false },
  { slug: 'husky', name: 'Siberian Husky', isPopular: false },
  { slug: 'lhasa-apso', name: 'Lhasa Apso', isPopular: false },
  { slug: 'maltese', name: 'Maltese', isPopular: false },
  { slug: 'mudhol-hound', name: 'Mudhol Hound', isPopular: false },
  { slug: 'pomeranian', name: 'Pomeranian', isPopular: false },
  { slug: 'poodle', name: 'Poodle', isPopular: false },
  { slug: 'rajapalayam', name: 'Rajapalayam', isPopular: false },
  { slug: 'saint-bernard', name: 'Saint Bernard', isPopular: false },
  { slug: 'shiba-inu', name: 'Shiba Inu', isPopular: false },
  { slug: 'shih-poo', name: 'Shih-Poo', isPopular: false },
  { slug: 'spitz', name: 'Indian Spitz', isPopular: false },
  { slug: 'bully-kutta', name: 'Bully Kutta', isPopular: false },
  { slug: 'chippiparai', name: 'Chippiparai', isPopular: false },
  { slug: 'gaddi-kutta', name: 'Gaddi Kutta', isPopular: false },
].map((breed) => ({
  ...breed,
  id: `br_dog_${breed.slug}`,
  petTypeSlug: 'dog' as const,
  imageUrl: breed.isPopular ? `/images/breeds/dog/${breed.slug}.webp` : undefined,
}));

const catBreeds: Breed[] = [
  { slug: 'indian-domestic-shorthair', name: 'Indian Domestic Shorthair', isPopular: true },
  { slug: 'persian', name: 'Persian', isPopular: true },
  { slug: 'siamese', name: 'Siamese', isPopular: true },
  { slug: 'maine-coon', name: 'Maine Coon', isPopular: true },
  { slug: 'british-shorthair', name: 'British Shorthair', isPopular: true },
  { slug: 'bengal', name: 'Bengal', isPopular: true },
  { slug: 'ragdoll', name: 'Ragdoll', isPopular: true },
  { slug: 'mixed-breed', name: 'Mixed Breed', isPopular: true },
  { slug: 'abyssinian', name: 'Abyssinian', isPopular: false },
  { slug: 'american-shorthair', name: 'American Shorthair', isPopular: false },
  { slug: 'birman', name: 'Birman', isPopular: false },
  { slug: 'bombay', name: 'Bombay', isPopular: false },
  { slug: 'burmese', name: 'Burmese', isPopular: false },
  { slug: 'himalayan', name: 'Himalayan', isPopular: false },
  { slug: 'norwegian-forest', name: 'Norwegian Forest Cat', isPopular: false },
  { slug: 'russian-blue', name: 'Russian Blue', isPopular: false },
  { slug: 'scottish-fold', name: 'Scottish Fold', isPopular: false },
  { slug: 'sphynx', name: 'Sphynx', isPopular: false },
  { slug: 'turkish-angora', name: 'Turkish Angora', isPopular: false },
].map((breed) => ({
  ...breed,
  id: `br_cat_${breed.slug}`,
  petTypeSlug: 'cat' as const,
  imageUrl: breed.isPopular ? `/images/breeds/cat/${breed.slug}.webp` : undefined,
}));

const rabbitBreeds: Breed[] = [
  { slug: 'indian-white', name: 'Indian White', isPopular: true },
  { slug: 'new-zealand-white', name: 'New Zealand White', isPopular: true },
  { slug: 'dutch', name: 'Dutch', isPopular: true },
  { slug: 'lop', name: 'Holland Lop', isPopular: true },
  { slug: 'angora', name: 'Angora', isPopular: false },
  { slug: 'californian', name: 'Californian', isPopular: false },
  { slug: 'rex', name: 'Rex', isPopular: false },
  { slug: 'soviet-chinchilla', name: 'Soviet Chinchilla', isPopular: false },
].map((breed) => ({
  ...breed,
  id: `br_rabbit_${breed.slug}`,
  petTypeSlug: 'rabbit' as const,
}));

const birdBreeds: Breed[] = [
  { slug: 'budgerigar', name: 'Budgerigar (Budgie)', isPopular: true },
  { slug: 'cockatiel', name: 'Cockatiel', isPopular: true },
  { slug: 'lovebird', name: 'Lovebird', isPopular: true },
  { slug: 'indian-ringneck', name: 'Indian Ringneck Parakeet', isPopular: true },
  { slug: 'african-grey', name: 'African Grey Parrot', isPopular: false },
  { slug: 'canary', name: 'Canary', isPopular: false },
  { slug: 'cockatoo', name: 'Cockatoo', isPopular: false },
  { slug: 'finch', name: 'Finch', isPopular: false },
  { slug: 'macaw', name: 'Macaw', isPopular: false },
  { slug: 'pigeon', name: 'Pigeon', isPopular: false },
].map((breed) => ({
  ...breed,
  id: `br_bird_${breed.slug}`,
  petTypeSlug: 'bird' as const,
}));

export const mockBreeds: readonly Breed[] = [
  ...dogBreeds,
  ...catBreeds,
  ...rabbitBreeds,
  ...birdBreeds,
];
