export type PetFoodAnimalType = 'dog' | 'cat' | 'rabbit' | 'bird';

export type PetFoodLifeStage = 'puppy' | 'kitten' | 'baby' | 'adult' | 'senior';

export type PetFoodProduct = {
  id: string;
  name: string;
  imageUrl: string;
  price: number | null;
  currency: string;
  rating: number | null;
  reviewCount: number | null;
  retailer: string;
  productUrl: string;
  animal: PetFoodAnimalType;
  lifeStage: PetFoodLifeStage;
  relevanceScore?: number;
};
