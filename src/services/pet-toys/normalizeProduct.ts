import type { PetToysProduct, PetToysAnimalType, PetToysLifeStage } from '@/types/pet-toys';

export function normalizeMockProduct(
  raw: any,
  sourceName: string,
  animal: PetToysAnimalType,
  lifeStage: PetToysLifeStage
): PetToysProduct {
  return {
    id: raw.id,
    name: raw.title,
    imageUrl: raw.img,
    price: raw.price_in_inr,
    currency: 'INR',
    rating: raw.avg_rating,
    reviewCount: raw.total_reviews,
    retailer: sourceName,
    productUrl: raw.url,
    animal,
    lifeStage,
  };
}

export function normalizeSerpApiProduct(
  raw: any,
  animal: PetToysAnimalType,
  lifeStage: PetToysLifeStage
): PetToysProduct | null {
  if (!raw.link || !raw.title) return null;

  let price = null;
  if (typeof raw.extracted_price === 'number') {
    price = raw.extracted_price;
  } else if (raw.price) {
    const parsed = parseFloat(raw.price.replace(/[^0-9.]/g, ''));
    if (!isNaN(parsed)) price = parsed;
  }

  // Enforce max price of 1500
  if (price !== null && price > 1500) {
    return null;
  }

  return {
    id: raw.product_id || raw.link,
    name: raw.title,
    imageUrl: raw.thumbnail || '/images/pet-food.jpg', // we can use the same or a generic one
    price,
    currency: 'INR',
    rating: raw.rating || null,
    reviewCount: raw.reviews || null,
    retailer: raw.source || 'Unknown Retailer',
    productUrl: raw.link,
    animal,
    lifeStage,
    relevanceScore: 0,
  };
}

export function normalizeSerperProduct(
  raw: any,
  animal: PetToysAnimalType,
  lifeStage: PetToysLifeStage
): PetToysProduct | null {
  if (!raw.link || !raw.title) return null;

  let price = null;
  if (typeof raw.price === 'number') {
    price = raw.price;
  } else if (raw.price) {
    const parsed = parseFloat(raw.price.toString().replace(/[^0-9.]/g, ''));
    if (!isNaN(parsed)) price = parsed;
  }

  // Enforce max price of 1500
  if (price !== null && price > 1500) {
    return null;
  }

  return {
    id: raw.id || raw.link,
    name: raw.title,
    imageUrl: raw.imageUrl || '/images/pet-food.jpg',
    price,
    currency: raw.currency || 'INR',
    rating: raw.rating || null,
    reviewCount: raw.ratingCount || null,
    retailer: raw.source || 'Unknown Retailer',
    productUrl: raw.link,
    animal,
    lifeStage,
    relevanceScore: 0,
  };
}
