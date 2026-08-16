'use client';

import { usePetFoodFlow } from './PetFoodProvider';
import type { PetFoodAnimalType } from '@/types/pet-food';

export function AnimalSelector() {
  const { dispatch } = usePetFoodFlow();

  const handleSelect = (animal: PetFoodAnimalType) => {
    dispatch({ type: 'SET_ANIMAL', value: animal });
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-6 animate-in fade-in zoom-in duration-500">
      <h2 className="text-3xl font-bold text-teal-900">What type of pet do you have?</h2>
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
        <button
          onClick={() => handleSelect('dog')}
          className="group flex h-40 w-40 flex-col items-center justify-center rounded-3xl border-2 border-gray-100 bg-white shadow-sm transition-all hover:border-teal-500 hover:shadow-xl"
        >
          <span className="text-6xl transition-transform group-hover:scale-110">🐶</span>
          <span className="mt-4 text-xl font-bold text-gray-700 group-hover:text-teal-700">Dog</span>
        </button>
        <button
          onClick={() => handleSelect('cat')}
          className="group flex h-40 w-40 flex-col items-center justify-center rounded-3xl border-2 border-gray-100 bg-white shadow-sm transition-all hover:border-teal-500 hover:shadow-xl"
        >
          <span className="text-6xl transition-transform group-hover:scale-110">🐱</span>
          <span className="mt-4 text-xl font-bold text-gray-700 group-hover:text-teal-700">Cat</span>
        </button>
        <button
          onClick={() => handleSelect('rabbit')}
          className="group flex h-40 w-40 flex-col items-center justify-center rounded-3xl border-2 border-gray-100 bg-white shadow-sm transition-all hover:border-teal-500 hover:shadow-xl"
        >
          <span className="text-6xl transition-transform group-hover:scale-110">🐰</span>
          <span className="mt-4 text-xl font-bold text-gray-700 group-hover:text-teal-700">Rabbit</span>
        </button>
        <button
          onClick={() => handleSelect('bird')}
          className="group flex h-40 w-40 flex-col items-center justify-center rounded-3xl border-2 border-gray-100 bg-white shadow-sm transition-all hover:border-teal-500 hover:shadow-xl"
        >
          <span className="text-6xl transition-transform group-hover:scale-110">🐦</span>
          <span className="mt-4 text-xl font-bold text-gray-700 group-hover:text-teal-700">Bird</span>
        </button>
      </div>
    </div>
  );
}
