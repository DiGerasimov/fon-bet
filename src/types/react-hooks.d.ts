// Declare TypeScript types for React hooks
declare namespace React {
  function useState<T>(initialState: T | (() => T)): [T, (newState: T) => void];
  function useRef<T>(initialValue: T): { current: T };
  function useEffect(effect: () => void | (() => void), deps?: any[]): void;
} 