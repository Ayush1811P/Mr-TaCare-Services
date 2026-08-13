import type { Breed, PetType, ResolvedLocation } from '@/types';

/**
 * Flow state machine.
 *
 * A small reducer rather than a state library: the flow is linear with one
 * conditional branch (breed is skipped when the animal has none), and encoding
 * that in ~120 lines keeps back-navigation and progress honest without adding
 * a dependency.
 */

export type StepId = 'name' | 'mobile' | 'petType' | 'age' | 'breed' | 'petName' | 'location';

export type FlowState = {
  step: StepId;
  customerName: string;
  mobile: string;
  petType: PetType | null;
  ageYears: number;
  ageMonths: number;
  breed: Breed | null;
  /** True when the user explicitly picked "Mixed / Not sure". */
  breedSkipped: boolean;
  petName: string;
  location: ResolvedLocation | null;
  /** Direction of the last transition, used to pick the entrance animation. */
  direction: 'forward' | 'back';
};

export const initialFlowState: FlowState = {
  step: 'name',
  customerName: '',
  mobile: '',
  petType: null,
  ageYears: 0,
  ageMonths: 0,
  breed: null,
  breedSkipped: false,
  petName: '',
  location: null,
  direction: 'forward',
};

export type FlowAction =
  | { type: 'RESTORE'; state: FlowState }
  | { type: 'RESET' }
  | { type: 'SET_NAME'; value: string }
  | { type: 'SET_MOBILE'; value: string }
  | { type: 'SET_PET_TYPE'; value: PetType }
  | { type: 'SET_AGE'; years: number; months: number }
  | { type: 'SET_BREED'; value: Breed | null; skipped?: boolean }
  | { type: 'SET_PET_NAME'; value: string }
  | { type: 'SET_LOCATION'; value: ResolvedLocation }
  | { type: 'BACK' }
  | { type: 'GO_TO'; step: StepId };

/** Steps actually shown, given the selected animal. */
export function stepsFor(petType: PetType | null): StepId[] {
  const steps: StepId[] = ['name', 'mobile', 'petType', 'age'];
  if (!petType || petType.hasBreeds) steps.push('breed');
  steps.push('petName', 'location');
  return steps;
}

function advance(state: FlowState, from: StepId): StepId {
  const steps = stepsFor(state.petType);
  const index = steps.indexOf(from);
  return steps[Math.min(index + 1, steps.length - 1)];
}

export function flowReducer(state: FlowState, action: FlowAction): FlowState {
  switch (action.type) {
    case 'RESTORE':
      return action.state;

    case 'RESET':
      return initialFlowState;

    case 'SET_NAME':
      return {
        ...state,
        customerName: action.value,
        step: advance(state, 'name'),
        direction: 'forward',
      };

    case 'SET_MOBILE':
      return {
        ...state,
        mobile: action.value,
        step: advance(state, 'mobile'),
        direction: 'forward',
      };

    case 'SET_PET_TYPE': {
      const next = { ...state, petType: action.value };
      // Changing animal invalidates a previously chosen breed.
      if (state.petType?.slug !== action.value.slug) {
        next.breed = null;
        next.breedSkipped = false;
      }
      return { ...next, step: advance(next, 'petType'), direction: 'forward' };
    }

    case 'SET_AGE':
      return {
        ...state,
        ageYears: action.years,
        ageMonths: action.months,
        step: advance(state, 'age'),
        direction: 'forward',
      };

    case 'SET_BREED':
      return {
        ...state,
        breed: action.value,
        breedSkipped: action.skipped ?? false,
        step: advance(state, 'breed'),
        direction: 'forward',
      };

    case 'SET_PET_NAME':
      return {
        ...state,
        petName: action.value,
        step: advance(state, 'petName'),
        direction: 'forward',
      };

    case 'SET_LOCATION':
      return { ...state, location: action.value, direction: 'forward' };

    case 'BACK': {
      const steps = stepsFor(state.petType);
      const index = steps.indexOf(state.step);
      return { ...state, step: steps[Math.max(index - 1, 0)], direction: 'back' };
    }

    case 'GO_TO':
      return { ...state, step: action.step, direction: 'back' };

    default:
      return state;
  }
}

export function progressFor(state: FlowState): { current: number; total: number } {
  const steps = stepsFor(state.petType);
  return { current: steps.indexOf(state.step) + 1, total: steps.length };
}

/** Everything needed to hand off to the results page is present. */
export function isFlowComplete(state: FlowState): boolean {
  return Boolean(
    state.customerName && state.mobile && state.petType && state.petName && state.location,
  );
}
