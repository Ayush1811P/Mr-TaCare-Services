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
  petToysReducer,
  initialPetToysState,
  type PetToysAction,
  type PetToysState,
} from './petToysMachine';

const STORAGE_KEY = 'jivaayu.petToysFlow.v1';

type PetToysContextValue = {
  state: PetToysState;
  dispatch: Dispatch<PetToysAction>;
  isReady: boolean;
};

const PetToysContext = createContext<PetToysContextValue | null>(null);

function readStoredState(): PetToysState | null {
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<PetToysState>;
    return { ...initialPetToysState, ...parsed };
  } catch {
    return null;
  }
}

export function PetToysProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(petToysReducer, initialPetToysState);
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

  return <PetToysContext.Provider value={value}>{children}</PetToysContext.Provider>;
}

export function usePetToysFlow(): PetToysContextValue {
  const context = useContext(PetToysContext);
  if (!context) throw new Error('usePetToysFlow must be used inside PetToysProvider');
  return context;
}
