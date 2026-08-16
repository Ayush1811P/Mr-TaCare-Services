import type { PetFoodProduct } from '@/types/pet-food';

export function rankProducts(products: PetFoodProduct[]): PetFoodProduct[] {
  // Separate into priced and unpriced
  const withPrice = products.filter(p => p.price !== null);
  const withoutPrice = products.filter(p => p.price === null);

  // Sort priced items strictly low to high
  withPrice.sort((a, b) => (a.price as number) - (b.price as number));
  
  // Sort unpriced items by rating as fallback
  withoutPrice.sort((a, b) => ((b.rating || 0) - (a.rating || 0)));

  // Combine and return top 10
  return [...withPrice, ...withoutPrice].slice(0, 10);
}
