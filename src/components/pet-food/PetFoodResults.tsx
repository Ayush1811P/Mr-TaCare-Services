'use client';

import { useEffect, useState } from 'react';
import { usePetFoodFlow } from './PetFoodProvider';
import { searchProducts } from '@/services/pet-food/searchProducts';
import type { PetFoodProduct } from '@/types/pet-food';
import { PetFoodCard } from './PetFoodCard';
import { Button } from '@/components/ui/Button';

export function PetFoodResults() {
  const { state, dispatch } = usePetFoodFlow();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<PetFoodProduct[]>([]);
  const [errorReason, setErrorReason] = useState<string | null>(null);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    if (state.animal && state.lifeStage) {
      setLoading(true);
      setErrorReason(null);
      searchProducts(state.animal, state.breed, state.lifeStage)
        .then((res) => {
          setProducts(res);
          setLoading(false);
        })
        .catch((e) => {
          if (e.message === 'providers_unavailable') {
            setErrorReason('providers_unavailable');
          }
          setLoading(false);
        });
    }
  }, [state.animal, state.breed, state.lifeStage]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center space-y-6 animate-in fade-in duration-500 py-12">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-teal-600"></div>
        <p className="text-xl font-medium text-gray-600">
          Finding the best food for your {state.breed ? state.breed : state.animal}...
        </p>
      </div>
    );
  }

  if (errorReason === 'providers_unavailable') {
    return (
      <div className="flex flex-col items-center justify-center space-y-6 text-center py-12">
        <p className="text-2xl font-bold text-gray-800">Product search is temporarily unavailable.</p>
        <p className="text-gray-600">Please try again later.</p>
        <button
          onClick={() => dispatch({ type: 'RESET' })}
          className="mt-6 rounded-full bg-teal-800 px-8 py-3 font-bold text-white shadow-sm hover:bg-teal-900"
        >
          Start Over
        </button>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center space-y-6 text-center py-12">
        <p className="text-2xl font-bold text-gray-800">We couldn't find enough suitable options right now.</p>
        <p className="text-gray-600">Try checking back later or adjusting your selections.</p>
        <button
          onClick={() => dispatch({ type: 'RESET' })}
          className="mt-6 rounded-full bg-teal-800 px-8 py-3 font-bold text-white shadow-sm hover:bg-teal-900"
        >
          Start Over
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500 w-full max-w-6xl mx-auto px-4">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 space-y-4 md:space-y-0">
        <div>
          <h2 className="text-3xl font-bold text-teal-900">Recommended Food</h2>
          <p className="text-gray-600 mt-2">
            Top options for your {state.lifeStage} {state.breed || state.animal}
          </p>
        </div>
        <Button
          onClick={() => dispatch({ type: 'RESET' })}
          variant="secondary"
          size="sm"
        >
          Change Pet Details
        </Button>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {(showMore ? products : products.slice(0, 5)).map((p) => (
          <PetFoodCard key={p.id} product={p} />
        ))}
      </div>
      
      {products.length > 5 && (
        <div className="mt-10 flex justify-center">
          <Button
            variant={showMore ? 'secondary' : 'primary'}
            onClick={() => setShowMore(!showMore)}
            size="lg"
            className="shadow-lg"
          >
            {showMore ? 'Show Less' : `Show ${products.length - 5} More Options`}
          </Button>
        </div>
      )}
    </div>
  );
}
