import type { PetToysAnimalType, PetToysLifeStage, PetToysProduct } from '@/types/pet-toys';

export async function searchProducts(
  animal: PetToysAnimalType,
  breed: string | null,
  lifeStage: PetToysLifeStage
): Promise<PetToysProduct[]> {
  try {
    const params = new URLSearchParams({
      animal,
      ...(breed && { breed }),
      lifeStage,
    });
    
    const response = await fetch(`/api/pet-toys/search?${params.toString()}`);
    const data = await response.json();

    if (!response.ok || data.success === false) {
      if (data.reason === 'providers_unavailable') {
        throw new Error('providers_unavailable');
      }
      throw new Error('Failed to fetch from Pet Toys search API');
    }
    
    return data.products || [];
  } catch (e: any) {
    console.error('Error during pet toys search:', e);
    throw e;
  }
}
