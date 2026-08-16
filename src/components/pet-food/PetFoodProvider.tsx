'use client';

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  type Dispatch,
  type ReactNode,
} from 'react';
import {
  petFoodReducer,
  initialPetFoodState,
  type PetFoodAction,
  type PetFoodState,
} from './petFoodMachine';

const STORAGE_KEY = 'jivaayu.petFoodFlow.v1';

type PetFoodContextValue = {
  state: PetFoodState;
  dispatch: Dispatch<PetFoodAction>;
  isReady: boolean;
};

const PetFoodContext = createContext<PetFoodContextValue | null>(null);

function readStoredState(): PetFoodState | null {
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<PetFoodState>;
    return { ...initialPetFoodState, ...parsed };
  } catch {
    return null;
  }
}

export function PetFoodProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(petFoodReducer, initialPetFoodState);
  const [isReady, markReady] = useReducer(() => true, false);
  const hasRestored = useRef(false);

  useEffect(() => {
    if (hasRestored.current) return;
    hasRestored.current = true;
    const stored = readStoredState();
    if (stored) dispatch({ type: 'RESTORE', state: stored });
    markReady();
  }, []);

  useEffect(() => {
    if (!isReady) return;
    try {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {}
  }, [state, isReady]);

  const value = useMemo(() => ({ state, dispatch, isReady }), [state, isReady]);

  return <PetFoodContext.Provider value={value}>{children}</PetFoodContext.Provider>;
}

export function usePetFoodFlow(): PetFoodContextValue {
  const context = useContext(PetFoodContext);
  if (!context) throw new Error('usePetFoodFlow must be used inside PetFoodProvider');
  return context;
}
