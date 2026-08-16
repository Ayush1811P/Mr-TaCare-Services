'use client';

import { usePetFoodFlow } from './PetFoodProvider';
import { AnimalSelector } from './AnimalSelector';
import { BreedSelector } from './BreedSelector';
import { AgeSelector } from './AgeSelector';
import { PetFoodResults } from './PetFoodResults';

export function PetFoodFlow() {
  const { state } = usePetFoodFlow();

  return (
    <div className="w-full min-h-[60vh] flex flex-col items-center py-12">
      {state.step === 'animal' && <AnimalSelector />}
      {state.step === 'breed' && <BreedSelector />}
      {state.step === 'age' && <AgeSelector />}
      {state.step === 'results' && <PetFoodResults />}
    </div>
  );
}
