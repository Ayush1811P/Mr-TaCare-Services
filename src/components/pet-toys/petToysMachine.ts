import type { PetToysAnimalType, PetToysLifeStage } from '@/types/pet-toys';

export type PetToysStepId = 'animal' | 'breed' | 'age' | 'results';

export type PetToysState = {
  step: PetToysStepId;
  animal: PetToysAnimalType | null;
  breed: string | null;
  lifeStage: PetToysLifeStage | null;
};

export const initialPetToysState: PetToysState = {
  step: 'animal',
  animal: null,
  breed: null,
  lifeStage: null,
};

export type PetToysAction =
  | { type: 'RESTORE'; state: PetToysState }
  | { type: 'RESET' }
  | { type: 'SET_ANIMAL'; value: PetToysAnimalType }
  | { type: 'SET_BREED'; value: string }
  | { type: 'SET_AGE'; value: PetToysLifeStage }
  | { type: 'BACK' };

const steps: PetToysStepId[] = ['animal', 'breed', 'age', 'results'];

function advance(current: PetToysStepId): PetToysStepId {
  const index = steps.indexOf(current);
  return steps[Math.min(index + 1, steps.length - 1)];
}

export function petToysReducer(state: PetToysState, action: PetToysAction): PetToysState {
  switch (action.type) {
    case 'RESTORE':
      return action.state;
    case 'RESET':
      return initialPetToysState;
    case 'SET_ANIMAL':
      return {
        ...state,
        animal: action.value,
        breed: null, // Reset breed on animal change
        lifeStage: null,
        step: advance('animal'),
      };
    case 'SET_BREED':
      return {
        ...state,
        breed: action.value,
        step: advance('breed'),
      };
    case 'SET_AGE':
      return {
        ...state,
        lifeStage: action.value,
        step: advance('age'),
      };
    case 'BACK': {
      const index = steps.indexOf(state.step);
      return { ...state, step: steps[Math.max(index - 1, 0)] };
    }
    default:
      return state;
  }
}
