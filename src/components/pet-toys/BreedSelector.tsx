'use client';

import { usePetToysFlow } from './PetToysProvider';
import { petFoodBreeds } from '@/data/pet-food/breeds'; // Reusing breed list

export function BreedSelector() {
  const { state, dispatch } = usePetToysFlow();
  const animal = state.animal;
  const breeds = animal ? petFoodBreeds[animal] : [];

  if (!animal) return null;

  return (
    <div className="flex flex-col items-center justify-center space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-2xl mx-auto w-full">
      <h2 className="text-3xl font-bold text-teal-900">What breed is your {animal}?</h2>
      <div className="grid w-full grid-cols-2 gap-4 md:grid-cols-3">
        {breeds.map((breed) => (
          <button
            key={breed.slug}
            onClick={() => dispatch({ type: 'SET_BREED', value: breed.slug })}
            className="flex flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition-all hover:border-teal-500 hover:bg-teal-50 hover:shadow-md"
          >
            <span className="text-center font-medium text-gray-700">{breed.name}</span>
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
