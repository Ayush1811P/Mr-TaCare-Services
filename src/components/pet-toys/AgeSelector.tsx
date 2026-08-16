'use client';

import { usePetToysFlow } from './PetToysProvider';
import { petFoodCategories } from '@/data/pet-food/categories'; // Reusing categories
import type { PetToysLifeStage } from '@/types/pet-toys';

export function AgeSelector() {
  const { state, dispatch } = usePetToysFlow();
  const animal = state.animal;
  const categories = animal ? petFoodCategories[animal] : [];

  if (!animal) return null;

  const handleSelect = (stage: PetToysLifeStage) => {
    dispatch({ type: 'SET_AGE', value: stage });
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-2xl mx-auto w-full">
      <h2 className="text-3xl font-bold text-teal-900">How old is your {animal}?</h2>
      <div className="flex flex-col w-full max-w-sm space-y-4">
        {categories.map((stage) => (
          <button
            key={stage.slug}
            onClick={() => handleSelect(stage.slug as PetToysLifeStage)}
            className="flex items-center justify-between rounded-2xl border-2 border-gray-100 bg-white px-6 py-5 shadow-sm transition-all hover:border-teal-500 hover:shadow-md"
          >
            <span className="text-xl font-bold text-gray-700">{stage.name}</span>
            <span className="text-2xl text-teal-600">🐾</span>
          </button>
        ))}
      </div>
      <button
        onClick={() => dispatch({ type: 'BACK' })}
        className="mt-8 text-sm font-semibold text-gray-500 hover:text-teal-700"
      >
        ← Back
      </button>
    </div>
  );
}
