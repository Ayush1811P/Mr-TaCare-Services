'use client';

import { usePetToysFlow } from './PetToysProvider';
import { AnimalSelector } from './AnimalSelector';
import { BreedSelector } from './BreedSelector';
import { AgeSelector } from './AgeSelector';
import { PetToysResults } from './PetToysResults';

export function PetToysFlow() {
  const { state } = usePetToysFlow();

  return (
    <div className="w-full min-h-[60vh] flex flex-col items-center py-12">
      {state.step === 'animal' && <AnimalSelector />}
      {state.step === 'breed' && <BreedSelector />}
      {state.step === 'age' && <AgeSelector />}
      {state.step === 'results' && <PetToysResults />}
    </div>
  );
}
