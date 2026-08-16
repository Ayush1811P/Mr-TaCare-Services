import type { PetFoodAnimalType, PetFoodLifeStage, PetFoodProduct } from '@/types/pet-food';
import { activeSources } from './productSources';
import { normalizeMockProduct } from './normalizeProduct';
import { rankProducts } from './rankProducts';

export async function searchProducts(
  animal: PetFoodAnimalType,
  breed: string | null,
  lifeStage: PetFoodLifeStage
): Promise<PetFoodProduct[]> {
  try {
    const params = new URLSearchParams({
      animal,
      ...(breed && { breed }),
      lifeStage,
    });
    
    const response = await fetch(`/api/pet-food/search?${params.toString()}`);
    const data = await response.json();

    if (!response.ok || data.success === false) {
      if (data.reason === 'providers_unavailable') {
        throw new Error('providers_unavailable');
      }
      throw new Error('Failed to fetch from Pet Food search API');
    }
    
    return data.products || [];
  } catch (e: any) {
    console.error('Error during pet food search:', e);

    if (e.message === 'providers_unavailable' || process.env.NODE_ENV === 'production') {
      throw e;
    }

    // Fallback to local active sources ONLY in development if API completely fails
    const allProducts: PetFoodProduct[] = [];
    for (const source of activeSources) {
      try {
        const results = await source.search(animal, breed, lifeStage);
        const normalized = results.map((r) =>
          normalizeMockProduct(r, source.name, animal, lifeStage)
        );
        allProducts.push(...normalized);
      } catch (e2) {
        console.error(`Failed to fetch from fallback source ${source.name}`, e2);
      }
    }
    return rankProducts(allProducts);
  }
}
