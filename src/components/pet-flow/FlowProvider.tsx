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
  flowReducer,
  initialFlowState,
  type FlowAction,
  type FlowState,
} from '@/components/pet-flow/flowMachine';

/**
 * Flow state shared between the question steps and the results page.
 *
 * Context (not a state library) because exactly one subtree needs it.
 *
 * State is mirrored into sessionStorage so a refresh on /doctors does not throw
 * away the answers. sessionStorage — not the URL and not localStorage — because
 * the payload includes a name and phone number: it must not appear in a
 * shareable link, in server logs, or persist after the tab closes.
 */

const STORAGE_KEY = 'jivaayu.flow.v1';

type FlowContextValue = {
  state: FlowState;
  dispatch: Dispatch<FlowAction>;
  /** False until sessionStorage has been read, so consumers can wait. */
  isReady: boolean;
};

const FlowContext = createContext<FlowContextValue | null>(null);

function readStoredState(): FlowState | null {
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<FlowState>;
    return { ...initialFlowState, ...parsed };
  } catch {
    return null;
  }
}

export function FlowProvider({ children }: { children: ReactNode }) {
  /*
   * Both server and client render from initialFlowState, then an effect
   * restores any saved answers. Rehydrating in an effect rather than in the
   * initialiser is what keeps the first client render identical to the HTML.
   */
  const [state, dispatch] = useReducer(flowReducer, initialFlowState);
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
    } catch {
      // Storage can be unavailable (private mode, quota exceeded). The flow
      // still works fully in memory, so failing quietly is the right call.
    }
  }, [state, isReady]);

  const value = useMemo(() => ({ state, dispatch, isReady }), [state, isReady]);

  return <FlowContext.Provider value={value}>{children}</FlowContext.Provider>;
}

export function useFlow(): FlowContextValue {
  const context = useContext(FlowContext);
  if (!context) {
    throw new Error('useFlow must be used inside a FlowProvider');
  }
  return context;
}

export function clearStoredFlow() {
  try {
    window.sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // no-op
  }
}
