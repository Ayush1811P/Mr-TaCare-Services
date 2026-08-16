export type PetToysAnimalType = 'dog' | 'cat' | 'rabbit' | 'bird';

export type PetToysLifeStage = 'puppy' | 'kitten' | 'baby' | 'adult' | 'senior';

export type PetToysProduct = {
  id: string;
  name: string;
  imageUrl: string;
  price: number | null;
  currency: string;
  rating: number | null;
  reviewCount: number | null;
  retailer: string;
  productUrl: string;
  animal: PetToysAnimalType;
  lifeStage: PetToysLifeStage;
  relevanceScore?: number;
};
