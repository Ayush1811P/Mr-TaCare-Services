import type { PetFoodAnimalType, PetFoodLifeStage, PetFoodProduct } from '@/types/pet-food';

export interface ProductSource {
  name: string;
  search: (
    animal: PetFoodAnimalType,
    breed: string | null,
    lifeStage: PetFoodLifeStage
  ) => Promise<any[]>;
}

export const mockSource: ProductSource = {
  name: 'MockRetailer',
  search: async (animal, breed, lifeStage) => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    return [
      {
        id: `mock-1-${animal}-${breed}-${lifeStage}`,
        title: `Premium ${breed || animal} ${lifeStage} Food`,
        img: '/images/pet-food.jpg',
        price_in_inr: 1299,
        avg_rating: 4.6,
        total_reviews: 1240,
        url: 'https://example.com/product/1',
      },
      {
        id: `mock-2-${animal}-${lifeStage}`,
        title: `Essential ${animal} ${lifeStage} Diet`,
        img: '/images/pet-food.jpg',
        price_in_inr: 899,
        avg_rating: 4.2,
        total_reviews: 850,
        url: 'https://example.com/product/2',
      },
      {
        id: `mock-3-${animal}`,
        title: `General ${animal} Kibble`,
        img: '/images/pet-food.jpg',
        price_in_inr: 650,
        avg_rating: 3.9,
        total_reviews: 320,
        url: 'https://example.com/product/3',
      },
    ];
  },
};

export const activeSources: ProductSource[] = [mockSource];
