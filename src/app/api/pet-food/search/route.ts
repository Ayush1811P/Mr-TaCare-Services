import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import { normalizeSerpApiProduct, normalizeSerperProduct } from '@/services/pet-food/normalizeProduct';
import { rankProducts } from '@/services/pet-food/rankProducts';
import type { PetFoodAnimalType, PetFoodLifeStage, PetFoodProduct } from '@/types/pet-food';
import { supabaseServer } from '@/lib/supabase-server';

const CACHE_TTL_MS_BIRD = 10 * 24 * 60 * 60 * 1000; // 10 days
const CACHE_TTL_MS_OTHER = 5 * 24 * 60 * 60 * 1000; // 5 days

const SERPAPI_KEY = process.env.SERPAPI_KEY;
const SERPER_API_KEYS = [
  process.env.SERPER_API_KEY,
  process.env.SERPER_API_KEY_2,
  process.env.SERPER_API_KEY_3,
  process.env.SERPER_API_KEY_4,
  process.env.SERPER_API_KEY_5,
  process.env.SERPER_API_KEY_6
].filter(Boolean) as string[];

// Global flag to prevent useless calls if quota is known to be exhausted
let serpApiQuotaExhausted = false;
let currentSerperKeyIndex = 0;
let serperQuotaExhausted = false;

async function fetchWithTimeout(url: string, options: RequestInit = {}, timeoutMs = 8000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, { ...options, signal: controller.signal });
    clearTimeout(id);
    return response;
  } catch (error) {
    clearTimeout(id);
    throw error;
  }
}

async function fetchFromSerpApi(queries: string[], animal: PetFoodAnimalType, lifeStage: PetFoodLifeStage): Promise<PetFoodProduct[]> {
  if (serpApiQuotaExhausted) {
    console.log('[PetFood] SerpApi quota previously exhausted -> skipping');
    return [];
  }

  const allProducts: PetFoodProduct[] = [];
  const uniqueUrls = new Set<string>();
  
  console.log('[PetFood] Provider: SerpApi');

  for (const q of queries) {
    if (allProducts.length >= 10) break;

    try {
      const res = await fetchWithTimeout(`https://serpapi.com/search.json?engine=google_shopping&q=${encodeURIComponent(q)}&gl=in&hl=en&api_key=${SERPAPI_KEY}`);
      
      // Check for quota/billing errors
      if (res.status === 400 || res.status === 403 || res.status === 429 || res.status === 402) {
        const errorData = await res.json().catch(() => ({}));
        const errorMsg = (errorData.error || '').toLowerCase();
        if (
          errorMsg.includes('quota') ||
          errorMsg.includes('limit') ||
          errorMsg.includes('exhausted') ||
          errorMsg.includes('billing') ||
          errorMsg.includes('payment') ||
          errorMsg.includes('plan') ||
          res.status === 402 || 
          res.status === 429
        ) {
          serpApiQuotaExhausted = true;
          console.log('[PetFood] SerpApi quota exhausted → switching to Serper');
          return allProducts;
        }
      }

      if (!res.ok) continue;

      const data = await res.json();
      if (!data.shopping_results || !Array.isArray(data.shopping_results)) continue;

      for (const item of data.shopping_results) {
        if (uniqueUrls.has(item.link)) continue;
        uniqueUrls.add(item.link);

        const normalized = normalizeSerpApiProduct(item, animal, lifeStage);
        if (normalized) {
          allProducts.push(normalized);
        }
      }
    } catch (e) {
      console.error(`[PetFood] SerpApi query failed or timed out: ${q}`);
    }
  }
  return allProducts;
}

async function fetchFromSerper(queries: string[], animal: PetFoodAnimalType, lifeStage: PetFoodLifeStage): Promise<PetFoodProduct[]> {
  if (serperQuotaExhausted) {
    console.log('[PetFood] Serper quota previously exhausted -> skipping');
    return [];
  }

  const allProducts: PetFoodProduct[] = [];
  const uniqueUrls = new Set<string>();
  
  console.log('[PetFood] Provider: Serper');

  for (const q of queries) {
    if (allProducts.length >= 10) break;

    while (currentSerperKeyIndex < SERPER_API_KEYS.length) {
      try {
        const apiKey = SERPER_API_KEYS[currentSerperKeyIndex];
        const res = await fetchWithTimeout('https://google.serper.dev/shopping', {
          method: 'POST',
          headers: {
            'X-API-KEY': apiKey,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ q, gl: 'in' }),
        });

        if (res.status === 400 || res.status === 403 || res.status === 429 || res.status === 402) {
          console.log(`[PetFood] Serper key at index ${currentSerperKeyIndex} failed (Status: ${res.status})`);
          currentSerperKeyIndex++;
          if (currentSerperKeyIndex >= SERPER_API_KEYS.length) {
            serperQuotaExhausted = true;
            return allProducts;
          }
          continue; // Retry with next key
        }

        if (!res.ok) break;

        const data = await res.json();
        if (!data.shopping || !Array.isArray(data.shopping)) break;

        for (const item of data.shopping) {
          if (uniqueUrls.has(item.link)) continue;
          uniqueUrls.add(item.link);

          const normalized = normalizeSerperProduct(item, animal, lifeStage);
          if (normalized) {
            allProducts.push(normalized);
          }
        }
        break; // Successfully got data, break inner while loop to move to next query
      } catch (e) {
        console.error(`[PetFood] Serper query failed or timed out: ${q}`);
        break; // Break inner loop on timeout/network error
      }
    }
  }
  return allProducts;
}

export async function GET(request: Request) {
  if (!SERPAPI_KEY || SERPER_API_KEYS.length === 0) {
    return NextResponse.json({ success: false, reason: 'providers_unavailable' }, { status: 500 });
  }

  const { searchParams } = new URL(request.url);
  const animal = searchParams.get('animal') as PetFoodAnimalType;
  const breed = searchParams.get('breed');
  const lifeStage = searchParams.get('lifeStage') as PetFoodLifeStage;

  if (!animal || !lifeStage) {
    return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
  }

  const queries: string[] = [];
  if (breed) {
    queries.push(`${breed} ${lifeStage} ${animal} food`);
    queries.push(`${breed} ${animal} food`);
  }
  queries.push(`${lifeStage} ${animal} food`);
  queries.push(`${animal} food`);

  const cacheKey = `${animal}:${breed || 'all'}:${lifeStage}`;
  try {
    const { data: cached, error } = await supabaseServer
      .from('pet_food_cache')
      .select('products, created_at')
      .eq('cache_key', cacheKey)
      .single();

    if (cached && !error) {
      const age = Date.now() - new Date(cached.created_at).getTime();
      const ttl = animal === 'bird' ? CACHE_TTL_MS_BIRD : CACHE_TTL_MS_OTHER;
      
      if (age < ttl) {
        console.log(`[PetFood] Serving from cache: ${cacheKey}`);
        return NextResponse.json({ success: true, products: cached.products }, { headers: { 'Cache-Control': 's-maxage=3600, stale-while-revalidate' } });
      } else {
        console.log(`[PetFood] Cache expired for: ${cacheKey}`);
      }
    }
  } catch (err) {
    console.error('[PetFood] Cache read error:', err);
  }

  let allProducts: PetFoodProduct[] = [];

  // 1. Try Serper (PRIMARY)
  try {
    allProducts = await fetchFromSerper(queries, animal, lifeStage);
  } catch (error) {
    console.error('Serper failed or timed out:', error);
    console.log('[PetFood] All Serper keys exhausted or failed → switching to SerpApi');
  }

  // 2. Try SerpApi (FALLBACK) if Serper failed or returned too few products
  if (allProducts.length < 3) {
    try {
      const serpApiProducts = await fetchFromSerpApi(queries, animal, lifeStage);
      const existingUrls = new Set(allProducts.map(p => p.productUrl));
      for (const p of serpApiProducts) {
        if (!existingUrls.has(p.productUrl)) {
          allProducts.push(p);
        }
      }
    } catch (error) {
      console.error('SerpApi fallback failed:', error);
    }
  }

  if (allProducts.length === 0) {
    console.log('[PetFood] Both providers unavailable');
    return NextResponse.json({ success: false, reason: 'providers_unavailable' }, { status: 502 });
  }

  const ranked = rankProducts(allProducts).slice(0, 10);

  try {
    if (ranked.length > 0) {
      await supabaseServer.from('pet_food_cache').upsert({
        cache_key: cacheKey,
        animal,
        breed,
        life_stage: lifeStage,
        products: ranked,
        created_at: new Date().toISOString()
      }, { onConflict: 'cache_key' });
      console.log(`[PetFood] Saved to cache: ${cacheKey}`);
    }
  } catch (err) {
    console.error('[PetFood] Cache write error:', err);
  }

  return NextResponse.json({ success: true, products: ranked }, { headers: { 'Cache-Control': 's-maxage=3600, stale-while-revalidate' } });
}
