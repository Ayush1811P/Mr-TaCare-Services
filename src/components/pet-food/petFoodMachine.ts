import type { PetFoodAnimalType, PetFoodLifeStage } from '@/types/pet-food';

export type PetFoodStepId = 'animal' | 'breed' | 'age' | 'results';

export type PetFoodState = {
  step: PetFoodStepId;
  animal: PetFoodAnimalType | null;
  breed: string | null;
  lifeStage: PetFoodLifeStage | null;
};

export const initialPetFoodState: PetFoodState = {
  step: 'animal',
  animal: null,
  breed: null,
  lifeStage: null,
};

export type PetFoodAction =
  | { type: 'RESTORE'; state: PetFoodState }
  | { type: 'RESET' }
  | { type: 'SET_ANIMAL'; value: PetFoodAnimalType }
  | { type: 'SET_BREED'; value: string }
  | { type: 'SET_AGE'; value: PetFoodLifeStage }
  | { type: 'BACK' };

const steps: PetFoodStepId[] = ['animal', 'breed', 'age', 'results'];

function advance(current: PetFoodStepId): PetFoodStepId {
  const index = steps.indexOf(current);
  return steps[Math.min(index + 1, steps.length - 1)];
}

export function petFoodReducer(state: PetFoodState, action: PetFoodAction): PetFoodState {
  switch (action.type) {
    case 'RESTORE':
      return action.state;
    case 'RESET':
      return initialPetFoodState;
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
